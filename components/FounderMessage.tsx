import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFounderData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { ArrowRight, QuoteMark } from "@/components/Icons";

export default function FounderMessage({ data = site.founderSection }: SectionProps<AurelianFounderData>) {
  const { label, quote, text, teamSlug, button } = data;
  // Name, role and photo come from the founder's Our Team profile, so they are edited in one place.
  const founder = site.teamPage.items.find((m) => m.slug === teamSlug);
  if (!founder) return null;

  return (
    <section className="bg-mist section-space">
      <div className="container-site grid items-center gap-14 md:grid-cols-[5fr_7fr] lg:gap-20 xl:gap-28">
        <div data-reveal="up" className="relative mx-auto w-full max-w-[440px] pr-5 pt-5">
          <span aria-hidden="true" className="arch absolute bottom-5 left-5 right-0 top-0 border border-gold/60" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-wine">
            <Image src={founder.image.src} alt={founder.image.alt} fill quality={85} sizes="(min-width: 768px) 36vw, 90vw" className="object-cover" />
          </div>
        </div>

        <div>
          <Eyebrow label={label} />
          <QuoteMark data-reveal="up" className="mt-8 h-9 w-12 text-gold/50" />
          <blockquote data-reveal="up" data-delay="1" className="display-2 mt-4 italic text-wine">
            {quote}
          </blockquote>
          <p data-reveal="up" data-delay="2" className="lead mt-6 max-w-[600px] text-body">
            {text}
          </p>
          <div data-reveal="up" data-delay="3" className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[30px] font-semibold italic leading-none text-ink">{founder.name}</p>
              <p className="label mt-3 text-gold">{founder.role}</p>
            </div>
            <Link href={`/our-team/${founder.slug}`} className="btn shrink-0 self-start bg-wine text-white hover:bg-gold sm:self-auto">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
