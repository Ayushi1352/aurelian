import Image from "next/image";
import { site, type AurelianTestimonialsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Star } from "@/components/Icons";

/** Dark section over a drifting library photo: centred title and rating, then one large quote at a time. */
export default function Testimonials({ data = site.testimonialsSection }: SectionProps<AurelianTestimonialsData>) {
  const { label, titleLine1, titleLine2, text, rating, image, items } = data;

  return (
    <section className="relative isolate overflow-hidden bg-wine-deep text-white section-space">
      <span aria-hidden="true" className="parallax absolute inset-0 -z-20 block">
        <Image src={image.src} alt="" fill quality={70} sizes="100vw" className="object-cover opacity-25" />
      </span>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-wine-deep via-wine-deep/70 to-wine-deep" />

      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} align="center" dark />
        <div data-reveal="up" data-delay="3" className="mt-8 flex items-center justify-center gap-4">
          <span className="font-display text-[40px] font-semibold leading-none text-gold-light">{rating.value}</span>
          <span className="text-left">
            <span className="flex gap-1 text-gold" aria-label={`${rating.value} out of 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4" />
              ))}
            </span>
            <span className="mt-1 block text-[13px] text-white/60">{rating.label}</span>
          </span>
        </div>
        <TestimonialSlider items={items} />
      </div>
    </section>
  );
}
