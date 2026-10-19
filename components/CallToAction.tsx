import Image from "next/image";
import Link from "next/link";
import { site, type AurelianCtaData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight } from "@/components/Icons";

/** Wix-style closing band: a tall drifting photo, a hairline, the headline large on the left and a short line with the buttons on the right. */
export default function CallToAction({ data = site.ctaSection }: SectionProps<AurelianCtaData>) {
  const { label, titleLine1, titleLine2, text, button, secondaryButton, image } = data;

  return (
    <section className="relative isolate flex min-h-[560px] items-end overflow-hidden text-white lg:min-h-[720px]">
      <span aria-hidden="true" className="parallax absolute inset-0 -z-20 block">
        <Image src={image.src} alt="" fill quality={80} sizes="100vw" className="object-cover" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/50 to-black/30" />

      <div className="container-site w-full pb-16 pt-32 lg:pb-24">
        <Eyebrow label={label} dark />
        <span aria-hidden="true" data-reveal="line" className="mt-8 block h-px w-full bg-white/30" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <h2 data-reveal="words" className="display-1 text-balance">
            <Headline line1={titleLine1} line2={titleLine2} />
          </h2>
          <div>
            <p data-reveal="up" data-delay="3" className="text-[16px] leading-[1.8] text-white/75">
              {text}
            </p>
            <div data-reveal="up" data-delay="4" className="mt-8 flex flex-col flex-wrap gap-3 xs:flex-row [&>a]:whitespace-nowrap">
              <Link href={button.href} className="btn btn-gold">
                {button.label}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={secondaryButton.href} className="btn btn-light">
                {secondaryButton.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
