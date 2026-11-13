"use client";

import type { ContactFormData } from "@/types/templates.types";
import { useFormSubmit } from "@/components/ui/useFormSubmit";
import { FormThankYou } from "@/components/ui/FormThankYou";
import { InputField, TextareaField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

type ContactFormProps = {
  data: Pick<ContactFormData, "fields" | "submitLabel" | "sendingLabel" | "thankYou">;
  /** Screen-reader text of the thank-you message's close button. */
  closeLabel: string;
};

/** Dummy form: nothing is sent; a thank-you message shows and then hides itself. */
export const ContactForm = ({ data, closeLabel }: ContactFormProps) => {
  const { status, name, onSubmit, dismiss, showThanks, hiding } = useFormSubmit();
  const { fields, submitLabel, sendingLabel, thankYou } = data;

  if (showThanks) {
    return <FormThankYou title={thankYou.title} message={thankYou.message} closeLabel={closeLabel} name={name} hiding={hiding} onClose={dismiss} className="min-h-[27.5rem]" />;
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <InputField id="name" label={fields.name.label} placeholder={fields.name.placeholder} autoComplete="name" required />
      <InputField id="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} autoComplete="email" required />
      <InputField id="phone" type="tel" label={fields.phone.label} placeholder={fields.phone.placeholder} autoComplete="tel" />
      <InputField id="subject" label={fields.subject.label} placeholder={fields.subject.placeholder} required />
      <div className="sm:col-span-2">
        <TextareaField id="message" label={fields.message.label} placeholder={fields.message.placeholder} required />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className={`${ui.btnPrimary} w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto`}>
          {sending ? sendingLabel : submitLabel}
          {!sending && <Icon name="LuArrowRight" className="size-4" strokeWidth={2} />}
        </button>
      </div>
    </form>
  );
};
