import { site, type AurelianContactData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ClockIcon, Mail, MapPin, Phone } from "@/components/Icons";

/** Four wide rounded tiles (icon in a circle on the left, details on the right) that turn wine on hover. */
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
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} align="center" />
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
          {cards.map(({ Icon, ...card }, i) => (
            <li
              key={card.label}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              data-delay={i + 1}
              className="group flex items-center gap-6 rounded-[40px] bg-mist py-4 pl-4 pr-6 sm:rounded-full sm:pr-8 transition-colors duration-500 hover:bg-wine sm:gap-7"
            >
              <span className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-gold shadow-[0_10px_30px_rgba(37,10,16,0.08)] transition-[background-color,color,scale] duration-500 group-hover:scale-105 group-hover:bg-gold group-hover:text-white">
                <Icon className="size-7" />
              </span>
              <span className="min-w-0">
                <span className="label block text-[10px]! text-muted transition-colors duration-500 group-hover:text-white/60">{card.label}</span>
                <span className="mt-1.5 block font-display text-[19px] font-semibold leading-[1.35] text-ink transition-colors duration-500 group-hover:text-white sm:text-[21px]">
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noopener noreferrer" : undefined}
                      className="link-line break-words"
                    >
                      {card.lines.join(" ")}
                    </a>
                  ) : (
                    card.lines.join(" ")
                  )}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
