"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import {
  CommunitiesSection,
  EventsSection,
  CTASection,
  TestimonialSection,
} from "@/components/Home";
import Hero from "@/components/Home/Hero";
import PageLayout from "@/components/primitives/PageLayout";

gsap.registerPlugin(ScrollTrigger);

type CompanyApiItem = {
  id: string;
  name: string;
  logoUrl: string | null;
  priority: number | null;
};

type CompaniesApiResponse = {
  success: boolean;
  data: CompanyApiItem[];
};

export default function Home() {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);

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

        const logos = payload.data
          .map((company) => ({
            logoUrl: company.logoUrl ?? "",
            priority: company.priority ?? 0,
          }))
          .filter((company) => company.logoUrl.length > 0)
          .sort((a, b) => a.priority - b.priority)
          .map((company) => company.logoUrl);

        if (isActive) {
          setPartnerLogos(logos);
        }
      } catch (error) {
        console.error(error);
        if (isActive) {
          setPartnerLogos([]);
        }
      }
    };

    loadCompanies();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <PageLayout>
      <Hero partnerLogos={partnerLogos} />
      <div className="line-bg w-full md:h-16 h-6"></div>
      <TestimonialSection />
      <CommunitiesSection />
      <EventsSection />
      <CTASection />
    </PageLayout>
  );
}
