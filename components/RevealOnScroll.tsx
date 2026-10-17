"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

const PENDING = "[data-reveal]:not([data-revealed])";
// Give up waiting for hydration after this long and reveal anyway, so nothing stays hidden.
const HYDRATION_WAIT_MS = 5000;

/**
 * React tags each DOM node it has hydrated with a `__reactFiber$…` key. This component lives in the
 * root layout, which can hydrate before the page segment; touching a not-yet-hydrated node's
 * attributes would trigger a hydration mismatch.
 */
const isHydrated = (el: Element) => Object.keys(el).some((key) => key.startsWith("__reactFiber$"));

/**
 * Marks every `[data-reveal]` element with `data-revealed` once it scrolls into view, which starts
 * its CSS animation (see "Motion" in globals.css). Elements added later (route changes, tabs,
 * pagination) are picked up by a MutationObserver.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    window.__revealReady = true;
    let cancelled = false;

    const reveal = (el: Element, since = performance.now()) => {
      if (cancelled) return;
      if (isHydrated(el) || performance.now() - since > HYDRATION_WAIT_MS) {
        el.setAttribute("data-revealed", "");
      } else {
        requestAnimationFrame(() => reveal(el, since));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          reveal(entry.target);
        }
      },
      // Start a little before the element is fully in, so it never sits empty on screen.
      { rootMargin: "0px 0px -8% 0px" },
    );

    const watch = (root: Element | Document) => {
      if (root instanceof Element && root.matches(PENDING)) io.observe(root);
      root.querySelectorAll(PENDING).forEach((el) => io.observe(el));
    };

    watch(document);
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
