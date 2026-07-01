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
  name: z.string().min(2, "Моля, въведете вашето име.").max(120).transform(sanitizeText),
  email: z.string().email("Моля, въведете валиден имейл.").max(160).transform(sanitizeText),
  phone: z.string().min(5, "Моля, въведете телефонен номер.").max(40).transform(sanitizeText),
  selectedService: optionalText,
  company: optionalText,
  message: z.string().min(10, "Моля, въведете съобщение.").max(3000).transform(sanitizeText),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

const reviewSchema = z.object({
  name: z.string().min(2, "Моля, въведете вашето име.").max(120).transform(sanitizeText),
  email: z
    .string()
    .email("Моля, въведете валиден имейл.")
    .max(160)
    .transform(sanitizeText)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  roleCompany: z.string().min(2, "Моля, въведете длъжност или компания.").max(180).transform(sanitizeText),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  message: z.string().min(10, "Моля, въведете вашия отзив.").max(1400).transform(sanitizeText),
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
      return failure("Моля, проверете маркираните полета.", zodErrors(parsed.error));
    }

    const data = parsed.data;

    if (data.website) {
      return emptySuccess("Благодарим ви! Ще се свържем с вас възможно най-скоро.");
    }

    if (!(await verifyTurnstileToken(data.turnstileToken))) {
      return failure("Проверката за сигурност не беше успешна. Моля, опитайте отново.");
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
      subject: "Ново запитване от контактната форма",
      replyTo: data.email,
      html: `
        <h1>Ново запитване от контактната форма</h1>
        <p><strong>Име:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Имейл:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Услуга:</strong> ${escapeHtml(data.selectedService ?? "Не е избрана")}</p>
        <p><strong>Компания:</strong> ${escapeHtml(data.company ?? "Не е посочена")}</p>
        <p><strong>Съобщение:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        <p><strong>ID на съобщението:</strong> ${escapeHtml(message.id)}</p>
      `,
    });

    return emptySuccess("Благодарим ви! Ще се свържем с вас възможно най-скоро.");
  } catch (error) {
    console.error("Contact form error:", error);
    return failure("Възникна проблем. Моля, опитайте отново по-късно.");
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
      return failure("Моля, проверете маркираните полета.", zodErrors(parsed.error));
    }

    const data = parsed.data;

    if (data.website) {
      return emptySuccess("Благодарим за вашия отзив! Ще бъде публикуван след одобрение.");
    }

    if (!(await verifyTurnstileToken(data.turnstileToken))) {
      return failure("Проверката за сигурност не беше успешна. Моля, опитайте отново.");
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
      subject: "Нов отзив очаква одобрение.",
      replyTo: data.email,
      html: `
        <h1>Нов отзив очаква одобрение.</h1>
        <p><strong>Име:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Имейл:</strong> ${escapeHtml(data.email ?? "Не е посочен")}</p>
        <p><strong>Компания:</strong> ${escapeHtml(roleCompany.company)}</p>
        <p><strong>Длъжност:</strong> ${escapeHtml(roleCompany.role)}</p>
        <p><strong>Оценка:</strong> ${escapeHtml(String(data.rating))}/5</p>
        <p><strong>Отзив:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        <p><strong>ID на отзива:</strong> ${escapeHtml(review.id)}</p>
        <p>Админ панел: /admin/reviews</p>
      `,
    });

    revalidatePath("/");
    revalidatePath("/admin/reviews");

    return emptySuccess("Благодарим за вашия отзив! Ще бъде публикуван след одобрение.");
  } catch (error) {
    console.error("Review form error:", error);
    return failure("Възникна проблем. Моля, опитайте отново по-късно.");
  }
}
