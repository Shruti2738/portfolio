import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Enter your name (2 characters or more)")
    .max(80, "Name must be under 80 characters"),
  email: z.string().email("Enter a valid email"),
  message: z
    .string()
    .min(10, "Write at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  company: z.string().optional(), // honeypot: must be empty
  ts: z.number().optional(), // render timestamp
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
