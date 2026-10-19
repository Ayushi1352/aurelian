import Image from "next/image";
import Link from "next/link";
import { site, type AurelianTeamDetailData, type AurelianTeamMember, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { ArrowRight, Mail, Phone, SocialIcon } from "@/components/Icons";

type TeamProfileProps = SectionProps<AurelianTeamDetailData> & {
  member: AurelianTeamMember;
};

/** One list with a small numbered label per row, under a gold-ruled label. */
function FactList({ title, items }: { title: string; items: string[] }) {
  return (
    <div data-reveal="up">
      <Eyebrow label={title} />
      <ul className="mt-6 border-t border-line">
        {items.map((e, i) => (
          <li key={e} className="flex items-baseline gap-5 border-b border-line py-4 text-[16px] leading-[1.6] text-ink">
            <span className="label shrink-0 text-[10px]! text-gold">{String(i + 1).padStart(2, "0")}</span>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * Wix-style profile: a tall frameless portrait (stays in view) with the role, socials and contact
 * underneath; beside it the bio opens in large serif, then key facts on hairlines, expertise and education.
 */
export default function TeamProfile({ data = site.teamDetailPage, member }: TeamProfileProps) {
  const { aboutLabel, expertiseLabel, educationLabel, labels, button } = data;
  const [lead, ...rest] = member.bio;
  const facts = [
    { label: labels.practice, value: member.practice },
    { label: labels.experience, value: member.experience },
    { label: labels.languages, value: member.languages },
  ];
  const contacts = [
    { Icon: Phone, label: labels.phone, value: member.phone, href: `tel:${member.phone.replace(/\s/g, "")}` },
    { Icon: Mail, label: labels.email, value: member.email, href: `mailto:${member.email}` },
  ];

  return (
    <section className="section-space">
      <div className="container-site grid gap-14 md:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">
        {/* Portrait stays in view while the bio scrolls */}
        <div className="md:sticky md:top-28 md:self-start">
          <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden bg-bone">
            <Image src={member.image.src} alt={member.image.alt} fill priority quality={90} sizes="(min-width: 1400px) 520px, (min-width: 768px) 38vw, 100vw" className="object-cover" />
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="display-3 text-ink">{member.name}</p>
              <p className="label mt-2 text-[10px]! text-gold">{member.role}</p>
            </div>
            <ul className="flex gap-2">
              {member.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on ${s.label}`}
                    className="grid size-10 place-items-center border border-line text-wine transition-colors duration-300 hover:border-wine hover:bg-wine hover:text-white"
                  >
                    <SocialIcon name={s.name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-6 border-t border-line">
            {contacts.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="group flex items-center gap-4 border-b border-line py-4">
                  <Icon className="size-5 shrink-0 text-gold" />
                  <span className="min-w-0">
                    <span className="label block text-[9px]! text-muted">{label}</span>
                    <span className="mt-0.5 block break-all text-[15px] font-medium text-ink transition-colors group-hover:text-wine">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <div className="border-t border-line pt-8">
            <Eyebrow label={aboutLabel} />
          </div>
          <p data-reveal="up" data-delay="1" className="mt-8 font-display text-[26px] font-medium leading-[1.35] text-ink lg:text-[34px]">
            {lead}
          </p>
          {rest.map((p, i) => (
            <p key={i} data-reveal="up" data-delay="2" className="mt-6 text-[17px] leading-[1.85] text-body">
              {p}
            </p>
          ))}

          <dl className="mt-14 grid border-t border-line sm:grid-cols-3">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal="up" data-delay={i + 1} className={`flex flex-col border-b border-line py-6 sm:py-8 ${i > 0 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}>
                <dt className="label text-[10px]! text-muted">{f.label}</dt>
                <dd className="mt-3 font-display text-[22px] font-semibold leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <FactList title={expertiseLabel} items={member.expertise} />
            <FactList title={educationLabel} items={member.education} />
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
