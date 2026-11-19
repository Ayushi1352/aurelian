import Image from 'next/image';
import Link from 'next/link';
import type { WhyChooseUsProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';

export const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  if (!data) return null;
  const { label, title, titleHighlight, text, points } = data;

  return (
    <section className="grid bg-navy-deep text-white lg:grid-cols-2">
      <div data-reveal="wipe" className="relative min-h-[26.25rem] overflow-hidden sm:min-h-[35rem] lg:min-h-[51.25rem]">
        <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
          <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </span>
      </div>

      <div className={`flex flex-col justify-center ${ui.sectionSpace} px-5 sm:px-10 lg:px-24`}>
        <SectionHeading label={label} title={title} titleHighlight={titleHighlight} text={text} dark stacked />
        <ul className="mt-12 border-t border-white/15">
          {points.map((point, i) => (
            <li key={point.id} data-reveal="up" data-delay={i + 2} className="group flex items-center gap-6 border-b border-white/15 py-6">
              <Icon name={point.icon} className="size-6 shrink-0 text-gold" strokeWidth={1.5} />
              <h3 className="font-display text-[1.5rem] font-semibold leading-tight transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-gold-light sm:text-[1.75rem]">{point.title}</h3>
            </li>
          ))}
        </ul>
        <Link data-reveal="up" href={data.buttonUrl} className={`${ui.btnGold} mt-12 self-start`}>
          {data.buttonText}
          <Icon name={data.buttonIcon} className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
};
