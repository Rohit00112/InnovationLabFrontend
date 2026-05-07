"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { LocalApiError } from "@/lib/services/bff-client";

type ResourceManageListProps<TItem> = {
  loadItems: () => Promise<TItem[]>;
  emptyMessage: string;
  loadingMessage: string;
  errorMessage: string;
  getKey: (item: TItem, index: number) => string;
  renderItem: (item: TItem) => ReactNode;
};

export default function ResourceManageList<TItem>({
  loadItems,
  emptyMessage,
  loadingMessage,
  errorMessage,
  getKey,
  renderItem,
}: ResourceManageListProps<TItem>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadResourceItems = async () => {
      try {
        const nextItems = await loadItems();
        if (isMounted) {
          setItems(nextItems);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        if (err instanceof LocalApiError) {
          setError(err.message);
          return;
        }

        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadResourceItems();

    return () => {
      isMounted = false;
    };
  }, [errorMessage, loadItems]);

  if (loading) {
    return <div className="text-sm text-(--neutral-500)">{loadingMessage}</div>;
  }

  if (error) {
    return (
      <div className="rounded-md border border-error-border bg-error-background p-4 text-sm text-error-foreground">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-sm text-(--neutral-500)">{emptyMessage}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={getKey(item, index)}
          className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
        >
          <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-(--neutral-700)">
            {renderItem(item)}
          </pre>
        </div>
      ))}
    </div>
  );
}
