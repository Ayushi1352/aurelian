import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BreadcrumbData, GlobalUIData } from "@/types/templates.types";
import { Headline } from "@/components/ui/SplitWords";
import { ui as classes } from "@/components/ui/ui";
import { introHidden, introLine, kenburnsStart } from "@/components/ui/motion";

const separator = <li aria-hidden="true" className="h-px w-4 bg-white/40" />;

/** Page banner: the page title over a full-width photo, with the breadcrumb trail under it. */
export const Breadcrumb = ({ data, ui }: { data?: BreadcrumbData; ui: GlobalUIData }) => {
  if (!data) return null;
  const crumbs = data.paths.slice(0, -1);
  const current = data.paths[data.paths.length - 1];

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image src={data.image} alt="" fill priority quality={75} sizes="100vw" data-intro="kenburns" className={`${kenburnsStart} -z-30 object-cover`} />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

      <div className={`${classes.container} flex min-h-[23.75rem] flex-col justify-end pb-10 pt-24 sm:min-h-[28.75rem] lg:min-h-[35rem] lg:pb-14`}>
        <h1
          data-words-now
          data-words-delay="300"
          className="max-w-[68.75rem] text-balance font-display text-[clamp(2.375rem,6vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.01em]"
        >
          <Headline line1={data.title} />
        </h1>

        <div className="mt-10 border-t border-white/20 pt-6 lg:mt-14">
          <nav aria-label={ui.breadcrumb}>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-[0.75rem]">
              <li aria-hidden="true" data-intro="line" className={`h-px w-10 bg-gold ${introLine}`} />
              {crumbs.map((crumb, i) => (
                <Fragment key={crumb.id}>
                  {i > 0 && separator}
                  <li data-intro="fade" data-intro-delay={200 + i * 100} className={introHidden}>
                    <Link href={crumb.url} className={`${classes.linkLine} hover:text-white`}>
                      {crumb.label}
                    </Link>
                  </li>
                </Fragment>
              ))}
              {separator}
              <li aria-current="page" data-intro="fade" data-intro-delay="400" className={`line-clamp-1 text-gold-light ${introHidden}`}>
                {current.label}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};
