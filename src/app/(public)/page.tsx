"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  CommunitiesSection,
  EventsSection,
  CTASection,
  TestimonialSection,
} from "@/components/Home";
import Hero from "@/components/Home/Hero";
import PageLayout from "@/components/primitives/PageLayout";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <div className="line-bg w-full md:h-16 h-6"></div>
      <TestimonialSection />
      <CommunitiesSection />
      <EventsSection />
      <CTASection />
    </PageLayout>
  );
}
