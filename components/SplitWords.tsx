import { Fragment, type CSSProperties } from "react";

type SplitWordsProps = {
  text: string;
  /** Index of the first word, so a second line continues the stagger of the first. */
  start?: number;
  className?: string;
};

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Wraps every word in a mask for the word-by-word headline animation (".word" in globals.css).
 * Plays on scroll inside `data-reveal="words"`, or straight away inside `data-words-now`.
 */
export default function SplitWords({ text, start = 0, className = "" }: SplitWordsProps) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word, i) => (
      <Fragment key={i}>
        <span className="word">
          <span className={className} style={order(start + i)}>
            {word}
          </span>
        </span>{" "}
      </Fragment>
    ));
}

/** Ends a title the way the hero banner does: a closing full stop becomes a gold one, other punctuation stays. */
function splitEnding(text: string) {
  const trimmed = text.trim();
  if (trimmed.endsWith(".")) return { body: trimmed.slice(0, -1), dot: true };
  return { body: trimmed, dot: /[\p{L}\p{N}]$/u.test(trimmed) };
}

type HeadlineProps = {
  line1: string;
  /** Second part of the title, set in italics. */
  line2?: string;
  /** Gold full stop at the end (on by default). */
  dot?: boolean;
};

/** Title words for an h1/h2: animated words, optional italic second part and the signature gold dot. */
export function Headline({ line1, line2, dot = true }: HeadlineProps) {
  const first = line2 ? { body: line1.trim(), dot: false } : splitEnding(line1);
  const second = line2 ? splitEnding(line2) : null;
  const firstCount = first.body.split(" ").filter(Boolean).length;
  const total = firstCount + (second ? second.body.split(" ").filter(Boolean).length : 0);
  const showDot = dot && (second ? second.dot : first.dot);

  return (
    <>
      <SplitWords text={first.body} />
      {second && <SplitWords text={second.body} start={firstCount} className="italic" />}
      {showDot && (
        <span aria-hidden="true" className="gold-dot inline-block text-gold" style={order(total)}>
          .
        </span>
      )}
    </>
  );
}
