import siteData from "./site.json";

// ── Root Schema Types ──
export type AurelianSchema = typeof siteData.Aurelian;
export type AurelianSections = AurelianSchema["sections"];

// ── Universal SectionProps Interface (ai-builder Standard) ──
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// ── Strongly Typed Section Variant Data Models ──
export type AurelianHeaderData = AurelianSections["Header"]["variants"]["AurelianHeader1"];
export type AurelianFooterData = AurelianSections["Footer"]["variants"]["AurelianFooter1"];
export type AurelianPageBannerData =
  AurelianSections["PageBanner"]["variants"]["AurelianPageBanner1"];
export type AurelianHeroData = AurelianSections["Hero"]["variants"]["AurelianHero1"];
export type AurelianAboutIntroData =
  AurelianSections["AboutIntro"]["variants"]["AurelianAboutIntro1"];
export type AurelianPracticePreviewData =
  AurelianSections["PracticePreview"]["variants"]["AurelianPracticePreview1"];
export type AurelianWhyChooseUsData =
  AurelianSections["WhyChooseUs"]["variants"]["AurelianWhyChooseUs1"];
export type AurelianStatsData = AurelianSections["Stats"]["variants"]["AurelianStats1"];
export type AurelianFounderData =
  AurelianSections["FounderMessage"]["variants"]["AurelianFounder1"];
export type AurelianTeamPreviewData =
  AurelianSections["TeamPreview"]["variants"]["AurelianTeamPreview1"];
export type AurelianTestimonialsData =
  AurelianSections["Testimonials"]["variants"]["AurelianTestimonials1"];
export type AurelianBlogPreviewData =
  AurelianSections["BlogPreview"]["variants"]["AurelianBlogPreview1"];
export type AurelianCtaData = AurelianSections["CallToAction"]["variants"]["AurelianCta1"];
export type AurelianAboutStoryData =
  AurelianSections["AboutStory"]["variants"]["AurelianAboutStory1"];
export type AurelianValuesData = AurelianSections["CoreValues"]["variants"]["AurelianValues1"];
export type AurelianPracticePageData =
  AurelianSections["PracticeListing"]["variants"]["AurelianPracticePage1"];
export type AurelianPracticeDetailData =
  AurelianSections["PracticeDetail"]["variants"]["AurelianPracticeDetail1"];
export type AurelianTeamPageData =
  AurelianSections["TeamListing"]["variants"]["AurelianTeamPage1"];
export type AurelianTeamDetailData =
  AurelianSections["TeamDetail"]["variants"]["AurelianTeamDetail1"];
export type AurelianBlogPageData =
  AurelianSections["BlogListing"]["variants"]["AurelianBlogPage1"];
export type AurelianBlogDetailData =
  AurelianSections["BlogDetail"]["variants"]["AurelianBlogDetail1"];
export type AurelianContactData =
  AurelianSections["ContactDetails"]["variants"]["AurelianContact1"];
export type AurelianContactFormData =
  AurelianSections["ContactForm"]["variants"]["AurelianContactForm1"];
export type AurelianNotFoundData = AurelianSections["NotFound"]["variants"]["AurelianNotFound1"];
export type AurelianAppointmentData =
  AurelianSections["Appointment"]["variants"]["AurelianAppointment1"];

// ── Item-level types inferred from site.json ──
export type AurelianImage = AurelianHeroData["image"];
export type AurelianLink = AurelianHeaderData["appointmentButton"];
export type AurelianContactDetails = AurelianFooterData["contact"];
export type AurelianSocial = AurelianFooterData["socials"][number];
export type AurelianPracticeArea = AurelianPracticePageData["items"][number];
export type AurelianTeamMember = AurelianTeamPageData["items"][number];
export type AurelianBlogPost = AurelianBlogPageData["items"][number];
export type AurelianTestimonial = AurelianTestimonialsData["items"][number];

// ── Legacy Site Map for Standalone Aurelian Site ──
const sec = siteData.Aurelian.sections;

const site = {
  theme: siteData.Aurelian.theme,
  navbar: sec.Header.variants.AurelianHeader1,
  footer: sec.Footer.variants.AurelianFooter1,
  pageBanner: sec.PageBanner.variants.AurelianPageBanner1,
  hero: sec.Hero.variants.AurelianHero1,
  aboutIntroSection: sec.AboutIntro.variants.AurelianAboutIntro1,
  practicePreviewSection: sec.PracticePreview.variants.AurelianPracticePreview1,
  whyChooseUsSection: sec.WhyChooseUs.variants.AurelianWhyChooseUs1,
  statsSection: sec.Stats.variants.AurelianStats1,
  founderSection: sec.FounderMessage.variants.AurelianFounder1,
  teamPreviewSection: sec.TeamPreview.variants.AurelianTeamPreview1,
  testimonialsSection: sec.Testimonials.variants.AurelianTestimonials1,
  blogPreviewSection: sec.BlogPreview.variants.AurelianBlogPreview1,
  ctaSection: sec.CallToAction.variants.AurelianCta1,
  aboutStorySection: sec.AboutStory.variants.AurelianAboutStory1,
  valuesSection: sec.CoreValues.variants.AurelianValues1,
  practicePage: sec.PracticeListing.variants.AurelianPracticePage1,
  practiceDetailPage: sec.PracticeDetail.variants.AurelianPracticeDetail1,
  teamPage: sec.TeamListing.variants.AurelianTeamPage1,
  teamDetailPage: sec.TeamDetail.variants.AurelianTeamDetail1,
  blogPage: sec.BlogListing.variants.AurelianBlogPage1,
  blogDetailPage: sec.BlogDetail.variants.AurelianBlogDetail1,
  contactPage: sec.ContactDetails.variants.AurelianContact1,
  contactFormSection: sec.ContactForm.variants.AurelianContactForm1,
  appointmentPage: sec.Appointment.variants.AurelianAppointment1,
  notFoundPage: sec.NotFound.variants.AurelianNotFound1,
};

export { site };
export default siteData;
