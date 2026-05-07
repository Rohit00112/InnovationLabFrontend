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

export default function Partner() {
  const featuredCompanies = partnerCompanies.slice(0, 6);

  return (
    <PageLayout>
      <PageHeader title={publicPageTitles.partners} />
      <div className="mx-ds-5 mt-36 antialiased">
        <BentoGrid imageItems={companyGalleryItems} />
      </div>
      <div className="line-bg w-full md:h-16 h-6"></div>
      <div className="mt-6 md:mt-ds-7"></div>
      <div className="flex flex-col overflow-visible md:overflow-hidden ">
        <ContainerScroll
          contentClassName="mt-0 md:-mt-12"
          titleComponent={
            <>
              <h1 className="mb-0 text-4xl font-semibold text-neutral-900">
                {publicCompanyText.companiesProviding}
                <br />
                <span className="text-h4 md:text-h1 font-bold mt-ds-1 leading-none">
                  {publicCompanyText.internships}
                </span>
              </h1>
            </>
          }
        >
          <section className="mx-ds-5 -mt-ds-5 md:mt-0 antialiased">
            <CompanyList companies={featuredCompanies} />
          </section>
        </ContainerScroll>
      </div>
      <div className="line-bg w-full md:h-16 h-6"></div>
      <div className="w-full h-auto">
        <div className="px-3 py-4 bg-white flex items-center justify-center border-t border-gray-300">
          <h2 className="text-5xl font-semibold">
            <span className="text-primary">O</span>
            {publicCompanyText.ourPartners.slice(1)}
          </h2>
        </div>
        <Marquee speed={40} gradient={false}>
          <GridWithPlus rows={1} />
          <GridWithPlus rows={1} />
        </Marquee>
        <Marquee speed={40} delay={2} gradient={false}>
          <GridWithPlus rows={1} />
          <GridWithPlus rows={1} />
        </Marquee>
      </div>
      <section className="mx-auto max-w-4xl px-4 py-10 text-center md:px-ds-5 md:py-ds-6">
        <div className="flex items-center justify-center gap-ds-3 text-small tracking-[4px] font-bold uppercase mb-ds-5">
          <span className="w-ds-2 h-ds-2 bg-accent rounded-ds-sm"></span>
          {publicCompanyText.aboutOurPartners}
          <span className="w-ds-2 h-ds-2 bg-accent rounded-ds-sm"></span>
        </div>
        <h2 className="text-h3 md:text-h2 font-semibold leading-tight text-neutral-900">
          {publicCompanyText.aboutPartnersBody}
        </h2>
      </section>
      <div className="w-full h-screen">
        <Stories storiesData={partnerStoriesData} />
      </div>
    </PageLayout>
  );
}

type GridProps = {
  rows?: number;
};

const GridWithPlus = ({ rows = 1 }: GridProps) => {
  const columnCount = 8;

  return (
    <div className="grid grid-cols-8">
      {Array.from({ length: rows * columnCount }).map((_, i) => (
        <div
          key={i}
          className="relative hover:bg-gray-50 h-28 md:h-48 aspect-square border border-gray-300 flex items-center justify-center bg-white "
        >
          <Image
            src={partnerLogos[i % partnerLogos.length]}
            alt={`logo-${i}`}
            width={120}
            height={48}
            className="max-h-12 object-contain grayscale transition-all duration-300 hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
};
