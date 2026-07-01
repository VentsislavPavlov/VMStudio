import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  return new Resend(apiKey);
};

export const sendEmail = async ({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  const companyEmail = process.env.CONTACT_EMAIL;

  if (!companyEmail) {
    throw new Error("CONTACT_EMAIL must be configured.");
  }

  const { error } = await getResend().emails.send({
    from: companyEmail,
    to: companyEmail,
    replyTo,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }
};
