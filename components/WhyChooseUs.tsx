import Image from "next/image";
import Link from "next/link";
import { site, type AurelianWhyChooseUsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, FeatureIcon } from "@/components/Icons";

export default function WhyChooseUs({ data = site.whyChooseUsSection }: SectionProps<AurelianWhyChooseUsData>) {
  const { label, titleLine1, titleLine2, text, image, points, button } = data;

  return (
    <section className="grid bg-navy-deep text-white lg:grid-cols-2">
      <div data-reveal="wipe" className="relative min-h-[420px] overflow-hidden sm:min-h-[560px] lg:min-h-[820px]">
        <span className="parallax absolute inset-0 block">
          <Image src={image.src} alt={image.alt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </span>
      </div>

      <div className="flex flex-col justify-center section-space px-5 sm:px-10 lg:px-24">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} dark stacked />
        <ul className="mt-12 border-t border-white/15">
          {points.map((p, i) => (
            <li key={p.title} data-reveal="up" data-delay={i + 2} className="group flex items-center gap-6 border-b border-white/15 py-6">
              <FeatureIcon name={p.icon} className="size-6 shrink-0 text-gold" />
              <h3 className="font-display text-[24px] font-semibold leading-tight transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-gold-light sm:text-[28px]">{p.title}</h3>
            </li>
          ))}
        </ul>
        <Link data-reveal="up" href={button.href} className="btn btn-gold mt-12 self-start">
          {button.label}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
