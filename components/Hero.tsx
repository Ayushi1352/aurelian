import Image from "next/image";
import Link from "next/link";
import { site, type AurelianHeroData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { ArrowRight, FeatureIcon } from "@/components/Icons";

/** Wine split hero: headline, intro and trust numbers on the left, arched portrait with a badge on the right. */
export default function Hero({ data = site.hero }: SectionProps<AurelianHeroData>) {
  const { label, titleLine1, titleLine2, text, button, secondaryButton, image, portrait, highlights, badge } = data;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep text-white">
      <Image src={image.src} alt="" fill priority quality={80} sizes="100vw" className="animate-hero-zoom -z-30 object-cover opacity-40" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-r from-wine-deep via-wine-deep/90 to-wine-dark/80" />
      <div aria-hidden="true" className="pattern-dots absolute inset-y-0 right-0 -z-10 w-1/2" />

      <div className="container-site grid items-center gap-14 py-16 sm:py-20 lg:min-h-[calc(100svh-136px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24 xl:gap-24">
        <div>
          <Eyebrow label={label} dark />
          <h1 data-reveal="up" data-delay="1" className="display-1 mt-6">
            {titleLine1}
            <span className="block italic text-gold-light">{titleLine2}</span>
          </h1>
          <p data-reveal="up" data-delay="2" className="lead mt-7 max-w-[560px] text-white/75">
            {text}
          </p>
          <div data-reveal="up" data-delay="3" className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Link href={button.href} className="btn bg-gold text-white hover:bg-gold-bright">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={secondaryButton.href} className="btn border border-white/30 text-white hover:border-white hover:bg-white hover:text-wine-deep">
              {secondaryButton.label}
            </Link>
          </div>

          <dl data-reveal="up" data-delay="4" className="mt-12 grid max-w-[560px] grid-cols-3 border-t border-white/15 pt-8 lg:mt-14">
            {highlights.map((h, i) => (
              <div key={h.label} className={`flex flex-col ${i > 0 ? "border-l border-white/15 pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}>
                <dt className="order-2 mt-2 text-[13px] leading-snug text-white/60 sm:text-[14px]">{h.label}</dt>
                <dd className="order-1 font-display text-[30px] font-semibold leading-none text-gold-light sm:text-[40px]">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Arched portrait inside an offset gold outline, with a floating badge */}
        <div data-reveal="zoom" data-delay="2" className="relative mx-auto w-full max-w-[420px] pr-4 pt-4 sm:max-w-[460px] lg:max-w-none">
          <span aria-hidden="true" className="arch absolute inset-0 left-4 top-0 bottom-4 border border-gold-light/50" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-wine">
            <Image src={portrait.src} alt={portrait.alt} fill priority quality={85} sizes="(min-width: 1024px) 38vw, 460px" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 left-0 flex max-w-[290px] items-center gap-4 rounded-[3px] bg-white p-4 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:-left-8 sm:p-5 lg:-left-12">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-wine text-gold-light">
              <FeatureIcon name="scale" className="size-6" />
            </span>
            <span>
              <span className="block font-display text-[21px] font-semibold leading-tight text-wine">{badge.title}</span>
              <span className="mt-1 block text-[13px] leading-snug text-body">{badge.text}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
