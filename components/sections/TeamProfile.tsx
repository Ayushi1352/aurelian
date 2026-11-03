import Image from "next/image";
import Link from "next/link";
import type { GlobalUIData, TeamDetailData, TeamMember } from "@/types/templates.types";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ui as classes } from "@/components/ui/ui";
import { fill, pad } from "@/components/ui/text";

type TeamProfileProps = {
  data?: TeamDetailData;
  member?: TeamMember;
  ui: GlobalUIData;
};

export const TeamProfile = ({ data, member, ui }: TeamProfileProps) => {
  if (!data || !member) return null;
  const { aboutLabel, expertiseLabel, labels } = data;
  const facts = [
    { label: labels.practice, value: member.practice },
    { label: labels.experience, value: member.experience },
    { label: labels.languages, value: member.languages },
  ];

  return (
    <section data-plain className={classes.sectionPlain}>
      <div className={`${classes.container} grid gap-14 md:grid-cols-[5fr_7fr] lg:gap-24`}>
        <div className="md:sticky md:top-28 md:self-start">
          <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden bg-bone">
            <Image src={member.image} alt={member.imageAlt} fill priority quality={80} sizes="(min-width: 1400px) 520px, (min-width: 768px) 38vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className={`${classes.labelSmall} text-gold`}>{member.role}</p>
            <ul className="flex gap-2">
              {member.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={fill(ui.socialProfile, { name: member.name, platform: social.label })}
                    className="grid size-10 place-items-center border border-line text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  >
                    <Icon name={social.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-w-0">
          <div className="border-t border-line pt-8">
            <Eyebrow label={aboutLabel} />
          </div>
          <h2 data-reveal="up" className={`${classes.display2} mt-8 text-ink`}>
            {member.name}
          </h2>
          <p data-reveal="up" data-delay="1" className="mt-6 font-display text-[1.75rem] font-medium leading-[1.35] text-ink lg:text-[2.375rem]">
            {member.bio}
          </p>

          <dl className="mt-14 grid border-t border-line sm:grid-cols-3">
            {facts.map((fact, i) => (
              <div key={fact.label} data-reveal="up" data-delay={i + 1} className={`flex flex-col border-b border-line py-6 sm:py-8 ${i > 0 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}>
                <dt className={`${classes.labelSmall} text-muted`}>{fact.label}</dt>
                <dd className="mt-3 font-display text-[1.375rem] font-semibold leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal="up" className="mt-14">
            <Eyebrow label={expertiseLabel} />
            <ul className="mt-6 border-t border-line">
              {member.expertise.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 border-b border-line py-4 font-display text-[1.375rem] font-semibold text-ink">
                  <span className={`${classes.labelSmall} shrink-0 text-gold`}>{pad(i + 1)}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link data-reveal="up" href={data.buttonUrl} className={`${classes.btnPrimary} mt-14`}>
            {data.buttonText}
            <Icon name="LuArrowRight" className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
};
