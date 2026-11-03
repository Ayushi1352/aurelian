// Start states for the page-load animations played by components/ui/ScrollReveal.tsx
// (data-intro and data-words-now). They apply only before the animation starts (no data-played
// yet), with JavaScript on and reduced motion off, so without scripts nothing stays hidden.
// Written out in full (not joined from parts) so Tailwind finds the class names.

/** Fades / slides in (data-intro="up | fade | label | zoom | toast"). */
export const introHidden = "motion-safe:[@media(scripting:enabled)]:[&:not([data-played])]:opacity-0";
/** Rule that draws itself in from the left (data-intro="line"). */
export const introLine = "origin-left motion-safe:[@media(scripting:enabled)]:[&:not([data-played])]:scale-x-0";
/** Photo that settles from a slight zoom (data-intro="kenburns"). */
export const kenburnsStart = "motion-safe:[@media(scripting:enabled)]:[&:not([data-played])]:scale-112";

// Words of a title inside data-words-now wait below their mask; the gold full stop waits hidden.
export const wordHidden = "motion-safe:[@media(scripting:enabled)]:[[data-words-now]:not([data-played])_&]:translate-y-[110%]";
export const dotHidden = "motion-safe:[@media(scripting:enabled)]:[[data-words-now]:not([data-played])_&]:opacity-0";
