import Link from "next/link";
import { site, type AurelianSitemapData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "@/components/Icons";

const pad = (n: number) => String(n).padStart(2, "0");

// Links are built from the existing data, so new pages, posts and team members appear automatically.
export default function SitemapLinks({ data = site.sitemapPage }: SectionProps<AurelianSitemapData>) {
  const { label, titleLine1, titleLine2, text, pagesLabel } = data;
  const { navbar, practicePage, teamPage, blogPage, footer } = site;

  const groups = [
    { title: pagesLabel, links: [...navbar.navigation, navbar.appointmentButton] },
    { title: practicePage.bannerTitle, links: practicePage.items.map((p) => ({ label: p.title, href: `/practice-areas/${p.slug}` })) },
    { title: teamPage.bannerTitle, links: teamPage.items.map((m) => ({ label: m.name, href: `/our-team/${m.slug}` })) },
    { title: blogPage.bannerTitle, links: blogPage.items.map((b) => ({ label: b.title, href: `/blogs/${b.slug}` })) },
    { title: footer.legalLinksLabel, links: footer.legalLinks },
  ];

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />

        <div className="mt-14 lg:mt-20">
          {groups.map((g, i) => (
            <div key={g.title} data-reveal="up" className="grid gap-6 border-t border-line py-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-12 lg:py-14">
              <div>
                <span className="label text-[10px]! text-gold">{pad(i + 1)}</span>
                <h2 className="display-3 mt-3 text-ink">{g.title}</h2>
              </div>
              <ul className="grid sm:grid-cols-2 sm:gap-x-8 xl:grid-cols-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group flex h-full items-center justify-between gap-4 border-b border-line py-4 text-[16px] leading-snug text-ink transition-colors hover:text-navy"
                    >
                      <span>{l.label}</span>
                      <ArrowRight className="size-4 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
