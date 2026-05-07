const learnMoreItems = [
  {
    id: "01",
    title: "Discovery Phase",
    description:
      "We dismantle your current challenges to find the core structural needs of your digital product.",
  },
  {
    id: "02",
    title: "Logic Mapping",
    description:
      "Creating the information architecture. Mathematical layouts that prioritize user journey efficiency.",
  },
  {
    id: "03",
    title: "Brutalist Build",
    description:
      "High-fidelity construction. Every pixel is intentional, every line of code is optimized.",
  },
];

export default function LearnMoreSection() {
  return (
    <section className="w-full bg-neutral-300 px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid w-full max-w-300 gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-14">
        <div className="pt-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[-0.03em] text-ivBlack">
            Learn More
          </h2>
          <div className="mt-3 h-1 w-40 bg-ivCyan" />
        </div>

        <div className="overflow-hidden border border-black/10 bg-neutral-200">
          {learnMoreItems.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-[1fr_auto] items-center gap-6 border-b border-black/10 px-5 py-7 last:border-b-0 md:px-7"
            >
              <div>
                <h3 className="text-lg md:text-xl font-black uppercase leading-none tracking-[-0.02em] text-ivBlack">
                  {item.id}. {item.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[0.85rem] leading-6 text-ivBlack/70 md:text-[0.92rem]">
                  {item.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-[2.1rem] font-light leading-none text-black/12"
              >
                +
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
