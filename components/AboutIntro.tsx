import Image from "next/image";
import Link from "next/link";
import { site, type AurelianAboutIntroData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Check, Phone } from "@/components/Icons";

/** Photo collage (arch + small square + years badge) beside a short story, three promises and a call line. */
export default function AboutIntro({ data = site.aboutIntroSection }: SectionProps<AurelianAboutIntroData>) {
  const { label, titleLine1, titleLine2, paragraphs, points, button, callLabel, image, imageSmall, highlight } = data;
  const { phone } = site.footer.contact;

  return (
    <section className="section-space overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <div data-reveal="up" className="relative mx-auto w-full max-w-[520px] pb-10 pr-10 sm:pb-14 sm:pr-16 lg:mx-0">
          <div className="arch relative aspect-[4/5] overflow-hidden bg-bone">
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-[3px] border-[6px] border-white bg-bone shadow-[0_20px_50px_rgba(37,10,16,0.15)] sm:border-8">
            <Image src={imageSmall.src} alt={imageSmall.alt} fill quality={85} sizes="(min-width: 1024px) 18vw, 42vw" className="object-cover" />
          </div>
          <div className="absolute left-0 top-[12%] grid size-[112px] place-items-center rounded-full bg-wine text-center text-white shadow-[0_16px_40px_rgba(37,10,16,0.3)] outline outline-1 outline-offset-4 outline-gold/60 sm:-left-6 sm:size-[136px]">
            <span>
              <span className="block font-display text-[36px] font-semibold leading-none text-gold-light sm:text-[44px]">{highlight.value}</span>
              <span className="mx-auto mt-1 block max-w-[90px] text-[11px] leading-tight text-white/80 sm:text-[12px]">{highlight.label}</span>
            </span>
          </div>
        </div>

        <div>
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} />
          {paragraphs.map((p, i) => (
            <p key={i} data-reveal="up" data-delay="2" className="lead mt-5 text-body">
              {p}
            </p>
          ))}
          <ul data-reveal="up" data-delay="3" className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 font-medium text-ink">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold-pale text-gold">
                  <Check className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div data-reveal="up" data-delay="4" className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-10">
            <Link href={button.href} className="btn self-start bg-wine text-white hover:bg-gold">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="group flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-gold-pale text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] text-muted">{callLabel}</span>
                <span className="block font-display text-[22px] font-semibold text-wine">{phone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
