import Image from "next/image";
import { site, type AurelianMissionVisionData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

export default function MissionVision({ data = site.missionVisionSection }: SectionProps<AurelianMissionVisionData>) {
  const { label, titleLine1, titleLine2, text, image, items } = data;

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />

        <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-bone sm:aspect-[16/9] lg:mt-20 lg:aspect-[21/9]">
          <span className="parallax absolute inset-0 block">
            <Image src={image.src} alt={image.alt} fill quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
          </span>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:mt-16 lg:gap-16">
          {items.map((item, i) => (
            <div key={item.title} data-reveal="up" data-delay={i + 2} className="group relative border-t border-line pt-8">
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <p className="label flex items-center gap-3 text-gold">
                <FeatureIcon name={item.icon} className="size-6" />
                {item.title}
              </p>
              <p className="mt-6 font-display text-[28px] font-medium italic leading-[1.3] text-ink lg:text-[34px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
