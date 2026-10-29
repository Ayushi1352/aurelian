import Image from "next/image";
import Link from "next/link";
import { site, type AurelianFounderData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight, QuoteMark } from "@/components/Icons";
import { ui } from "@/components/ui";

export default function FounderMessage({ data = site.founderSection }: SectionProps<AurelianFounderData>) {
  const { label, quote, button, image } = data;
  // Name and role come from the founder's Our Team profile (the first team member).
  const founder = site.teamPage.items[0];

  return (
    <section className="grid bg-navy-deep text-white lg:min-h-[min(calc(100svh_-_5.5625rem),60rem)] lg:grid-cols-2">
      <div className={`order-2 flex flex-col justify-center ${ui.sectionSpace} px-5 sm:px-10 lg:order-1 lg:px-24`}>
        <Eyebrow label={label} dark />
        <QuoteMark data-reveal="fade" data-delay="1" className="mt-8 h-9 w-12 text-gold/70 lg:mt-10 lg:h-11 lg:w-[3.75rem]" />
        <blockquote data-reveal="words" className={`${ui.display2} mt-6 max-w-[35rem] italic text-gold-light`}>
          <Headline line1={quote} />
        </blockquote>

        <div data-reveal="up" data-delay="3" className="mt-10 border-t border-white/15 pt-7 lg:mt-12">
          <p className="font-display text-[2rem] font-semibold leading-none lg:text-[2.375rem]">{founder.name}</p>
          <p className={`${ui.label} mt-3 text-white/60`}>{founder.role}</p>
          <Link href={founder.href} className={`${ui.btnLight} mt-8`}>
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div data-reveal="wipe" className="relative order-1 h-[50svh] min-h-[21.25rem] overflow-hidden sm:h-[60svh] lg:order-2 lg:h-auto lg:min-h-0">
        <Image src={image.src} alt={image.alt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
        <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/40 via-transparent to-transparent" />
        <span aria-hidden="true" className="absolute inset-5 border border-gold/50 sm:inset-8" />
      </div>
    </section>
  );
}
