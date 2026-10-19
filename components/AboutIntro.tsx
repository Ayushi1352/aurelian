import Image from "next/image";
import Link from "next/link";
import { site, type AurelianAboutIntroData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";

/** Wix-style statement: label on the left, large title and one line of copy on the right, then a wide drifting photo with the years figure on it. */
export default function AboutIntro({ data = site.aboutIntroSection }: SectionProps<AurelianAboutIntroData>) {
  const { label, titleLine1, titleLine2, text, button, image, highlight } = data;

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="link-arrow text-wine">
              {button.label}
            </Link>
          }
        />

        <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-wine-deep sm:aspect-[2400/1100] lg:mt-20">
          <span className="parallax absolute inset-0 block">
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
          </span>
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-wine-deep/70 via-transparent to-transparent" />
          <p data-reveal="up" data-delay="4" className="absolute bottom-6 left-6 flex items-end gap-4 text-white sm:bottom-10 sm:left-10">
            <span className="font-display text-[64px] font-semibold leading-[0.85] sm:text-[96px] lg:text-[120px]">{highlight.value}</span>
            <span className="label max-w-[140px] pb-1 text-[10px]! leading-[1.7] text-white/85">{highlight.label}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
