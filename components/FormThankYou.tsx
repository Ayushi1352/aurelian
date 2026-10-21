"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, CloseIcon } from "@/components/Icons";

type FormThankYouProps = {
  title: string;
  message: string;
  closeLabel: string;
  /** Visitor's name, filled into `{name}` in the title. */
  name?: string;
  hiding?: boolean;
  onClose: () => void;
  className?: string;
};

/** Shown in place of a form after it is submitted; hides itself after a few seconds. */
export default function FormThankYou({ title, message, closeLabel, name, hiding = false, onClose, className = "" }: FormThankYouProps) {
  const heading = title.replace("{name}", name?.trim().split(" ")[0] || "").replace(/\s+!/, "!");
  const ref = useRef<HTMLDivElement>(null);

  // On phones the message can land above the screen, so scroll it into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < 0 || bottom > window.innerHeight) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={`relative flex flex-col items-start justify-center bg-navy-deep px-8 py-12 text-white transition-[opacity,translate] duration-400 sm:px-12 ${
        hiding ? "translate-y-2 opacity-0" : "animate-toast opacity-100"
      } ${className}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-4 top-4 grid size-11 place-items-center border border-white/20 text-white/70 transition-colors hover:border-gold hover:bg-gold hover:text-white"
      >
        <CloseIcon className="size-5" />
      </button>
      <CheckCircle className="size-14 text-gold-light" />
      <h3 className="display-2 mt-8">{heading}</h3>
      <p className="mt-5 max-w-[440px] text-[17px] leading-[1.7] text-white/75">{message}</p>
    </div>
  );
}
