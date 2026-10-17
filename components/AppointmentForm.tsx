"use client";

import { useEffect, useRef } from "react";
import type { AurelianAppointmentData } from "@/data";
import useDummySubmit from "@/components/useDummySubmit";
import FormThankYou from "@/components/FormThankYou";
import { InputField, SelectField, TextareaField } from "@/components/FormField";
import { ArrowRight } from "@/components/Icons";

type AppointmentFormProps = Pick<AurelianAppointmentData, "fields" | "timeSlots" | "modes" | "submitLabel" | "sendingLabel" | "thankYou"> & {
  /** Practice area titles for the dropdown. */
  practiceAreas: string[];
};

/** Today as YYYY-MM-DD in the visitor's local time zone. */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Dummy booking form: nothing is sent anywhere; a thank-you message shows and then hides itself. */
export default function AppointmentForm({ fields, timeSlots, modes, submitLabel, sendingLabel, thankYou, practiceAreas }: AppointmentFormProps) {
  const { status, name, onSubmit, dismiss, showThanks, hiding } = useDummySubmit();
  const dateRef = useRef<HTMLInputElement>(null);

  // Past dates can't be picked. Set after mount so the server and client markup match.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = today();
  }, [showThanks]);

  if (showThanks) {
    return <FormThankYou title={thankYou.title} message={thankYou.message} name={name} hiding={hiding} onClose={dismiss} className="min-h-[520px]" />;
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <InputField id="name" label={fields.name.label} placeholder={fields.name.placeholder} autoComplete="name" required />
      <InputField id="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} autoComplete="email" required />
      <InputField id="phone" type="tel" label={fields.phone.label} placeholder={fields.phone.placeholder} autoComplete="tel" required />
      <SelectField id="practice" label={fields.practice.label} placeholder={fields.practice.placeholder} options={practiceAreas} required />
      <InputField ref={dateRef} id="date" type="date" label={fields.date.label} required />
      <SelectField id="time" label={fields.time.label} placeholder={fields.time.placeholder} options={timeSlots} required />

      <fieldset className="min-w-0 sm:col-span-2">
        <legend className="label mb-3 block text-[10px]! text-muted">
          {fields.mode.label}
          <span className="ml-1 text-gold">*</span>
        </legend>
        <div className="grid gap-3 xs:grid-cols-3">
          {modes.map((mode, i) => (
            <label
              key={mode}
              className="flex items-center gap-3 border border-line px-4 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-gold has-checked:border-wine has-checked:bg-wine has-checked:text-white"
            >
              <input type="radio" name="mode" value={mode} defaultChecked={i === 0} required className="size-4 accent-gold" />
              {mode}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <TextareaField id="message" label={fields.message.label} placeholder={fields.message.placeholder} rows={3} />
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
