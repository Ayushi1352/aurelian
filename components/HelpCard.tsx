import Link from "next/link";
import { site, type AurelianLink } from "@/data";
import { ArrowRight, Phone } from "@/components/Icons";

type HelpCardProps = {
  data: { title: string; text: string; callLabel: string };
  button: AurelianLink;
};

/** Dark sidebar card: short invitation, the firm's phone number and a booking button. */
export default function HelpCard({ data, button }: HelpCardProps) {
  const { phone } = site.footer.contact;

  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-wine-deep p-7 text-white sm:p-8">
      <span aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-48 rounded-full border border-gold/25" />
      <span aria-hidden="true" className="absolute -right-8 -top-8 -z-10 size-32 rounded-full border border-gold/20" />
      <h2 className="display-3">
        {data.title}
        <span className="text-gold">.</span>
      </h2>
      <p className="mt-3 text-[15px] leading-[1.7] text-white/75">{data.text}</p>
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="group mt-6 flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/50 text-gold-light transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-white">
          <Phone className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="label block text-[10px]! text-white/60">{data.callLabel}</span>
          <span className="block font-display text-[22px] font-semibold text-gold-light">{phone}</span>
        </span>
      </a>
      <Link href={button.href} className="btn btn-gold mt-7 w-full">
        {button.label}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
