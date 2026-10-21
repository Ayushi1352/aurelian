import Image from "next/image";
import Link from "next/link";
import { site, type AurelianTeamDetailData, type AurelianTeamMember, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { ArrowRight, SocialIcon } from "@/components/Icons";

type TeamProfileProps = SectionProps<AurelianTeamDetailData> & {
  member: AurelianTeamMember;
};

export default function TeamProfile({ data = site.teamDetailPage, member }: TeamProfileProps) {
  const { aboutLabel, expertiseLabel, labels, button, socialLabel } = data;
  const facts = [
    { label: labels.practice, value: member.practice },
    { label: labels.experience, value: member.experience },
    { label: labels.languages, value: member.languages },
  ];

  return (
    <section className="section-space">
      <div className="container-site grid gap-14 md:grid-cols-[5fr_7fr] lg:gap-24">
        <div className="md:sticky md:top-28 md:self-start">
          <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden bg-bone">
            <Image src={member.image.src} alt={member.image.alt} fill priority quality={80} sizes="(min-width: 1400px) 520px, (min-width: 768px) 38vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="label text-[10px]! text-gold">{member.role}</p>
            <ul className="flex gap-2">
              {member.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabel.replace("{name}", member.name).replace("{platform}", s.label)}
                    className="grid size-10 place-items-center border border-line text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  >
                    <SocialIcon name={s.name} className="size-4" />
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
          <p data-reveal="up" data-delay="1" className="mt-8 font-display text-[28px] font-medium leading-[1.35] text-ink lg:text-[38px]">
            {member.bio}
          </p>

          <dl className="mt-14 grid border-t border-line sm:grid-cols-3">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal="up" data-delay={i + 1} className={`flex flex-col border-b border-line py-6 sm:py-8 ${i > 0 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}>
                <dt className="label text-[10px]! text-muted">{f.label}</dt>
                <dd className="mt-3 font-display text-[22px] font-semibold leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal="up" className="mt-14">
            <Eyebrow label={expertiseLabel} />
            <ul className="mt-6 border-t border-line">
              {member.expertise.map((e, i) => (
                <li key={e} className="flex items-baseline gap-5 border-b border-line py-4 font-display text-[22px] font-semibold text-ink">
                  <span className="label shrink-0 text-[10px]! text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <Link data-reveal="up" href={button.href} className="btn btn-primary mt-14">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
