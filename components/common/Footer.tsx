import Image from 'next/image';
import Link from 'next/link';
import type { FooterProps } from '@/types/templates.types';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { fill, lines } from '@/components/ui/text';

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
const currentYear = async () => {
  'use cache';
  return new Date().getFullYear();
};

const linkClass = `${ui.linkLine} text-[0.9375rem] text-white/65 hover:text-white`;

const ColumnTitle = ({ children }: { children: string }) => <h2 className={`${ui.label} text-gold-light`}>{children}</h2>;

export const Footer = async ({ data }: FooterProps) => {
  if (!data) return null;
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep text-white">
      <div className={`${ui.container} grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_16.25rem] lg:gap-16 lg:py-20`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={data.logoUrl} aria-label={data.logoLabel} className="inline-block">
            <Image src={data.logo} alt={data.logoAlt} width={data.logoWidth} height={data.logoHeight} quality={90} sizes="220px" className="h-auto w-[12.5rem] sm:w-[13.75rem]" />
          </Link>
          <p className="mt-7 max-w-[21.25rem] text-[0.9375rem] leading-[1.75] text-white/60">{data.description}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={data.socialsTitle}>
            {data.socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center border border-white/15 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <Icon name={social.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>{data.quickLinksTitle}</ColumnTitle>
          <ul className="mt-7 space-y-3">
            {data.quickLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.url} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>{data.contactTitle}</ColumnTitle>
          <address className="mt-7 space-y-4 text-[0.9375rem] not-italic leading-[1.6] text-white/65">
            {data.contactItems.map((item) => (
              <p key={item.id} className="flex gap-3">
                <Icon name={item.icon} className="mt-0.5 size-5 shrink-0 text-gold" />
                {item.url ? (
                  <a href={item.url} className={linkClass}>
                    {item.value}
                  </a>
                ) : (
                  <span>
                    {lines(item.value).map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                )}
              </p>
            ))}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${ui.container} py-6 text-center text-[0.8125rem] text-white/45`}>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};
