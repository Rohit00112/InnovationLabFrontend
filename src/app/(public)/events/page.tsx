"use client";

import Image from "next/image";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { EmblaCarousel } from "@/components/Events/Carousel";
import LearnMoreSection from "@/components/LearnMoreSection";
import { publicPageTitles } from "@/constants/ui/public";
import { publicEvents } from "@/lib/data/public/events";

export default function EventsPage() {
  return (
    <PageLayout>
      <PageHeader title={publicPageTitles.events} />

      <section className="w-full px-0">
        <EmblaCarousel />
      </section>

      <div className="line-bg w-full md:h-16 h-6"></div>

      <section className="flex flex-col bg-white">
        {publicEvents.slice(0, 4).map((event, index) => (
          <article
            key={`${event.code}-feature`}
            className={[
              "w-full border-y border-gray-300 flex items-center",
              index % 2 === 0
                ? "flex-col md:flex-row"
                : "flex-col md:flex-row-reverse",
            ].join(" ")}
          >
            <div className="relative w-full md:w-5/12 aspect-4/3 md:aspect-square">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full md:w-7/12 p-6 md:p-10 gap-6 flex flex-col">
              <h4 className="mt-3 text-[clamp(28px,3.2vw,52px)] font-black uppercase leading-[0.95] text-ivBlack">
                {event.title}
              </h4>
              <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed">
                {event.description}
              </p>
            </div>
          </article>
        ))}
      </section>
      <div className="line-bg w-full md:h-16 h-6"></div>
      <LearnMoreSection />
    </PageLayout>
  );
}
