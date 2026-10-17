import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "@/components/Icons";

/** Boxed fields on a light ivory fill; gold border on focus. */
export const fieldClass =
  "mt-2 block w-full min-w-0 rounded-[3px] border border-line bg-mist px-4 py-3.5 text-[16px] text-ink outline-none transition-[border-color,background-color,box-shadow] placeholder:text-muted/70 focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(180,138,79,0.15)]";

function Label({ htmlFor, label, required, children }: { htmlFor: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="block text-[14px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {children}
    </div>
  );
}

type InputFieldProps = ComponentProps<"input"> & { id: string; label: string };

export function InputField({ id, label, required, ...props }: InputFieldProps) {
  return (
    <Label htmlFor={id} label={label} required={required}>
      <input id={id} name={id} required={required} className={fieldClass} {...props} />
    </Label>
  );
}

type TextareaFieldProps = ComponentProps<"textarea"> & { id: string; label: string };

export function TextareaField({ id, label, required, ...props }: TextareaFieldProps) {
  return (
    <Label htmlFor={id} label={label} required={required}>
      <textarea id={id} name={id} required={required} rows={4} className={`${fieldClass} resize-y`} {...props} />
    </Label>
  );
}

type SelectFieldProps = ComponentProps<"select"> & {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
};

export function SelectField({ id, label, required, placeholder, options, ...props }: SelectFieldProps) {
  return (
    <Label htmlFor={id} label={label} required={required}>
      <div className="relative">
        <select id={id} name={id} required={required} defaultValue="" className={`${fieldClass} appearance-none pr-10 invalid:text-muted/70`} {...props}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-gold" />
      </div>
    </Label>
  );
}
