"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import EventRegistrationForm from "@/components/Events/EventRegistrationForm";
import Image from "next/image";
import { getEventById } from "@/lib/services/domain/events";
import { useQuery } from "@tanstack/react-query";

type EventRegisterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EventRegisterPage({ params }: EventRegisterPageProps) {
  const { id } = use(params);

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-xl font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
            Loading Registration Details...
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !event) {
    notFound();
  }

  console.log("Event data for registration page:", event);

  return (
    <PageLayout>
      <PageHeader title={`Register for ${event.title}`} />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <EventRegistrationForm
              eventId={event.id || ""}
              eventTitle={event.title || ""}
            />
          </div>

          {/* Event Details Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className=" -lg border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                Event Details
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-neutral-600">Date</p>
                  <p className="font-medium text-neutral-900">
                    {event.startTime
                      ? new Date(event.startTime).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "TBD"}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Time</p>
                  <p className="font-medium text-neutral-900">
                    {event.startTime
                      ? new Date(event.startTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "TBD"}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Location</p>
                  <p className="font-medium text-neutral-900">
                    {event.location || "TBA"}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Type</p>
                  <p className="font-medium text-neutral-900">
                    {event.seriesName || "Special Event"}
                  </p>
                </div>
              </div>
            </div>

            <div className=" -lg border border-neutral-200 bg-neutral-50 p-6 text-center">
              <h3 className="mb-3 font-semibold text-neutral-900">
                Event Payment
              </h3>
              <div className="flex justify-center">
                <Image
                  width={400}
                  height={400}
                  alt="QR Code"
                  src="/qr.jpeg"
                  className="bg-white p-2"
                />
              </div>
              <p className="mt-2 text-md text-red-600 font-bold ">
                Scan to pay registration fee, A fee of NRP 5000 is required, and
                submit the Screenshot of the payment in the Supporting document.
              </p>
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div className=" -lg border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="mb-3 font-semibold text-neutral-900">
                  Highlights
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {event.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
