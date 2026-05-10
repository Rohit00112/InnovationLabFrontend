import Image from "next/image";

const newsItems = [
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

export default function News() {
  return (
    <section className="bg-gray-50 py-20 px-10">
      <h2 className="text-2xl font-extrabold uppercase mb-10">
        News and Updates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <div key={index} className="bg-white border border-gray-100 group">
            <Image
              src={`https://picsum.photos/seed/${item.img}/600/400`}
              alt={item.title}
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                {item.category} • {item.date}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
              <span className="text-iblue text-2xl cursor-pointer group-hover:translate-x-2 transition-transform inline-block">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
