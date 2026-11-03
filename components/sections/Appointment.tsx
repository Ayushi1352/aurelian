import Image from "next/image";
import type { AppointmentData, GlobalUIData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { ui as classes } from "@/components/ui/ui";

type AppointmentProps = {
  data?: AppointmentData;
  /** Practice area titles for the dropdown. */
  practiceAreas: string[];
  ui: GlobalUIData;
};

export const Appointment = ({ data, practiceAreas, ui }: AppointmentProps) => {
  if (!data) return null;
  const { label, titleLine1, titleLine2, text } = data;

  return (
    <section className="grid lg:grid-cols-2">
      <div data-reveal="wipe" className="relative aspect-[4/3] overflow-hidden bg-navy-deep sm:aspect-[16/10] lg:aspect-auto lg:min-h-[35rem]">
        <span data-parallax className={`${classes.parallax} absolute inset-0 block`}>
          <Image src={data.image} alt={data.imageAlt} fill quality={75} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_38%] lg:object-top" />
        </span>
      </div>

      <div className={`${classes.sectionSpace} px-5 sm:px-10 lg:px-24`}>
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={text} stacked />
        <div data-reveal="up" data-delay="3" className="mt-10">
          <AppointmentForm data={data} practiceAreas={practiceAreas} closeLabel={ui.closeMessage} />
        </div>
      </div>
    </section>
  );
};
