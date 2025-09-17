import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";
import type { ToolSet } from "ai";
import { tool } from "ai";

// базовая схема для tool
const PreviewEmailSchema = z.object({
	fromEmail: z.string().email().describe("Email of the user"),
	fromName: z.string().describe("Name of the user"),
	subject: z.string().describe("Subject of the email"),
	companyName: z
		.string()
		.optional()
		.describe("Name of the company the user is from"),
	text: z.string().describe("Message text"),
});
const SendEmailSchema = PreviewEmailSchema.extend({
	confirmed: z
		.boolean()
		.default(false)
		.describe("Confirmation of the email sending by user. Yes or No"),
});

export const tools = {
	askForConfirmation: tool({
		description:
			"This tool shows to user the preview of the message and asks for confirmation to sand with this data before calling 'sendEmail' tool. Always pass the data to fill the message template preview, and wait for user confirmation or denial.",
		inputSchema: PreviewEmailSchema,
		// нет execute => client-side tool
	}),

	sendEmail: tool({
		description:
			"Send a message to Nikita via email. Must be called only AFTER user CONFIRMATION.",
		inputSchema: SendEmailSchema,
		execute: async (args) => {
			console.log("ai args for sendEmail", args);
			if (!args.confirmed) {
				return `Not sending. Missing confirmation.`;
			}

			// Преобразуем SendEmailToolInput в ContactInput
			const contactInput = {
				email: args.fromEmail || "Not provided",
				name: args.fromName || "Anonymous",
				subject: args.subject || "No subject",
				company: args.companyName || "Not mentioned",
				message: args.text || "No message",
			};

			const result = await sendContactEmail(contactInput);
			return result.ok
				? `Email sent successfully.`
				: `Sorry, sending failed. Try later.`;
		},
	}),
} satisfies ToolSet;
