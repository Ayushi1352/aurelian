import Image from "next/image";
import type { MissionVisionData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

export const MissionVision = ({ data }: { data?: MissionVisionData }) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, items } = data;

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />

        <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-bone sm:aspect-[16/9] lg:mt-20 lg:aspect-[21/9]">
          <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
            <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
          </span>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:mt-16 lg:gap-16">
          {items.map((item, i) => (
            <div key={item.id} data-reveal="up" data-delay={i + 2} className="group relative border-t border-line pt-8">
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
              <p className={`${ui.label} flex items-center gap-3 text-gold`}>
                <Icon name={item.icon} className="size-6" strokeWidth={1.5} />
                {item.title}
              </p>
              <p className="mt-6 font-display text-[1.75rem] font-medium italic leading-[1.3] text-ink lg:text-[2.125rem]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
