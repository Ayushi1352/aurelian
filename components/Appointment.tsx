import Image from "next/image";
import { site, type AurelianAppointmentData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import AppointmentForm from "@/components/AppointmentForm";
import { Phone } from "@/components/Icons";

/** Wine sidebar (photo, "what to expect" steps, phone) beside the booking form in a white card. */
export default function Appointment({ data = site.appointmentPage }: SectionProps<AurelianAppointmentData>) {
  const { label, titleLine1, titleLine2, text, image, stepsLabel, steps, callLabel, fields, timeSlots, modes, submitLabel, sendingLabel, thankYou } = data;
  const practiceAreas = site.practicePage.items.map((p) => p.title);
  const { phone } = site.footer.contact;

  return (
    <section className="bg-mist section-space">
      <div className="container-site grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside data-reveal="up" className="relative isolate self-start overflow-hidden rounded-[3px] bg-wine text-white">
          <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10" />
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 36vw, 92vw" className="object-cover object-top" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-wine via-transparent to-transparent" />
          </div>
          <div className="p-7 sm:p-10">
            <h2 className="display-3">{stepsLabel}</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="arch grid h-12 w-10 shrink-0 place-items-center bg-gold pt-1 font-display text-[20px] font-semibold">{i + 1}</span>
                  <span>
                    <span className="block font-display text-[22px] font-semibold leading-tight">{step.title}</span>
                    <span className="mt-1 block text-[14px] text-white/70">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="group mt-8 flex items-center gap-3 border-t border-white/15 pt-7">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-gold-light transition-colors group-hover:bg-gold group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] text-white/60">{callLabel}</span>
                <span className="block font-display text-[22px] font-semibold text-gold-light">{phone}</span>
              </span>
            </a>
          </div>
        </aside>

        <div className="rounded-[3px] border border-line bg-white p-6 shadow-[0_24px_60px_rgba(37,10,16,0.06)] sm:p-10 lg:p-12">
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} />
          <div data-reveal="up" data-delay="2" className="mt-10">
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
