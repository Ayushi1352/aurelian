import Image from "next/image";
import Link from "next/link";
import { site, type AurelianAboutIntroData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ui } from "@/components/ui";

type AboutIntroProps = SectionProps<AurelianAboutIntroData> & {
  /** Hides the "More About Us" link, for the About page itself. */
  hideButton?: boolean;
};

export default function AboutIntro({ data = site.aboutIntroSection, hideButton = false }: AboutIntroProps) {
  const { label, titleLine1, titleLine2, text, button, image, highlight } = data;

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            !hideButton && (
              <Link href={button.href} className={`${ui.linkArrow} text-navy`}>
                {button.label}
              </Link>
            )
          }
        />

        <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[2400/1100] lg:mt-20">
          <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
            <Image src={image.src} alt={image.alt} fill quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
          </span>
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent" />
          <p data-reveal="up" data-delay="4" className="absolute bottom-6 left-6 flex items-end gap-4 text-white sm:bottom-10 sm:left-10">
            <span className="font-display text-[4rem] font-semibold leading-[0.85] sm:text-[6rem] lg:text-[7.5rem]">{highlight.value}</span>
            <span className={`${ui.labelSmall} max-w-[8.75rem] pb-1 leading-[1.7] text-white/85`}>{highlight.label}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
