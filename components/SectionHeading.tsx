import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  line1: string;
  /** Second line, shown in gold italics. */
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

/** Small gold label with a diamond, used above every section title. */
export function Eyebrow({ label, dark = false, centered = false, className = "" }: { label: string; dark?: boolean; centered?: boolean; className?: string }) {
  return (
    <p data-reveal="up" className={`label flex items-center gap-3 ${centered ? "justify-center" : ""} ${dark ? "text-gold-light" : "text-gold"} ${className}`}>
      <span aria-hidden="true" className="diamond" />
      {label}
      {centered && <span aria-hidden="true" className="diamond" />}
    </p>
  );
}

/** Section title: a gold label over a serif headline whose second line is italic gold. */
export default function SectionHeading({ label, line1, line2, text, dark = false, align = "left", action, as: Tag = "h2", className = "" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`flex flex-col gap-8 ${centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"} ${className}`}>
      <div className={`min-w-0 ${centered ? "max-w-[760px]" : "max-w-[720px]"}`}>
        <Eyebrow label={label} dark={dark} centered={centered} />
        <Tag data-reveal="up" data-delay="1" className={`display-2 mt-5 ${dark ? "text-white" : "text-ink"}`}>
          {line1} {line2 && <span className={`italic ${dark ? "text-gold-light" : "text-gold"}`}>{line2}</span>}
        </Tag>
        {text && (
          <p data-reveal="up" data-delay="2" className={`lead mt-5 ${dark ? "text-white/70" : "text-body"}`}>
            {text}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal="up" data-delay="2" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
