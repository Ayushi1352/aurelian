import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFooterData, type SectionProps } from "@/data";
import { Mail, MapPin, Phone, SocialIcon } from "@/components/Icons";
import { ui } from "@/components/ui";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass = `${ui.linkLine} text-[0.9375rem] text-white/65 hover:text-white`;

function ColumnTitle({ children }: { children: string }) {
  return <h2 className={`${ui.label} text-gold-light`}>{children}</h2>;
}

export default async function Footer({ data: footer = site.footer }: SectionProps<AurelianFooterData>) {
  const { contact } = footer;
  const { brand } = site.navbar;
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep text-white">
      <div className={`${ui.container} grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_16.25rem] lg:gap-16 lg:py-20`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={brand.name} className="inline-block">
            <Image src={brand.logoLight.src} alt={brand.logoLight.alt} width={brand.logoLight.width} height={brand.logoLight.height} quality={90} sizes="220px" className="h-auto w-[12.5rem] sm:w-[13.75rem]" />
          </Link>
          <p className="mt-7 max-w-[21.25rem] text-[0.9375rem] leading-[1.75] text-white/60">{footer.statement}</p>
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
          <ColumnTitle>{footer.contactTitle}</ColumnTitle>
          <address className="mt-7 space-y-4 text-[0.9375rem] not-italic leading-[1.6] text-white/65">
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
        <div className={`${ui.container} flex flex-col gap-4 py-6 text-[0.8125rem] text-white/45 md:flex-row md:items-center md:justify-between`}>
          <p>{copyright}</p>
          <nav aria-label={footer.legalLinksLabel}>
            <ul className="flex flex-wrap items-center gap-y-2">
              {footer.legalLinks.map((l, i) => (
                <li key={l.href} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="mx-4 h-3.5 w-px bg-white/20" />}
                  <Link href={l.href} className={`${ui.linkLine} text-[0.875rem] text-white/65 hover:text-white`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
