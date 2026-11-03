import type { CoreValuesData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

export const CoreValues = ({ data }: { data?: CoreValuesData }) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, items } = data;

  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
      <div className={ui.container}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
        <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {items.map((value, i) => (
            <li
              key={value.id}
              data-reveal="up"
              data-delay={i + 1}
              className={`group relative border-b border-line px-1 py-10 sm:px-8 lg:border-b-0 lg:py-12 ${i % 2 === 1 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l" : ""}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
              <Icon name={value.icon} className="size-14 text-navy lg:size-16" strokeWidth={1.5} />
              <h3 className="mt-10 font-display text-[2rem] font-semibold leading-tight text-ink lg:text-[2.375rem]">
                {value.title}
                <span className="text-gold">.</span>
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-body">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
