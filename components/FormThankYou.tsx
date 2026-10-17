import { CheckCircle, CloseIcon } from "@/components/Icons";

type FormThankYouProps = {
  title: string;
  message: string;
  /** Visitor's name, filled into `{name}` in the title. */
  name?: string;
  /** True while the message fades out. */
  hiding?: boolean;
  onClose: () => void;
  className?: string;
};

/** Shown in place of a form after it is submitted; hides itself after a few seconds. */
export default function FormThankYou({ title, message, name, hiding = false, onClose, className = "" }: FormThankYouProps) {
  const heading = title.replace("{name}", name?.trim().split(" ")[0] || "").replace(/\s+!/, "!");

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative flex flex-col items-start justify-center bg-wine-deep px-8 py-12 text-white transition-[opacity,translate] duration-400 sm:px-12 ${
        hiding ? "translate-y-2 opacity-0" : "animate-toast opacity-100"
      } ${className}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close message"
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
