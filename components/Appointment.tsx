import Image from "next/image";
import { site, type AurelianAppointmentData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import AppointmentForm from "@/components/AppointmentForm";
import { Phone } from "@/components/Icons";

/** Dark sidebar (photo, "what to expect" steps, phone) beside the booking form on a white panel. */
export default function Appointment({ data = site.appointmentPage }: SectionProps<AurelianAppointmentData>) {
  const { label, titleLine1, titleLine2, text, image, stepsLabel, steps, callLabel, fields, timeSlots, modes, submitLabel, sendingLabel, thankYou } = data;
  const practiceAreas = site.practicePage.items.map((p) => p.title);
  const { phone } = site.footer.contact;

  return (
    <section className="bg-mist section-space">
      <div className="container-site grid lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative isolate overflow-hidden bg-wine-deep text-white">
          <div data-reveal="wipe" className="relative aspect-[4/3] overflow-hidden">
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 36vw, 92vw" className="object-cover object-top" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-wine-deep via-transparent to-transparent" />
          </div>
          <div className="p-7 sm:p-10">
            <h2 className="display-3">
              {stepsLabel}
              <span className="text-gold">.</span>
            </h2>
            <ol className="mt-6 border-t border-white/10">
              {steps.map((step, i) => (
                <li key={step.title} data-reveal="up" data-delay={i + 1} className="flex items-start gap-5 border-b border-white/10 py-5">
                  <span className="w-7 shrink-0 font-display text-[20px] font-semibold leading-[1.3] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[22px] font-semibold leading-tight">{step.title}</span>
                    <span className="mt-1 block text-[14px] text-white/70">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="group mt-8 flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center border border-gold/50 text-gold-light transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="label block text-[10px]! text-white/60">{callLabel}</span>
                <span className="block font-display text-[22px] font-semibold text-gold-light">{phone}</span>
              </span>
            </a>
          </div>
        </aside>

        <div className="mt-6 bg-white p-6 sm:p-10 lg:mt-0 lg:p-14">
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
      </div>
    </section>
  );
}
