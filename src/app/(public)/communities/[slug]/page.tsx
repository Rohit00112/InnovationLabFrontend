import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import {
  communityCards,
  communityProfiles,
  communitySlugs,
  type CommunitySlug,
} from "@/lib/data/communities";
import { publicCommunityDetailText } from "@/constants/ui/public";

type CommunityDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return communitySlugs.map((slug) => ({ slug }));
}

export default function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const slug = params.slug as CommunitySlug;
  const profile = communityProfiles[slug];

  if (!profile) {
    notFound();
  }

  const relatedCommunities = communityCards.filter(
    (community) => community.slug !== slug,
  );

  return (
    <PageLayout>
      <PageHeader title={profile.title} />

      <section className="mx-auto grid w-full max-w-7xl gap-8 border border-black/10 bg-neutral-100 px-6 py-14 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="text-[clamp(30px,4.8vw,56px)] font-black uppercase tracking-[-0.03em]">
            {publicCommunityDetailText.about}
          </h2>
          <div className="mt-3 h-1 w-24 bg-ivCyan" />
        </div>
        <div>
          <p className="text-sm leading-relaxed text-ivGray-500 md:text-base">
            {profile.about}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-x border-b border-black/10 bg-white px-6 py-14 md:px-10">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          {publicCommunityDetailText.teamMembers}
        </h2>
        <div className="mt-8 grid grid-cols-1 border border-black/10 md:grid-cols-2">
          {profile.teamMembers.map((member, index) => (
            <article
              key={member.name}
              className={[
                "border-b border-r border-black/10 p-6",
                index % 2 === 0
                  ? "bg-gradient-to-br from-cyan-400/10 to-white"
                  : "bg-gradient-to-b from-cyan-400/6 to-white",
              ].join(" ")}
            >
              <div className="relative h-44 w-full overflow-hidden border border-black/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-[30px] font-black uppercase leading-none tracking-tight">
                {member.name}
              </h3>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-ivCyan">
                {member.role}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-ivGray-500">
                {member.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-x border-b border-black/10 bg-neutral-100 px-6 py-14 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
            {publicCommunityDetailText.news}
          </h2>
          <Link
            href="/communities"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivCyan"
          >
            {publicCommunityDetailText.backToCommunities}
          </Link>
        </div>
        <div className="space-y-4 border border-black/10 bg-white p-4 md:p-6">
          {profile.news.map((item) => (
            <article
              key={`${item.date}-${item.title}`}
              className="grid gap-4 border-b border-black/10 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[110px_1fr]"
            >
              <div className="relative h-20 w-full overflow-hidden border border-black/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivCyan">
                  {item.date}
                </p>
                <h3 className="mt-2 text-lg font-black uppercase leading-tight tracking-tight text-ivBlack">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivGray-500">
                  {item.summary}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ivGray-500">
                  {item.tags}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-x border-b border-black/10 bg-white px-6 py-12 md:px-10">
        <h2 className="text-2xl font-black uppercase tracking-tight">
          {publicCommunityDetailText.exploreOtherCommunities}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {relatedCommunities.map((community) => (
            <Link
              key={community.slug}
              href={`/communities/${community.slug}`}
              className="border border-black/10 px-4 py-4 text-sm font-extrabold uppercase tracking-[0.2em] transition-colors hover:bg-cyan-50"
            >
              {community.title}
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
