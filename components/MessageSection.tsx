import { site, type AurelianContactFormData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

/** Message form in a white card beside a framed map, on an ivory band. */
export default function MessageSection({ data = site.contactFormSection }: SectionProps<AurelianContactFormData>) {
  const { label, titleLine1, titleLine2, text, mapTitle, ...form } = data;
  const { mapQuery } = site.footer.contact;
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`;

  return (
    <section className="bg-mist section-space">
      <div className="container-site grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[3px] border border-line bg-white p-6 shadow-[0_24px_60px_rgba(37,10,16,0.06)] sm:p-10 lg:p-12">
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
          <div data-reveal="up" data-delay="2" className="mt-10">
            <ContactForm {...form} />
          </div>
        </div>

        <div data-reveal="up" className="relative min-h-[420px] overflow-hidden rounded-[3px] border-[6px] border-white shadow-[0_24px_60px_rgba(37,10,16,0.08)] lg:min-h-full">
          <iframe src={mapEmbed} title={mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 block size-full border-0" />
        </div>
      </div>
    </section>
  );
}
