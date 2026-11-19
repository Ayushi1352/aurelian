import type { Metadata } from 'next';
import { Cormorant_Infant, Nunito_Sans } from 'next/font/google';
import rawData from '@/data/templates.json';
import type { LawTemplateData, ThemeFontVariables } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import './globals.css';

const cormorantInfant = Cormorant_Infant({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], display: 'swap', fallback: ['Georgia', 'serif'], variable: '--font-cormorant-infant' });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'], display: 'swap', fallback: ['Arial', 'sans-serif'], variable: '--font-nunito-sans' });

const templateData: LawTemplateData = rawData;
const sectionData = templateData.categories.Law.sections;
const commonData = templateData.common;

// Which font each part of the site uses comes from templates.json (common.theme.fonts).
const { fonts } = commonData.theme;
const fontVariables: ThemeFontVariables = {
  '--font-primary': fonts.primary,
  '--font-heading': fonts.heading,
};

export const metadata: Metadata = {
  title: {
    default: commonData.metadata.title,
    template: `%s | ${commonData.metadata.siteName}`,
  },
  description: commonData.metadata.description,
  icons: {
    icon: commonData.metadata.icon,
    shortcut: commonData.metadata.icon,
    apple: commonData.metadata.icon,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={fontVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1440px design (1rem = 1/90 of the screen, at most 16px),
      // so laptops show the whole desktop layout scaled down; width only, so browser zoom keeps the same layout.
      // Everything clickable gets the pointer; with reduced motion turned on nothing animates (":not(#n)" only raises
      // the selector above each element's own transition classes, so no !important is needed).
      className={`${cormorantInfant.variable} ${nunitoSans.variable} text-[16px] lg:text-[length:min(16px,calc(100vw/90))] scroll-smooth antialiased [&_:where(a[href],button:not(:disabled),select,summary,[role=button],[role=tab],label:has(input[type=radio]),label:has(input[type=checkbox]),input[type=date],input[type=radio],input[type=checkbox],input[type=submit])]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_input[type=date]::-webkit-calendar-picker-indicator]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*:not(#n)]:transition-none`}
    >
      <body className="min-h-screen">
        <ScrollReveal />
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the
          screen, so nothing changes; on wider screens or when the browser is zoomed out the page stays
          in the middle with equal space on both sides instead of stretching.
        */}
        <div className="mx-auto flex min-h-screen w-full max-w-[120rem] flex-col overflow-x-clip bg-white">
          <Header data={sectionData.Header?.variants?.LawHeader1} />
          <ScrollToTop>{children}</ScrollToTop>
          <Footer data={commonData.Footer} />
        </div>
      </body>
    </html>
  );
}
