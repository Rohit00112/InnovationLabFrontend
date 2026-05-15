import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;

type MemberRecord = {
  name: string;
  email: string;
  phone: string;
  faculty: string;
  gender: string;
  photoFilename?: string;
};

type CollegeRecord = {
  name: string;
  contactEmail: string;
  address: string;
  representativeName: string;
  representativePhone: string;
  representativeEmail: string;
  representativeDesignation: string;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function valueOrEmpty(input: string): string {
  return input && input.trim() !== ""
    ? escapeHtml(input)
    : '<span style="color:#9ca3af;">—</span>';
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:180px;font-size:13px;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-weight:600;font-size:13px;">${valueOrEmpty(value)}</td>
    </tr>
  `;
}

function memberCard(member: MemberRecord, index: number): string {
  return `
    <div style="border:1px solid #e5e7eb;border-radius:6px;padding:14px 16px;margin-bottom:10px;background:#fafafa;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;margin-bottom:6px;">Member ${index + 1}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${row("Name", member.name)}
        ${row("Email", member.email)}
        ${row("Phone", member.phone)}
        ${row("Faculty", member.faculty)}
        ${row("Gender", member.gender)}
        ${row("Photo", member.photoFilename || "")}
      </table>
    </div>
  `;
}

function renderHtml(payload: {
  eventTitle: string;
  teamName: string;
  primaryName: string;
  primaryEmail: string;
  primaryPhone: string;
  registrationType: string;
  college?: CollegeRecord;
  members: MemberRecord[];
  documentFilenames: string[];
}): string {
  const {
    eventTitle,
    teamName,
    primaryName,
    primaryEmail,
    primaryPhone,
    registrationType,
    college,
    members,
    documentFilenames,
  } = payload;

  const documentsHtml =
    documentFilenames.length > 0
      ? `<ul style="margin:0;padding-left:18px;color:#111827;font-size:13px;line-height:1.7;">${documentFilenames
          .map((name) => `<li>${escapeHtml(name)}</li>`)
          .join("")}</ul>`
      : '<div style="color:#9ca3af;font-size:13px;">No documents uploaded.</div>';

  const collegeBlock = college
    ? `
        <div style="margin-top:24px;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">College / Institution</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
            ${row("College Name", college.name)}
            ${row("Contact Email", college.contactEmail)}
            ${row("Address", college.address)}
            ${row("Representative Name", college.representativeName)}
            ${row("Representative Designation", college.representativeDesignation)}
            ${row("Representative Phone", college.representativePhone)}
            ${row("Representative Email", college.representativeEmail)}
          </table>
        </div>
      `
    : "";

  const membersBlock =
    members.length > 0
      ? members.map((m, i) => memberCard(m, i)).join("")
      : '<div style="color:#9ca3af;font-size:13px;">No team members listed.</div>';

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#0a0a0a;color:#ffffff;padding:24px 32px;">
                <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9ca3af;">Innovation Lab</div>
                <div style="font-size:22px;font-weight:700;margin-top:6px;">New Event Registration</div>
                <div style="font-size:13px;color:#d1d5db;margin-top:4px;">${escapeHtml(eventTitle)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Team</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
                  ${row("Team Name", teamName)}
                  ${row("Registration Type", registrationType)}
                  ${row("Primary Contact Name", primaryName)}
                  ${row("Primary Contact Email", primaryEmail)}
                  ${row("Primary Contact Phone", primaryPhone)}
                </table>

                ${collegeBlock}

                <div style="margin-top:24px;">
                  <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Team Members (${members.length})</div>
                  ${membersBlock}
                </div>

                <div style="margin-top:24px;">
                  <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Supporting Documents</div>
                  ${documentsHtml}
                </div>

                <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;font-size:12px;color:#9ca3af;">
                  Member photos and uploaded documents are attached to this email.
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

function renderText(payload: {
  eventTitle: string;
  teamName: string;
  primaryName: string;
  primaryEmail: string;
  primaryPhone: string;
  registrationType: string;
  college?: CollegeRecord;
  members: MemberRecord[];
  documentFilenames: string[];
}): string {
  const lines: string[] = [];
  lines.push(`New Event Registration — ${payload.eventTitle}`);
  lines.push("");
  lines.push("TEAM");
  lines.push(`  Team Name:     ${payload.teamName || "—"}`);
  lines.push(`  Type:          ${payload.registrationType || "—"}`);
  lines.push(`  Primary Name:  ${payload.primaryName || "—"}`);
  lines.push(`  Primary Email: ${payload.primaryEmail || "—"}`);
  lines.push(`  Primary Phone: ${payload.primaryPhone || "—"}`);

  if (payload.college) {
    lines.push("");
    lines.push("COLLEGE / INSTITUTION");
    lines.push(`  Name:                ${payload.college.name || "—"}`);
    lines.push(`  Contact Email:       ${payload.college.contactEmail || "—"}`);
    lines.push(`  Address:             ${payload.college.address || "—"}`);
    lines.push(`  Representative:      ${payload.college.representativeName || "—"}`);
    lines.push(`  Designation:         ${payload.college.representativeDesignation || "—"}`);
    lines.push(`  Rep. Phone:          ${payload.college.representativePhone || "—"}`);
    lines.push(`  Rep. Email:          ${payload.college.representativeEmail || "—"}`);
  }

  lines.push("");
  lines.push(`TEAM MEMBERS (${payload.members.length})`);
  payload.members.forEach((m, i) => {
    lines.push(`  ${i + 1}. ${m.name || "—"}`);
    lines.push(`     Email:   ${m.email || "—"}`);
    lines.push(`     Phone:   ${m.phone || "—"}`);
    lines.push(`     Faculty: ${m.faculty || "—"}`);
    lines.push(`     Gender:  ${m.gender || "—"}`);
    lines.push(`     Photo:   ${m.photoFilename || "—"}`);
  });

  lines.push("");
  lines.push("DOCUMENTS");
  if (payload.documentFilenames.length === 0) {
    lines.push("  (none)");
  } else {
    payload.documentFilenames.forEach((n) => lines.push(`  - ${n}`));
  }

  return lines.join("\n");
}

function getStr(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

export async function POST(request: NextRequest) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data." },
      { status: 400 },
    );
  }

  const eventTitle = getStr(fd, "EventTitle") || "Event Registration";
  const teamName = getStr(fd, "TeamName");
  const primaryName = getStr(fd, "Name");
  const primaryEmail = getStr(fd, "Email");
  const primaryPhone = getStr(fd, "Phone");
  const registrationType = getStr(fd, "Type");

  let college: CollegeRecord | undefined;
  const collegeName = getStr(fd, "RegistrationColleges[0].name");
  if (collegeName) {
    college = {
      name: collegeName,
      contactEmail: getStr(fd, "RegistrationColleges[0].contactEmail"),
      address: getStr(fd, "RegistrationColleges[0].address"),
      representativeName: getStr(fd, "RegistrationColleges[0].representativeName"),
      representativePhone: getStr(fd, "RegistrationColleges[0].representativePhone"),
      representativeEmail: getStr(fd, "RegistrationColleges[0].representativeEmail"),
      representativeDesignation: getStr(
        fd,
        "RegistrationColleges[0].representativeDesignation",
      ),
    };
  }

  const memberIndices = new Set<number>();
  for (const key of fd.keys()) {
    const match = key.match(/^Members\[(\d+)\]\./);
    if (match) memberIndices.add(parseInt(match[1], 10));
  }

  const attachments: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }> = [];
  let totalAttachmentBytes = 0;

  const members: MemberRecord[] = [];
  for (const index of [...memberIndices].sort((a, b) => a - b)) {
    const photoEntry = fd.get(`Members[${index}].photo`);
    let photoFilename: string | undefined;

    if (photoEntry instanceof File && photoEntry.size > 0) {
      const buffer = Buffer.from(await photoEntry.arrayBuffer());
      if (totalAttachmentBytes + buffer.length <= MAX_TOTAL_ATTACHMENT_BYTES) {
        const filename =
          photoEntry.name || `member-${index + 1}-photo`;
        attachments.push({
          filename: `member-${index + 1}-${filename}`,
          content: buffer,
          contentType: photoEntry.type || undefined,
        });
        totalAttachmentBytes += buffer.length;
        photoFilename = filename;
      } else {
        photoFilename = `${photoEntry.name} (skipped — attachments exceed 20MB)`;
      }
    }

    members.push({
      name: getStr(fd, `Members[${index}].name`),
      email: getStr(fd, `Members[${index}].email`),
      phone: getStr(fd, `Members[${index}].phone`),
      faculty: getStr(fd, `Members[${index}].faculty`),
      gender: getStr(fd, `Members[${index}].gender`),
      photoFilename,
    });
  }

  const documentFilenames: string[] = [];
  const documentEntries = fd.getAll("Documents");
  for (const entry of documentEntries) {
    if (entry instanceof File && entry.size > 0) {
      const buffer = Buffer.from(await entry.arrayBuffer());
      if (totalAttachmentBytes + buffer.length <= MAX_TOTAL_ATTACHMENT_BYTES) {
        attachments.push({
          filename: entry.name || "document",
          content: buffer,
          contentType: entry.type || undefined,
        });
        totalAttachmentBytes += buffer.length;
        documentFilenames.push(entry.name);
      } else {
        documentFilenames.push(`${entry.name} (skipped — attachments exceed 20MB)`);
      }
    }
  }

  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
  const SMTP_TO = process.env.SMTP_TO || "innovation.lab@iic.edu.np";

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Event registration email: SMTP credentials missing.");
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

  const payload = {
    eventTitle,
    teamName,
    primaryName,
    primaryEmail,
    primaryPhone,
    registrationType,
    college,
    members,
    documentFilenames,
  };

  const safeTeam = (teamName || primaryName || primaryEmail || "Team")
    .replace(/["\\<>]/g, "")
    .trim();
  const fromDisplay = `${safeTeam} (via Innovation Lab)`;

  try {
    await transporter.sendMail({
      from: `"${fromDisplay}" <${SMTP_FROM}>`,
      to: SMTP_TO,
      replyTo: primaryEmail || undefined,
      subject: `[Event Registration] ${eventTitle} — ${teamName || primaryName || primaryEmail}`,
      text: renderText(payload),
      html: renderHtml(payload),
      attachments,
    });
  } catch (error) {
    console.error("Event registration email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
