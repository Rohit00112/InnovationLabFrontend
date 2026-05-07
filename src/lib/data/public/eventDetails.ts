export type PublicEventCard = {
  slug: string;
  code: string;
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  about: string;
  focus: string[];
  details: string[];
  gallery: string[];
  related: string[];
};

export const publicEventCards: PublicEventCard[] = [
  {
    slug: "spring-carnival",
    code: "EV_01",
    title: "Spring Carnival",
    eyebrow: "Featured Highlight",
    description:
      "A multi-sensory immersion into generative environments, creative systems, and live prototypes.",
    heroImage:
      "https://images.pexels.com/photos/36390048/pexels-photo-36390048.jpeg",
    about:
      "Spring Carnival is a public showcase for bold experiments across design, technology, and spatial storytelling. Teams bring concepts to life through immersive visuals, live demos, and collaborative feedback loops.",
    focus: ["Immersive Design", "Interactive Media", "Rapid Prototyping"],
    details: [
      "A live build showcase with rotating studio stations and guided walkthroughs.",
      "Open critique sessions for teams ready to refine ideas in public.",
      "A visual-first format that emphasizes atmosphere, iteration, and community exchange.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    ],
    related: [
      "creative-systems-sprint",
      "urban-data-lab",
      "ai-interaction-sprint",
    ],
  },
  {
    slug: "creative-systems-sprint",
    code: "EV_02",
    title: "Creative Systems Sprint",
    eyebrow: "Studio Event",
    description:
      "Cross-discipline studio for designing interfaces, visuals, and interactive narratives.",
    heroImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    about:
      "A fast-paced sprint focused on collaborative production. Participants shape visual systems, prototype experiences, and test presentation strategies together.",
    focus: ["Visual Systems", "Team Production", "Concept Development"],
    details: [
      "Studio-style collaboration with shared tools and visible work surfaces.",
      "Practical prompts that push ideas from concept to execution quickly.",
      "Ideal for teams that want to align on visuals, structure, and story.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    ],
    related: [
      "spring-carnival",
      "future-city-assembly",
      "public-prototype-review",
    ],
  },
  {
    slug: "urban-data-lab",
    code: "EV_03",
    title: "Urban Data Lab",
    eyebrow: "Research Event",
    description:
      "Collaborative mapping of city signals to build practical, community-facing prototypes.",
    heroImage:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80",
    about:
      "Urban Data Lab turns public data into actionable design objects. Sessions blend mapping, analysis, and visualization so teams can see their ideas more clearly.",
    focus: ["Data Visualization", "Community Research", "Systems Thinking"],
    details: [
      "Mapping sessions that surface patterns in infrastructure and behavior.",
      "Shared critique and visualization exercises to clarify the story behind data.",
      "A good fit for teams working on research-heavy or civic-minded projects.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    ],
    related: [
      "spring-carnival",
      "creative-systems-sprint",
      "community-design-jam",
    ],
  },
  {
    slug: "xr-habitat-demo",
    code: "EV_04",
    title: "XR Habitat Demo",
    eyebrow: "Interactive Demo",
    description:
      "Immersive showcase of spatial ideas with rapid feedback from builders and visitors.",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    about:
      "XR Habitat Demo highlights spatial experiences that bridge physical and digital design. Attendees move through a highly visual environment built for testing interaction, motion, and form.",
    focus: ["XR", "Spatial Interaction", "Immersive Storytelling"],
    details: [
      "A demo environment designed for walkthroughs, testing, and conversation.",
      "Built to help teams validate how space, interface, and movement work together.",
      "Focused on atmosphere and direct participant feedback.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    ],
    related: [
      "spring-carnival",
      "ai-interaction-sprint",
      "future-city-assembly",
    ],
  },
  {
    slug: "public-prototype-review",
    code: "EV_05",
    title: "Public Prototype Review",
    eyebrow: "Critique Session",
    description:
      "Open floor critique to refine concepts, improve clarity, and accelerate implementation.",
    heroImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    about:
      "Public Prototype Review is where working ideas get sharpened. Teams present unfinished work, collect feedback, and identify the next iteration path in a public format.",
    focus: ["Review", "Iteration", "Feedback Loops"],
    details: [
      "Structured review spaces for fast feedback and visible progress.",
      "A practical format for teams preparing for launch or refinement.",
      "Encourages clear communication and honest critique.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    ],
    related: [
      "spring-carnival",
      "community-design-jam",
      "creative-systems-sprint",
    ],
  },
  {
    slug: "community-design-jam",
    code: "EV_06",
    title: "Community Design Jam",
    eyebrow: "Co-Creation",
    description:
      "Image-first co-creation format where teams iterate live with mentors and peers.",
    heroImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    about:
      "Community Design Jam blends mentoring, collaboration, and live image-led iterations. It is built to help teams move quickly while still keeping the human story visible.",
    focus: ["Co-Design", "Mentorship", "Live Iteration"],
    details: [
      "A workshop feel with shared tables, live screens, and active critique.",
      "Useful for early-stage ideas that need structure and momentum.",
      "Participants leave with clearer prototypes and sharper direction.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    ],
    related: ["spring-carnival", "creative-systems-sprint", "urban-data-lab"],
  },
  {
    slug: "ai-interaction-sprint",
    code: "EV_07",
    title: "AI Interaction Sprint",
    eyebrow: "AI Systems",
    description:
      "Rapid experiments on conversational interfaces, agent behaviors, and assistive flows.",
    heroImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    about:
      "AI Interaction Sprint explores how intelligent systems shape interface behavior, response patterns, and user confidence in live workflows.",
    focus: ["Agents", "Conversation Design", "Interaction Research"],
    details: [
      "Fast-turn design sessions for product teams experimenting with AI UX.",
      "Focuses on practical decisions around flow, tone, and guidance.",
      "Helps teams prototype interactions before committing to full builds.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    ],
    related: ["spring-carnival", "urban-data-lab", "future-city-assembly"],
  },
  {
    slug: "future-city-assembly",
    code: "EV_08",
    title: "Future City Assembly",
    eyebrow: "Vision Session",
    description:
      "Large-format visual review of speculative urban systems and implementation pathways.",
    heroImage:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
    about:
      "Future City Assembly is a presentation-heavy event where urban systems, speculative design, and practical engineering meet in one room.",
    focus: ["Urban Systems", "Speculative Design", "Strategy"],
    details: [
      "High-visibility presentations that make complex systems easier to see.",
      "Designed for teams shaping long-range narratives or city-scale experiments.",
      "Combines visual clarity with direct strategic discussion.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    ],
    related: ["spring-carnival", "urban-data-lab", "public-prototype-review"],
  },
];
