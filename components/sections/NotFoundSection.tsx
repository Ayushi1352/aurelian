import Link from "next/link";
import type { NotFoundData } from "@/types/templates.types";
import { Headline } from "@/components/ui/SplitWords";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";
import { introHidden } from "@/components/ui/motion";

export const NotFoundSection = ({ data }: { data?: NotFoundData }) => {
  if (!data) return null;

  return (
    <section className="flex min-h-[70svh] items-center bg-navy-deep py-24 text-white">
      <div className={`${ui.container} flex flex-col items-center text-center`}>
        <p
          aria-hidden="true"
          data-intro="zoom"
          className={`${introHidden} font-display text-[clamp(7.5rem,22vw,16.25rem)] font-semibold italic leading-none text-transparent [-webkit-text-stroke:0.0625rem_var(--color-gold)]`}
        >
          {data.code}
        </p>
        <h1 data-words-now className={`${ui.display2} mt-4 text-balance`}>
          <Headline line1={data.title} />
        </h1>
        <p data-intro="up" data-intro-delay="600" className={`${introHidden} mt-4 max-w-[30rem] text-[1rem] leading-[1.8] text-white/70`}>
          {data.description}
        </p>
        <Link data-intro="up" data-intro-delay="750" href={data.buttonUrl} className={`${ui.btnGold} ${introHidden} mt-9`}>
          {data.buttonText}
          <Icon name="LuArrowRight" className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
};
