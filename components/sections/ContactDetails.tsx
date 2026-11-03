import type { CompanyData, ContactDetailsData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";
import { mapUrl, telHref } from "@/components/ui/text";

export const ContactDetails = ({ data, company }: { data?: ContactDetailsData; company: CompanyData }) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, labels } = data;
  const cards = [
    { icon: "LuMapPin", label: labels.address, lines: company.address, href: mapUrl(company.mapOpenUrl, company), external: true },
    { icon: "LuPhone", label: labels.phone, lines: [company.phone], href: telHref(company.phone) },
    { icon: "LuMail", label: labels.email, lines: [company.email], href: `mailto:${company.email}` },
  ];

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <ul className="mt-12 grid border-t border-line md:grid-cols-3 lg:mt-14">
          {cards.map((card, i) => (
            <li
              key={card.label}
              data-reveal="up"
              data-delay={i + 1}
              className={`group relative border-b border-line py-7 md:border-b-0 md:px-7 lg:py-8 ${i > 0 ? "md:border-l md:pl-7" : "md:pl-0"}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
              <span className={`${ui.labelSmall} flex items-center gap-3 text-muted`}>
                <Icon name={card.icon} className="size-[1.125rem] text-gold" />
                {card.label}
              </span>
              <span className="mt-4 block font-display text-[1.1875rem] font-semibold leading-[1.4] text-ink lg:text-[1.25rem]">
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="break-words transition-colors hover:text-navy"
                >
                  {card.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
