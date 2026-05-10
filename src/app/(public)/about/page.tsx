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
              We believe in building a collaborative innovation culture rooted
              in real-world learning. Our approach focuses on reducing the gap
              between ideas and execution, favoring practical experience over
              passive knowledge.
            </p>
            <p className="max-w-3xl text-xl text-justify">
              Each project is a step forward. Each collaboration is a learning
              process.
            </p>
            <p className="max-w-3xl text-xl text-justify">
              Innovation Lab is not just a space — it is a system where learners
              explore, build, and grow together through shared effort and guided
              mentorship.
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
