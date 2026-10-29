import Image from "next/image";
import Link from "next/link";
import { site, type AurelianImage, type AurelianPageBannerData, type SectionProps } from "@/data";
import { Headline } from "@/components/SplitWords";
import { ui } from "@/components/ui";
import { introHidden, introLine, kenburnsStart } from "@/components/motion";

type PageBannerProps = SectionProps<AurelianPageBannerData> & {
  /** The page's `bannerTitle` (same as its navbar label), or the item title on a detail page. */
  title: string;
  /** Full-width photo behind the title: the page's `bannerImage`, or the item's own image. */
  image: AurelianImage;
  /** Optional middle crumb, e.g. Practice Areas on a practice area detail page. */
  parent?: { label: string; href: string };
};

export default function PageBanner({ data = site.pageBanner, title, image, parent }: PageBannerProps) {
  const { homeLabel, homeHref, breadcrumbLabel } = data;
  const separator = <li aria-hidden="true" className="h-px w-4 bg-white/40" />;

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image src={image.src} alt="" fill priority quality={75} sizes="100vw" data-intro="kenburns" className={`${kenburnsStart} -z-30 object-cover`} />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />

      <div className={`${ui.container} flex min-h-[23.75rem] flex-col justify-end pb-10 pt-24 sm:min-h-[28.75rem] lg:min-h-[35rem] lg:pb-14`}>
        <h1
          data-words-now
          data-words-delay="300"
          className="max-w-[68.75rem] text-balance font-display text-[clamp(2.375rem,6vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.01em]"
        >
          <Headline line1={title} />
        </h1>

        <div className="mt-10 border-t border-white/20 pt-6 lg:mt-14">
          <nav aria-label={breadcrumbLabel}>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-[0.75rem]">
              <li aria-hidden="true" data-intro="line" className={`h-px w-10 bg-gold ${introLine}`} />
              <li data-intro="fade" data-intro-delay="200" className={introHidden}>
                <Link href={homeHref} className={`${ui.linkLine} hover:text-white`}>
                  {homeLabel}
                </Link>
              </li>
              {parent && (
                <>
                  {separator}
                  <li data-intro="fade" data-intro-delay="300" className={introHidden}>
                    <Link href={parent.href} className={`${ui.linkLine} hover:text-white`}>
                      {parent.label}
                    </Link>
                  </li>
                </>
              )}
              {separator}
              <li aria-current="page" data-intro="fade" data-intro-delay="400" className={`line-clamp-1 text-gold-light ${introHidden}`}>
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
