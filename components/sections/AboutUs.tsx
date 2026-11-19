import Image from 'next/image';
import Link from 'next/link';
import type { AboutUsProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ui } from '@/components/ui/ui';

export const AboutUs = ({ data, hideButton = false }: AboutUsProps) => {
  if (!data) return null;
  const { label, title, titleHighlight, text, highlight } = data;

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading
          label={label}
          title={title}
          titleHighlight={titleHighlight}
          text={text}
          action={
            !hideButton && (
              <Link href={data.buttonUrl} className={`${ui.linkArrow} text-navy`}>
                {data.buttonText}
              </Link>
            )
          }
        />

        <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[2400/1100] lg:mt-20">
          <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
            <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
          </span>
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
          <p data-reveal="up" data-delay="4" className="absolute bottom-6 left-6 flex items-end gap-4 text-white sm:bottom-10 sm:left-10">
            <span className="font-display text-[4rem] font-semibold leading-[0.85] sm:text-[6rem] lg:text-[7.5rem]">{highlight.value}</span>
            <span className={`${ui.labelSmall} max-w-[8.75rem] pb-1 leading-[1.7] text-white/85`}>{highlight.label}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
