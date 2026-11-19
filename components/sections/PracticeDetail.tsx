import Image from 'next/image';
import type { PracticeDetailProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PracticeCard } from '@/components/ui/PracticeCard';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { pad, pickByIds } from '@/components/ui/text';

/** Practice details page: overview and photo, the services list and tiles of other practice areas (all from the PracticeAreas data). */
export const PracticeDetail = ({ data, itemId }: PracticeDetailProps) => {
  const item = data?.items.find((p) => p.id === itemId);
  if (!data || !item) return null;
  const { overviewLabel, servicesLabel, moreLabel, moreTitle, moreItemIds } = data.detail;
  const others = pickByIds(data.items, moreItemIds);

  return (
    <>
      <section data-plain className={ui.sectionPlain}>
        <div className={ui.container}>
          <SectionHeading label={overviewLabel} title={item.subtitle} text={item.overview} />
          <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[2/1] lg:mt-20">
            <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
              <Image src={item.image} alt={item.imageAlt} fill priority quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 flex items-center gap-4 text-white sm:bottom-10 sm:left-10">
              <span className="grid size-14 place-items-center border border-white/40 text-gold-light sm:size-16">
                <Icon name={item.icon} className="size-7" strokeWidth={1.5} />
              </span>
              <span className={`${ui.label} text-white/85`}>{item.title}</span>
            </span>
          </div>
        </div>
      </section>

      <section className={`bg-mist ${ui.sectionSpace}`}>
        <div className={ui.container}>
          <SectionHeading label={item.title} title={servicesLabel} />
          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 sm:gap-x-12 lg:mt-16">
            {item.services.map((service, i) => (
              <li key={service.id} data-reveal="up" data-delay={(i % 2) + 1} className="group flex items-baseline gap-5 border-b border-line py-7">
                <span className={`${ui.labelSmall} shrink-0 text-gold`}>{pad(i + 1)}</span>
                <span className="font-display text-[1.5rem] font-semibold leading-snug text-ink transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-navy lg:text-[1.875rem]">{service.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-plain className={ui.sectionPlain}>
        <div className={ui.container}>
          <SectionHeading label={moreLabel} title={moreTitle} />
          <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {others.map((other, i) => (
              <PracticeCard key={other.id} item={other} label={data.cardLabel} icon={data.cardIcon} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
