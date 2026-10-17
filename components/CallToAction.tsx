import Image from "next/image";
import Link from "next/link";
import { site, type AurelianCtaData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight, Phone } from "@/components/Icons";

/** Full-width drifting photo under a dark wash: centred invitation, two buttons and the phone line. */
export default function CallToAction({ data = site.ctaSection }: SectionProps<AurelianCtaData>) {
  const { label, titleLine1, titleLine2, text, button, secondaryButton, callLabel, image } = data;
  const { phone } = site.footer.contact;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep text-white">
      <span aria-hidden="true" className="parallax absolute inset-0 -z-20 block">
        <Image src={image.src} alt="" fill quality={80} sizes="100vw" className="object-cover" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-wine-deep/80" />

      <div className="container-site flex flex-col items-center py-24 text-center lg:py-32">
        <Eyebrow label={label} dark centered />
        <h2 data-reveal="words" className="display-1 mt-6 max-w-[820px] text-balance">
          <Headline line1={titleLine1} line2={titleLine2} />
        </h2>
        <p data-reveal="up" data-delay="3" className="mt-6 max-w-[600px] text-[16px] leading-[1.8] text-white/75 lg:text-[17px]">
          {text}
        </p>
        <div data-reveal="up" data-delay="4" className="mt-10 flex w-full flex-col justify-center gap-3 xs:w-auto xs:flex-row">
          <Link href={button.href} className="btn btn-gold">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link href={secondaryButton.href} className="btn btn-light">
            {secondaryButton.label}
          </Link>
        </div>
        <a data-reveal="up" data-delay="5" href={`tel:${phone.replace(/\s/g, "")}`} className="group mt-10 flex items-center gap-4">
          <span className="grid size-12 place-items-center border border-gold/60 text-gold-light transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-white">
            <Phone className="size-5" />
          </span>
          <span className="text-left leading-tight">
            <span className="label block text-[10px]! text-white/60">{callLabel}</span>
            <span className="mt-1 block font-display text-[22px] font-semibold text-white">{phone}</span>
          </span>
        </a>
      </div>
    </section>
  );
}
