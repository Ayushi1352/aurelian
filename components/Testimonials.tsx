import Image from "next/image";
import { site, type AurelianTestimonialsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Star } from "@/components/Icons";

/** Dark section: title and overall rating on the left, one quote card at a time on the right. */
export default function Testimonials({ data = site.testimonialsSection }: SectionProps<AurelianTestimonialsData>) {
  const { label, titleLine1, titleLine2, text, rating, image, items } = data;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep text-white section-space">
      <Image src={image.src} alt="" fill quality={70} sizes="100vw" className="-z-20 object-cover opacity-15" />
      <div aria-hidden="true" className="pattern-dots absolute inset-y-0 left-0 -z-10 w-1/3" />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} dark />
          <div data-reveal="up" data-delay="3" className="mt-10 flex items-center gap-5 border-t border-white/15 pt-8">
            <span className="font-display text-[64px] font-semibold leading-none text-gold-light">{rating.value}</span>
            <span>
              <span className="flex gap-1 text-gold-light" aria-label={`${rating.value} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-[18px]" />
                ))}
              </span>
              <span className="mt-2 block text-[14px] text-white/65">{rating.label}</span>
            </span>
          </div>
        </div>
        <TestimonialSlider items={items} />
      </div>
    </section>
  );
}
