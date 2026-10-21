import Image from "next/image";
import { site, type AurelianAppointmentData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import AppointmentForm from "@/components/AppointmentForm";

export default function Appointment({ data = site.appointmentPage }: SectionProps<AurelianAppointmentData>) {
  const { label, titleLine1, titleLine2, text, image, fields, timeSlots, modes, submitLabel, sendingLabel, thankYou } = data;
  const practiceAreas = site.practicePage.items.map((p) => p.title);

  return (
    <section className="grid lg:grid-cols-2">
      <div data-reveal="wipe" className="relative aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[16/10] lg:aspect-auto lg:min-h-[560px]">
        <span className="parallax absolute inset-0 block">
          <Image src={image.src} alt={image.alt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_38%] lg:object-top" />
        </span>
      </div>

      <div className="section-space px-5 sm:px-10 lg:px-24">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} stacked />
        <div data-reveal="up" data-delay="3" className="mt-10">
          <AppointmentForm
            fields={fields}
            timeSlots={timeSlots}
            modes={modes}
            submitLabel={submitLabel}
            sendingLabel={sendingLabel}
            thankYou={thankYou}
            practiceAreas={practiceAreas}
          />
        </div>
      </div>
    </section>
  );
}
