'use client';

import React, { FormEvent, useState, useEffect } from 'react';

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

export default function AddForms({ title, fields, apiEndpoint, endpointBuilder, format = 'multipart', initialValues = {}, editId, method = 'POST', onSuccess }: AddFormsProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

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

      const response = await fetch(resolvedUrl, {
        method: method,
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status: ${response.status}`);
      }

      setSuccess(true);
      if (method === 'POST') {
        (e.target as HTMLFormElement).reset(); // Clear the form on success for POST
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      setErrorMsg(error.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">{title}</h2>
      
      {success && (
        <div className="mb-6 p-4 bg-[#f0fdf4] border border-[var(--color-success)] text-[var(--color-success)] rounded-md">
          Successfully added!
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
                defaultValue={formValues[field.name] || ''}
                className="block w-full border border-[var(--neutral-500)] rounded-md shadow-sm p-2.5 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
              ></textarea>
            ) : field.type === 'file' ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[var(--neutral-500)] border-dashed rounded-md hover:border-[var(--color-primary-variant)] transition-colors bg-[var(--neutral-100)]">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-[var(--neutral-500)]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-[var(--neutral-700)] justify-center">
                    <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-600)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--color-primary)]">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name={field.name}
                        accept={field.accept}
                        required={field.required}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-[var(--neutral-500)]">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                defaultValue={formValues[field.name] || ''}
                className="block w-full border border-[var(--neutral-500)] rounded-md shadow-sm p-2.5 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
              />
            )}
          </div>
        ))}
        
        <div className="col-span-1 md:col-span-2 pt-4 border-t border-[var(--neutral-100)] mt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-md shadow-sm hover:bg-[var(--color-primary-600)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Submitting...' : (method === 'PATCH' ? 'Update' : 'Submit Form')}
          </button>
        </div>
      </form>
    </div>
  );
}