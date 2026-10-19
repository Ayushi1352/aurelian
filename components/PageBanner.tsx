import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { site, type AurelianImage, type AurelianPageBannerData, type SectionProps } from "@/data";
import { Headline } from "@/components/SplitWords";

type PageBannerProps = SectionProps<AurelianPageBannerData> & {
  /** The page's `bannerTitle` (same as its navbar label), or the item title on a detail page. */
  title: string;
  /** Full-width photo behind the title: the page's `bannerImage`, or the item's own image. */
  image: AurelianImage;
  /** Optional middle crumb, e.g. Practice Areas on a practice area detail page. */
  parent?: { label: string; href: string };
};

/*
 * Wix-style inner banner: a tall photo under the transparent header, the title set very large at
 * the bottom left (words rise in, gold dot), and the breadcrumb on a hairline beneath it.
 */
export default function PageBanner({ data = site.pageBanner, title, image, parent }: PageBannerProps) {
  const { homeLabel, homeHref } = data;
  const separator = <li aria-hidden="true" className="h-px w-4 bg-white/40" />;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep pt-(--header-h) text-white">
      <Image src={image.src} alt="" fill priority quality={80} sizes="100vw" className="animate-hero-zoom -z-30 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-r from-wine-deep/90 via-wine-deep/65 to-wine-deep/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-wine-deep/80 via-transparent to-black/40" />

      <div className="container-site flex min-h-[420px] flex-col justify-end pb-10 pt-24 sm:min-h-[520px] lg:min-h-[640px] lg:pb-14">
        <h1
          data-words-now
          style={{ "--words-delay": "300ms" } as CSSProperties}
          className="max-w-[1100px] text-balance font-display text-[clamp(38px,6vw,92px)] font-semibold leading-[1.02] tracking-[-0.01em]"
        >
          <Headline line1={title} />
        </h1>

        <div className="mt-10 border-t border-white/20 pt-6 lg:mt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-[12px]">
              <li aria-hidden="true" className="h-px w-10 origin-left animate-[hero-rule_0.8s_var(--ease-out)_both] bg-gold" />
              <li className="animate-[fade-in_0.8s_var(--ease-out)_0.2s_both]">
                <Link href={homeHref} className="link-line transition-colors hover:text-white">
                  {homeLabel}
                </Link>
              </li>
              {parent && (
                <>
                  {separator}
                  <li className="animate-[fade-in_0.8s_var(--ease-out)_0.3s_both]">
                    <Link href={parent.href} className="link-line transition-colors hover:text-white">
                      {parent.label}
                    </Link>
                  </li>
                </>
              )}
              {separator}
              <li aria-current="page" className="line-clamp-1 animate-[fade-in_0.8s_var(--ease-out)_0.4s_both] text-gold-light">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
