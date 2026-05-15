import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string | null;
  email?: string | null;
  subject?: string | null;
  message?: string | null;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const { name, email, subject, message } = values;
  const messageHtml = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#0a0a0a;color:#ffffff;padding:24px 32px;">
                <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;">Innovation Lab</div>
                <div style="font-size:22px;font-weight:700;margin-top:6px;">New Contact Message</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 20px 0;color:#374151;font-size:14px;line-height:1.6;">
                  You received a new message from the Innovation Lab contact form.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:120px;">Name</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">${escapeHtml(name) || "<span style=\"color:#9ca3af;font-weight:400;\">(not provided)</span>"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;">Subject</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;">${escapeHtml(subject) || "<span style=\"color:#9ca3af;font-weight:400;\">(not provided)</span>"}</td>
                  </tr>
                </table>

                <div style="margin-top:24px;">
                  <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Message</div>
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;font-size:14px;line-height:1.65;color:#111827;white-space:pre-wrap;">
                    ${messageHtml}
                  </div>
                </div>

                <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af;">
                  Reply directly to this email to respond to ${escapeHtml(name) || escapeHtml(email)}.
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#fafafa;padding:16px 32px;font-size:11px;color:#9ca3af;letter-spacing:0.06em;">
                Sent from innovation.iic.edu.np &middot; Itahari International College
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `New Contact Message — Innovation Lab

Name:    ${values.name || "(not provided)"}
Email:   ${values.email}
Subject: ${values.subject || "(not provided)"}

Message:
${values.message}

— Sent from innovation.iic.edu.np
`;
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const subject = (body.subject ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
  const SMTP_TO = process.env.SMTP_TO || "innovation.lab@iic.edu.np";

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact email: SMTP credentials missing.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const values = { name, email, subject, message };
  const mailSubject = subject
    ? `[Innovation Lab Contact] ${subject}`
    : `[Innovation Lab Contact] New message from ${name || email}`;

  const safeName = (name || email).replace(/["\\<>]/g, "").trim();
  const fromDisplay = `${safeName} (via Innovation Lab)`;

  try {
    await transporter.sendMail({
      from: `"${fromDisplay}" <${SMTP_FROM}>`,
      to: SMTP_TO,
      replyTo: name ? `"${safeName}" <${email}>` : email,
      subject: mailSubject,
      text: renderText(values),
      html: renderHtml(values),
    });
  } catch (error) {
    console.error("Contact email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
