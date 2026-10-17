import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFooterData, type SectionProps } from "@/data";
import { Headline } from "@/components/SplitWords";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, SocialIcon } from "@/components/Icons";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass = "link-line text-[15px] text-white/65 transition-colors hover:text-white";

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="label text-gold-light">{children}</h2>;
}

/** Big "let's talk" line with the booking button, then brand, link and contact columns, then the legal line. */
export default async function Footer({ data: footer = site.footer }: SectionProps<AurelianFooterData>) {
  const { contact } = footer;
  const { brand } = site.navbar;
  const practiceLinks = site.practicePage.items.slice(0, footer.practiceCount);
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-wine-deep text-white">
      <div className="container-site flex flex-col gap-8 border-b border-white/10 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div>
          <p className="label flex items-center gap-4 text-white/60">
            <span aria-hidden="true" data-reveal="line" className="h-px w-10 bg-gold" />
            {footer.ctaLabel}
          </p>
          <h2 data-reveal="words" className="mt-5 font-display text-[36px] font-semibold leading-[1.08] sm:text-[48px] lg:text-[60px]">
            <Headline line1={footer.ctaTitle} />
          </h2>
        </div>
        <div data-reveal="up" data-delay="3" className="flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <Link href={footer.ctaButton.href} className="btn btn-gold self-start lg:self-end">
            {footer.ctaButton.label}
            <ArrowRight className="size-4" />
          </Link>
          <a href={`mailto:${contact.email}`} className="group flex items-center gap-2 font-display text-[22px] font-semibold text-white/80 transition-colors hover:text-gold-light">
            {contact.email}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.3fr] lg:gap-10 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={brand.name} className="inline-block">
            <Image src={brand.logoLight.src} alt={brand.logoLight.alt} width={brand.logoLight.width} height={brand.logoLight.height} quality={90} sizes="220px" className="h-auto w-[200px] sm:w-[220px]" />
          </Link>
          <p className="mt-7 max-w-[340px] text-[15px] leading-[1.75] text-white/60">{footer.statement}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={footer.socialsTitle}>
            {footer.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center border border-white/15 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <SocialIcon name={s.name} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>{footer.quickLinksTitle}</ColumnTitle>
          <ul className="mt-7 space-y-3">
            {footer.quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>{footer.practiceTitle}</ColumnTitle>
          <ul className="mt-7 space-y-3">
            {practiceLinks.map((p) => (
              <li key={p.slug}>
                <Link href={`/practice-areas/${p.slug}`} className={linkClass}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>{footer.contactTitle}</ColumnTitle>
          <address className="mt-7 space-y-4 text-[15px] not-italic leading-[1.6] text-white/65">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-gold" />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                {contact.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-gold" />
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </p>
            <p className="pl-8 text-white/50">{contact.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-[13px] text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <p>{copyright}</p>
          <p className="max-w-[560px]">{footer.disclaimer}</p>
          <a href="#" className="label inline-flex items-center gap-3 text-[10px]! text-white/60 transition-colors hover:text-gold-light">
            {footer.backToTop}
            <span className="grid size-9 place-items-center border border-white/20">
              <ArrowRight className="size-3.5 -rotate-90" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
