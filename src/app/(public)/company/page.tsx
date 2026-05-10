"use client";

import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import CompanyList from "@/components/Company/companyList";
import Stories from "@/components/Company/stories";
import { ContainerScroll } from "@/components/Animations/ContainerScroll";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { publicCompanyText, publicPageTitles } from "@/constants/ui/public";
import {
  companyGalleryItems,
  partnerCompanies,
  partnerLogos,
  partnerStoriesData,
} from "@/lib/data/public/company";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function Partner() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);

  useEffect(() => {
    let isActive = true;

    const loadCompanies = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const payload = (await response.json()) as CompaniesApiResponse;
        if (!payload?.success || !Array.isArray(payload.data)) {
          throw new Error("Invalid companies payload");
        }

        const mappedCompanies: CompanyListItem[] = payload.data.map(
          (company) => ({
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
          }),
        );

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

  const internshipCompanies = [...companies]
    .filter((company) => !company.isMouSigned && !company.isJobFair)
    .sort((a, b) => a.priority - b.priority);
  const featuredInternshipCompanies = internshipCompanies.slice(0, 6);
  const moreInternshipCompanies = internshipCompanies.slice(6);
  const mouCompanies = [...companies]
    .filter((company) => company.isMouSigned)
    .sort((a, b) => a.priority - b.priority);
  const featuredMouCompanies = mouCompanies.slice(0, 12);
  const moreMouCompanies = mouCompanies.slice(12);

  // const storiesData: StoryItem[] = [
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1748968218568-a5eac621e65c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D",
  //     storyTeller: "Rakshak Sigdel",
  //     description: "Hold on to your mouse, things are about to get wild!",
  //   },
  //   {
  //     image:
  //       "https://zamin.uz/uploads/posts/2025-07/a6273368c2_cristiano-ronaldo-6.webp",
  //     storyTeller: "Cristiano Ronaldo",
  //     description: "Siuuuuuuuuuu",
  //   },
  //   {
  //     image:
  //       "https://wallpapers.com/images/featured/dexter-pictures-fe9qbtzm9bbv0xxj.jpg",
  //     storyTeller: "Dexter Morgan",
  //     description:
  //       "Tonight's the night. It's going to happen again and again. It has to happen.",
  //   },
  //   {
  //     image: "https://wallpapercave.com/wp/wp1932768.png",
  //     storyTeller: "Walter White",
  //     description: "Say my Name",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1742626157052-f5a373a727ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
  //     storyTeller: "Epic Finale",
  //     description: ":)",
  //   },
  // ];

  return (
    <PageLayout hideOverflow={false}>
      <PageHeader title="PARTNERS" />
      <FadeIn delay={0.1}>
        <div className="mx-ds-5 mt-36 antialiased">
          <BentoGrid imageItems={companyGalleryItems} />
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="line-bg w-full md:h-16 h-6"></div>
        <div className="mt-ds-7"></div>
      </FadeIn>
      {/* The companies which have both ismousigned and isjobfair false will be displayed here - top 6 and further companies will be displayed in companylisttable */}
      <FadeIn delay={0.3}>
        <section className="mx-ds-5 mt-10 antialiased">
          <div className="p-6 md:p-8 lg:p-10 bg-white border border-[#DFDFDF] border-b-0">
            <div className="grid grid-cols-1 gap-6 border-b border-[#006875] pb-6 md:pb-8 lg:grid-cols-[3fr_2fr]">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance text-neutral-900">
                Companies Providing Internships
              </h2>
            </div>
          </div>
          <CompanyList companies={featuredInternshipCompanies} />
        </section>
      </FadeIn>
      {/* This section should have more companies providing internship instead of mou signed companies */}
      <FadeIn delay={0.35}>
        <section className="w-full px-4 pb-20 pt-12">
          <CompanyListTable
            companies={moreInternshipCompanies}
            title="More Companies with interns"
            description="Explore the full list of companies where our students are working as interns"
            variant="internship"
          />
        </section>
      </FadeIn>
      {/**Section: MOU Companieswhich are top 12 will be passed to this component and remainig will be sent to the company list table below it */}
      <MOUCompaniesScroll
        companies={featuredMouCompanies}
        heading="MOU Signed"
        highlight="Companies"
      />
      {/**More MOU signed Companies */}
      <FadeIn delay={0.4}>
        <section className="w-full px-4 pb-20 pt-12">
          <CompanyListTable
            companies={moreMouCompanies}
            title="More MOU signed companies"
            description="Explore the full list of companies where college has MOU signed with"
            variant="mou"
          />
        </section>
      </FadeIn>
      {/*Section: Description*/}
      <FadeIn delay={0.4}>
        <section className="mx-auto max-w-4xl px-4 py-10 text-center md:px-ds-5 md:py-ds-6">
          <div className="flex items-center justify-center gap-ds-3 text-small tracking-[4px] font-bold uppercase mb-ds-5">
            <span className="w-3 h-3 bg-cyan-400"></span>
            ABOUT OUR EXPERIENCED STUDENTS
            <span className="w-3 h-3 bg-cyan-400"></span>
          </div>
          <h2 className="text-h3 md:text-h2 font-semibold leading-tight text-neutral-900">
            A showcase of students who have gained valuable internship
            experience and demonstrated strong professional capabilities.
          </h2>
        </section>
      </FadeIn>

      <div className="w-full">
        <Stories storiesData={partnerStoriesData} />
      </div>
    </PageLayout>
  );
}
