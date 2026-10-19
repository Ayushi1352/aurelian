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

/** Photo banner in the hero's style: breadcrumb as the small tracked label, title rising in word by word with a gold dot. */
export default function PageBanner({ data = site.pageBanner, title, image, parent }: PageBannerProps) {
  const { homeLabel, homeHref } = data;
  const separator = <li aria-hidden="true" className="h-px w-4 bg-white/40" />;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep pt-(--header-h) text-white">
      <Image src={image.src} alt="" fill priority quality={80} sizes="100vw" className="animate-hero-zoom -z-30 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-r from-wine-deep/90 via-wine-deep/70 to-wine-deep/40" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-black/40 to-transparent" />

      <div className="container-site flex min-h-[340px] flex-col justify-end pb-14 pt-20 sm:min-h-[420px] lg:min-h-[520px] lg:pb-20">
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
        <h1 data-words-now style={{ "--words-delay": "300ms" } as CSSProperties} className="mt-4 max-w-[900px] text-balance font-display text-[30px] font-semibold leading-[1.12] sm:text-[40px] lg:text-[50px]">
          <Headline line1={title} />
        </h1>
      </div>
    </section>
  );
}
