export type CommunitySlug =
  | "coders"
  | "creators"
  | "researchers"
  | "entrepreneurs";

export type CommunityCard = {
  id: string;
  slug: CommunitySlug;
  title: string;
  description: string;
  image: string;
};

export type CommunityMember = {
  name: string;
  role: string;
  note: string;
  image: string;
};

export type CommunityNews = {
  date: string;
  title: string;
  summary: string;
  tags: string;
  image: string;
};

export type CommunityProfile = {
  slug: CommunitySlug;
  title: string;
  about: string;
  aboutLead: string;
  teamMembers: CommunityMember[];
  news: CommunityNews[];
};

export const communityCards: CommunityCard[] = [
  {
    id: "01",
    slug: "coders",
    title: "Coders",
    description:
      "Building product logic, platforms, and robust developer tooling.",
    image: "/about/32.jpg",
  },
  {
    id: "02",
    slug: "creators",
    title: "Creators",
    description:
      "Crafting content, interfaces, and meaningful visual narratives.",
    image: "/about/30.jpg",
  },
  {
    id: "03",
    slug: "researchers",
    title: "Researchers",
    description:
      "Testing ideas, validating hypotheses, and publishing findings.",
    image: "/about/29.jpg",
  },
  {
    id: "04",
    slug: "entrepreneurs",
    title: "Entrepreneurs",
    description: "Turning concepts into prototypes and deployable innovation.",
    image: "/about/28.jpg",
  },
];

export const communityProfiles: Record<CommunitySlug, CommunityProfile> = {
  coders: {
    slug: "coders",
    title: "Coders",
    about:
      "The Coders community focuses on clean architecture, scalable backend systems, and production-grade frontend engineering. Members collaborate through code reviews, pair programming, and open-source style contribution workflows.",
    aboutLead:
      "From API design to deployment pipelines, coders in IV Labs turn product ideas into reliable software systems.",
    teamMembers: [
      {
        name: "Aarav Khadka",
        role: "Platform Engineer",
        note: "Distributed systems / observability",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Nisha Adhikari",
        role: "Frontend Architect",
        note: "Design systems / performance",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
      },
    ],
    news: [
      {
        date: "Apr 21, 2026",
        title: "New Internal API SDK Released",
        summary:
          "Coders shipped a typed SDK for all internal services with improved telemetry support.",
        tags: "#sdk #backend",
        image:
          "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=500&q=80",
      },
      {
        date: "Apr 14, 2026",
        title: "Hacknight: Runtime Profiling",
        summary:
          "Community session covering flamegraphs, bottleneck tracing, and query optimization.",
        tags: "#events #performance",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  creators: {
    slug: "creators",
    title: "Creators",
    about:
      "The Creators community designs storytelling systems across motion, visuals, and product experiences. Members translate strategy into clear communication assets and interactive experiences.",
    aboutLead:
      "Creators shape how ideas are seen, understood, and shared across digital and physical channels.",
    teamMembers: [
      {
        name: "Prakriti Lama",
        role: "Creative Director",
        note: "Campaign systems / visual language",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Ritesh Poudel",
        role: "Motion Designer",
        note: "Narrative animation / reels",
        image:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=700&q=80",
      },
    ],
    news: [
      {
        date: "Apr 19, 2026",
        title: "Design Sprint Showcase",
        summary:
          "Creators presented a cross-platform brand campaign and reusable media toolkit.",
        tags: "#showcase #design",
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
      },
      {
        date: "Apr 10, 2026",
        title: "Studio Workshop: Motion Basics",
        summary:
          "An open workshop focused on transitions, layout rhythm, and narrative pacing.",
        tags: "#workshop #motion",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  researchers: {
    slug: "researchers",
    title: "Researchers",
    about:
      "The Researchers community runs experiments, gathers evidence, and structures insights into actionable recommendations. It works closely with coders and creators to validate direction early.",
    aboutLead:
      "Researchers reduce uncertainty by making every product decision evidence-informed.",
    teamMembers: [
      {
        name: "Sajan Karki",
        role: "Research Lead",
        note: "Quant studies / analytics",
        image:
          "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Mina Shrestha",
        role: "User Researcher",
        note: "Interviews / synthesis",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
      },
    ],
    news: [
      {
        date: "Apr 23, 2026",
        title: "Q2 Insight Report Published",
        summary:
          "Researchers released a report on product adoption patterns and retention drivers.",
        tags: "#report #insight",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
      },
      {
        date: "Apr 16, 2026",
        title: "Lab Session: Experimental Design",
        summary:
          "Community session on bias reduction and reproducible research methods.",
        tags: "#lab #methodology",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  entrepreneurs: {
    slug: "entrepreneurs",
    title: "Entrepreneurs",
    about:
      "The Entrepreneurs community focuses on turning ideas into viable business ventures, fostering innovation and growth through collaboration and resource sharing. Members work together to identify opportunities, develop business plans, and launch new products or services.",
    aboutLead:
      "Entrepreneurs drive economic impact by creating sustainable business models and scalable solutions.",
    teamMembers: [
      {
        name: "Ishan Bista",
        role: "Prototype Engineer",
        note: "Rapid fabrication / testing",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Sumi Rai",
        role: "Product Inventor",
        note: "Interaction hardware / systems",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
      },
    ],
    news: [
      {
        date: "Apr 24, 2026",
        title: "Prototype Expo Day Announced",
        summary:
          "Inventors will demo working prototypes to collaborators and partners.",
        tags: "#expo #prototype",
        image:
          "https://images.unsplash.com/photo-1581093588401-22f35bb9e90b?auto=format&fit=crop&w=500&q=80",
      },
      {
        date: "Apr 11, 2026",
        title: "Build Jam Recap",
        summary:
          "Participants built three functional concept devices in a single weekend sprint.",
        tags: "#build #community",
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
};

export const communitySlugs: CommunitySlug[] = [
  "coders",
  "creators",
  "researchers",
  "entrepreneurs",
];
