import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFounderData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight, QuoteMark } from "@/components/Icons";

/** Round portrait inside a slowly turning dashed gold ring, beside the founder's quote. */
export default function FounderMessage({ data = site.founderSection }: SectionProps<AurelianFounderData>) {
  const { label, quote, text, teamSlug, button } = data;
  // Name, role and photo come from the founder's Our Team profile, so they are edited in one place.
  const founder = site.teamPage.items.find((m) => m.slug === teamSlug);
  if (!founder) return null;

  return (
    <section className="bg-mist section-space overflow-hidden">
      <div className="container-site grid items-center gap-14 md:grid-cols-[5fr_7fr] lg:gap-20 xl:gap-28">
        <div data-reveal="zoom" className="relative mx-auto aspect-square w-full max-w-[420px]">
          <span aria-hidden="true" className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-gold/70" />
          <span aria-hidden="true" className="absolute inset-4 rounded-full border border-gold/30" />
          <div className="absolute inset-8 overflow-hidden rounded-full bg-wine">
            <Image src={founder.image.src} alt={founder.image.alt} fill quality={85} sizes="(min-width: 768px) 34vw, 86vw" className="object-cover object-top" />
          </div>
          <span aria-hidden="true" className="absolute bottom-[8%] right-[4%] grid size-20 place-items-center rounded-full bg-wine text-gold-light shadow-[0_16px_40px_rgba(37,10,16,0.3)] sm:size-24">
            <QuoteMark className="h-7 w-9" />
          </span>
        </div>

        <div>
          <Eyebrow label={label} />
          <blockquote data-reveal="words" className="display-2 mt-6 italic text-wine">
            <Headline line1={quote} />
          </blockquote>
          <p data-reveal="up" data-delay="3" className="mt-6 max-w-[600px] text-[16px] leading-[1.8] text-body lg:text-[17px]">
            {text}
          </p>
          <div data-reveal="up" data-delay="4" className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[30px] font-semibold italic leading-none text-ink">{founder.name}</p>
              <p className="label mt-3 text-gold">{founder.role}</p>
            </div>
            <Link href={`/our-team/${founder.slug}`} className="btn btn-primary shrink-0 self-start sm:self-auto">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
