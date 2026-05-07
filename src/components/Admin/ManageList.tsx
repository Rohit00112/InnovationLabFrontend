'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface ManageListProps {
  title: string;
  apiEndpoint: string;
  columns: Column[];
  resourceName: string;
  onDelete?: (id: string) => Promise<void>;
}

export default function ManageList({
  title,
  apiEndpoint,
  columns,
  resourceName,
  onDelete,
}: ManageListProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchItems();
  }, [apiEndpoint]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      // Attach Authorization header from localStorage if available
      const headers: HeadersInit = {};
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
          if (token) {
            headers['authorization'] = `Bearer ${token}`;
            // eslint-disable-next-line no-console
            console.log('[ManageList] Authorization header added from localStorage');
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[ManageList] Error reading auth token from localStorage', e);
      }

      const response = await fetch(apiEndpoint, { headers, credentials: 'include', mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resourceName}`);
      }
      const data = await response.json();
      // Defensive handling for different API shapes and helpful logging
      // eslint-disable-next-line no-console
      console.log(`[ManageList] Fetched from ${apiEndpoint}:`, data);

      let itemsArray: any[] = [];
      if (Array.isArray(data)) {
        itemsArray = data;
      } else if (Array.isArray((data as any).data)) {
        itemsArray = (data as any).data;
      } else if (Array.isArray((data as any).items)) {
        itemsArray = (data as any).items;
      } else if (Array.isArray((data as any).results)) {
        itemsArray = (data as any).results;
      } else if (Array.isArray((data as any).data?.items)) {
        itemsArray = (data as any).data.items;
      } else {
        const firstArray = Object.values(data || {}).find((v) => Array.isArray(v));
        if (Array.isArray(firstArray)) {
          itemsArray = firstArray as any[];
        } else {
          itemsArray = [];
        }
      }

      setItems(itemsArray);
    } catch (err: any) {
      setError(err.message || `Failed to load ${resourceName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete this ${resourceName.toLowerCase()}?`)) {
      return;
    }

    try {
      setDeletingId(id);
      
      if (onDelete) {
        await onDelete(id);
      } else {
        // Default delete behavior
        const delHeaders: HeadersInit = {};
        try {
          if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (token) {
              delHeaders['authorization'] = `Bearer ${token}`;
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[ManageList] Error reading auth token from localStorage', e);
        }

        const response = await fetch(`${apiEndpoint}/${id}`, {
          method: 'DELETE',
          headers: delHeaders,
          credentials: 'include',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`Failed to delete ${resourceName}`);
        }
      }

      // Remove from local state
      setItems(items.filter(item => item.id !== id));
    } catch (err: any) {
      setError(err.message || `Failed to delete ${resourceName}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
        <div className="flex justify-center items-center py-12">
          <div className="text-[var(--neutral-500)]">Loading {resourceName.toLowerCase()}...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-[var(--neutral-100)]">
      {error && (
        <div className="p-4 bg-[#fef2f2] border-b border-[var(--color-error)] text-[var(--color-error)]">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="p-8 text-center text-[var(--neutral-500)]">
          No {resourceName.toLowerCase()} found. Create one using the "Add" tab.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--neutral-100)]">
                {columns.map(column => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-sm font-semibold text-[var(--neutral-700)] bg-[var(--neutral-100)]"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--neutral-700)] bg-[var(--neutral-100)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b border-[var(--neutral-100)] hover:bg-[var(--neutral-100)] transition-colors"
                >
                  {columns.map(column => (
                    <td
                      key={`${item.id}-${column.key}`}
                      className="px-6 py-4 text-sm text-[var(--neutral-700)]"
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : renderValue(item[column.key])}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => router.push(`${pathname}?view=edit&id=${item.id}`)}
                      className="px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-md text-xs font-medium hover:bg-[var(--color-primary-600)] transition-colors mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={e => handleDelete(item.id, e)}
                      disabled={deletingId === item.id}
                      className="px-3 py-1.5 bg-[var(--color-error)] text-white rounded-md text-xs font-medium hover:bg-[#b91c1c] disabled:opacity-50 transition-colors"
                    >
                      {deletingId === item.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Helper function to render values
function renderValue(value: any): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-[var(--neutral-500)]">-</span>;
  }

  if (typeof value === 'boolean') {
    return value ? <span className="text-[var(--color-success)]">Yes</span> : <span className="text-[var(--neutral-500)]">No</span>;
  }

  if (typeof value === 'object') {
    return <span className="text-[var(--neutral-500)]">[Object]</span>;
  }

  if (typeof value === 'string' && value.length > 100) {
    return <span title={value}>{value.substring(0, 100)}...</span>;
  }

  return String(value);
}
