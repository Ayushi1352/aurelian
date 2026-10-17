import Image from "next/image";
import Link from "next/link";
import { site, type AurelianWhyChooseUsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, FeatureIcon } from "@/components/Icons";

/** Intro and four numbered points separated by hairlines on the left; tall oval photo with an offset wine oval and a turning ring on the right. */
export default function WhyChooseUs({ data = site.whyChooseUsSection }: SectionProps<AurelianWhyChooseUsData>) {
  const { label, titleLine1, titleLine2, text, image, points, button } = data;

  return (
    <section className="section-space overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 xl:gap-28">
        <div>
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
          <ul className="mt-10 border-t border-line lg:mt-12">
            {points.map((p, i) => (
              <li key={p.title} data-reveal="up" data-delay={i + 2} className="group relative flex gap-5 border-b border-line py-6 sm:gap-8">
                {/* Gold rule that sweeps along the bottom edge on hover */}
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span aria-hidden="true" className="w-8 shrink-0 font-display text-[20px] font-semibold leading-[1.4] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <h3 className="font-display text-[23px] font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-wine">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-body">{p.text}</p>
                </span>
                <span aria-hidden="true" className="hidden size-12 shrink-0 place-items-center text-gold/60 transition-[color,translate] duration-500 group-hover:-translate-y-1 group-hover:text-gold sm:grid">
                  <FeatureIcon name={p.icon} className="size-7" />
                </span>
              </li>
            ))}
          </ul>
          <Link data-reveal="up" href={button.href} className="btn btn-primary mt-12">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] pr-8 pt-8 sm:pr-10 sm:pt-10 lg:mx-0 lg:ml-auto">
          <span aria-hidden="true" data-reveal="fade" className="absolute right-0 top-0 h-[78%] w-[78%] rounded-[24px] bg-gold-pale" />
          <span aria-hidden="true" data-reveal="fade" data-delay="3" className="absolute right-3 top-3 size-24 bg-[radial-gradient(var(--color-gold)_1.5px,transparent_1.5px)] bg-size-[12px_12px] opacity-70 sm:right-4 sm:top-4" />
          <div data-reveal="wipe" data-delay="2" className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-bone shadow-[0_30px_70px_rgba(37,10,16,0.18)]">
            <span className="parallax absolute inset-0 block">
              <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover" />
            </span>
          </div>
          <div data-reveal="up" data-delay="5" className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-6 shadow-[0_20px_50px_rgba(37,10,16,0.15)] sm:-left-6">
            {points.map((p) => (
              <span key={p.icon} aria-hidden="true" className="-ml-1 grid size-11 place-items-center rounded-full border-2 border-white bg-wine text-gold-light first:ml-0">
                <FeatureIcon name={p.icon} className="size-5" />
              </span>
            ))}
            <span className="label pl-1 text-[9px]! text-wine">{label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
