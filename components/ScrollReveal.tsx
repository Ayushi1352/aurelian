"use client";

import { useEffect } from "react";

const SMOOTH = "cubic-bezier(0.22, 1, 0.36, 1)";
const CURTAIN = "cubic-bezier(0.77, 0, 0.18, 1)";
/** data-delay="1".."8" waits this many milliseconds per step. */
const DELAY_STEP_MS = 90;

type Effect = { from: Keyframe; duration: number; easing?: string; to?: Keyframe };

/** Starting point of each scroll animation (data-reveal). */
const REVEAL: Record<string, Effect> = {
  up: { from: { opacity: 0, transform: "translate3d(0, 3rem, 0)" }, duration: 1000 },
  left: { from: { opacity: 0, transform: "translate3d(-3rem, 0, 0)" }, duration: 1000 },
  right: { from: { opacity: 0, transform: "translate3d(3rem, 0, 0)" }, duration: 1000 },
  zoom: { from: { opacity: 0, transform: "scale(0.94)" }, duration: 1000 },
  fade: { from: { opacity: 0 }, duration: 1000 },
  // Photo uncovered bottom to top (mask) or left to right like a curtain (wipe).
  mask: { from: { clipPath: "inset(100% 0 0 0)" }, to: { clipPath: "inset(0)" }, duration: 1400, easing: CURTAIN },
  wipe: { from: { clipPath: "inset(0 100% 0 0)" }, to: { clipPath: "inset(0)" }, duration: 1400, easing: CURTAIN },
  // Thin rule that draws itself in from the left (give it origin-left).
  line: { from: { transform: "scaleX(0)" }, duration: 1200, easing: CURTAIN },
};

/** Starting point of each page-load animation (data-intro); start states are in components/motion.ts. */
const INTRO: Record<string, Effect> = {
  up: { from: { opacity: 0, transform: "translate3d(0, 3rem, 0)" }, duration: 900 },
  fade: { from: { opacity: 0 }, duration: 800 },
  zoom: { from: { opacity: 0, transform: "scale(0.94)" }, duration: 1200 },
  line: { from: { transform: "scaleX(0)" }, duration: 800 },
  // Label un-blurs from wide tracking.
  label: { from: { opacity: 0, letterSpacing: "0.8em", filter: "blur(0.375rem)" }, duration: 1100 },
  kenburns: { from: { transform: "scale(1.12)" }, duration: 2400 },
  toast: { from: { opacity: 0, transform: "translateY(0.75rem)" }, duration: 450 },
};

const WORD_FROM: Keyframe = { transform: "translate3d(0, 110%, 0) rotate(4deg)" };
const DOT_POP: Keyframe[] = [{ opacity: 0, transform: "scale(0)" }, { opacity: 1, transform: "scale(1.6)", offset: 0.6 }, {}];

type TimelineCtor = new (options: Record<string, unknown>) => AnimationTimeline;

// Streamed content lands in the DOM before React hydrates it, and changing it then makes
// hydration report a mismatch. So an element is only touched once React has hydrated it.
const isHydrated = (el: Element) => Object.keys(el).some((key) => key.startsWith("__reactFiber$"));

const play = (el: Element, { from, to = {}, duration, easing = SMOOTH }: Effect, delay: number) =>
  el.animate([from, to], { duration, easing, delay, fill: "backwards" });

/** Word-by-word title (markup from SplitWords): words slide up from their masks, then the gold dot pops. */
const playWords = (el: Element, delay: number, step: number) => {
  const words = el.querySelectorAll("[data-word]");
  words.forEach((word, i) => word.animate([WORD_FROM, {}], { duration: 1000, easing: SMOOTH, delay: delay + i * step, fill: "backwards" }));
  el.querySelectorAll("[data-dot]").forEach((dot) =>
    dot.animate(DOT_POP, { duration: 600, easing: SMOOTH, delay: delay + words.length * step + 250, fill: "backwards" }),
  );
};

