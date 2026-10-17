import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFooterData, type SectionProps } from "@/data";
import { ClockIcon, Mail, MapPin, Phone, SocialIcon } from "@/components/Icons";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass = "link-line text-[15px] text-white/70 transition-colors hover:text-gold-light";

function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="font-display text-[24px] font-semibold text-white">
      {children}
      <span aria-hidden="true" className="mt-3 flex items-center gap-2 text-gold">
        <span className="h-px w-8 bg-current" />
        <span className="diamond size-[6px]!" />
      </span>
    </h2>
  );
}

export default async function Footer({ data: footer = site.footer }: SectionProps<AurelianFooterData>) {
  const { contact } = footer;
  const { brand } = site.navbar;
  const practiceLinks = site.practicePage.items.slice(0, footer.practiceCount);
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative isolate overflow-hidden bg-wine-deep text-white">
      <div aria-hidden="true" className="pattern-dots absolute inset-y-0 right-0 -z-10 w-1/3 opacity-60" />

      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.3fr] lg:gap-10 lg:py-24">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={brand.name} className="inline-block">
            <Image src={brand.logoLight.src} alt={brand.logoLight.alt} width={brand.logoLight.width} height={brand.logoLight.height} quality={90} sizes="230px" className="h-auto w-[210px] sm:w-[230px]" />
          </Link>
          <p className="mt-7 max-w-[360px] text-[15px] leading-[1.75] text-white/70">{footer.statement}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={footer.socialsTitle}>
            {footer.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold"
                >
                  <SocialIcon name={s.name} className="size-[17px]" />
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
          <address className="mt-7 space-y-4 text-[15px] not-italic leading-[1.6] text-white/70">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold-light" />
              <span>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-gold-light" />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                {contact.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-gold-light" />
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <ClockIcon className="mt-0.5 size-5 shrink-0 text-gold-light" />
              {contact.hours}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-[13px] text-white/50 lg:flex-row lg:justify-between">
          <p>{copyright}</p>
          <p className="max-w-[640px]">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
