"use client";

import type { EventAgendaResponseDto } from "@/lib/services/generated/frontend/schemas";
import { useQuery } from "@tanstack/react-query";
import { getEventAgenda } from "@/lib/services/domain/events";

type EventAgendaSectionProps = {
  eventId: string;
};

export default function EventAgendaSection({ eventId }: EventAgendaSectionProps) {
  const {
    data: agendas = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["eventAgenda", eventId],
    queryFn: () => getEventAgenda(eventId),
    enabled: !!eventId,
  });

  if (error) {
    console.debug("Event Agenda API error:", error);
    return null;
  }

  if (isLoading) {
    return (
      <section className="mx-auto w-full border-x border-b border-gray-300 bg-white px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          Agenda
        </h2>
        <div className="mt-8 text-neutral-500">Loading agenda...</div>
      </section>
    );
  }

  if (!agendas || agendas.length === 0) {
    return null;
  }

  // Group agendas by day
  const agendasByDay = agendas.sort((a, b) => (a.day ?? 0) - (b.day ?? 0));

  return (
    <section className="mx-auto w-full border-x border-b border-neutral-300 bg-white px-6 py-12 md:px-10 md:py-16">
      <div className="mb-8">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          Agenda
        </h2>
        <div className="mt-3 h-1 w-24 bg-black" />
      </div>

      <div className="space-y-12">
        {agendasByDay.map((agenda) => (
          <div key={agenda.id}>
            {/* Day Header */}
            <div className="mb-6 flex items-center gap-4">
              <div className="inline-flex px-4 py-2 items-center justify-center rounded-lg border-2 border-iblue-400 bg-iblue-50">
                <span className="text-lg font-bold text-iblue-600">
                  Day {agenda.day}
                </span>
              </div>
              <div className="h-0.5 flex-1 bg-gray-300" />
            </div>

            {/* Agenda Items Timeline */}
            <div className="space-y-4">
              {agenda.items && agenda.items.length > 0 ? (
                agenda.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-l-2 border-iblue-400 pl-6 py-3"
                  >
                    <div className="flex flex-col gap-1 min-w-max">
                      <span className="text-sm font-bold text-iblue-600">
                        {item.startTime}
                      </span>
                      <span className="text-xs text-neutral-500">
                        to {item.endTime}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-base font-bold text-neutral-900">
                        {item.title || "Event Activity"}
                      </h4>
                      {item.description && (
                        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 text-sm italic">
                  No agenda items for this day
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
