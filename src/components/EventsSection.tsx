type HomeEvent = {
  id: number;
  title: string;
  description: string;
};

const featuredEvent = {
  name: "SPRING CARNIVAL",
  image:
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=80",
};

const eventHighlights: HomeEvent[] = [
  {
    id: 1,
    title: "Design and Build",
    description:
      "We believe in the sovereignty of the grid. Our practice is dedicated to the reduction of noise.",
  },
  {
    id: 2,
    title: "Founder Sessions",
    description:
      "Meet startup teams, hear product stories, and learn how teams move from ideas to prototypes.",
  },
  {
    id: 3,
    title: "Live Demos",
    description:
      "Watch rapid demos, peer reviews, and practical walkthroughs of student-built projects.",
  },
];

export default function EventsSection() {
  return (
    <section className="w-full bg-neutral-100 py-10 md:py-14">
      <div className="mx-auto w-full max-w-300 px-4 md:px-6">
        <header className="mb-3 flex items-center justify-between py-5 md:py-7">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-neutral-900 md:text-5xl">
            Events
          </h2>
          <button className="border border-neutral-500 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700 transition hover:bg-neutral-900 hover:text-white">
            View All
          </button>
        </header>

        <article
          className="relative min-h-140 overflow-hidden border border-neutral-300 md:min-h-180"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10, 15, 35, 0.5), rgba(10, 15, 35, 0.35)), url(${featuredEvent.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-start p-6 text-white md:p-10">
            <div className="mb-10 flex items-center gap-5 md:mb-12">
              <span className="inline-flex h-12 w-12 items-center justify-center var(---color-iblue) text-3xl font-bold leading-none text-neutral-950">
                1
              </span>
              <h3 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
                {featuredEvent.name}
              </h3>
            </div>

            <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
              {eventHighlights.map((item) => (
                <div key={item.id}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                    0{item.id}
                  </p>
                  <h4 className="mb-2 text-lg font-semibold uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xl leading-relaxed text-neutral-100/90">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
