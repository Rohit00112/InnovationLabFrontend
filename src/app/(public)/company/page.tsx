"use client";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import BentoGrid from "@/components/BentoGrid";
import CompanyList from "@/components/Company/companyList";
import type { CompanyListItem } from "@/components/Company/companyList";
import { MarqueeLogoScroller } from "@/components/Company/MarqueeLogoScroller";
import Component from "@/components/Company/StickyScrollCompanyCard";
import Stories from "@/components/Company/stories";
import type { StoryItem } from "@/components/Company/stories";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import CompanyListTable from "@/components/Company/CompanyListTable";
import { FadeIn } from "@/components/Contacts/FadeIn";
import TeamSection, { TeamMember } from "@/components/ui/team-section";

export default function Partner() {
  const galleryItems = [
    {
      id: 1,
      title: "Mountain Vista",
      desc: "Serenity above the clouds.",
      url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      title: "Coastal Arch",
      desc: "Where the land meets the sea.",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 3,
      title: "Forest Canopy",
      desc: "Sunlight filtering through leaves.",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Desert Dunes",
      desc: "Golden sands under the sun.",
      url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  const companies: CompanyListItem[] = [
    {
      name: "Aether Dynamics",
      about:
        "Building autonomous sensing systems for smart mobility and logistics.",
      priority: 1,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "contact@aetherdynamics.com",
      websiteUrl: "https://example.com/aether",
      logoUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
      numberOfInterns: 6,
      numberOfVacancies: 2,
    },
    {
      name: "Nexa BioLabs",
      about:
        "Applying machine learning to accelerate drug discovery and testing.",
      priority: 2,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "hello@nexabiolabs.com",
      websiteUrl: "https://example.com/nexa",
      logoUrl:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80",
      numberOfInterns: 4,
      numberOfVacancies: 1,
    },
    {
      name: "Forge Robotics",
      about:
        "Designing modular robots for manufacturing and warehouse automation.",
      priority: 3,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "careers@forgerobotics.com",
      websiteUrl: "https://example.com/forge",
      logoUrl:
        "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=900&q=80",
      numberOfInterns: 8,
      numberOfVacancies: 3,
    },
    {
      name: "Pulse Grid",
      about:
        "Creating energy analytics tools for efficient and resilient city grids.",
      priority: 4,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "info@pulsegrid.net",
      websiteUrl: "https://example.com/pulse",
      logoUrl:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80",
      numberOfInterns: 5,
      numberOfVacancies: 4,
    },
    {
      name: "Cloud Harbor",
      about:
        "Shipping secure cloud infrastructure for fast scaling startup teams.",
      priority: 5,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "partners@cloudharbor.io",
      websiteUrl: "https://example.com/cloud",
      logoUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",
      numberOfInterns: 7,
      numberOfVacancies: 2,
    },
    {
      name: "Verde Materials",
      about:
        "Developing sustainable materials for low waste product engineering.",
      priority: 6,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "green@verdematerials.com",
      websiteUrl: "https://example.com/verde",
      logoUrl:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80",
      numberOfInterns: 3,
      numberOfVacancies: 0,
    },
    {
      name: "Nova Quantum",
      about:
        "Exploring quantum computing solutions for next-generation cryptography.",
      priority: 7,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "info@novaquantum.io",
      websiteUrl: "https://example.com/nova",
      logoUrl:
        "https://images.unsplash.com/photo-1526378722484-cc5c5101f5c1?w=900&q=80",
      numberOfInterns: 5,
      numberOfVacancies: 2,
    },
    {
      name: "Skyline AI",
      about:
        "Delivering AI-powered analytics for urban planning and smart cities.",
      priority: 8,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "contact@skylineai.com",
      websiteUrl: "https://example.com/skyline",
      logoUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
      numberOfInterns: 6,
      numberOfVacancies: 3,
    },
    {
      name: "Hydra Security",
      about:
        "Providing advanced cybersecurity solutions for distributed systems.",
      priority: 9,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "secure@hydrasec.com",
      websiteUrl: "https://example.com/hydra",
      logoUrl:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=900&q=80",
      numberOfInterns: 4,
      numberOfVacancies: 1,
    },
    {
      name: "OrbitX Systems",
      about:
        "Building scalable satellite communication and space data platforms.",
      priority: 10,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "hello@orbitx.space",
      websiteUrl: "https://example.com/orbitx",
      logoUrl:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80",
      numberOfInterns: 7,
      numberOfVacancies: 2,
    },
    {
      name: "TerraSense",
      about: "Using IoT and AI to monitor environmental changes in real time.",
      priority: 11,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "team@terrasense.org",
      websiteUrl: "https://example.com/terra",
      logoUrl:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900&q=80",
      numberOfInterns: 5,
      numberOfVacancies: 2,
    },
    {
      name: "ByteForge Labs",
      about: "Crafting high-performance developer tools and backend systems.",
      priority: 12,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "dev@byteforge.dev",
      websiteUrl: "https://example.com/byteforge",
      logoUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
      numberOfInterns: 6,
      numberOfVacancies: 3,
    },
    {
      name: "AquaGen Tech",
      about:
        "Innovating water purification and sustainable resource management systems.",
      priority: 13,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "info@aquagen.tech",
      websiteUrl: "https://example.com/aqua",
      logoUrl:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=900&q=80",
      numberOfInterns: 4,
      numberOfVacancies: 1,
    },
    {
      name: "NeuroLink Solutions",
      about: "Developing brain-computer interface technologies for healthcare.",
      priority: 14,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "contact@neurolink.ai",
      websiteUrl: "https://example.com/neuro",
      logoUrl:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900&q=80",
      numberOfInterns: 3,
      numberOfVacancies: 2,
    },
    {
      name: "Echo Finance",
      about:
        "Building fintech platforms for seamless digital payments and lending.",
      priority: 15,
      isMouSigned: true,
      isJobFair: false,
      contactEmail: "support@echofinance.com",
      websiteUrl: "https://example.com/echo",
      logoUrl:
        "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=900&q=80",
      numberOfInterns: 5,
      numberOfVacancies: 2,
    },
    {
      name: "Zenith Motors",
      about:
        "Engineering electric mobility solutions for future transportation.",
      priority: 16,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "careers@zenithmotors.com",
      websiteUrl: "https://example.com/zenith",
      logoUrl:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80",
      numberOfInterns: 8,
      numberOfVacancies: 4,
    },
    {
      name: "Zenith Motors",
      about:
        "Engineering electric mobility solutions for future transportation.",
      priority: 17,
      isMouSigned: true,
      isJobFair: true,
      contactEmail: "careers@zenithmotors.com",
      websiteUrl: "https://example.com/zenith",
      logoUrl:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80",
      numberOfInterns: 8,
      numberOfVacancies: 4,
    },
  ];

  const TEAM_MEMBERS: TeamMember[] = [
    {
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
      name: "Magdalina",
      role: "CEO",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww",
      name: "Jamie",
      role: "CTO",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Emilio",
      role: "CTO",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Samia",
      role: "COO",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Alex",
      role: "Engineer",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Ema",
      role: "Head of Product",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Carlos",
      role: "Engineer",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Campos",
      role: "Engineer",
    },
  ];

  const signedCompanies = [...companies]
    .filter((company) => company.isMouSigned)
    .sort((a, b) => a.priority - b.priority);
  const featuredCompanies = signedCompanies.slice(0, 6);
  const remainingCompanies = signedCompanies.slice(6);

  const storiesData: StoryItem[] = [
    {
      image:
        "https://images.unsplash.com/photo-1748968218568-a5eac621e65c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D",
      storyTeller: "Rakshak Sigdel",
      description: "Hold on to your mouse, things are about to get wild!",
    },
    {
      image:
        "https://zamin.uz/uploads/posts/2025-07/a6273368c2_cristiano-ronaldo-6.webp",
      storyTeller: "Cristiano Ronaldo",
      description: "Siuuuuuuuuuu",
    },
    {
      image:
        "https://wallpapers.com/images/featured/dexter-pictures-fe9qbtzm9bbv0xxj.jpg",
      storyTeller: "Dexter Morgan",
      description:
        "Tonight's the night. It's going to happen again and again. It has to happen.",
    },
    {
      image: "https://wallpapercave.com/wp/wp1932768.png",
      storyTeller: "Walter White",
      description: "Say my Name",
    },
    {
      image:
        "https://images.unsplash.com/photo-1742626157052-f5a373a727ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
      storyTeller: "Epic Finale",
      description: ":)",
    },
  ];
  return (
    <PageLayout hideOverflow={false}>
      <PageHeader title="PARTNERS" />
      <FadeIn delay={0.1}>
        <div className="mx-ds-5 mt-36 antialiased">
          <BentoGrid imageItems={galleryItems} />
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="line-bg w-full md:h-16 h-6"></div>
        <div className="mt-ds-7"></div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <section className="mx-ds-5 mt-10 antialiased">
          <div className="p-6 md:p-8 lg:p-10 bg-white border border-[#DFDFDF] border-b-0">
            <div className="grid grid-cols-1 gap-6 border-b border-[#006875] pb-6 md:pb-8 lg:grid-cols-[3fr_2fr]">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance text-neutral-900">
                Companies Providing Internships
              </h2>
            </div>
          </div>
          <CompanyList companies={featuredCompanies} />
        </section>
      </FadeIn>
      <FadeIn delay={0.35}>
        <section className="w-full px-4 pb-20 pt-12">
          <CompanyListTable
            companies={remainingCompanies}
            title="More Partners"
            description="Explore the full list of MoU-signed companies and their internship offerings."
          />
        </section>
      </FadeIn>
      {/**Section: MOU Companies */}
      <TeamSection
        members={TEAM_MEMBERS}
        heading="MOU Signed"
        highlight="Companies"
      />
      {/*Section: Description*/}
      <FadeIn delay={0.4}>
        <section className="py-24 px-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-[14px] tracking-[4px] font-bold uppercase mb-8">
            <span className="w-3 h-3 bg-cyan-400"></span>
            ABOUT OUR PARTNERS
            <span className="w-ds-2 h-ds-2 bg-accent rounded-ds-sm"></span>
          </div>
          <h2 className="text-h3 md:text-h2 font-semibold leading-tight text-neutral-900">
            we are Innovation Labbist lorem gg , Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Odit voluptates voluptatibus iure,
            vitae nesciunt dicta qui, quasi doloribus explicabo itaque alias
            ipsa quam non suscipit est ad aut at dolor?
          </h2>
        </section>
      </FadeIn>
      {/*Section: Stories*/}
      <div className="mt-[20vh] w-full">
        <Stories storiesData={storiesData} />
      </div>
    </PageLayout>
  );
}
