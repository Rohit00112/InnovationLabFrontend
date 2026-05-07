"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ReactNode, Suspense } from "react";

export interface Tab {
  id: string;
  label: string;
}

interface AdminViewSwitcherProps {
  /** List of tabs to display */
  tabs: Tab[];
  /** The default tab ID to show when no view is selected in the URL */
  defaultTab: string;
  /** A dictionary/record mapping tab IDs to their respective React components */
  children: Record<string, ReactNode>;
}

function ViewSwitcherContent({
  tabs,
  defaultTab,
  children,
}: AdminViewSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current view from the URL (e.g., ?view=add), fallback to default
  const currentView = searchParams.get("view") || defaultTab;

  const handleTabChange = (viewId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", viewId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Tabs / Options */}
      <div className="flex space-x-6 border-b border-(--neutral-100)">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              currentView === tab.id
                ? "border-(--color-primary) text-(--color-primary)"
                : "border-transparent text-(--neutral-500) hover:text-(--neutral-700) hover:border-(--neutral-500)"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rendered Content */}
      <div className="mt-6">
        {children[currentView] || children[defaultTab]}
      </div>
    </div>
  );
}

// Wrapping in Suspense is required in Next.js App Router when using useSearchParams
export default function AdminViewSwitcher(props: AdminViewSwitcherProps) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse h-8 bg-gray-200 rounded w-full"></div>
      }
    >
      <ViewSwitcherContent {...props} />
    </Suspense>
  );
}
