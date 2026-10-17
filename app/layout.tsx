import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RevealOnScroll from "@/components/RevealOnScroll";
import { site } from "@/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.navbar.seo.title,
    template: `%s | ${site.navbar.brand.name}`,
  },
  description: site.navbar.seo.description,
};

/*
 * Brand colours and fonts come from site.json (Aurelian.theme). They override the defaults in the
 * globals.css @theme block, which stay in place as the fallback for any missing or invalid value.
 */
const { colors, fonts, fontsUrl } = site.theme;
const fontFallbacks: Record<string, string> = {
  display: "Georgia, serif",
  sans: "Arial, sans-serif",
};
const isHex = (v: string) => /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v);
const isFontName = (v: string) => /^[\w\s-]+$/.test(v);

const themeCss = `:root{${[
  ...Object.entries(colors)
    .filter(([, v]) => isHex(v))
    .map(([k, v]) => `--color-${k}:${v}`),
  ...Object.entries(fonts)
    .filter(([, v]) => isFontName(v))
    .map(([k, v]) => `--font-${k}:"${v}", ${fontFallbacks[k] ?? "sans-serif"}`),
].join(";")}}`;

// A CSS `@import url(...)` is dropped by the build, so the Google Fonts stylesheet is linked here instead.
const googleFontsUrl = fontsUrl.startsWith("https://fonts.googleapis.com/") ? fontsUrl : null;

/*
 * Runs before the first paint: the `motion` class hides `[data-reveal]` elements until they scroll
 * into view, so they don't flash in and then disappear on hydration. If the app script never
 * starts (blocked / failed JS), the class is removed again so no content stays hidden.
 */
const motionScript = `(function(d){d.classList.add("motion");setTimeout(function(){if(!window.__revealReady)d.classList.remove("motion")},3500)})(document.documentElement)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script adds the `motion` class before React hydrates.
    <html lang="en" data-scroll-behavior="smooth" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {googleFontsUrl && <link rel="stylesheet" href={googleFontsUrl} />}
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollToTop />
        <RevealOnScroll />
        <Navbar
          data={site.navbar}
          contact={site.footer.contact}
          socials={site.footer.socials}
          topBar={<TopBar data={site.navbar.topBar} contact={site.footer.contact} socials={site.footer.socials} />}
        />
        <main className="flex-1">{children}</main>
        <Footer data={site.footer} />
      </body>
    </html>
  );
}
