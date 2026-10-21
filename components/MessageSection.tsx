import { site, type AurelianContactFormData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export default function MessageSection({ data = site.contactFormSection }: SectionProps<AurelianContactFormData>) {
  const { label, titleLine1, titleLine2, text, mapTitle, ...form } = data;
  // The map shows the same address that is printed in the footer and on the contact cards.
  const address = site.footer.contact.address.join(" ");
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;

  return (
    <section className="bg-mist section-space">
      <div className="container-site grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-white p-6 sm:p-10 lg:p-14">
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} stacked />
          <div data-reveal="up" data-delay="3" className="mt-10">
            <ContactForm {...form} />
          </div>
        </div>

        <div data-reveal="wipe" data-delay="2" className="relative min-h-[420px] overflow-hidden lg:min-h-full">
          <iframe src={mapEmbed} title={mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 block size-full border-0 grayscale-[0.6]" />
        </div>
      </div>
    </section>
  );
}
