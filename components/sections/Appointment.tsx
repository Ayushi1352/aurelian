'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { AppointmentData, AppointmentProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useFormSubmit } from '@/components/ui/useFormSubmit';
import { FormThankYou } from '@/components/ui/FormThankYou';
import { InputField, SelectField, TextareaField } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';

/** Today as YYYY-MM-DD in the visitor's local time zone. */
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** Dummy booking form: nothing is sent anywhere; a thank-you message shows and then hides itself. */
const AppointmentForm = ({ data }: { data: AppointmentData }) => {
  const { status, name, onSubmit, dismiss, showThanks, hiding } = useFormSubmit();
  const dateRef = useRef<HTMLInputElement>(null);
  const { fields } = data;

  // Past dates can't be picked. Set after mount so the server and client markup match.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = today();
  }, [showThanks]);

  if (showThanks) {
    return (
      <FormThankYou
        title={data.successTitle}
        message={data.successText}
        icon={data.successIcon}
        closeLabel={data.closeMessageLabel}
        closeIcon={data.closeMessageIcon}
        name={name}
        hiding={hiding}
        onClose={dismiss}
        className="min-h-[32.5rem]"
      />
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <InputField id="name" label={fields.name.label} placeholder={fields.name.placeholder} autoComplete="name" required />
      <InputField id="email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} autoComplete="email" required />
      <InputField id="phone" type="tel" label={fields.phone.label} placeholder={fields.phone.placeholder} autoComplete="tel" required />
      <SelectField id="practice" label={fields.practice.label} placeholder={fields.practice.placeholder ?? ''} options={data.practiceOptions} icon={data.selectIcon} required />
      <InputField ref={dateRef} id="date" type="date" label={fields.date.label} required />
      <SelectField id="time" label={fields.time.label} placeholder={fields.time.placeholder ?? ''} options={data.timeOptions} icon={data.selectIcon} required />
      <div className="sm:col-span-2">
        <TextareaField id="message" label={fields.message.label} placeholder={fields.message.placeholder} rows={3} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className={`${ui.btnPrimary} w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto`}>
          {sending ? data.sendingText : data.buttonText}
          {!sending && <Icon name={data.buttonIcon} className="size-4" strokeWidth={2} />}
        </button>
      </div>
    </form>
  );
};

export const Appointment = ({ data }: AppointmentProps) => {
  if (!data) return null;
  const { label, title, titleHighlight, text } = data;

  return (
    <section className="grid lg:grid-cols-2">
      <div data-reveal="wipe" className="relative aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[16/10] lg:aspect-auto lg:min-h-[35rem]">
        <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
          <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_38%] lg:object-top" />
        </span>
      </div>

      <div className={`${ui.sectionSpace} px-5 sm:px-10 lg:px-24`}>
        <SectionHeading label={label} title={title} titleHighlight={titleHighlight} text={text} stacked />
        <div data-reveal="up" data-delay="3" className="mt-10">
          <AppointmentForm data={data} />
        </div>
      </div>
    </section>
  );
};
