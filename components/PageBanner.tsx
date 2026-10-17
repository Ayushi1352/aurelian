import Image from "next/image";
import Link from "next/link";
import { site, type AurelianImage, type AurelianPageBannerData, type SectionProps } from "@/data";

type PageBannerProps = SectionProps<AurelianPageBannerData> & {
  /** The page's `bannerTitle` (same as its navbar label), or the item title on a detail page. */
  title: string;
  /** Full-width photo behind the title: the page's `bannerImage`, or the item's own image. */
  image: AurelianImage;
  /** Optional middle crumb, e.g. Practice Areas on a practice area detail page. */
  parent?: { label: string; href: string };
};

/** Photo banner under a wine tint with the title and breadcrumb centred. */
export default function PageBanner({ data = site.pageBanner, title, image, parent }: PageBannerProps) {
  const { homeLabel, homeHref } = data;
  const separator = <li aria-hidden="true" className="diamond size-[6px]! text-gold-light" />;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep text-white">
      <Image src={image.src} alt="" fill priority quality={80} sizes="100vw" className="animate-hero-zoom -z-30 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-wine-deep/80" />
      <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10" />

      <div className="container-site flex min-h-[300px] flex-col items-center justify-center py-16 text-center sm:min-h-[360px] lg:min-h-[420px]">
        {/* Long titles (blog posts) step down one size so they stay within a few lines. */}
        <h1 data-reveal="up" className={`${title.length > 28 ? "display-2" : "display-1"} max-w-[1000px] text-balance`}>
          {title}
        </h1>
        <nav aria-label="Breadcrumb" data-reveal="up" data-delay="1" className="mt-7">
          <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-[14px] text-white/75 backdrop-blur-sm">
            <li>
              <Link href={homeHref} className="link-line transition-colors hover:text-white">
                {homeLabel}
              </Link>
            </li>
            {parent && (
              <>
                {separator}
                <li>
                  <Link href={parent.href} className="link-line transition-colors hover:text-white">
                    {parent.label}
                  </Link>
                </li>
              </>
            )}
            {separator}
            <li aria-current="page" className="line-clamp-1 text-gold-light">
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
