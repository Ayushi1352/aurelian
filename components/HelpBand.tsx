import Link from "next/link";
import { site, type AurelianLink } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Headline } from "@/components/SplitWords";
import { ArrowRight, Phone } from "@/components/Icons";

type HelpBandProps = {
  data: { title: string; text: string; callLabel: string };
  button: AurelianLink;
  /** Small label above the title (the page's parent, e.g. Practice Areas). */
  label: string;
};

/** Closing dark band on detail pages: large title on the left, a short line, the firm's phone and a booking button on the right. */
export default function HelpBand({ data, button, label }: HelpBandProps) {
  const { phone } = site.footer.contact;

  return (
    <section className="bg-wine-deep text-white section-space">
      <div className="container-site">
        <Eyebrow label={label} dark />
        <span aria-hidden="true" data-reveal="line" className="mt-8 block h-px w-full bg-white/15" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h2 data-reveal="words" className="display-1 text-balance">
            <Headline line1={data.title} />
          </h2>
          <div>
            <p data-reveal="up" data-delay="2" className="text-[16px] leading-[1.8] text-white/70 lg:text-[17px]">
              {data.text}
            </p>
            <a data-reveal="up" data-delay="3" href={`tel:${phone.replace(/\s/g, "")}`} className="group mt-8 flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center border border-gold/50 text-gold-light transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="label block text-[10px]! text-white/60">{data.callLabel}</span>
                <span className="block font-display text-[24px] font-semibold text-gold-light">{phone}</span>
              </span>
            </a>
            <Link data-reveal="up" data-delay="4" href={button.href} className="btn btn-gold mt-8">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
