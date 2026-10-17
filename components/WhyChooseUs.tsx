import Image from "next/image";
import Link from "next/link";
import { site, type AurelianWhyChooseUsData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, FeatureIcon } from "@/components/Icons";

/** Intro and four icon points on the left, arched photo on a wine block on the right. */
export default function WhyChooseUs({ data = site.whyChooseUsSection }: SectionProps<AurelianWhyChooseUsData>) {
  const { label, titleLine1, titleLine2, text, image, points, button } = data;

  return (
    <section className="section-space overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 xl:gap-28">
        <div>
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:mt-12">
            {points.map((p, i) => (
              <li key={p.title} data-reveal="up" data-delay={i + 2} className="group flex gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-wine text-gold-light transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  <FeatureIcon name={p.icon} className="size-6" />
                </span>
                <span>
                  <h3 className="font-display text-[23px] font-semibold leading-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-body">{p.text}</p>
                </span>
              </li>
            ))}
          </ul>
          <Link data-reveal="up" href={button.href} className="btn mt-12 bg-wine text-white hover:bg-gold">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div data-reveal="up" className="relative mx-auto w-full max-w-[480px] pb-8 pl-8 sm:pb-10 sm:pl-10 lg:mx-0 lg:ml-auto">
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-[70%] w-[80%] rounded-[3px] bg-wine">
            <span className="pattern-dots absolute inset-0" />
          </span>
          <div className="arch relative aspect-[4/5] overflow-hidden border-[6px] border-white bg-bone shadow-[0_24px_60px_rgba(37,10,16,0.18)]">
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
