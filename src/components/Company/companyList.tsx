import CompanyCard from "@/components/Company/companyCard";

export interface CompanyListItem {
  name: string;
  about: string;
  priority: number;
  isMouSigned: boolean;
  isJobFair: boolean;
  contactEmail: string;
  websiteUrl: string;
  logoUrl: string;
  numberOfInterns: number;
  numberOfVacancies: number;
}

interface CompanyListProps {
  companies: CompanyListItem[];
}

export default function companyList({ companies }: CompanyListProps) {
  const displayCompanies = [...companies].sort(
    (a, b) => a.priority - b.priority,
  );

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-0 border border-neutral-300 py-0 sm:grid-cols-2 lg:grid-cols-3">
        {displayCompanies.map((company, index) => (
          <CompanyCard
            key={index}
            topText=""
            logoUrl={company.logoUrl}
            name={company.name}
            about={company.about}
            priority={company.priority}
            isMouSigned={company.isMouSigned}
            contactEmail={company.contactEmail}
            websiteUrl={company.websiteUrl}
            numberOfInterns={company.numberOfInterns}
            className="border border-gray-300"
          />
        ))}
      </div>
    </>
  );
}
