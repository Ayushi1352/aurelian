import Image from 'next/image';
import Link from 'next/link';
import type { PracticeCardProps } from '@/types/templates.types';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { fill } from '@/components/ui/text';

/** Tall photo tile of a practice area (home page, Practice Areas page and the "other areas" of the detail page). */
export const PracticeCard = ({ item, label, icon, delay = 0 }: PracticeCardProps) => (
  <article data-reveal="up" data-delay={delay} className="h-full">
    <Link
      href={item.url}
      aria-label={fill(label, { title: item.title })}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-navy-deep p-7 text-white sm:p-8"
    >
      <Image
        src={item.tileImage}
        alt=""
        fill
        quality={75}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.6s] ease-smooth group-hover:scale-[1.07]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/45 to-navy-deep/15" />
      <span aria-hidden="true" className="absolute inset-x-7 top-7 flex items-center justify-end sm:inset-x-8 sm:top-8">
        <span className="grid size-11 scale-75 place-items-center bg-white text-navy opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Icon name={icon} className="size-4" strokeWidth={2} />
        </span>
      </span>

      <span className="relative">
        <h3 className="font-display text-[1.875rem] font-semibold leading-[1.1] lg:text-[2.25rem]">{item.title}</h3>
        <span className={`${ui.labelSmall} mt-3 block text-gold-light`}>{item.subtitle}</span>
        <span aria-hidden="true" className="mt-5 block h-px w-full origin-left scale-x-[0.15] bg-white/60 transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
      </span>
    </Link>
  </article>
);
