import type { AurelianContactDetails, AurelianHeaderData, AurelianSocial } from "@/data";
import { Mail, Phone, SocialIcon } from "@/components/Icons";

type TopBarProps = {
  data: AurelianHeaderData["topBar"];
  contact: AurelianContactDetails;
  socials: AurelianSocial[];
};

/** Scrolls away while the navbar below it sticks. */
export default function TopBar({ data, contact, socials }: TopBarProps) {
  return (
    <div className="hidden bg-navy-deep text-[13px] tracking-[0.02em] text-white/75 md:block">
      <div className="container-site flex h-11 items-center justify-between gap-6">
        <ul className="flex items-center gap-6 lg:gap-8">
          <li>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-gold-light">
              <Phone className="size-4 text-gold" />
              {contact.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-gold-light">
              <Mail className="size-4 text-gold" />
              {contact.email}
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <p className="hidden items-center gap-3 text-gold-light lg:flex">
            <span aria-hidden="true" className="h-px w-6 bg-gold" />
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
                  className="grid size-8 place-items-center transition-colors hover:text-gold-light"
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
