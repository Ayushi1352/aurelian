import type { ContactDetailsProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { lines } from '@/components/ui/text';

export const ContactDetails = ({ data }: ContactDetailsProps) => {
  if (!data) return null;
  const { label, title, titleHighlight, text, contactItems } = data;

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading label={label} title={title} titleHighlight={titleHighlight} text={text} />
        <ul className="mt-12 grid border-t border-line md:grid-cols-3 lg:mt-14">
          {contactItems.map((card, i) => {
            // Web links (the map) open in a new tab; tel: and mailto: links stay on the page.
            const external = /^https?:/.test(card.url ?? '');
            return (
              <li
                key={card.id}
                data-reveal="up"
                data-delay={i + 1}
                className={`group relative border-b border-line py-7 md:border-b-0 md:px-7 lg:py-8 ${i > 0 ? 'md:border-l md:pl-7' : 'md:pl-0'}`}
              >
                <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
                <span className={`${ui.labelSmall} flex items-center gap-3 text-muted`}>
                  <Icon name={card.icon} className="size-[1.125rem] text-gold" />
                  {card.label}
                </span>
                <span className="mt-4 block font-display text-[1.1875rem] font-semibold leading-[1.4] text-ink lg:text-[1.25rem]">
                  <a
                    href={card.url}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="break-words transition-colors hover:text-navy"
                  >
                    {lines(card.value).map((line, j) => (
                      <span key={j} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
