"use client";

import Button from "@/components/primitives/Button";
import { EventRegistrationType } from "@/lib/services/generated/frontend/schemas/eventRegistrationType";
import { Gender } from "@/lib/services/generated/frontend/schemas/gender";
import type { TeamMemberCreateDto } from "@/lib/services/generated/frontend/schemas/teamMemberCreateDto";
import { useEffect, useRef, useState } from "react";

interface ErrorInfo {
  code?: string;
  message: string;
  detail?: string;
}
// `ERROR_META` removed — derive short titles from known codes and use
// server-provided `error.message` for the detail text.

function ErrorPopup({
  error,
  onClose,
}: {
  error: ErrorInfo | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & close on Escape
  useEffect(() => {
    if (!error) return;

    const prevFocused = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      prevFocused?.focus();
    };
  }, [error, onClose]);

  if (!error) return null;

  const title = (() => {
    if (!error?.code) return "Something Went Wrong";
    switch (error.code) {
      case "VALIDATION_ERROR":
        return "Validation Error";
      case "UNAUTHORIZED":
        return "Not Logged In";
      case "FORBIDDEN":
        return "Access Denied";
      case "GONE":
        return "Registration Closed";
      case "BAD_REQUEST":
        return "Bad Request";
      default:
        return "Something Went Wrong";
    }
  })();
  const detail = error.message;

  // Category badge
  const category = (() => {
    const c = error.code ?? "";
    if (c.startsWith("TEAM_"))
      return { label: "Team", color: "var(--color-warning)" };
    if (c.startsWith("EVENT_"))
      return { label: "Event", color: "var(--color-info)" };
    if (c.startsWith("REGISTRATION_"))
      return { label: "Registration", color: "var(--color-ipurple)" };
    if (c.startsWith("COLLEGE_"))
      return { label: "College", color: "var(--color-success)" };
    if (
      c.startsWith("FILE_") ||
      c === "INVALID_FILE" ||
      c === "DOCUMENT_REQUIRED" ||
      c === "PHOTO_REQUIRED" ||
      c === "UNSUPPORTED_FILE_TYPE"
    )
      return { label: "File", color: "var(--color-info)" };
    if (c === "VALIDATION_ERROR" || c.startsWith("INVALID_"))
      return { label: "Validation", color: "var(--color-warning)" };
    if (["UNAUTHORIZED", "FORBIDDEN", "USER_NOT_FOUND"].includes(c))
      return { label: "Auth", color: "var(--color-ipink)" };
    return { label: "Error", color: "var(--color-error)" };
  })();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-popup-title"
      >
        {/* Panel */}
        <div
          ref={dialogRef}
          className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl"
          style={{ borderRadius: 0, border: "1.5px solid var(--neutral-900)" }}
        >
          {/* Top accent bar */}
          <div style={{ height: 4, backgroundColor: "var(--color-error)" }} />

          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-5 pb-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{
                  backgroundColor: "var(--color-error-background)",
                  border: "1px solid var(--color-error-border)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-error)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>

              <div>
                <p
                  id="error-popup-title"
                  className="text-base font-bold leading-tight text-neutral-900"
                >
                  {title}
                </p>

                {/* Category badge */}
                <span
                  className="mt-0.5 inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.label}
                </span>
              </div>
            </div>

            {/* Close */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="Close error message"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pb-5">
            <p className="text-sm leading-relaxed text-neutral-600">{detail}</p>

            {/* Error code pill */}
            {error.code && (
              <p className="mt-3 text-[11px] font-mono text-neutral-400">
                code:{" "}
                <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 text-neutral-500">
                  {error.code}
                </span>
              </p>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex justify-end gap-2 px-6 py-4"
            style={{ borderTop: "1px solid var(--neutral-100)" }}
          >
            <button
              onClick={onClose}
              className="bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 active:bg-black"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Success Popup ────────────────────────────────────────────────────────────

function SuccessPopup({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!message) return;
    const prevFocused = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      prevFocused?.focus();
    };
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-popup-title"
    >
      <div
        className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl"
        style={{ borderRadius: 0, border: "1.5px solid var(--neutral-900)" }}
      >
        {/* Top accent bar — green */}
        <div style={{ height: 4, backgroundColor: "#16a34a" }} />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-3">
            {/* Checkmark icon */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center"
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div>
              <p
                id="success-popup-title"
                className="text-base font-bold leading-tight text-neutral-900"
              >
                Registration Successful
              </p>
              <span
                className="mt-0.5 inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: "#16a34a" }}
              >
                Confirmed
              </span>
            </div>
          </div>

          {/* Close */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Close confirmation"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-neutral-600">{message}</p>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end gap-2 px-6 py-4"
          style={{ borderTop: "1px solid var(--neutral-100)" }}
        >
          <button
            onClick={onClose}
            className="bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 active:bg-black"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
  onSuccess?: () => void;
}

const initialTeamMember: TeamMemberCreateDto = {
  name: "",
  email: "",
  phone: "",
  faculty: "",
  gender: Gender.Male,
};

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  onSuccess,
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Client-side team size error
  const [teamCountError, setTeamCountError] = useState<string | null>(null);

  // Per-field validation errors from server
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  // Per-member[index] validation errors, e.g. memberErrors[0].phone
  const [memberErrors, setMemberErrors] = useState<
    Array<Record<string, string[]>>
  >([]);

  const [formData, setFormData] = useState({
    Name: "" + "myname",
    Email: "" + "fixedemail@gmail.com",
    Phone: "" + "0987654545",
    TeamName: "",
    Type: EventRegistrationType.Team,

    CollegeName: "",
    CollegeAddress: "",
    CollegeContactEmail: "",

    RepresentativeName: "",
    RepresentativePhone: "",
    RepresentativeEmail: "",
    RepresentativeDesignation: "",
  });

  const [teamMembers, setTeamMembers] = useState<TeamMemberCreateDto[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  /** Returns Tailwind classes for an input, highlighted red when it has an error */
  const inputClass = (hasError = false) =>
    `mt-1 w-full border px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors ${
      hasError
        ? "border-red-500 bg-red-50 focus:border-red-600"
        : "border-neutral-300 focus:border-black"
    }`;

  /** First error message for a top-level field */
  const fieldError = (key: string) => fieldErrors[key]?.[0];

  /** First error message for a member sub-field */
  const memberError = (index: number, key: string) =>
    memberErrors[index]?.[key.toLowerCase()]?.[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear server error for this field when user starts correcting it
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setDocuments(Array.from(e.target.files));
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMemberCreateDto,
    value: string | File,
  ) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    // Clear server error for this member field when user corrects it
    const errKey = String(field).toLowerCase();
    if (memberErrors[index]?.[errKey]) {
      setMemberErrors((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = { ...next[index] };
          delete next[index][errKey];
        }
        return next;
      });
    }
  };

  const addTeamMember = () => {
    setTeamMembers((prev) => [...prev, { ...initialTeamMember }]);
    setTeamCountError(null);
  };

  const removeTeamMember = (index: number) =>
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));

  /** Resolve a raw error code + message into a user-facing ErrorInfo */
  const resolveError = (code?: string, message?: string): ErrorInfo => {
    // Fallback message for unknown codes
    const fallback = message || "Something went wrong. Please try again.";
    return { code, message: fallback };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side guard: require at least 3 team members
    if (teamMembers.length < 3) {
      setTeamCountError(
        `At least 3 team members are required. You have ${teamMembers.length === 0 ? "none" : teamMembers.length} added.`,
      );
      // Scroll the section into view so the user sees the error
      document
        .getElementById("team-members-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setTeamCountError(null);

    try {
      setIsSubmitting(true);
      setErrorInfo(null);

      const body = new FormData();

      body.append("EventId", eventId);
      body.append("Name", formData.Name);
      body.append("Email", formData.Email);
      body.append("Phone", formData.Phone || "");
      body.append("TeamName", formData.TeamName || formData.Name);
      body.append("Type", formData.Type);

      if (formData.CollegeName) {
        body.append("RegistrationColleges[0].name", formData.CollegeName);
        body.append(
          "RegistrationColleges[0].contactEmail",
          formData.CollegeContactEmail || "",
        );
        body.append(
          "RegistrationColleges[0].address",
          formData.CollegeAddress || "",
        );
        body.append(
          "RegistrationColleges[0].representativeName",
          formData.RepresentativeName || "",
        );
        body.append(
          "RegistrationColleges[0].representativePhone",
          formData.RepresentativePhone || "",
        );
        body.append(
          "RegistrationColleges[0].representativeEmail",
          formData.RepresentativeEmail || "",
        );
        body.append(
          "RegistrationColleges[0].representativeDesignation",
          formData.RepresentativeDesignation || "",
        );
      }

      if (teamMembers.length > 0) {
        teamMembers.forEach((member, index) => {
          if (member.name || member.email || member.phone) {
            body.append(`Members[${index}].name`, member.name || "");
            body.append(`Members[${index}].email`, member.email || "");
            body.append(`Members[${index}].phone`, member.phone || "");
            body.append(`Members[${index}].faculty`, member.faculty || "");
            body.append(
              `Members[${index}].gender`,
              member.gender || Gender.Male,
            );
            if (member.photo)
              body.append(`Members[${index}].photo`, member.photo);
          }
        });
      }

      if (documents.length > 0) {
        documents.forEach((file) => body.append("Documents", file));
      }

      const res = await fetch(`/api/temp`, {
        method: "POST",
        body,
      });

      const data = await res.json().catch(() => ({}));

      // Success: 200 / 201 (or a truthy data.success)
      if (res.status === 200 || res.status === 201 || data.success) {
        const msg =
          (data && (data.message || data.successMessage)) ||
          "Registered successfully. You'll get a verification email/phone shortly.";
        resetForm();
        onSuccess?.();
        setSuccess(true);
        setSuccessMessage(msg);
        return;
      }

      // Map common status codes to friendly error codes/messages
      if (res.status === 400) {
        // Parse ASP.NET-style { errors: { "FieldName": ["msg"], "Members[0].Phone": ["msg"] } }
        const serverErrors = data?.errors as
          | Record<string, string[]>
          | undefined;

        if (serverErrors && Object.keys(serverErrors).length > 0) {
          const newFieldErrors: Record<string, string[]> = {};
          const newMemberErrors: Array<Record<string, string[]>> = [];

          Object.entries(serverErrors).forEach(([key, messages]) => {
            // Match Members[N].FieldName
            const memberMatch = key.match(/^Members\[(\d+)\]\.(.+)$/i);
            if (memberMatch) {
              const idx = parseInt(memberMatch[1], 10);
              const subField = memberMatch[2].toLowerCase();
              if (!newMemberErrors[idx]) newMemberErrors[idx] = {};
              newMemberErrors[idx][subField] = messages;
            } else {
              // Top-level field — server uses PascalCase, formData uses PascalCase too
              newFieldErrors[key] = messages;
            }
          });

          setFieldErrors(newFieldErrors);
          setMemberErrors(newMemberErrors);
          window.scrollTo(0, 0);
          // No popup — errors are shown inline
        } else {
          // No structured errors, fall back to popup
          setErrorInfo(
            resolveError(
              "VALIDATION_ERROR",
              data?.message ||
                data?.title ||
                "Please check your input and try again.",
            ),
          );
        }
        return;
      }

      if (res.status === 401 || res.status === 403) {
        setErrorInfo(
          resolveError(
            "UNAUTHORIZED",
            data?.message ||
              "You need to log in before completing this action.",
          ),
        );
        return;
      }

      if (res.status === 410) {
        setErrorInfo(
          resolveError("GONE", data?.message || "Registration has ended."),
        );
        return;
      }

      // Fallback for other errors
      const code = (data && (data.error?.code || data.code)) || "BACKEND_ERROR";
      const message =
        (data && (data.error?.message || data.message)) ||
        "An unexpected error occurred.";
      setErrorInfo(resolveError(code, message));
    } catch (err) {
      setErrorInfo(
        resolveError(
          "NETWORK_ERROR",
          err instanceof Error ? err.message : "An unexpected error occurred.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Name: "" + "myname",
      Email: "" + "fixedemail@gmail.com",
      Phone: "" + "0987654545",
      TeamName: "",
      Type: EventRegistrationType.Team,
      CollegeName: "",
      CollegeAddress: "",
      CollegeContactEmail: "",
      RepresentativeName: "",
      RepresentativePhone: "",
      RepresentativeEmail: "",
      RepresentativeDesignation: "",
    });
    setTeamMembers([]);
    setDocuments([]);
    setErrorInfo(null);
    setFieldErrors({});
    setMemberErrors([]);
    setTeamCountError(null);
    // Note: success / successMessage are cleared here so the popup
    // doesn't re-appear if the user resets after a successful registration.
    setSuccess(false);
    setSuccessMessage(null);
  };

  return (
    <>
      {/* Error popup — for auth / network / non-validation errors */}
      <ErrorPopup error={errorInfo} onClose={() => setErrorInfo(null)} />

      {/* Success popup — shown after a successful registration */}
      <SuccessPopup
        message={
          success
            ? (successMessage ??
              "You're registered! You'll get a verification email/phone shortly.")
            : null
        }
        onClose={() => {
          setSuccess(false);
          setSuccessMessage(null);
        }}
      />

      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Register for {eventTitle}
          </h2>
          <p className="mt-2 text-neutral-600">
            Fill in your details below to complete registration.
          </p>
        </div>

        {/* Validation summary — shown when server returns per-field errors */}
        {(Object.keys(fieldErrors).length > 0 ||
          memberErrors.some((m) => m && Object.keys(m).length > 0)) && (
          <div
            className="mb-6 border border-red-300 bg-red-50 px-5 py-4"
            role="alert"
          >
            <p className="mb-2 text-sm font-semibold text-red-700">
              Please fix the following errors before submitting:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-red-600">
              {Object.entries(fieldErrors).map(([field, msgs]) =>
                msgs.map((msg, i) => <li key={`${field}-${i}`}>{msg}</li>),
              )}
              {memberErrors.map((errs, idx) =>
                errs
                  ? Object.entries(errs).map(([field, msgs]) =>
                      msgs.map((msg, i) => (
                        <li key={`m${idx}-${field}-${i}`}>
                          Member {idx + 1} — {msg}
                        </li>
                      )),
                    )
                  : null,
              )}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <input type="hidden" name="Type" value={formData.Type} />

          {/* Primary Registrant */}
          <fieldset className="space-y-4 border-b border-neutral-200 pb-8">
            <legend className="text-lg font-semibold text-neutral-900">
              Team Information
            </legend>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Team Name
              </label>
              <input
                type="text"
                placeholder="Team Alpha"
                value={formData.TeamName}
                onChange={(e) => handleInputChange(e, "TeamName")}
                className={inputClass(!!fieldError("TeamName"))}
                required
              />
              {fieldError("TeamName") && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldError("TeamName")}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.Name}
                  onChange={(e) => handleInputChange(e, "Name")}
                  className={inputClass(!!fieldError("Name"))}
                  required
                />
                {fieldError("Name") && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldError("Name")}
                  </p>
                )}
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.Email}
                  onChange={(e) => handleInputChange(e, "Email")}
                  className={inputClass(!!fieldError("Email"))}
                  required
                />
                {fieldError("Email") && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldError("Email")}
                  </p>
                )}
              </div> */}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={formData.Phone}
                onChange={(e) => handleInputChange(e, "Phone")}
                className={inputClass(!!fieldError("Phone"))}
              />
              {fieldError("Phone") && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldError("Phone")}
                </p>
              )}
            </div>
          </fieldset>

          {/* College */}
          <fieldset className="space-y-6 border-b border-neutral-200 pb-8">
            <legend className="text-lg font-semibold text-neutral-900">
              College / Institution
            </legend>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  College Name
                </label>
                <input
                  type="text"
                  placeholder="University of..."
                  value={formData.CollegeName}
                  onChange={(e) => handleInputChange(e, "CollegeName")}
                  className={inputClass(!!fieldError("CollegeName"))}
                />
                {fieldError("CollegeName") && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldError("CollegeName")}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="college@example.com"
                  value={formData.CollegeContactEmail}
                  onChange={(e) => handleInputChange(e, "CollegeContactEmail")}
                  className={inputClass(!!fieldError("CollegeContactEmail"))}
                />
                {fieldError("CollegeContactEmail") && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldError("CollegeContactEmail")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                College Address
              </label>
              <input
                type="text"
                placeholder="City, Country"
                value={formData.CollegeAddress}
                onChange={(e) => handleInputChange(e, "CollegeAddress")}
                className={inputClass(!!fieldError("CollegeAddress"))}
              />
              {fieldError("CollegeAddress") && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldError("CollegeAddress")}
                </p>
              )}
            </div>

            {/* Representative */}
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="mb-4 text-base font-semibold text-neutral-900">
                Representative Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Representative Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.RepresentativeName}
                    onChange={(e) => handleInputChange(e, "RepresentativeName")}
                    className={inputClass(!!fieldError("RepresentativeName"))}
                  />
                  {fieldError("RepresentativeName") && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldError("RepresentativeName")}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Representative Designation
                  </label>
                  <input
                    type="text"
                    placeholder="Coordinator"
                    value={formData.RepresentativeDesignation}
                    onChange={(e) =>
                      handleInputChange(e, "RepresentativeDesignation")
                    }
                    className={inputClass(
                      !!fieldError("RepresentativeDesignation"),
                    )}
                  />
                  {fieldError("RepresentativeDesignation") && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldError("RepresentativeDesignation")}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Representative Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    value={formData.RepresentativePhone}
                    onChange={(e) =>
                      handleInputChange(e, "RepresentativePhone")
                    }
                    className={inputClass(!!fieldError("RepresentativePhone"))}
                  />
                  {fieldError("RepresentativePhone") && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldError("RepresentativePhone")}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Representative Email
                  </label>
                  <input
                    type="email"
                    placeholder="rep@example.com"
                    value={formData.RepresentativeEmail}
                    onChange={(e) =>
                      handleInputChange(e, "RepresentativeEmail")
                    }
                    className={inputClass(!!fieldError("RepresentativeEmail"))}
                  />
                  {fieldError("RepresentativeEmail") && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldError("RepresentativeEmail")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </fieldset>

          {/* Documents */}
          <fieldset className="space-y-4 border-b border-neutral-200 pb-8">
            <legend className="text-lg font-semibold text-neutral-900">
              Supporting Documents
            </legend>

            <p className="text-sm text-neutral-500">
              Upload any required documents.
            </p>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-neutral-500 file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-neutral-800"
            />

            {documents.length > 0 && (
              <ul className="space-y-1">
                {documents.map((file, i) => (
                  <li key={i} className="text-xs text-neutral-600">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            )}
          </fieldset>

          {/* Team Members */}
          <fieldset id="team-members-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <legend
                  className={`text-lg font-semibold ${teamCountError ? "text-red-600" : "text-neutral-900"}`}
                >
                  Team Members
                </legend>
                <span className="text-sm text-neutral-400">
                  {teamMembers.length} / min. 3 and Max Number of Team is 4
                </span>
              </div>
              <button
                type="button"
                onClick={addTeamMember}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Add Team Member
              </button>
            </div>

            {/* Minimum members error */}
            {teamCountError && (
              <div
                className="flex items-start gap-2 border border-red-300 bg-red-50 px-4 py-3"
                role="alert"
              >
                <svg
                  className="mt-0.5 shrink-0 text-red-500"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm font-medium text-red-700">
                  {teamCountError}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`space-y-4 border bg-neutral-50 p-4 ${
                    memberErrors[index] &&
                    Object.keys(memberErrors[index]).length > 0
                      ? "border-red-300"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-900">
                      Team Member {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={member.name || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "name", e.target.value)
                        }
                        className={inputClass(!!memberError(index, "name"))}
                      />
                      {memberError(index, "name") && (
                        <p className="mt-1 text-xs text-red-600">
                          {memberError(index, "name")}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={member.email || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "email", e.target.value)
                        }
                        className={inputClass(!!memberError(index, "email"))}
                      />
                      {memberError(index, "email") && (
                        <p className="mt-1 text-xs text-red-600">
                          {memberError(index, "email")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={member.phone || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "phone", e.target.value)
                        }
                        className={inputClass(!!memberError(index, "phone"))}
                      />
                      {memberError(index, "phone") && (
                        <p className="mt-1 text-xs text-red-600">
                          {memberError(index, "phone")}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Faculty"
                        value={member.faculty || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "faculty",
                            e.target.value,
                          )
                        }
                        className={inputClass(!!memberError(index, "faculty"))}
                      />
                      {memberError(index, "faculty") && (
                        <p className="mt-1 text-xs text-red-600">
                          {memberError(index, "faculty")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <select
                      value={member.gender || Gender.Male}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "gender", e.target.value)
                      }
                      className={inputClass(!!memberError(index, "gender"))}
                    >
                      <option value={Gender.Male}>Male</option>
                      <option value={Gender.Female}>Female</option>
                      <option value={Gender.Others}>Others</option>
                    </select>

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleTeamMemberChange(index, "photo", file);
                        }}
                        className={`w-full text-xs text-neutral-500 file:mr-4 file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold ${
                          memberError(index, "photo")
                            ? "border border-red-500 bg-red-50 file:bg-red-100 file:text-red-700"
                            : "file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                        }`}
                      />
                      {memberError(index, "photo") && (
                        <p className="mt-1 text-xs text-red-600">
                          {memberError(index, "photo")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="flex-1"
            >
              {isSubmitting ? "Registering..." : "Complete Registration"}
            </Button>

            <Button
              type="button"
              onClick={resetForm}
              variant="outline"
              disabled={isSubmitting}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
