import Image from "next/image";

const latestNewsItems = [
  {
    category: "Events",
    date: "12 May",
    title: "IIC Quest 2026",
    desc: "Join us for the annual innovation competition.",
    img: "99",
  },
  {
    category: "Research",
    date: "06 May",
    title: "Our Hard Working Researcher's Findings",
    desc: "New findings in AI development.",
    img: "88",
  },
  {
    category: "Casual",
    date: "03 May",
    title: "Something Paradigm",
    desc: "How Something Works",
    img: "77",
  },
];

export default function LatestNewsSection() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-14 md:py-20">
      <div className="mx-auto px-4 md:px-8">
        <h2 className="mb-8 ml-1 text-2xl font-extrabold uppercase md:mb-10 md:ml-0 md:text-6xl">
          Latest News
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {latestNewsItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 group aspect-square"
            >
              <Image
                src={`https://picsum.photos/seed/${item.img}/600/400`}
                alt={item.title}
                width={600}
                height={400}
                className="h-52 w-full object-cover md:h-56"
              />
              <div className="p-5 md:p-6">
                <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                  {item.category} • {item.date}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                <span className="text-primary text-2xl cursor-pointer group-hover:translate-x-2 transition-transform inline-block">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
