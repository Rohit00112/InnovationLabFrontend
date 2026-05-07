import React from "react";
import AboutCardList from "@/components/About/AboutCardList";
import StrategicPillarsCardList from "@/components/About/StrategicPillarsCardList";
import SmoothScroll from "@/components/Animations/smooth-scroll";
import Timeline from "@/components/About/Timeline";
import BentoGrid from "@/components/BentoGrid";
import LatestEventsSection from "@/components/Sections/LatestEventsSection";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { publicAboutText, publicPageTitles } from "@/constants/ui/public";
import {
  aboutCards,
  aboutGalleryItems,
  aboutLatestEvents,
  strategicPillars,
  timelineData,
} from "@/lib/data/public/about";

const About = () => {
  return (
    <>
      <PageLayout>
        <PageHeader title={publicPageTitles.about} />
        <SmoothScroll>
          <section className="bg-white p-12 flex flex-col gap-8 justify-center">
            <p className="max-w-3xl text-xl text-justify">
              {publicAboutText.introParagraph}
            </p>
            <p className="max-w-3xl text-xl text-justify">
              {publicAboutText.introParagraph}
            </p>
          </section>
          <AboutCardList items={aboutCards} />
        </SmoothScroll>
        <StrategicPillarsCardList items={strategicPillars} />
        <Timeline items={timelineData} />
        <div className="mx-ds-5 mt-ds-6 mb-ds-6 antialiased">
          <BentoGrid imageItems={aboutGalleryItems} />
        </div>
        <LatestEventsSection events={aboutLatestEvents} />
      </PageLayout>
    </>
  );
};

export default About;
