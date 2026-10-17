import Link from "next/link";
import { site, type AurelianLink } from "@/data";
import { ArrowRight, Phone } from "@/components/Icons";

type HelpCardProps = {
  data: { title: string; text: string; callLabel: string };
  button: AurelianLink;
};

/** Wine sidebar card: short invitation, the firm's phone number and a booking button. */
export default function HelpCard({ data, button }: HelpCardProps) {
  const { phone } = site.footer.contact;

  return (
    <div className="relative isolate overflow-hidden rounded-[3px] bg-wine p-7 text-white sm:p-8">
      <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10" />
      <span aria-hidden="true" className="arch absolute -right-10 -top-6 -z-10 h-40 w-32 border border-gold-light/25" />
      <h2 className="display-3">{data.title}</h2>
      <p className="mt-3 text-[15px] leading-[1.7] text-white/75">{data.text}</p>
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="group mt-6 flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold text-white transition-colors group-hover:bg-white group-hover:text-wine">
          <Phone className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] text-white/60">{data.callLabel}</span>
          <span className="block font-display text-[22px] font-semibold text-gold-light">{phone}</span>
        </span>
      </a>
      <Link href={button.href} className="btn mt-7 w-full bg-gold text-white hover:bg-gold-bright">
        {button.label}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
