/**
 * Centralized navigation routes and constants.
 * Use these routes throughout the app instead of hardcoding href values.
 */

export const navigationRoutes = {
  // Public routes
  home: "/",
  about: "/about",
  company: "/company",
  communities: "/communities",
  events: "/events",
  contact: "/contact",
  lab: "/lab",
  login: "/login",

  // Admin routes
  admin: {
    root: "/admin",
    banner: "/admin/banner",
    categories: "/admin/categories",
    faq: "/admin/faq",
    testimonials: "/admin/testimonials",
    contact: "/admin/contact",
    events: {
      root: "/admin/events",
      events: "/admin/events/events",
      agenda: "/admin/events/agenda",
      registration: "/admin/events/registration",
    },
    company: {
      root: "/admin/company",
      bentogridimages: "/admin/company/bentogridimages",
      companies: "/admin/company/companies",
      testimonials: "/admin/company/testimonials",
    },
    about: {
      root: "/admin/about",
      about: "/admin/about/about",
      coreValues: "/admin/about/core-values",
      journey: "/admin/about/journey",
    },
  },

  // Dynamic route builders
  communityDetail: (slug: string) => `/communities/${slug}`,
  eventDetail: (slug: string) => `/events/${slug}`,
} as const;

/**
 * Navigation menu items (for use in nav components)
 */
export const navigationMenuItems = [
  { label: "Home", href: navigationRoutes.home },
  { label: "About", href: navigationRoutes.about },
  { label: "Events", href: navigationRoutes.events },
  { label: "Communities", href: navigationRoutes.communities },
  { label: "Contact", href: navigationRoutes.contact },
  { label: "Company", href: navigationRoutes.company },
] as const;
