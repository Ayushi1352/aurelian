'use client';

import type { ContactFormData, ContactFormProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useFormSubmit } from '@/components/ui/useFormSubmit';
import { FormThankYou } from '@/components/ui/FormThankYou';
import { InputField, TextareaField } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';

/** Dummy form: nothing is sent; a thank-you message shows and then hides itself. */
const MessageForm = ({ data }: { data: ContactFormData }) => {
  const { status, name, onSubmit, dismiss, showThanks, hiding } = useFormSubmit();
  const { fields } = data;

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
        className="min-h-[27.5rem]"
      />
    );
  }

  const sending = status === 'sending';

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
          {sending ? data.sendingText : data.buttonText}
          {!sending && <Icon name={data.buttonIcon} className="size-4" strokeWidth={2} />}
        </button>
      </div>
    </form>
  );
};

/** Contact form beside a map of the office. */
export const ContactForm = ({ data }: ContactFormProps) => {
  if (!data) return null;
  const { label, title, titleHighlight, text } = data;

  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
      <div className={`${ui.container} grid gap-6 lg:grid-cols-[1.15fr_0.85fr]`}>
        <div className="bg-white p-6 sm:p-10 lg:p-14">
          <SectionHeading label={label} title={title} titleHighlight={titleHighlight} text={text} stacked />
          <div data-reveal="up" data-delay="3" className="mt-10">
            <MessageForm data={data} />
          </div>
        </div>

        <div data-reveal="wipe" data-delay="2" className="relative min-h-[26.25rem] overflow-hidden lg:min-h-full">
          <iframe
            src={data.mapEmbedUrl}
            title={data.mapLabel}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 block size-full border-0 grayscale-[0.6]"
          />
        </div>
      </div>
    </section>
  );
};
