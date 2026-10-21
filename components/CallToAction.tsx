import Image from "next/image";
import Link from "next/link";
import { site, type AurelianCtaData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight } from "@/components/Icons";

export default function CallToAction({ data = site.ctaSection }: SectionProps<AurelianCtaData>) {
  const { label, titleLine1, titleLine2, button, secondaryButton, image } = data;

  return (
    <section className="relative isolate flex min-h-[400px] items-end overflow-hidden text-white lg:min-h-[480px]">
      <span aria-hidden="true" className="parallax absolute inset-0 -z-20 block">
        <Image src={image.src} alt="" fill quality={75} sizes="100vw" className="object-cover" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep/85 via-navy-deep/50 to-navy-deep/30" />

      <div className="container-site section-space w-full">
        <Eyebrow label={label} dark />
        <span aria-hidden="true" data-reveal="line" className="mt-8 block h-px w-full bg-white/30" />
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 data-reveal="words" className="display-1 max-w-[860px] text-balance">
            <Headline line1={titleLine1} line2={titleLine2} />
          </h2>
          <div data-reveal="up" data-delay="4" className="flex shrink-0 flex-col flex-wrap gap-3 xs:flex-row [&>a]:whitespace-nowrap">
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
    </section>
  );
}
