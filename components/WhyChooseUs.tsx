import Image from "next/image";
import Link from "next/link";
import { site, type AurelianWhyChooseUsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "@/components/Icons";

/*
 * Wix-style split: a full-height photo fills the left half, a dark panel the right. Each point shows
 * only its title; the line of detail opens on hover (always open on touch screens).
 */
export default function WhyChooseUs({ data = site.whyChooseUsSection }: SectionProps<AurelianWhyChooseUsData>) {
  const { label, titleLine1, titleLine2, text, image, points, button } = data;

  return (
    <section className="grid bg-wine-deep text-white lg:grid-cols-2">
      <div data-reveal="wipe" className="relative min-h-[420px] overflow-hidden sm:min-h-[560px] lg:min-h-[820px]">
        <span className="parallax absolute inset-0 block">
          <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </span>
      </div>

      <div className="flex flex-col justify-center px-5 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} dark stacked />
        <ul className="mt-12 border-t border-white/15">
          {points.map((p, i) => (
            <li key={p.title} data-reveal="up" data-delay={i + 2} className="group border-b border-white/15">
              <div className="flex items-baseline gap-6 py-6">
                <span aria-hidden="true" className="label text-[10px]! text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[24px] font-semibold leading-tight transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-gold-light sm:text-[28px]">{p.title}</h3>
                  <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden">
                      <span className="block pt-2 text-[15px] leading-[1.7] text-white/65 transition-transform duration-500 group-hover:translate-x-2">{p.text}</span>
                    </p>
                  </div>
                </div>
              </div>
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
