import Image from 'next/image';
import Link from 'next/link';
import type { FounderMessageProps } from '@/types/templates.types';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Headline } from '@/components/ui/SplitWords';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';

export const FounderMessage = ({ data }: FounderMessageProps) => {
  if (!data) return null;

  return (
    <section className="grid bg-navy-deep text-white lg:min-h-[min(calc(100svh_-_5.5625rem),60rem)] lg:grid-cols-2">
      <div className={`order-2 flex flex-col justify-center ${ui.sectionSpace} px-5 sm:px-10 lg:order-1 lg:px-24`}>
        <Eyebrow label={data.label} dark />
        <span data-reveal="fade" data-delay="1" className="mt-8 block text-gold/70 lg:mt-10">
          <Icon name={data.quoteIcon} className="size-9 lg:size-11" />
        </span>
        <blockquote data-reveal="words" className={`${ui.display2} mt-6 max-w-[35rem] italic text-gold-light`}>
          <Headline line1={data.quote} />
        </blockquote>

        <div data-reveal="up" data-delay="3" className="mt-10 border-t border-white/15 pt-7 lg:mt-12">
          <p className="font-display text-[2rem] font-semibold leading-none lg:text-[2.375rem]">{data.name}</p>
          <p className={`${ui.label} mt-3 text-white/60`}>{data.role}</p>
          <Link href={data.buttonUrl} className={`${ui.btnLight} mt-8`}>
            {data.buttonText}
            <Icon name={data.buttonIcon} className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>

      <div data-reveal="wipe" className="relative order-1 h-[50svh] min-h-[21.25rem] overflow-hidden sm:h-[60svh] lg:order-2 lg:h-auto lg:min-h-0">
        <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent" />
        <span aria-hidden="true" className="absolute inset-5 border border-gold/50 sm:inset-8" />
      </div>
    </section>
  );
};
