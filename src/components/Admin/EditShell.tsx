'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface EditShellProps {
  resourceName?: string;
}

export default function EditShell({ resourceName = 'Item' }: EditShellProps) {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');

  if (!id) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-(--neutral-100)">
        <div className="text-[var(--neutral-500)]">No {resourceName} selected for editing.</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-(--neutral-100)">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Edit {resourceName}</h2>
        <button
          onClick={() => router.back()}
          className="px-3 py-1.5 bg-[var(--neutral-100)] text-[var(--neutral-700)] rounded-md text-sm"
        >
          Back
        </button>
      </div>

      <div className="text-[var(--neutral-700)]">Loading {resourceName} data for id: <span className="font-mono">{id}</span></div>
      <div className="mt-4 text-[var(--neutral-500)]">Edit form will be loaded here.</div>
    </div>
  );
}
