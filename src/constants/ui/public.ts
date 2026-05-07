import { t } from "@/lib/i18n/messages";

export const publicPageTitles = {
  about: t("public.pages.about" as const),
  partners: t("public.pages.partners" as const),
  contact: t("public.pages.contact" as const),
  communities: t("public.pages.communities" as const),
  events: t("public.pages.events" as const),
  lab: t("public.pages.lab" as const),
  login: t("public.pages.login" as const),
} as const;

export const publicAboutText = {
  introParagraph: t("public.about.introParagraph" as const),
} as const;

export const publicCompanyText = {
  companiesProviding: t("public.company.companiesProviding" as const),
  internships: t("public.company.internships" as const),
  ourPartners: t("public.company.ourPartners" as const),
  aboutOurPartners: t("public.company.aboutOurPartners" as const),
  aboutPartnersBody: t("public.company.aboutPartnersBody" as const),
} as const;

export const publicContactText = {
  heroTitle: t("public.contact.heroTitle" as const),
  heroSubtitle: t("public.contact.heroSubtitle" as const),
  nameLabel: t("public.contact.nameLabel" as const),
  namePlaceholder: t("public.contact.namePlaceholder" as const),
  emailLabel: t("public.contact.emailLabel" as const),
  emailPlaceholder: t("public.contact.emailPlaceholder" as const),
  titleLabel: t("public.contact.titleLabel" as const),
  titleDefault: t("public.contact.titleDefault" as const),
  messageLabel: t("public.contact.messageLabel" as const),
  messagePlaceholder: t("public.contact.messagePlaceholder" as const),
  statusAwaiting: t("public.contact.statusAwaiting" as const),
  send: t("public.contact.send" as const),
  infoEmailTitle: t("public.contact.infoEmailTitle" as const),
  infoEmailContent: t("public.contact.infoEmailContent" as const),
  infoPhoneTitle: t("public.contact.infoPhoneTitle" as const),
  infoPhoneContent: t("public.contact.infoPhoneContent" as const),
  infoLocationTitle: t("public.contact.infoLocationTitle" as const),
  infoLocationContent: t("public.contact.infoLocationContent" as const),
  infoUptimeTitle: t("public.contact.infoUptimeTitle" as const),
  infoUptimeContent: t("public.contact.infoUptimeContent" as const),
} as const;

export const publicCommunitiesText = {
  latestNews: t("public.communities.latestNews" as const),
  focus: t("public.communities.focus" as const),
  members: t("public.communities.members" as const),
  activities: t("public.communities.activities" as const),
  projects: t("public.communities.projects" as const),
  exploreCommunity: t("public.communities.exploreCommunity" as const),
} as const;

export const publicCommunityDetailText = {
  about: t("public.communityDetail.about" as const),
  teamMembers: t("public.communityDetail.teamMembers" as const),
  news: t("public.communityDetail.news" as const),
  backToCommunities: t("public.communityDetail.backToCommunities" as const),
  exploreOtherCommunities: t(
    "public.communityDetail.exploreOtherCommunities" as const,
  ),
} as const;

export const publicEventDetailText = {
  backToEvents: t("public.eventDetail.backToEvents" as const),
  overview: t("public.eventDetail.overview" as const),
  whatYouWillSee: t("public.eventDetail.whatYouWillSee" as const),
  detail: t("public.eventDetail.detail" as const),
  gallery: t("public.eventDetail.gallery" as const),
  relatedEvents: t("public.eventDetail.relatedEvents" as const),
} as const;

export const publicLabText = {
  content: t("public.lab.content" as const),
} as const;

export const publicLoginText = {
  content: t("public.login.content" as const),
} as const;
