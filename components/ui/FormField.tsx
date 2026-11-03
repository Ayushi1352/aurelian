import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

export const fieldClass =
  "mt-1 block w-full min-w-0 border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted/60 focus:border-gold focus:shadow-[0_0.0625rem_0_0_var(--color-gold)]";

const Label = ({ htmlFor, label, required, children }: { htmlFor: string; label: string; required?: boolean; children: ReactNode }) => (
  <div className="min-w-0">
    <label htmlFor={htmlFor} className={`${ui.labelSmall} block text-muted`}>
      {label}
      {required && <span className="ml-1 text-gold">*</span>}
    </label>
    {children}
  </div>
);

type InputFieldProps = ComponentProps<"input"> & { id: string; label: string };

// Chrome pads the parts of a date field by default; without this the date field sits taller than the others.
const dateClass =
  "[&::-webkit-date-and-time-value]:min-h-[1lh] [&::-webkit-date-and-time-value]:[text-align:inherit] [&::-webkit-datetime-edit]:inline-flex [&::-webkit-datetime-edit]:py-0 [&::-webkit-datetime-edit-fields-wrapper]:p-0 " +
  "[&::-webkit-datetime-edit-day-field]:py-0 [&::-webkit-datetime-edit-month-field]:py-0 [&::-webkit-datetime-edit-year-field]:py-0";

export const InputField = ({ id, label, required, type, ...props }: InputFieldProps) => (
  <Label htmlFor={id} label={label} required={required}>
    <input id={id} name={id} type={type} required={required} className={type === "date" ? `${fieldClass} ${dateClass}` : fieldClass} {...props} />
  </Label>
);

type TextareaFieldProps = ComponentProps<"textarea"> & { id: string; label: string };

export const TextareaField = ({ id, label, required, ...props }: TextareaFieldProps) => (
  <Label htmlFor={id} label={label} required={required}>
    <textarea id={id} name={id} required={required} rows={4} className={`${fieldClass} resize-y`} {...props} />
  </Label>
);

type SelectFieldProps = ComponentProps<"select"> & {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
};

export const SelectField = ({ id, label, required, placeholder, options, ...props }: SelectFieldProps) => (
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
      <Icon name="LuChevronDown" className="pointer-events-none absolute right-0 top-1/2 mt-1 size-4 -translate-y-1/2 text-gold" strokeWidth={2} />
    </div>
  </Label>
);
