"use client";

import { useEffect, useState } from "react";

import CompanyListTable, {
  type ColumnDef,
} from "@/components/Company/CompanyListTable";
import type { CompanyListItem } from "@/components/Company/companyList";

type CompanyApiItem = {
  id: string;
  name: string;
  about: string | null;
  address: string | null;
  contactEmail: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
  priority: number | null;
  isMouSigned: boolean | null;
  isJobFair: boolean | null;
  numberOfInterns: number | null;
  numberOfVacancies: number | null;
};

type CompaniesApiResponse = {
  success: boolean;
  data: CompanyApiItem[];
};

export default function JobFairCompanies() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const columns: ColumnDef<CompanyListItem>[] = [
    {
      header: "Logo",
      width: "80px",
      className: "w-[80px]",
      cell: (company) => (
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-black/10 bg-white shadow-sm">
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-full w-full object-cover"
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
    {
      header: "Vacancies",
      width: "120px",
      className: "w-[120px] text-center",
      headerClassName: "text-center",
      cell: (company) => (
        <span className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-neutral-800">
          {company.numberOfVacancies ?? 0}
        </span>
      ),
    },
  ];

  useEffect(() => {
    let isActive = true;

    const loadCompanies = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        //console.log(response);

        const payload = (await response.json()) as CompaniesApiResponse;
        if (!payload?.success || !Array.isArray(payload.data)) {
          throw new Error("Invalid companies payload");
        }
        //console.log(payload);

        const mappedCompanies: CompanyListItem[] = payload.data
          .map((company) => ({
            name: company.name ?? "",
            about: company.about ?? "",
            priority: company.priority ?? 0,
            isMouSigned: company.isMouSigned ?? false,
            isJobFair: company.isJobFair ?? false,
            contactEmail: company.contactEmail ?? "",
            websiteUrl: company.websiteUrl ?? "",
            logoUrl: company.logoUrl ?? "",
            numberOfInterns: company.numberOfInterns ?? 0,
            numberOfVacancies: company.numberOfVacancies ?? 0,
          }))
          .filter((company) => company.isJobFair)
          .sort((a, b) => a.priority - b.priority);

        if (isActive) {
          setCompanies(mappedCompanies);
        }
      } catch (error) {
        console.error(error);
        if (isActive) {
          setCompanies([]);
        }
      }
    };

    loadCompanies();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="mx-auto w-full border-x border-b border-gray-300 bg-white px-4 py-12 md:px-10 md:py-16">
      <CompanyListTable
        companies={companies}
        title="Companies Attending the Event"
        description="Explore companies participating in this job fair event."
        columns={columns}
      />
    </section>
  );
}
