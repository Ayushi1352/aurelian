"use client";

import { useEffect, useRef } from "react";
import type { AppointmentData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { FormThankYou } from "@/components/ui/FormThankYou";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

type AppointmentFormProps = {
  data: Pick<AppointmentData, "fields" | "timeSlots" | "submitLabel" | "sendingLabel" | "thankYou">;
  /** Practice area titles for the dropdown. */
  practiceAreas: string[];
  /** Screen-reader text of the thank-you message's close button. */
  closeLabel: string;
};

/** Today as YYYY-MM-DD in the visitor's local time zone. */
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Dummy booking form: nothing is sent anywhere; a thank-you message shows and then hides itself. */
export const AppointmentForm = ({ data, practiceAreas, closeLabel }: AppointmentFormProps) => {
  const { status, name, onSubmit, dismiss, showThanks, hiding } = useDummySubmit();
  const dateRef = useRef<HTMLInputElement>(null);
  const { fields, timeSlots, submitLabel, sendingLabel, thankYou } = data;

  // Past dates can't be picked. Set after mount so the server and client markup match.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = today();
  }, [showThanks]);

  if (showThanks) {
    return <FormThankYou title={thankYou.title} message={thankYou.message} closeLabel={closeLabel} name={name} hiding={hiding} onClose={dismiss} className="min-h-[32.5rem]" />;
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <InputField id="name" label={fields.name.label} placeholder={fields.name.placeholder} autoComplete="name" required />
      <InputField id="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} autoComplete="email" required />
      <InputField id="phone" type="tel" label={fields.phone.label} placeholder={fields.phone.placeholder} autoComplete="tel" required />
      <SelectField id="practice" label={fields.practice.label} placeholder={fields.practice.placeholder ?? ""} options={practiceAreas} required />
      <InputField ref={dateRef} id="date" type="date" label={fields.date.label} required />
      <SelectField id="time" label={fields.time.label} placeholder={fields.time.placeholder ?? ""} options={timeSlots} required />
      <div className="sm:col-span-2">
        <TextareaField id="message" label={fields.message.label} placeholder={fields.message.placeholder} rows={3} />
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
