import Image from "next/image";
import Link from "next/link";
import { site, type AurelianAboutIntroData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Phone } from "@/components/Icons";

/** Two staggered rounded photos (tall left, square right with the years card under it), beside the story, promises and a call line. */
export default function AboutIntro({ data = site.aboutIntroSection }: SectionProps<AurelianAboutIntroData>) {
  const { label, titleLine1, titleLine2, paragraphs, points, button, callLabel, image, imageSmall, highlight } = data;
  const { phone } = site.footer.contact;

  return (
    <section className="section-space overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <div className="mx-auto grid w-full max-w-[640px] grid-cols-[1.2fr_1fr] gap-4 sm:gap-5 lg:mx-0">
          <div data-reveal="wipe" className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-bone">
            <span className="parallax absolute inset-0 block">
              <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 26vw, 50vw" className="object-cover" />
            </span>
          </div>
          <div className="flex flex-col gap-4 pt-14 sm:gap-5 sm:pt-20">
            <div data-reveal="wipe" data-delay="3" className="relative aspect-square overflow-hidden rounded-[20px] bg-bone">
              <Image src={imageSmall.src} alt={imageSmall.alt} fill quality={85} sizes="(min-width: 1024px) 20vw, 42vw" className="object-cover" />
            </div>
            <div data-reveal="up" data-delay="5" className="relative overflow-hidden rounded-[20px] bg-wine p-5 text-white sm:p-7">
              <span aria-hidden="true" className="absolute -right-6 -top-6 size-24 rounded-full border border-gold/30" />
              <span className="block font-display text-[42px] font-semibold leading-none text-gold-light sm:text-[56px]">{highlight.value}</span>
              <span aria-hidden="true" className="mt-4 block h-px w-10 bg-gold" />
              <span className="label mt-4 block text-[9px]! leading-[1.7] text-white/80 sm:text-[10px]!">{highlight.label}</span>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} />
          {paragraphs.map((p, i) => (
            <p key={i} data-reveal="up" data-delay="3" className="mt-5 text-[16px] leading-[1.8] text-body lg:text-[17px]">
              {p}
            </p>
          ))}
          <ul className="mt-8 space-y-3">
            {points.map((point, i) => (
              <li key={point} data-reveal="left" data-delay={i + 4} className="flex items-center gap-4 font-medium text-ink">
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold" />
                {point}
              </li>
            ))}
          </ul>
          <div data-reveal="up" data-delay="6" className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-10">
            <Link href={button.href} className="btn btn-primary self-start">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="group flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full border border-gold/50 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="label block text-[10px]! text-muted">{callLabel}</span>
                <span className="mt-1 block font-display text-[22px] font-semibold text-wine">{phone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
