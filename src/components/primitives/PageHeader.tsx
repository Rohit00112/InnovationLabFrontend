export default function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="bg-white py-8 md:py-16 border-b border-gray-300 px-6 md:px-10 text-[clamp(34px,8vw,120px)] font-black uppercase leading-[0.8] tracking-[-0.08em] text-neutral-900">
      {title}
    </h1>
  );
}
