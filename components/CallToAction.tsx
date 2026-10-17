import Image from "next/image";
import Link from "next/link";
import { site, type AurelianCtaData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { ArrowRight, Phone } from "@/components/Icons";

/** Wine card that straddles the page and the footer: invitation and buttons on the left, photo + call line on the right. */
export default function CallToAction({ data = site.ctaSection }: SectionProps<AurelianCtaData>) {
  const { label, titleLine1, titleLine2, text, button, secondaryButton, callLabel, image } = data;
  const { phone } = site.footer.contact;

  return (
    <section className="bg-linear-to-b from-white from-50% to-wine-deep to-50% pt-[var(--section-space)]">
      <div className="container-site">
        <div data-reveal="up" className="relative isolate grid overflow-hidden rounded-[3px] bg-wine text-white shadow-[0_40px_90px_rgba(37,10,16,0.35)] lg:grid-cols-[1.25fr_0.75fr]">
          <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10" />
          <div className="p-8 sm:p-12 lg:p-16">
            <Eyebrow label={label} dark />
            <h2 className="display-2 mt-5">
              {titleLine1} <span className="italic text-gold-light">{titleLine2}</span>
            </h2>
            <p className="lead mt-5 max-w-[560px] text-white/75">{text}</p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <Link href={button.href} className="btn bg-gold text-white hover:bg-gold-bright">
                {button.label}
                <ArrowRight className="size-4" />
              </Link>
              <Link href={secondaryButton.href} className="btn border border-white/30 text-white hover:border-white hover:bg-white hover:text-wine">
                {secondaryButton.label}
              </Link>
            </div>
          </div>

          <div className="relative min-h-[280px] lg:min-h-0">
            <Image src={image.src} alt={image.alt} fill quality={80} sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-wine-deep/90 via-wine-deep/30 to-transparent lg:bg-linear-to-r lg:from-wine lg:via-wine/20" />
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="group absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-[3px] bg-white/95 p-4 text-ink backdrop-blur sm:left-auto sm:max-w-[300px] lg:bottom-10 lg:right-10">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold text-white transition-colors group-hover:bg-wine">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] text-muted">{callLabel}</span>
                <span className="block font-display text-[22px] font-semibold text-wine">{phone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
