import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFounderData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight } from "@/components/Icons";

/** Wix-style dark founder section: the name set huge across the top, a tall portrait and the quote side by side. */
export default function FounderMessage({ data = site.founderSection }: SectionProps<AurelianFounderData>) {
  const { label, quote, text, teamSlug, button } = data;
  // Name, role and photo come from the founder's Our Team profile, so they are edited in one place.
  const founder = site.teamPage.items.find((m) => m.slug === teamSlug);
  if (!founder) return null;

  return (
    <section className="overflow-hidden bg-wine-deep text-white section-space">
      <div className="container-site">
        <Eyebrow label={label} dark />
        <p data-reveal="words" className="mt-6 font-display text-[48px] font-semibold leading-[0.95] sm:text-[80px] lg:text-[120px] xl:text-[140px]">
          <Headline line1={founder.name} dot={false} />
        </p>

        <div className="mt-12 grid items-end gap-12 md:grid-cols-[0.8fr_1.2fr] lg:mt-16 lg:gap-20">
          <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden bg-wine">
            <span className="parallax absolute inset-0 block">
              <Image src={founder.image.src} alt={founder.image.alt} fill quality={85} sizes="(min-width: 768px) 38vw, 92vw" className="object-cover object-top" />
            </span>
          </div>

          <div className="pb-2">
            <blockquote data-reveal="words" className="display-2 italic text-gold-light">
              <Headline line1={quote} />
            </blockquote>
            <p data-reveal="up" data-delay="3" className="mt-6 max-w-[560px] text-[16px] leading-[1.8] text-white/70 lg:text-[17px]">
              {text}
            </p>
            <div data-reveal="up" data-delay="4" className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="label text-white/60">{founder.role}</p>
              <Link href={`/our-team/${founder.slug}`} className="btn btn-light shrink-0 self-start sm:self-auto">
                {button.label}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
