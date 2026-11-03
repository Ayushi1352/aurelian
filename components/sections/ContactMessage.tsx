import type { CompanyData, ContactFormData, GlobalUIData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { ui as classes } from "@/components/ui/ui";
import { mapUrl } from "@/components/ui/text";

/** Contact form beside a map of the office (the same address as the footer and the contact cards). */
export const ContactMessage = ({ data, company, ui }: { data?: ContactFormData; company: CompanyData; ui: GlobalUIData }) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text, mapTitle } = data;

  return (
    <section className={`bg-mist ${classes.sectionSpace}`}>
      <div className={`${classes.container} grid gap-6 lg:grid-cols-[1.15fr_0.85fr]`}>
        <div className="bg-white p-6 sm:p-10 lg:p-14">
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} stacked />
          <div data-reveal="up" data-delay="3" className="mt-10">
            <ContactForm data={data} closeLabel={ui.closeMessage} />
          </div>
        </div>

        <div data-reveal="wipe" data-delay="2" className="relative min-h-[26.25rem] overflow-hidden lg:min-h-full">
          <iframe
            src={mapUrl(company.mapEmbedUrl, company)}
            title={mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 block size-full border-0 grayscale-[0.6]"
          />
        </div>
      </div>
    </section>
  );
};
