import { site, type AurelianContactData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ClockIcon, Mail, MapPin, Phone } from "@/components/Icons";

/** Four contact columns divided by hairlines (square icon, label, details in serif); a gold rule draws in on hover. */
export default function ContactDetails({ data = site.contactPage }: SectionProps<AurelianContactData>) {
  const { label, titleLine1, titleLine2, text, labels } = data;
  // Every value comes from the shared Footer `contact` block (also used in the navbar and footer).
  const { contact } = site.footer;
  const cards = [
    { Icon: MapPin, label: labels.address, lines: contact.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`, external: true },
    { Icon: Phone, label: labels.phone, lines: [contact.phone], href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { Icon: Mail, label: labels.email, lines: [contact.email], href: `mailto:${contact.email}` },
    { Icon: ClockIcon, label: labels.hours, lines: [contact.hours] },
  ];

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <ul className="mt-14 grid border-t border-line md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {cards.map(({ Icon, ...card }, i) => (
            <li
              key={card.label}
              data-reveal="up"
              data-delay={i + 1}
              className={`group relative border-b border-line px-1 py-10 md:px-8 xl:border-b-0 ${i % 2 === 1 ? "md:border-l" : ""} ${i > 0 ? "xl:border-l" : ""}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="grid size-14 place-items-center border border-line text-gold transition-colors duration-500 group-hover:border-wine group-hover:bg-wine group-hover:text-gold-light">
                <Icon className="size-6" />
              </span>
              <span className="label mt-8 block text-[10px]! text-muted">{card.label}</span>
              <span className="mt-2 block font-display text-[21px] font-semibold leading-[1.35] text-ink sm:text-[23px]">
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="link-line break-words transition-colors hover:text-wine"
                  >
                    {card.lines.join(" ")}
                  </a>
                ) : (
                  card.lines.join(" ")
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