/**
 * Plays the animations of the whole site.
 *
 * Scroll: data-reveal="up | left | right | zoom | fade | mask | wipe | line | words" animates an
 * element when it scrolls into view; data-delay="1".."8" staggers it. "mask" and "wipe" also let
 * the photo inside settle from a slight zoom; "words" is a SplitWords title.
 *
 * Page load: data-intro="up | fade | zoom | line | label | kenburns | toast" (data-intro-delay="<ms>")
 * and data-words-now titles (data-words-delay="<ms>") play as soon as they appear.
 *
 * Scroll-linked: data-parallax photos drift as they pass, data-scroll-progress fills with the page.
 *
 * Everything runs through the Web Animations API, so no CSS is needed. Without JavaScript, or
 * with reduced motion turned on, every element is simply visible and nothing moves.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const { ViewTimeline, ScrollTimeline } = window as unknown as { ViewTimeline?: TimelineCtor; ScrollTimeline?: TimelineCtor };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();

    // Elements waiting below the fold are hidden by a held animation, never by a style
    // attribute: React may still be hydrating them (streamed pages hydrate in pieces, and
    // can start again), and any attribute changed before then is reported as a mismatch.
    const hidden = new Map<Element, Animation>();
    const hide = (el: HTMLElement) => hidden.set(el, el.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "forwards" }));
    const show = (el: Element) => {
      hidden.get(el)?.cancel();
      hidden.delete(el);
    };

    const reveal = (el: HTMLElement) => {
      show(el);
      const delay = Number(el.dataset.delay ?? 0) * DELAY_STEP_MS;
      const kind = el.dataset.reveal ?? "";
      if (kind === "words") return playWords(el, delay, 70);
      const effect = REVEAL[kind] ?? REVEAL.up;
      play(el, effect, delay);
      if (kind === "mask" || kind === "wipe") {
        el.querySelectorAll("img").forEach((img) => play(img, { from: { transform: "scale(1.15)" }, duration: kind === "wipe" ? 2200 : 2000 }, delay));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Already scrolled past (page opened half way down): show it without waiting.
          const passed = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !passed) continue;
          io.unobserve(entry.target);
          if (passed) show(entry.target);
          else reveal(entry.target as HTMLElement);
        }
      },
      // Start a little before the element is fully in, so it never sits empty on screen.
      { rootMargin: "0px 0px -8% 0px" },
    );

    // On the first scan the page is already painted, so whatever is on screen stays as it is.
    // Everything below the fold is hidden until it scrolls in. Later scans (another page opened,
    // a list paged, a slide changed) run before the browser paints the new elements, so those can
    // all be hidden and animated.
    let firstScan = true;
    let frame = 0;
    const scan = () => {
      let pending = false;
      const each = (selector: string, fn: (el: HTMLElement) => void) =>
        document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          if (seen.has(el)) return;
          if (!isHydrated(el)) return void (pending = true);
          seen.add(el);
          fn(el);
        });

      each("[data-scroll-progress]", (el) => {
        if (ScrollTimeline) el.animate([{ scale: "0 1" }, { scale: "1 1" }], { timeline: new ScrollTimeline({ source: document.documentElement }), fill: "both" });
      });
      if (!reduced) {
        each("[data-parallax]", (el) => {
          if (ViewTimeline) el.animate([{ translate: "0 -7%" }, { translate: "0 7%" }], { timeline: new ViewTimeline({ subject: el }), fill: "both" });
        });
        each("[data-intro]", (el) => {
          el.setAttribute("data-played", "");
          play(el, INTRO[el.dataset.intro ?? ""] ?? INTRO.up, Number(el.dataset.introDelay ?? 0));
        });
        each("[data-words-now]", (el) => {
          el.setAttribute("data-played", "");
          playWords(el, Number(el.dataset.wordsDelay ?? 0), 90);
        });
        each("[data-reveal]", (el) => {
          if (firstScan && el.getBoundingClientRect().top < window.innerHeight) return;
          hide(el);
          io.observe(el);
        });
      }
      // Until the whole first page has hydrated, whatever is on screen is still left visible.
      if (pending) frame = requestAnimationFrame(scan);
      else firstScan = false;
    };

    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });

    scan();
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
      hidden.forEach((animation) => animation.cancel());
    };
  }, []);

  return null;
}
