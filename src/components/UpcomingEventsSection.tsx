type EventItem = {
  title: string;
  date: string;
  time: string;
  venue: string;
  desc: string;
  type: "upcoming";
};

const events: EventItem[] = [
  {
    title: "Campus Build Sprint",
    date: "24 May",
    time: "5:30 PM",
    venue: "Innovation Studio A",
    desc: "Ship a working feature in one evening with mentor checkpoints and live feedback.",
    type: "upcoming",
  },
  {
    title: "Startup Stories Live",
    date: "28 May",
    time: "6:00 PM",
    venue: "Main Auditorium",
    desc: "Founders share practical wins, mistakes, and how they moved from idea to product.",
    type: "upcoming",
  },
  {
    title: "AI Product Teardown",
    date: "31 May",
    time: "4:30 PM",
    venue: "Seminar Hall 2",
    desc: "A practical breakdown of product decisions behind popular AI tools.",
    type: "upcoming",
  },
];

export default function UpcomingEventsSection() {
  return (
    <section className="py-16 max-w-[73.75rem] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl uppercase font-extrabold tracking-tight">
            Upcoming Events
          </h2>
          <p className="text-sm text-ivGray-500 mt-2">
            See what is happening next at IV Lab.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <article
            key={`${event.type}-${event.title}`}
            className="border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white"
          >
            <div className="md:w-2/3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivGray-500 mb-2">
                {event.date} • {event.time} • {event.venue}
              </p>
              <div>
                <h3 className="text-lg uppercase font-bold tracking-tight">
                  {event.title}
                </h3>
                <p className="text-ivGray-500 text-sm mt-1">{event.desc}</p>
              </div>
            </div>
            <button className="bg-white text-ivBlack uppercase tracking-widest font-bold text-[0.68rem] px-5 py-3 whitespace-nowrap border border-ivBlack hover:bg-black hover:text-white transition-colors duration-100">
              Join Now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
