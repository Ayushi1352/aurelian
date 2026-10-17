import type { AurelianContactDetails, AurelianHeaderData, AurelianSocial } from "@/data";
import { ClockIcon, Mail, Phone, SocialIcon } from "@/components/Icons";

type TopBarProps = {
  data: AurelianHeaderData["topBar"];
  contact: AurelianContactDetails;
  socials: AurelianSocial[];
};

/** Thin wine strip above the navbar with contact details and social links (scrolls away; the navbar stays). */
export default function TopBar({ data, contact, socials }: TopBarProps) {
  return (
    <div className="hidden bg-wine-deep text-[13px] text-white/75 md:block">
      <div className="container-site flex h-11 items-center justify-between gap-6">
        <ul className="flex items-center gap-6 xl:gap-8">
          <li>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-gold-light">
              <Phone className="size-4 text-gold-light" />
              {contact.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-gold-light">
              <Mail className="size-4 text-gold-light" />
              {contact.email}
            </a>
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <ClockIcon className="size-4 text-gold-light" />
            {contact.hours}
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <p className="hidden items-center gap-2 text-gold-light xl:flex">
            <span aria-hidden="true" className="diamond size-[6px]!" />
            {data.note}
          </p>
          <ul className="flex items-center gap-1">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-8 place-items-center rounded-full transition-colors hover:bg-gold hover:text-white"
                >
                  <SocialIcon name={s.name} className="size-[15px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
