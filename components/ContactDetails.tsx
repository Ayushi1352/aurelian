import { site, type AurelianContactData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ClockIcon, Mail, MapPin, Phone } from "@/components/Icons";

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
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {cards.map(({ Icon, ...card }, i) => (
            <li
              key={card.label}
              data-reveal="up"
              data-delay={i + 1}
              className="group rounded-[3px] border border-line bg-white p-8 text-center transition-[translate,box-shadow,background-color] duration-500 hover:-translate-y-1.5 hover:bg-wine hover:shadow-[0_28px_60px_rgba(37,10,16,0.18)]"
            >
              <span className="arch mx-auto grid h-[78px] w-[68px] place-items-center bg-gold-pale pt-1 text-wine transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                <Icon className="size-7" />
              </span>
              <h3 className="display-3 mt-6 text-ink transition-colors duration-500 group-hover:text-white">{card.label}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-body transition-colors duration-500 group-hover:text-white/80">
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
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
