export interface ThemeFonts {
  /** Body text, e.g. "var(--font-nunito-sans), Arial, sans-serif" (the font is loaded in app/layout.tsx) */
  primary: string;
  /** Serif headlines */
  heading: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SeoData {
  title: string;
  description: string;
}

export interface SiteMetadataData {
  title: string;
  siteName: string;
  description: string;
  icon: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface SocialLink extends LinkItem {
  /** react-icons name, e.g. "FaLinkedinIn" (see components/ui/Icon.tsx) */
  icon: string;
}

/** Name, logos and contact details: shared by the header, footer, contact page and map. */
export interface CompanyData {
  name: string;
  logo: string;
  /** Light logo for the dark footer and mobile menu */
  logoLight: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  phone: string;
  email: string;
  /** One entry per line */
  address: string[];
  socialLinks: SocialLink[];
  /** "{query}" is filled with the address */
  mapEmbedUrl: string;
  mapOpenUrl: string;
}

/** Screen-reader labels shared by many sections; "{n}", "{name}" and "{platform}" are filled in by the components. */
export interface GlobalUIData {
  mainNav: string;
  mobileNav: string;
  menu: string;
  openMenu: string;
  closeMenu: string;
  breadcrumb: string;
  carousel: string;
  previousSlide: string;
  nextSlide: string;
  slide: string;
  pagination: string;
  previousPage: string;
  nextPage: string;
  page: string;
  socialProfile: string;
  closeMessage: string;
}

export interface BreadcrumbPath {
  id: string;
  label: string;
  /** "" for the current page */
  url: string;
}

/** Page banner: title over a photo, with the breadcrumb trail. */
export interface BreadcrumbData {
  title: string;
  image: string;
  imageAlt: string;
  seo: SeoData;
  paths: BreadcrumbPath[];
}

export interface ButtonData {
  buttonText: string;
  buttonUrl: string;
}

export interface SecondaryButtonData {
  secondaryButtonText: string;
  secondaryButtonUrl: string;
}

export interface NotFoundData extends ButtonData {
  seo: SeoData;
  code: string;
  title: string;
  description: string;
}

export interface FooterData {
  description: string;
  socialsTitle: string;
  /** ids from company.socialLinks */
  socials: string[];
  quickLinksTitle: string;
  quickLinks: LinkItem[];
  contactTitle: string;
  /** "{year}" is filled in */
  copyrightText: string;
}

export interface CommonData {
  theme: ThemeData;
  metadata: SiteMetadataData;
  company: CompanyData;
  globalUI: GlobalUIData;
  aboutBreadcrumb: BreadcrumbData;
  practiceAreasBreadcrumb: BreadcrumbData;
  practiceDetailBreadcrumb: BreadcrumbData;
  teamBreadcrumb: BreadcrumbData;
  teamDetailBreadcrumb: BreadcrumbData;
  blogsBreadcrumb: BreadcrumbData;
  blogDetailBreadcrumb: BreadcrumbData;
  contactBreadcrumb: BreadcrumbData;
  appointmentBreadcrumb: BreadcrumbData;
  notFound: NotFoundData;
  Footer: FooterData;
}

/** Label + title (the second part is set in italics) + one short line, as in every section heading. */
export interface SectionIntroData {
  label: string;
  titleLine1: string;
  titleLine2: string;
  text: string;
}

export interface HeaderData extends ButtonData {
  topbarNote: string;
  nav: LinkItem[];
}

export interface HeroSlide {
  id: string;
  label: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface HeroData extends ButtonData, SecondaryButtonData {
  slides: HeroSlide[];
}

export interface AboutIntroData extends SectionIntroData, ButtonData {
  image: string;
  imageAlt: string;
  highlight: { value: string; label: string };
}

export interface FounderMessageData {
  label: string;
  quote: string;
  /** The button opens the founder's profile (the first team member). */
  buttonText: string;
  image: string;
  imageAlt: string;
}

export interface PracticePreviewData extends SectionIntroData, ButtonData {
  /** How many practice areas are shown */
  count: number;
  cardButton: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  /** Tall photo for the tiles */
  tileImage: string;
  overview: string;
  services: string[];
}

export interface PracticeAreasData extends SectionIntroData {
  perPage: number;
  cardButton: string;
  items: PracticeArea[];
}

export interface PracticeDetailData {
  overviewLabel: string;
  servicesLabel: string;
  moreLabel: string;
  moreTitle: string;
  moreCount: number;
  cardButton: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface StatsData {
  label: string;
  items: StatItem[];
  image: string;
  imageAlt: string;
}

export interface BlogPreviewData extends SectionIntroData, ButtonData {
  /** How many posts are shown */
  count: number;
}

export interface BlogBlock {
  /** "p" | "h2" | "quote" | "list" */
  type: string;
  text?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  url: string;
  category: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  content: BlogBlock[];
}

export interface BlogsData {
  /** Rows per page, not counting the featured post */
  perPage: number;
  cardButton: string;
  /** Word before the author name */
  byLabel: string;
  items: BlogPost[];
}

export interface BlogDetailData {
  byLabel: string;
  backText: string;
  backUrl: string;
}

export interface IconPoint {
  id: string;
  icon: string;
  title: string;
}

export interface WhyChooseUsData extends SectionIntroData, ButtonData {
  image: string;
  imageAlt: string;
  points: IconPoint[];
}

export interface CtaData extends ButtonData, SecondaryButtonData {
  label: string;
  titleLine1: string;
  titleLine2: string;
  image: string;
  imageAlt: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  text: string;
}

export interface AboutStoryData extends SectionIntroData {
  previousLabel: string;
  nextLabel: string;
  milestones: Milestone[];
}

export interface IconCard extends IconPoint {
  text: string;
}

export interface MissionVisionData extends SectionIntroData {
  image: string;
  imageAlt: string;
  items: IconCard[];
}

export interface CoreValuesData extends SectionIntroData {
  items: IconCard[];
}

export interface TeamMember {
  id: string;
  name: string;
  url: string;
  role: string;
  practice: string;
  experience: string;
  languages: string;
  image: string;
  imageAlt: string;
  bio: string;
  expertise: string[];
  socials: SocialLink[];
}

export interface TeamData extends SectionIntroData {
  perPage: number;
  items: TeamMember[];
}

export interface TeamDetailData extends ButtonData {
  aboutLabel: string;
  expertiseLabel: string;
  labels: { practice: string; experience: string; languages: string };
}

export interface ContactDetailsData extends SectionIntroData {
  labels: { address: string; phone: string; email: string };
}

export interface FieldText {
  label: string;
  placeholder?: string;
}

export interface ThankYouData {
  /** "{name}" is the visitor's first name */
  title: string;
  message: string;
}

export interface ContactFormData extends SectionIntroData {
  fields: Record<"name" | "email" | "phone" | "subject" | "message", FieldText>;
  submitLabel: string;
  sendingLabel: string;
  thankYou: ThankYouData;
  mapTitle: string;
}

export interface AppointmentData extends SectionIntroData {
  image: string;
  imageAlt: string;
  fields: Record<"name" | "email" | "phone" | "practice" | "date" | "time" | "message", FieldText>;
  timeSlots: string[];
  submitLabel: string;
  sendingLabel: string;
  thankYou: ThankYouData;
}

export interface LawSections {
  Header: { variants: { LawHeader1: HeaderData } };
  Hero: { variants: { LawHero1: HeroData } };
  AboutIntro: { variants: { LawAboutIntro1: AboutIntroData } };
  FounderMessage: { variants: { LawFounderMessage1: FounderMessageData } };
  PracticePreview: { variants: { LawPracticePreview1: PracticePreviewData } };
  PracticeAreas: { variants: { LawPracticeAreas1: PracticeAreasData } };
  PracticeDetail: { variants: { LawPracticeDetail1: PracticeDetailData } };
  Stats: { variants: { LawStats1: StatsData } };
  BlogPreview: { variants: { LawBlogPreview1: BlogPreviewData } };
  Blogs: { variants: { LawBlogs1: BlogsData } };
  BlogDetail: { variants: { LawBlogDetail1: BlogDetailData } };
  WhyChooseUs: { variants: { LawWhyChooseUs1: WhyChooseUsData } };
  Cta: { variants: { LawCta1: CtaData } };
  AboutStory: { variants: { LawAboutStory1: AboutStoryData } };
  MissionVision: { variants: { LawMissionVision1: MissionVisionData } };
  CoreValues: { variants: { LawCoreValues1: CoreValuesData } };
  Team: { variants: { LawTeam1: TeamData } };
  TeamDetail: { variants: { LawTeamDetail1: TeamDetailData } };
  ContactDetails: { variants: { LawContactDetails1: ContactDetailsData } };
  ContactForm: { variants: { LawContactForm1: ContactFormData } };
  Appointment: { variants: { LawAppointment1: AppointmentData } };
}

export interface TemplateComponentEntry {
  key: string;
  component: string;
}

export interface TemplateComponentsData {
  shared: {
    Header: string;
    Footer: string;
  };
  pages: Record<string, { components: TemplateComponentEntry[] }>;
}

export interface LawTemplateData {
  common: CommonData;
  categories: {
    Law: {
      sections: LawSections;
      templateComponents: TemplateComponentsData;
    };
  };
}
