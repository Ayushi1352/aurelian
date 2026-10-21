import type { ReactNode } from "react";
import { Headline } from "@/components/SplitWords";

type SectionHeadingProps = {
  label: string;
  line1: string;
  /** Second part of the title, set in italics. */
  line2?: string;
  /** One short line under the title. */
  text?: string;
  /** White text, for sections on a dark background. */
  dark?: boolean;
  /** Label above a smaller title instead of beside it, for narrow columns (split panels, form panels). */
  stacked?: boolean;
  /** Shown beside the intro line on large screens (e.g. a "view all" link). */
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Small tracked label led by a thin gold rule. */
export function Eyebrow({ label, dark = false, className = "" }: { label: string; dark?: boolean; className?: string }) {
  return (
    <p className={`label flex items-center gap-4 ${dark ? "text-white/80" : "text-gold"} ${className}`}>
      <span aria-hidden="true" data-reveal="line" className="h-px w-10 shrink-0 bg-gold" />
      <span data-reveal="fade" data-delay="2">
        {label}
      </span>
    </p>
  );
}

export default function SectionHeading({ label, line1, line2, text, dark = false, stacked = false, action, as: Tag = "h2", className = "" }: SectionHeadingProps) {
  const rule = dark ? "border-white/15" : "border-line";

  const title = (
    <Tag data-reveal="words" className={`text-balance ${stacked ? "display-2 mt-5" : "display-1"} ${dark ? "text-white" : "text-ink"}`}>
      <Headline line1={line1} line2={line2} />
    </Tag>
  );

  const intro = (text || action) && (
    <div className={`mt-8 flex flex-col gap-8 ${stacked ? "" : "lg:flex-row lg:items-end lg:justify-between"}`}>
      {text && (
        <p data-reveal="up" data-delay="3" className={`max-w-[560px] leading-[1.8] ${stacked ? "text-[16px] lg:text-[17px]" : "text-[17px] lg:text-[19px]"} ${dark ? "text-white/70" : "text-body"}`}>
          {text}
        </p>
      )}
      {action && (
        <div data-reveal="up" data-delay="4" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );

  if (stacked) {
    return (
      <div className={`border-t pt-8 ${rule} ${className}`}>
        <Eyebrow label={label} dark={dark} />
        {title}
        {intro}
      </div>
    );
  }

  return (
    <div className={`grid gap-8 border-t pt-8 lg:grid-cols-[0.3fr_0.7fr] lg:gap-12 ${rule} ${className}`}>
      <Eyebrow label={label} dark={dark} className="self-start lg:pt-5" />
      <div className="min-w-0">
        {title}
        {intro}
      </div>
    </div>
  );
}
