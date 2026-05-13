'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { addFormMessages } from '@/constants/ui/messages';

const EMPTY_INITIAL_VALUES: Record<string, any> = {};

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'email' | 'number';
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
  format?: 'multipart' | 'json'; // 'multipart' for FormData, 'json' for JSON
  initialValues?: Record<string, any>;
  editId?: string;
  method?: 'POST' | 'PATCH';
  onSuccess?: () => void;
}

export default function AddForms({ title, fields, apiEndpoint, endpointBuilder, format = 'multipart', initialValues, editId, method = 'POST', onSuccess }: AddFormsProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const safeInitialValues = initialValues ?? EMPTY_INITIAL_VALUES;
  const [formValues, setFormValues] = useState<Record<string, any>>(safeInitialValues);

  useEffect(() => {
    setFormValues(safeInitialValues);
  }, [safeInitialValues]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    const resolvedEndpoint = endpointBuilder ? endpointBuilder(formData) : apiEndpoint;
    const resolvedUrl = editId ? `${resolvedEndpoint}/${editId}` : resolvedEndpoint;

    // If no endpoint is provided, just log the data (useful for dev/debugging mode)
    if (!resolvedUrl) {
      console.log("Form submitted. Payload:", Object.fromEntries(formData.entries()));
      alert("Form submitted locally (Check console). Add apiEndpoint prop to connect to the backend.");
      return;
    }

    setLoading(true);
    try {
      let body: any;
      let headers: HeadersInit = {};

      if (format === 'json') {
        // Convert form data to JSON
        const formDataObj = new FormData(e.currentTarget);
        const jsonData: any = {};
        for (const field of fields) {
          if (field.omitFromSubmission) {
            continue;
          }

          const value = formDataObj.get(field.name);
          if (value == null) {
            continue;
          }

          if (field.parseAsJson && typeof value === 'string') {
            jsonData[field.name] = JSON.parse(value);
            continue;
          }

          if (field.type === 'number') {
            jsonData[field.name] = value === '' ? null : Number(value);
            continue;
          }

          if (field.type === 'file') {
            continue;
          }

          jsonData[field.name] = value;
        }
        body = JSON.stringify(jsonData);
        headers['Content-Type'] = 'application/json';
      } else {
        // Use FormData for multipart/form-data
        body = new FormData(e.currentTarget);
        // Don't set Content-Type header for FormData - browser will do it automatically
      }

      console.log(`[AddForms] Sending ${method} request to:`, resolvedUrl);
      // Attach Authorization header from localStorage if available (admin auth token)
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
          if (token) {
            headers['authorization'] = `Bearer ${token}`;
            console.log('[AddForms] Authorization header added from localStorage');
          } else {
            console.log('[AddForms] No auth token found in localStorage');
          }
        }
      } catch (e) {
        console.warn('[AddForms] Error reading auth token from localStorage', e);
      }

      console.log(`[AddForms] Request headers:`, headers);
      
      const response = await fetch(resolvedUrl, {
        method: method,
        headers,
        body,
        mode: 'cors',
        credentials: 'include',
      });

      console.log(`[AddForms] Response status:`, response.status);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Submission failed with status: ${response.status}. Response: ${errorText}`);
      }

      setSuccess(true);
      if (method === 'POST') {
        (e.target as HTMLFormElement).reset(); // Clear the form on success for POST
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("[AddForms] Submission error:", error);
      const errorMsg = error?.message || error?.toString() || 'An error occurred during submission.';
      console.error("[AddForms] Error message:", errorMsg);
      setErrorMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">{title}</h2>
      
      {success && (
        <div className="mb-6 p-4 bg-[#f0fdf4] border border-[var(--color-success)] text-[var(--color-success)] rounded-md">
          {addFormMessages.success}
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-[#fef2f2] border border-[var(--color-error)] text-[var(--color-error)] rounded-md">
          {errorMsg}
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div 
            key={field.name} 
            className={field.type === 'textarea' || field.type === 'file' ? 'col-span-1 md:col-span-2' : 'col-span-1'}
          >
            <label className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
              {field.label} {field.required && <span className="text-[var(--color-error)]">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                defaultValue={
                  (safeInitialValues[field.name] as
                    | string
                    | number
                    | readonly string[]
                    | undefined) || ""
                }
                className="block w-full border border-(--neutral-500) rounded-md shadow-sm p-2.5 focus:ring-(--color-iblue) focus:border-(--color-iblue) transition-colors"
              ></textarea>
            ) : field.type === "file" ? (
              <div className="mt-1 flex justify-center rounded-md border-2 border-(--neutral-500) border-dashed bg-(--neutral-100) px-6 pt-5 pb-6 transition-colors hover:border-iblue-600">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-[var(--neutral-500)]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex justify-center text-sm text-(--neutral-700)">
                    <label className="relative cursor-pointer rounded-md bg-transparent font-medium text-(--color-iblue) hover:text-iblue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-(--color-iblue) focus-within:ring-offset-2">
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
                  <p className="text-xs text-[var(--neutral-500)]">
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
                  (safeInitialValues[field.name] as
                    | string
                    | number
                    | readonly string[]
                    | undefined) || ""
                }
                className="block w-full border border-(--neutral-500) rounded-md shadow-sm p-2.5 focus:ring-(--color-iblue) focus:border-(--color-iblue) transition-colors"
              />
            )}
          </div>
        ))}
        
        <div className="col-span-1 md:col-span-2 pt-4 border-t border-[var(--neutral-100)] mt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-md bg-(--color-iblue) px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-iblue-600 focus:ring-2 focus:ring-(--color-iblue) focus:ring-offset-2 focus:outline-none disabled:opacity-50 sm:w-auto"
          >
            {loading ? addFormMessages.submitting : (method === 'PATCH' ? addFormMessages.update : addFormMessages.submit)}
          </button>
        </div>
      </form>
    </div>
  );
}