'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { introHidden } from '@/components/ui/motion';

type FormThankYouProps = {
  title: string;
  message: string;
  closeLabel: string;
  closeIcon: string;
  /** Tick shown above the title */
  icon: string;
  /** Visitor's name, filled into `{name}` in the title. */
  name?: string;
  hiding?: boolean;
  onClose: () => void;
  className?: string;
};

/** Shown in place of a form after it is submitted; hides itself after a few seconds. */
export const FormThankYou = ({ title, message, closeLabel, closeIcon, icon, name, hiding = false, onClose, className = '' }: FormThankYouProps) => {
  const heading = title.replace('{name}', name?.trim().split(' ')[0] || '').replace(/\s+!/, '!');
  const ref = useRef<HTMLDivElement>(null);

  // On phones the message can land above the screen, so scroll it into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < 0 || bottom > window.innerHeight) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      data-intro="toast"
      aria-live="polite"
      className={`relative flex flex-col items-start justify-center bg-navy-deep px-8 py-12 text-white transition-[opacity,transform] duration-400 sm:px-12 ${
        hiding ? 'translate-y-2 opacity-0' : `opacity-100 ${introHidden}`
      } ${className}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-4 top-4 grid size-11 place-items-center border border-white/20 text-white/70 transition-colors hover:border-gold hover:bg-gold hover:text-white"
      >
        <Icon name={closeIcon} className="size-5" strokeWidth={1.8} />
      </button>
      <Icon name={icon} className="size-14 text-gold-light" />
      <h3 className={`${ui.display2} mt-8`}>{heading}</h3>
      <p className="mt-5 max-w-[27.5rem] text-[1.0625rem] leading-[1.7] text-white/75">{message}</p>
    </div>
  );
};
