"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../src/server/db";
import { sendEmail } from "../src/server/email";
import {
  assertRateLimit,
  escapeHtml,
  sanitizeText,
  verifyTurnstileToken,
} from "../src/server/security";

export type FormActionState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

const emptySuccess = (message: string): FormActionState => ({ ok: true, message });
const failure = (message: string, errors?: Record<string, string>): FormActionState => ({
  ok: false,
  message,
  errors,
});

const optionalText = z
  .string()
  .optional()
  .transform((value) => (value ? sanitizeText(value) : undefined))
  .pipe(z.string().max(160).optional());

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120).transform(sanitizeText),
  email: z.string().email("Please enter a valid email.").max(160).transform(sanitizeText),
  phone: z.string().min(5, "Please enter a phone number.").max(40).transform(sanitizeText),
  selectedService: optionalText,
  company: optionalText,
  message: z.string().min(10, "Please enter a message.").max(3000).transform(sanitizeText),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

const reviewSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120).transform(sanitizeText),
  email: z
    .string()
    .email("Please enter a valid email.")
    .max(160)
    .transform(sanitizeText)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  roleCompany: z.string().min(2, "Please enter your role or company.").max(180).transform(sanitizeText),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  message: z.string().min(10, "Please enter your review.").max(1400).transform(sanitizeText),
  avatar: optionalText,
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

const formDataToObject = (formData: FormData) =>
  Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value)]));

const zodErrors = (error: z.ZodError) =>
  Object.fromEntries(error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]));

const splitRoleCompany = (value: string) => {
  const [role, ...companyParts] = value.split(",").map((part) => part.trim()).filter(Boolean);
  const company = companyParts.join(", ");

  return {
    role: role || value,
    company: company || value,
  };
};

export async function submitContactForm(
  _previousState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  try {
    await assertRateLimit("contact", 4, 60_000);

    const parsed = contactSchema.safeParse(formDataToObject(formData));

    if (!parsed.success) {
      return failure("Please check the highlighted fields.", zodErrors(parsed.error));
    }

    const data = parsed.data;

    if (data.website) {
      return emptySuccess("Thank you! We will get back to you as soon as possible.");
    }

    if (!(await verifyTurnstileToken(data.turnstileToken))) {
      return failure("Security verification failed. Please try again.");
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        selectedService: data.selectedService,
        company: data.company,
        message: data.message,
      },
    });

    await sendEmail({
      subject: "New Contact Request",
      replyTo: data.email,
      html: `
        <h1>New Contact Request</h1>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(data.selectedService ?? "Not selected")}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company ?? "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        <p><strong>Message ID:</strong> ${escapeHtml(message.id)}</p>
      `,
    });

    return emptySuccess("Thank you! We will get back to you as soon as possible.");
  } catch (error) {
    console.error("Contact form error:", error);
    return failure("Something went wrong. Please try again later.");
  }
}

export async function submitReviewForm(
  _previousState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  try {
    await assertRateLimit("review", 3, 60_000);

    const parsed = reviewSchema.safeParse(formDataToObject(formData));

    if (!parsed.success) {
      return failure("Please check the highlighted fields.", zodErrors(parsed.error));
    }

    const data = parsed.data;

    if (data.website) {
      return emptySuccess("Thank you for your review! It will be published after approval.");
    }

    if (!(await verifyTurnstileToken(data.turnstileToken))) {
      return failure("Security verification failed. Please try again.");
    }

    const roleCompany = splitRoleCompany(data.roleCompany);

    const review = await prisma.review.create({
      data: {
        name: data.name,
        company: roleCompany.company,
        role: roleCompany.role,
        rating: data.rating,
        message: data.message,
        avatar: data.avatar,
        status: "pending",
      },
    });

    await sendEmail({
      subject: "New testimonial awaiting approval.",
      replyTo: data.email,
      html: `
        <h1>New testimonial awaiting approval.</h1>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email ?? "Not provided")}</p>
        <p><strong>Company:</strong> ${escapeHtml(roleCompany.company)}</p>
        <p><strong>Role:</strong> ${escapeHtml(roleCompany.role)}</p>
        <p><strong>Rating:</strong> ${escapeHtml(String(data.rating))}/5</p>
        <p><strong>Review:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        <p><strong>Review ID:</strong> ${escapeHtml(review.id)}</p>
        <p>Admin panel: /admin/reviews</p>
      `,
    });

    revalidatePath("/");
    revalidatePath("/admin/reviews");

    return emptySuccess("Thank you for your review! It will be published after approval.");
  } catch (error) {
    console.error("Review form error:", error);
    return failure("Something went wrong. Please try again later.");
  }
}
