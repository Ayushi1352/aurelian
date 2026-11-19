import type { CSSProperties } from 'react';

// Types for data/templates.json. Keep them in step when the JSON changes.

// ── Shared pieces ──

/** Page title and description for the browser tab and search results (spread into a page's metadata). */
export interface SeoData {
  title: string;
  description: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface SocialLink {
  id: string;
  /** react-icons name, e.g. "FaLinkedinIn" (see components/ui/Icon.tsx) */
  icon: string;
  label: string;
  url: string;
}

/** A list item that is just a line of text. */
export interface TextItem {
  id: string;
  text: string;
}

/** Label + title (the highlight is set in italics) + one short line, as in every section heading. */
export interface SectionIntroData {
  label: string;
  title: string;
  titleHighlight: string;
  text: string;
}

/** Labels and icons of the page numbers under a paged list; "{n}" is the page number. */
export interface PaginationData {
  label: string;
  previousLabel: string;
  previousIcon: string;
  nextLabel: string;
  nextIcon: string;
  pageLabel: string;
}

export interface FormField {
  label: string;
  placeholder?: string;
}

/** Submit button of a form and the thank-you message shown after it is sent. */
export interface FormSubmitLabels {
  buttonText: string;
  buttonIcon: string;
  sendingText: string;
  successIcon: string;
  /** "{name}" is the visitor's first name */
  successTitle: string;
  successText: string;
  closeMessageLabel: string;
  closeMessageIcon: string;
}

// ── Common ──

export interface ThemeFonts {
  /** Body text, e.g. "var(--font-nunito-sans), Arial, sans-serif" (the font is loaded in app/layout.tsx) */
  primary: string;
  /** Serif headlines */
  heading: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

/** CSS variables layout.tsx sets on <html> from common.theme.fonts. */
export type ThemeFontVariables = CSSProperties & {
  '--font-primary': string;
  '--font-heading': string;
};

export interface SiteMetadataData {
  title: string;
  siteName: string;
  description: string;
  icon: string;
  lang: string;
}

/** Only the breadcrumb reads these; every section keeps its own labels in its data. */
export interface GlobalUIData {
  breadcrumbLabel: string;
}

/** One step of the breadcrumb trail; the last step is the current page (no url). */
export interface BreadcrumbPath {
  id: string;
  label: string;
  url?: string;
}

/** Page banner: title over a photo, with the breadcrumb trail. */
export interface BreadcrumbData {
  title: string;
  image: string;
  imageAlt: string;
  seo: SeoData;
  paths: BreadcrumbPath[];
}

export interface BreadcrumbProps {
  data?: BreadcrumbData;
  ui?: GlobalUIData;
}

export interface NotFoundData {
  seo: SeoData;
  code: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
}

export interface NotFoundProps {
  data?: NotFoundData;
}

/** Address, phone or email line of the footer; "\n" starts a new line. Items with a url are links. */
export interface ContactItem {
  id: string;
  icon: string;
  value: string;
  url?: string;
}

export interface FooterData {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoUrl: string;
  logoLabel: string;
  description: string;
  socialsTitle: string;
  socialLinks: SocialLink[];
  quickLinksTitle: string;
  quickLinks: LinkItem[];
  contactTitle: string;
  contactItems: ContactItem[];
  /** "{year}" is the current year */
  copyrightText: string;
}

export interface FooterProps {
  data?: FooterData;
}

export interface CommonData {
  theme: ThemeData;
  metadata: SiteMetadataData;
  globalUI: GlobalUIData;
  aboutBreadcrumb?: BreadcrumbData;
  practiceAreasBreadcrumb?: BreadcrumbData;
  practiceDetailBreadcrumb?: BreadcrumbData;
  teamBreadcrumb?: BreadcrumbData;
  teamDetailBreadcrumb?: BreadcrumbData;
  blogsBreadcrumb?: BreadcrumbData;
  blogDetailBreadcrumb?: BreadcrumbData;
  contactBreadcrumb?: BreadcrumbData;
  appointmentBreadcrumb?: BreadcrumbData;
  notFound?: NotFoundData;
  Footer?: FooterData;
}

// ── Sections ──

export interface HeaderData {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoUrl: string;
  logoLabel: string;
  /** Light logo of the dark mobile menu (same size and alt text) */
  menuLogo: string;
  topbarNote: string;
  phone: string;
  phoneUrl: string;
  phoneIcon: string;
  email: string;
  emailUrl: string;
  emailIcon: string;
  socialLinks: SocialLink[];
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
  menuLabel: string;
  mobileMenuLabel: string;
  menuDialogLabel: string;
  openMenuLabel: string;
  openMenuIcon: string;
  closeMenuLabel: string;
  closeMenuIcon: string;
}

export interface HeaderProps {
  data?: HeaderData;
}

export interface HeroSlide {
  id: string;
  label: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface HeroData {
  slides: HeroSlide[];
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  /** Time each slide stays up while the slider auto-plays */
  sliderIntervalMs: number;
  carouselLabel: string;
  /** "{n}" is the slide number */
  slideLabel: string;
  previousLabel: string;
  previousIcon: string;
  nextLabel: string;
  nextIcon: string;
}

export interface HeroSectionProps {
  data?: HeroData;
}

export interface AboutUsData extends SectionIntroData {
  buttonText: string;
  buttonUrl: string;
  image: string;
  imageAlt: string;
  highlight: { value: string; label: string };
}

export interface AboutUsProps {
  data?: AboutUsData;
  /** Hides the "More About Us" link, for the About page itself. */
  hideButton?: boolean;
}

export interface FounderMessageData {
  label: string;
  quoteIcon: string;
  quote: string;
  name: string;
  role: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
  image: string;
  imageAlt: string;
}

export interface FounderMessageProps {
  data?: FounderMessageData;
}

export interface PracticeArea {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  image: string;
  imageAlt: string;
  /** Tall photo for the tiles */
  tileImage: string;
  overview: string;
  services: TextItem[];
}

/** Heading of the home page version of a section, with its "view all" link. */
export interface HomeHeadingData extends SectionIntroData {
  buttonText: string;
  buttonUrl: string;
}

export interface PracticeHomeData extends HomeHeadingData {
  /** Screen-reader text of a tile; "{title}" is the practice area */
  cardLabel: string;
}

/** Labels of the practice details page */
export interface PracticeDetailData {
  overviewLabel: string;
  servicesLabel: string;
  moreLabel: string;
  moreTitle: string;
  /** Tiles under "Other Practice Areas" */
  moreItemIds: string[];
}

/** Every practice area; the home page, the Practice Areas page and the detail page each pick theirs by id. */
export interface PracticeAreasData {
  home: PracticeHomeData;
  intro: SectionIntroData;
  /** Screen-reader text of a tile; "{title}" is the practice area */
  cardLabel: string;
  cardIcon: string;
  /** Tiles per page on the Practice Areas page */
  perPage: number;
  pagination: PaginationData;
  detail: PracticeDetailData;
  homeItemIds: string[];
  listingItemIds: string[];
  /** Practice area the common /practice-areas/practice-details page shows */
  detailItemId: string;
  items: PracticeArea[];
}

export interface PracticeAreasProps {
  data?: PracticeAreasData;
  /** true on the Practice Areas page: the paged grid of listingItemIds instead of the home tiles */
  showAll?: boolean;
}

export interface PracticeDetailProps {
  data?: PracticeAreasData;
  itemId?: string;
}

export interface PracticeCardProps {
  item: PracticeArea;
  /** "{title}" is the practice area */
  label: string;
  icon: string;
  delay?: number;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface StatsData {
  label: string;
  image: string;
  imageAlt: string;
  /** How long the numbers take to count up */
  counterDurationMs: number;
  items: StatItem[];
}

export interface StatsProps {
  data?: StatsData;
}

/** One part of a post: "p", "h2" and "quote" have `text`, "list" has `items`. */
export interface BlogBlock {
  id: string;
  type: string;
  text?: string;
  items?: TextItem[];
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

export interface BlogMetaData {
  /** Word before the author name */
  byLabel: string;
  authorIcon: string;
  dateIcon: string;
}

/** Labels of the blog details page */
export interface BlogDetailData {
  backText: string;
  backUrl: string;
  /** Tick in front of list items in a post */
  listIcon: string;
}

/** Every blog post; the home page, the Blogs page and the detail page each pick theirs by id. */
export interface BlogsData {
  home: HomeHeadingData;
  meta: BlogMetaData;
  readLabel: string;
  readIcon: string;
  /** Rows per page on the Blogs page, not counting the featured post */
  perPage: number;
  pagination: PaginationData;
  detail: BlogDetailData;
  homePostIds: string[];
  listingPostIds: string[];
  /** Post the common /blogs/blog-details page shows */
  detailPostId: string;
  posts: BlogPost[];
}

export interface BlogsProps {
  data?: BlogsData;
  /** true on the Blogs page: the featured post and paged rows of listingPostIds instead of the home cards */
  showAll?: boolean;
}

export interface BlogDetailProps {
  data?: BlogsData;
  postId?: string;
}

export interface IconPoint {
  id: string;
  icon: string;
  title: string;
}

export interface WhyChooseUsData extends SectionIntroData {
  image: string;
  imageAlt: string;
  points: IconPoint[];
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
}

export interface WhyChooseUsProps {
  data?: WhyChooseUsData;
}

export interface CtaData {
  label: string;
  title: string;
  titleHighlight: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  image: string;
  imageAlt: string;
}

export interface CtaProps {
  data?: CtaData;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  text: string;
}

export interface AboutStoryData extends SectionIntroData {
  previousLabel: string;
  previousIcon: string;
  nextLabel: string;
  nextIcon: string;
  milestones: Milestone[];
}

export interface AboutStoryProps {
  data?: AboutStoryData;
}

export interface IconCard extends IconPoint {
  text: string;
}

export interface MissionVisionData extends SectionIntroData {
  image: string;
  imageAlt: string;
  items: IconCard[];
}

export interface MissionVisionProps {
  data?: MissionVisionData;
}

export interface CoreValuesData extends SectionIntroData {
  items: IconCard[];
}

export interface CoreValuesProps {
  data?: CoreValuesData;
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
  expertise: TextItem[];
  socials: SocialLink[];
}

/** Labels of the team details page */
export interface TeamDetailData {
  aboutLabel: string;
  practiceLabel: string;
  experienceLabel: string;
  languagesLabel: string;
  expertiseLabel: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
}

/** Every team member; the Our Team page lists them all and the detail page shows detailMemberId. */
export interface TeamData extends SectionIntroData {
  /** Cards per page */
  perPage: number;
  pagination: PaginationData;
  /** "{name}" and "{platform}" are filled in */
  socialProfileLabel: string;
  detail: TeamDetailData;
  /** Member the common /our-team/team-details page shows */
  detailMemberId: string;
  items: TeamMember[];
}

export interface TeamProps {
  data?: TeamData;
}

export interface TeamDetailProps {
  data?: TeamData;
  memberId?: string;
}

export interface ContactCard extends ContactItem {
  label: string;
}

export interface ContactDetailsData extends SectionIntroData {
  /** "\n" in a value starts a new line */
  contactItems: ContactCard[];
}

export interface ContactDetailsProps {
  data?: ContactDetailsData;
}

export interface ContactFormData extends SectionIntroData, FormSubmitLabels {
  fields: Record<'name' | 'email' | 'phone' | 'subject' | 'message', FormField>;
  mapLabel: string;
  mapEmbedUrl: string;
}

export interface ContactFormProps {
  data?: ContactFormData;
}

export interface AppointmentData extends SectionIntroData, FormSubmitLabels {
  image: string;
  imageAlt: string;
  fields: Record<'name' | 'email' | 'phone' | 'practice' | 'date' | 'time' | 'message', FormField>;
  selectIcon: string;
  practiceOptions: string[];
  timeOptions: string[];
}

export interface AppointmentProps {
  data?: AppointmentData;
}

// ── Whole file ──

export interface LawSections {
  Header?: { variants?: { LawHeader1?: HeaderData } };
  Hero?: { variants?: { LawHero1?: HeroData } };
  AboutUs?: { variants?: { LawAboutUs1?: AboutUsData } };
  FounderMessage?: { variants?: { LawFounderMessage1?: FounderMessageData } };
  PracticeAreas?: { variants?: { LawPracticeAreas1?: PracticeAreasData } };
  Stats?: { variants?: { LawStats1?: StatsData } };
  Blogs?: { variants?: { LawBlogs1?: BlogsData } };
  WhyChooseUs?: { variants?: { LawWhyChooseUs1?: WhyChooseUsData } };
  Cta?: { variants?: { LawCta1?: CtaData } };
  AboutStory?: { variants?: { LawAboutStory1?: AboutStoryData } };
  MissionVision?: { variants?: { LawMissionVision1?: MissionVisionData } };
  CoreValues?: { variants?: { LawCoreValues1?: CoreValuesData } };
  Team?: { variants?: { LawTeam1?: TeamData } };
  ContactDetails?: { variants?: { LawContactDetails1?: ContactDetailsData } };
  ContactForm?: { variants?: { LawContactForm1?: ContactFormData } };
  Appointment?: { variants?: { LawAppointment1?: AppointmentData } };
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
