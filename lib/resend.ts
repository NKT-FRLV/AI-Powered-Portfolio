import { z } from "zod";
import { Resend } from "resend";
// import { EmailTemplate } from "@/app/components/EmailTemplate/EmailTemplate";

export const ContactInput = z.object({
  name: z.string().min(2).max(120).optional(),
  email: z.string().email().max(200).optional(),
  company: z.string().max(160).optional(),
  message: z.string().min(5).max(4000),
});

export type ContactInput = z.infer<typeof ContactInput>;

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.CONTACT_FROM_EMAIL!;
const TO = process.env.CONTACT_TO_EMAIL!;
const APP_NAME = process.env.APP_NAME ?? "Portfolio";

const sanitize = (s?: string) => (s ?? "").replace(/[<>]/g, "").slice(0, 4000);

function asPlainText(input: ContactInput) {
  return [
    `Source: portfolio-chat/contact`,
    `Name: ${sanitize(input.name) || "Anonymous"}`,
    `Email: ${sanitize(input.email) || "Not provided"}`,
    `Company: ${sanitize(input.company) || "Not provided"}`,
    "",
    "Message:",
    sanitize(input.message),
  ].join("\n");
}

export async function sendContactEmail(inputRaw: unknown) {
  const parsed = ContactInput.safeParse(inputRaw);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: "VALIDATION_ERROR" as const,
      details: parsed.error.flatten(), // отдаём в вызывающий слой
      status: 400 as const,
    };
  }

  const input = parsed.data;

  try {
    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${FROM}>`,
      to: [TO],
      subject: "Portfolio — new message",
      text: asPlainText(input),
      ...(input.email ? { reply_to: input.email } : {}),
    });

    if (error) {
      return { ok: false as const, error: "RESEND_ERROR" as const, status: 502 as const };
    }
    return { ok: true as const, id: data?.id ?? null, status: 200 as const };
  } catch {
    return { ok: false as const, error: "SERVER_ERROR" as const, status: 500 as const };
  }
}
