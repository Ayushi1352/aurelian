import { Fragment } from "react";
import { dotHidden, wordHidden } from "@/components/ui/motion";

type SplitWordsProps = {
  text: string;
  className?: string;
};

/**
 * Wraps every word in a mask for the word-by-word headline animation (played by ScrollReveal).
 * Plays on scroll inside `data-reveal="words"`, or straight away inside `data-words-now`;
 * words are staggered in the order they appear, so a second part continues after the first.
 */
export const SplitWords = ({ text, className = "" }: SplitWordsProps) =>
  text
    .split(" ")
    .filter(Boolean)
    .map((word, i) => (
      // Space only between words, so a trailing gold dot stays glued to the last word.
      <Fragment key={i}>
        {i > 0 && " "}
        <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className={`inline-block origin-bottom-left ${wordHidden} ${className}`}>
            {word}
          </span>
        </span>
      </Fragment>
    ));

/** Ends a title the way the hero banner does: a closing full stop becomes a gold one, other punctuation stays. */
const splitEnding = (text: string) => {
  const trimmed = text.trim();
  if (trimmed.endsWith(".")) return { body: trimmed.slice(0, -1), dot: true };
  return { body: trimmed, dot: /[\p{L}\p{N}]$/u.test(trimmed) };
};

type HeadlineProps = {
  line1: string;
  /** Second part of the title, set in italics. */
  line2?: string;
  /** Gold full stop at the end (on by default). */
  dot?: boolean;
};

/** Title words for an h1/h2: animated words, optional italic second part and the signature gold dot. */
export const Headline = ({ line1, line2, dot = true }: HeadlineProps) => {
  const first = line2 ? { body: line1.trim(), dot: false } : splitEnding(line1);
  const second = line2 ? splitEnding(line2) : null;
  const showDot = dot && (second ? second.dot : first.dot);

  return (
    <>
      <SplitWords text={first.body} />
      {second && (
        <>
          {" "}
          <SplitWords text={second.body} className="italic" />
        </>
      )}
      {showDot && (
        <span aria-hidden="true" data-dot className={`inline-block text-gold ${dotHidden}`}>
          .
        </span>
      )}
    </>
  );
};
