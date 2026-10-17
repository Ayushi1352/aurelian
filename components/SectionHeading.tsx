import type { ReactNode } from "react";
import { Headline } from "@/components/SplitWords";

type SectionHeadingProps = {
  label: string;
  line1: string;
  /** Second part of the title, set in italics. */
  line2?: string;
  /** Short intro paragraph under the title. */
  text?: string;
  /** White text, for sections on a dark background. */
  dark?: boolean;
  align?: "left" | "center";
  /** Shown on the right of the title on large screens (e.g. a "view all" button). */
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Small tracked label led by a thin gold rule (the hero banner's label style), used above every section title. */
export function Eyebrow({ label, dark = false, centered = false, className = "" }: { label: string; dark?: boolean; centered?: boolean; className?: string }) {
  return (
    <p className={`label flex items-center gap-4 ${centered ? "justify-center" : ""} ${dark ? "text-white/80" : "text-gold"} ${className}`}>
      <span aria-hidden="true" data-reveal="line" className="h-px w-10 shrink-0 bg-gold" />
      <span data-reveal="fade" data-delay="2">
        {label}
      </span>
      {centered && <span aria-hidden="true" data-reveal="line" className="h-px w-10 shrink-0 bg-gold" />}
    </p>
  );
}

/** Section title: tracked label, serif headline whose words rise in one by one, ending in a gold full stop. */
export default function SectionHeading({ label, line1, line2, text, dark = false, align = "left", action, as: Tag = "h2", className = "" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`flex flex-col gap-8 ${centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"} ${className}`}>
      <div className={`min-w-0 ${centered ? "max-w-[760px]" : "max-w-[680px]"}`}>
        <Eyebrow label={label} dark={dark} centered={centered} />
        <Tag data-reveal="words" className={`display-2 mt-5 text-balance ${dark ? "text-white" : "text-ink"}`}>
          <Headline line1={line1} line2={line2} />
        </Tag>
        {text && (
          <p data-reveal="up" data-delay="3" className={`mt-5 text-[16px] leading-[1.8] lg:text-[17px] ${dark ? "text-white/70" : "text-body"} ${centered ? "mx-auto max-w-[620px]" : ""}`}>
            {text}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal="up" data-delay="3" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
