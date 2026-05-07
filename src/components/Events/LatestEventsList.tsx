import Image from "next/image";

export type LatestEventItem = {
  date: string;
  title: string;
  desc: string;
  img: string;
};

type LatestEventsProps = {
  events: LatestEventItem[];
};

export default function LatestEvents({ events }: LatestEventsProps) {
  return (
    <section className="bg-gray-50 py-20 px-10">
      <h2 className="text-2xl font-extrabold uppercase mb-10">Latest Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((item, index) => (
          <div key={index} className="bg-white border border-gray-100 group">
            <Image
              src={`https://picsum.photos/seed/${item.img}/600/400`}
              alt={item.title}
              width={600}
              height={400}
              unoptimized
              sizes="(min-width: 768px) 33vw, 100vw"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                {item.date}
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
    </section>
  );
}
