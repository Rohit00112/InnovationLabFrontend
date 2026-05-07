'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import AddForms, { FormField } from './AddForms';

interface EditShellProps {
  resourceName?: string;
  fields?: FormField[];
  apiEndpoint?: string;
}

export default function EditShell({ resourceName = 'Item', fields = [], apiEndpoint }: EditShellProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const id = params.get('id');
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !apiEndpoint) {
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiEndpoint}/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${resourceName}`);
        }
        const data = await response.json();
        setItem(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, apiEndpoint, resourceName]);

  if (!id || !apiEndpoint) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
        <div className="text-[var(--neutral-500)]">
          No {resourceName?.toLowerCase()} selected for editing.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
        <div className="text-[var(--neutral-500)]">
          Loading {resourceName?.toLowerCase()}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
        <div className="p-4 bg-[#fef2f2] border border-[var(--color-error)] text-[var(--color-error)] rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
        <div className="text-[var(--neutral-500)]">
          {resourceName} not found.
        </div>
      </div>
    );
  }

  const handleSuccess = () => {
    router.push(`${pathname}?view=manage`);
  };

  return (
    <AddForms
      title={`Edit ${resourceName}`}
      fields={fields}
      apiEndpoint={apiEndpoint}
      initialValues={item}
      editId={id}
      method="PATCH"
      onSuccess={handleSuccess}
    />
  );
}
