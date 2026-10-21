import { site, type AurelianContactData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ClockIcon, Mail, MapPin, Phone } from "@/components/Icons";

export default function ContactDetails({ data = site.contactPage }: SectionProps<AurelianContactData>) {
  const { label, titleLine1, titleLine2, text, labels } = data;
  // Values come from the shared Footer `contact` block.
  const { contact } = site.footer;
  const cards = [
    { Icon: MapPin, label: labels.address, lines: contact.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.join(" "))}`, external: true },
    { Icon: Phone, label: labels.phone, lines: [contact.phone], href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { Icon: Mail, label: labels.email, lines: [contact.email], href: `mailto:${contact.email}` },
    { Icon: ClockIcon, label: labels.hours, lines: [contact.hours] },
  ];

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <ul className="mt-12 grid border-t border-line md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {cards.map(({ Icon, ...card }, i) => (
            <li
              key={card.label}
              data-reveal="up"
              data-delay={i + 1}
              className={`group relative border-b border-line py-7 md:px-7 lg:border-b-0 lg:py-8 ${i % 2 === 1 ? "md:border-l" : "md:pl-0"} ${i > 0 ? "lg:border-l lg:pl-7" : "lg:pl-0"}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="label flex items-center gap-3 text-[10px]! text-muted">
                <Icon className="size-[18px] text-gold" />
                {card.label}
              </span>
              <span className="mt-4 block font-display text-[19px] font-semibold leading-[1.4] text-ink lg:text-[20px]">
                {card.href ? (
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
