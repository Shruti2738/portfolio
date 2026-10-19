import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, escapeHtml } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { allowed } = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate request body
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, email, message, company, ts } = result.data;

    // 3. Honeypot check: company must be completely empty
    if (company && company.trim().length > 0) {
      // Silently discard spam bots
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 4. Timed submission check: reject submissions under 3 seconds after page render
    if (ts && Date.now() - ts < 3000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Submission completed too quickly. Please take a moment to review your message.",
        },
        { status: 400 }
      );
    }

    // 5. Resend Email Dispatch
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "RESEND_API_KEY is not configured in environment variables. Email cannot be dispatched."
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email isn't configured yet. Please email directly to shrutirj307@gmail.com.",
        },
        { status: 500 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "shrutirj307@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const sendAutoreply = process.env.SEND_AUTOREPLY === "true";

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    // Primary email to portfolio owner
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 24px; color: #2A1B10; background-color: #EFE8D2; border: 1px solid #886945;">
          <h2 style="color: #5E233C; margin-top: 0;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${safeName} (&lt;${safeEmail}&gt;)</p>
          <div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border-left: 4px solid #886945;">
            ${safeMessage}
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #533B26; opacity: 0.8;">
            Sent from portfolio contact form // Shruti Ravikumar
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("Resend API error:", emailResult.error);
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to send email. Please try again or email directly.",
        },
        { status: 500 }
      );
    }

    // Optional Auto-reply to visitor
    if (sendAutoreply) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "Thank you for reaching out - Shruti Ravikumar",
          text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will review it shortly.\n\nBest regards,\nShruti Ravikumar`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 24px; color: #2A1B10; background-color: #EFE8D2;">
              <h2 style="color: #5E233C;">Thank you for your message</h2>
              <p>Hi ${safeName},</p>
              <p>Thank you for reaching out through my portfolio. I've received your note and will get back to you soon.</p>
              <p style="margin-top: 24px;">Best regards,<br/><strong>Shruti Ravikumar</strong><br/>B.Tech CSE · IIITDM Kancheepuram</p>
            </div>
          `,
        });
      } catch (autoErr) {
        console.warn("Auto-reply could not be sent:", autoErr);
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Unhandled contact route error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "An unexpected server error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
