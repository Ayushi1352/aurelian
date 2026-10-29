// Tailwind class lists shared by many components, so the site needs no custom CSS in globals.css.
// Sizes are in rem: from 1024px the root font size follows the 1440px design (see <html> in app/layout.tsx).

/** Page-width container: 1360px wide at most, with side padding per screen size. */
const container = "mx-auto w-full max-w-[85rem] px-5 sm:px-8 lg:px-10";

/** Space above and below a section on a coloured or photo background. */
const sectionSpace = "py-14 md:py-[4.5rem] lg:py-24";

/**
 * A plain (white) section: give the <section> data-plain too, so two plain sections
 * in a row share one gap instead of stacking two.
 */
const sectionPlain = `${sectionSpace} [[data-plain]+&]:pt-0`;

// Type scale: classic serif headlines.
const display1 = "font-display font-semibold text-[clamp(2.25rem,4.4vw,4.5rem)] leading-[1.04] tracking-[-0.005em]";
const display2 = "font-display font-semibold text-[clamp(2rem,3.4vw,3.375rem)] leading-[1.08] tracking-[-0.005em]";
const display3 = "font-display font-semibold text-[clamp(1.375rem,1.7vw,1.625rem)] leading-[1.2]";

/** Small uppercase label above titles. */
const labelBase = "font-sans font-semibold uppercase tracking-[0.3em]";
const label = `${labelBase} text-[0.6875rem] lg:text-[0.75rem]`;

/** Smaller label (card categories, numbers, form field labels): the same size on every screen. */
const labelSmall = `${labelBase} text-[0.625rem]`;

/** Square button; on hover a fill (--btn-fill, set by each colour below) sweeps in from the left. */
// No display here: a button that is hidden on some screens sets its own (e.g. hidden sm:inline-flex).
const btnBase =
  "items-center justify-center gap-3 border py-[0.875rem] text-center font-sans text-[0.75rem] font-semibold uppercase tracking-[0.2em] " +
  "bg-[linear-gradient(var(--btn-fill),var(--btn-fill))] bg-size-[0%_100%] bg-left-top bg-no-repeat hover:bg-size-[100%_100%] " +
  "transition-[background-size,background-color,color,border-color] duration-[550ms,350ms,350ms,350ms] ease-[var(--ease-smooth),ease,ease,ease] " +
  "[&_svg]:shrink-0 [&_svg]:transition-[translate] [&_svg]:duration-350 [&_svg]:ease-smooth hover:[&_svg]:translate-x-1";
const btn = `inline-flex ${btnBase} min-h-[3.25rem] px-[1.875rem] lg:min-h-[3.5rem] lg:px-9`;

const primaryColors = "[--btn-fill:var(--color-gold)] border-navy bg-navy text-white hover:border-gold";

/** Navy button, gold sweep. */
const btnPrimary = `${btn} ${primaryColors}`;

/** Compact navy button (navbar); add its display (hidden sm:inline-flex). */
const btnPrimarySmall = `${btnBase} min-h-[3rem] px-6 ${primaryColors}`;

/** Gold button for dark backgrounds, white sweep. */
const btnGold = `${btn} [--btn-fill:var(--color-white)] border-gold bg-gold text-white hover:border-white hover:text-navy-deep`;

/** Outlined white button for dark backgrounds, white sweep. */
const btnLight = `${btn} [--btn-fill:var(--color-white)] border-white/45 text-white hover:border-white hover:text-navy-deep`;

/** Text link with an arrow line: the line extends on hover (also when a parent .group is hovered). */
const linkArrow =
  "inline-flex items-center gap-[0.875rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.22em] " +
  "before:h-px before:w-7 before:bg-current before:transition-[width] before:duration-500 before:ease-smooth hover:before:w-12 group-hover:before:w-12";

/** Text link with a line that grows under it on hover. */
const linkLine =
  "bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_0.0625rem] bg-left-bottom bg-no-repeat hover:bg-size-[100%_0.0625rem] " +
  "transition-[background-size,color] duration-400 ease-smooth";

/**
 * Wrapper around a photo that drifts as the page scrolls (played by ScrollReveal through
 * data-parallax). Put it on a wrapper, not on an element that already animates.
 */
const parallax = "scale-116";

export const ui = {
  container,
  sectionSpace,
  sectionPlain,
  display1,
  display2,
  display3,
  label,
  labelSmall,
  btnPrimary,
  btnPrimarySmall,
  btnGold,
  btnLight,
  linkArrow,
  linkLine,
  parallax,
};
