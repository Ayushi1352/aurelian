"use client";

import type { AurelianContactFormData } from "@/data";
import useDummySubmit from "@/components/useDummySubmit";
import FormThankYou from "@/components/FormThankYou";
import { InputField, TextareaField } from "@/components/FormField";
import { ArrowRight } from "@/components/Icons";

type ContactFormProps = Pick<AurelianContactFormData, "fields" | "submitLabel" | "sendingLabel" | "thankYou">;

/** Dummy contact form: nothing is sent anywhere; a thank-you message shows and then hides itself. */
export default function ContactForm({ fields, submitLabel, sendingLabel, thankYou }: ContactFormProps) {
  const { status, name, onSubmit, dismiss, showThanks, hiding } = useDummySubmit();

  if (showThanks) {
    return <FormThankYou title={thankYou.title} message={thankYou.message} name={name} hiding={hiding} onClose={dismiss} className="min-h-[440px]" />;
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
        <button type="submit" disabled={sending} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {sending ? sendingLabel : submitLabel}
          {!sending && <ArrowRight className="size-4" />}
        </button>
      </div>
    </form>
  );
}
