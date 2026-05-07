"use client";

import { addFormMessages } from "@/constants/ui/messages";
import { useState } from "react";
import type { FormEvent } from "react";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "file" | "email" | "number";
  required?: boolean;
  accept?: string;
  placeholder?: string;
  omitFromSubmission?: boolean;
  parseAsJson?: boolean;
};

interface AddFormsProps {
  title: string;
  fields: FormField[];
  apiEndpoint?: string;
  endpointBuilder?: (formData: FormData) => string;
  format?: "multipart" | "json"; // 'multipart' for FormData, 'json' for JSON
  initialValues?: Record<string, unknown>;
  editId?: string;
  method?: "POST" | "PATCH";
  onSuccess?: () => void;
}

export default function AddForms({
  title,
  fields,
  apiEndpoint,
  endpointBuilder,
  format = "multipart",
  initialValues = {},
  method = "POST",
  onSuccess,
}: AddFormsProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    const resolvedEndpoint = endpointBuilder
      ? endpointBuilder(formData)
      : apiEndpoint;

    // If no endpoint is provided, just log the data (useful for dev/debugging mode)
    if (!resolvedEndpoint) {
      console.log(
        "Form submitted. Payload:",
        Object.fromEntries(formData.entries()),
      );
      alert(addFormMessages.localSubmitNotice);
      return;
    }

    const requestUrl = resolvedEndpoint.startsWith("http")
      ? resolvedEndpoint
      : resolvedEndpoint.startsWith("/")
        ? resolvedEndpoint
        : `/${resolvedEndpoint}`;

    setLoading(true);
    try {
      let body: BodyInit;
      const headers: HeadersInit = {};

      if (format === "json") {
        // Convert form data to JSON
        const formDataObj = new FormData(e.currentTarget);
        const jsonData: Record<string, unknown> = {};
        for (const field of fields) {
          if (field.omitFromSubmission) {
            continue;
          }

          const value = formDataObj.get(field.name);
          if (value == null) {
            continue;
          }

          if (field.parseAsJson && typeof value === "string") {
            jsonData[field.name] = JSON.parse(value);
            continue;
          }

          if (field.type === "number") {
            jsonData[field.name] = value === "" ? null : Number(value);
            continue;
          }

          if (field.type === "file") {
            continue;
          }

          jsonData[field.name] = value;
        }
        body = JSON.stringify(jsonData);
        headers["Content-Type"] = "application/json";
      } else {
        // Use FormData for multipart/form-data
        body = new FormData(e.currentTarget);
        // Don't set Content-Type header for FormData - browser will do it automatically
      }

      const response = await fetch(requestUrl, {
        method: method,
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status: ${response.status}`);
      }

      setSuccess(true);
      if (method === "POST") {
        (e.target as HTMLFormElement).reset(); // Clear the form on success for POST
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      setErrorMsg(
        error instanceof Error ? error.message : addFormMessages.fallbackError,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg border border-(--neutral-100) bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-(--neutral-900)">
        {title}
      </h2>

      {success && (
        <div className="mb-6 rounded-md border border-success bg-success-background p-4 text-success">
          {addFormMessages.success}
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 rounded-md border border-error bg-error-background p-4 text-error">
          {errorMsg}
        </div>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              field.type === "textarea" || field.type === "file"
                ? "col-span-1 md:col-span-2"
                : "col-span-1"
            }
          >
            <label className="mb-2 block text-sm font-medium text-(--neutral-700)">
              {field.label}{" "}
              {field.required && <span className="text-error">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                defaultValue={
                  (initialValues[field.name] as
                    | string
                    | number
                    | readonly string[]
                    | undefined) || ""
                }
                className="block w-full border border-(--neutral-500) rounded-md shadow-sm p-2.5 focus:ring-(--color-primary) focus:border-(--color-primary) transition-colors"
              ></textarea>
            ) : field.type === "file" ? (
              <div className="mt-1 flex justify-center rounded-md border-2 border-(--neutral-500) border-dashed bg-(--neutral-100) px-6 pt-5 pb-6 transition-colors hover:border-primary-600">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-(--neutral-500)"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex justify-center text-sm text-(--neutral-700)">
                    <label className="relative cursor-pointer rounded-md bg-transparent font-medium text-(--color-primary) hover:text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-(--color-primary) focus-within:ring-offset-2">
                      <span>{addFormMessages.uploadFile}</span>
                      <input
                        type="file"
                        name={field.name}
                        accept={field.accept}
                        required={field.required}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">{addFormMessages.dragAndDropHint}</p>
                  </div>
                  <p className="text-xs text-(--neutral-500)">
                    {addFormMessages.fileTypesHint}
                  </p>
                </div>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                defaultValue={
                  (initialValues[field.name] as
                    | string
                    | number
                    | readonly string[]
                    | undefined) || ""
                }
                className="block w-full border border-(--neutral-500) rounded-md shadow-sm p-2.5 focus:ring-(--color-primary) focus:border-(--color-primary) transition-colors"
              />
            )}
          </div>
        ))}

        <div className="col-span-1 mt-2 border-t border-(--neutral-100) pt-4 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-(--color-primary) px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-primary-600 focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2 focus:outline-none disabled:opacity-50 sm:w-auto"
          >
            {loading
              ? addFormMessages.submitting
              : method === "PATCH"
                ? addFormMessages.update
                : addFormMessages.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
