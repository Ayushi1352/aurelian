import Image from "next/image";
import { site, type AurelianTestimonialsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { QuoteMark, Star } from "@/components/Icons";

const SHOWN = 3;

/** Wix-style: three white quote cards floating at staggered heights over a full-width drifting photo. */
export default function Testimonials({ data = site.testimonialsSection }: SectionProps<AurelianTestimonialsData>) {
  const { label, titleLine1, titleLine2, rating, image, items } = data;

  return (
    <section className="relative isolate overflow-hidden text-white section-space">
      <span aria-hidden="true" className="parallax absolute inset-0 -z-20 block">
        <Image src={image.src} alt="" fill quality={75} sizes="100vw" className="object-cover" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />

      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          dark
          action={
            <p className="flex items-center gap-3 text-[13px] text-white/75">
              <span className="flex gap-0.5 text-gold" aria-label={`${rating.value} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3.5" />
                ))}
              </span>
              <span className="font-display text-[18px] font-semibold text-white">{rating.value}</span>
              <span>{rating.label}</span>
            </p>
          }
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {items.slice(0, SHOWN).map((t, i) => (
            <li key={t.name} data-reveal="up" data-delay={i * 2 + 2} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-6" : ""}>
              <figure className="flex h-full flex-col bg-white p-7 text-ink shadow-[0_30px_70px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-2 sm:p-9">
                <QuoteMark className="h-6 w-8 text-gold" />
                <blockquote className="mt-5 flex-1 font-display text-[22px] font-medium leading-[1.35] lg:text-[24px]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 border-t border-line pt-5 text-right">
                  <span className="block font-display text-[19px] font-semibold text-wine">{t.name}</span>
                  <span className="label mt-1 block text-[9px]! text-muted">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
