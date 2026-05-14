"use client";

import React from "react";
import type { CompanyListItem } from "@/components/Company/companyList";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (
    item: T,
    context: { rowRef: React.RefObject<HTMLDivElement | null> },
  ) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  width?: string;
}

interface CompanyListTableProps {
  companies: CompanyListItem[];
  title: string;
  description: string;
  variant?: "internship" | "mou";
  columns?: ColumnDef<CompanyListItem>[];
}

export default function CompanyListTable({
  companies,
  title,
  description,
  columns,
}: CompanyListTableProps) {
  const pageSize = 10;
  const [page, setPage] = React.useState(1);
  const defaultColumns: ColumnDef<CompanyListItem>[] = [
    {
      header: "Logo",
      width: "80px",
      className: "w-[80px]",
      cell: (company) => (
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-black/10 bg-white p-1 shadow-sm">
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-full w-full object-contain"
          />
        </div>
      ),
    },
    {
      header: "Company",
      width: "1.4fr",
      className: "min-w-[200px] text-[15px] font-semibold text-neutral-900",
      headerClassName: "min-w-[200px]",
      cell: (company) =>
        company.websiteUrl ? (
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-800 transition hover:underline"
          >
            {company.name}
          </a>
        ) : (
          <span>{company.name}</span>
        ),
    },
    {
      header: "Contact",
      width: "1.6fr",
      className: "min-w-[220px] pl-2",
      cell: (company) =>
        company.contactEmail ? (
          <a
            href={`mailto:${company.contactEmail}`}
            className="text-neutral-800 font-medium transition hover:underline"
          >
            {company.contactEmail}
          </a>
        ) : (
          <span className="text-neutral-400">N/A</span>
        ),
    },
  ];
  const variantColumns: ColumnDef<CompanyListItem>[] = [
    ...defaultColumns,
    {
      header: "Website",
      width: "1.2fr",
      className: "min-w-[200px] pl-2",
      headerClassName: "min-w-[200px]",
      cell: (company) =>
        company.websiteUrl ? (
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-800 font-medium transition hover:underline"
          >
            {company.websiteUrl.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          <span className="text-neutral-400">N/A</span>
        ),
    },
  ];
  const tableColumns = columns ?? variantColumns;

  const displayCompanies = [...companies].sort(
    (a, b) => a.priority - b.priority,
  );

  const gridTemplateColumns = tableColumns
    .map((column) => column.width ?? "1fr")
    .join(" ");
  const totalPages = Math.max(1, Math.ceil(displayCompanies.length / pageSize));
  const showPagination = displayCompanies.length > pageSize;
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const pagedCompanies = displayCompanies.slice(
    startIndex,
    startIndex + pageSize,
  );

  if (!displayCompanies.length) {
    return (
      <div className="w-full rounded-xl border border-black/10 bg-white px-6 py-10 text-center text-sm text-neutral-500">
        No companies to display yet.
      </div>
    );
  }

  return (
    <section className="w-full border border-[#DFDFDF] bg-white">
      <div className="p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-6 border-b border-[#006875] pb-6 md:pb-8 lg:grid-cols-[3fr_2fr]">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance">
            {title}
          </h2>
          <p className="text-muted-foreground self-start lg:justify-self-end text-balance">
            {description}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-visible">
        <div className="min-w-180 pb-10">
          <div
            className="grid items-center gap-4 border-b border-black/10 bg-neutral-50/80 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500"
            style={{ gridTemplateColumns }}
          >
            {tableColumns.map((column) => (
              <div key={column.header} className={column.headerClassName ?? ""}>
                {column.header}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {pagedCompanies.map((company, rowIndex) => (
              <CompanyTableRow
                key={`${company.name}-${rowIndex}`}
                company={company}
                columns={tableColumns}
                gridTemplateColumns={gridTemplateColumns}
              />
            ))}
          </div>
        </div>
      </div>
      {showPagination && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 px-6 py-4 text-sm text-neutral-600">
          <span>
            Showing {startIndex + 1}-
            {Math.min(startIndex + pageSize, displayCompanies.length)} of{" "}
            {displayCompanies.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={clampedPage === 1}
              className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 transition hover:border-black/20 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 w-9 rounded-full border text-xs font-semibold transition ${
                      pageNumber === clampedPage
                        ? "border-iblue bg-accent/10 text-neutral-800"
                        : "border-black/10 text-neutral-600 hover:border-black/20 hover:text-neutral-900"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={clampedPage === totalPages}
              className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 transition hover:border-black/20 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

interface CompanyTableRowProps {
  company: CompanyListItem;
  columns: ColumnDef<CompanyListItem>[];
  gridTemplateColumns: string;
}

function CompanyTableRow({
  company,
  columns,
  gridTemplateColumns,
}: CompanyTableRowProps) {
  const rowRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rowRef}
      className="group relative grid items-center gap-4 border-b border-black/5 px-6 py-4 text-sm text-neutral-700 transition hover:bg-neutral-50/60 last:border-b-0"
      style={{ gridTemplateColumns }}
    >
      {columns.map((column, colIndex) => (
        <div
          key={`${company.name}-${colIndex}`}
          className={column.className ?? ""}
        >
          {column.cell
            ? column.cell(company, { rowRef })
            : column.accessorKey
              ? (company[column.accessorKey] as React.ReactNode)
              : null}
        </div>
      ))}
    </div>
  );
}
