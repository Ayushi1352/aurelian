import Image from "next/image";
import Link from "next/link";
import type { CtaData } from "@/types/templates.types";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Headline } from "@/components/ui/SplitWords";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

export const Cta = ({ data }: { data?: CtaData }) => {
  if (!data) return null;

  return (
    <section className="relative isolate flex min-h-[25rem] items-end overflow-hidden text-white lg:min-h-[30rem]">
      <span data-parallax aria-hidden="true" className={`${ui.parallax} absolute inset-0 -z-20 block`}>
        <Image src={data.image} alt="" fill quality={75} sizes="100vw" className="object-cover" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/85 via-navy-deep/50 to-navy-deep/30" />

      <div className={`${ui.container} ${ui.sectionSpace} w-full`}>
        <Eyebrow label={data.label} dark />
        <span aria-hidden="true" data-reveal="line" className="mt-8 block h-px w-full origin-left bg-white/30" />
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 data-reveal="words" className={`${ui.display1} max-w-[53.75rem] text-balance`}>
            <Headline line1={data.titleLine1} line2={data.titleLine2} />
          </h2>
          <div data-reveal="up" data-delay="4" className="flex shrink-0 flex-col flex-wrap gap-3 xs:flex-row [&>a]:whitespace-nowrap">
            <Link href={data.buttonUrl} className={ui.btnGold}>
              {data.buttonText}
              <Icon name="LuArrowRight" className="size-4" strokeWidth={2} />
            </Link>
            <Link href={data.secondaryButtonUrl} className={ui.btnLight}>
              {data.secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
