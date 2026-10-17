import Image from "next/image";
import Link from "next/link";
import { site, type AurelianTeamDetailData, type AurelianTeamMember, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { ArrowRight, Check, FeatureIcon, Mail, Phone, SocialIcon } from "@/components/Icons";

type TeamProfileProps = SectionProps<AurelianTeamDetailData> & {
  member: AurelianTeamMember;
};

/** Sticky profile card (portrait, socials, contact) beside the bio, key facts, expertise and education. */
export default function TeamProfile({ data = site.teamDetailPage, member }: TeamProfileProps) {
  const { aboutLabel, expertiseLabel, educationLabel, labels, button } = data;
  const [lead, ...rest] = member.bio;
  const facts = [
    { icon: "briefcase", label: labels.practice, value: member.practice },
    { icon: "award", label: labels.experience, value: member.experience },
    { icon: "globe", label: labels.languages, value: member.languages },
  ];
  const contacts = [
    { Icon: Phone, label: labels.phone, value: member.phone, href: `tel:${member.phone.replace(/\s/g, "")}` },
    { Icon: Mail, label: labels.email, value: member.email, href: `mailto:${member.email}` },
  ];

  return (
    <section className="section-space">
      <div className="container-site grid gap-12 md:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">
        {/* Profile card stays in view while the bio scrolls */}
        <div className="md:sticky md:top-28 md:self-start">
          <div className="rounded-t-full rounded-b-[28px] bg-mist p-4 pb-6 text-center sm:p-5">
            <div data-reveal="mask" className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-bone">
              <Image src={member.image.src} alt={member.image.alt} fill priority quality={90} sizes="(min-width: 768px) 36vw, 92vw" className="object-cover" />
            </div>
            <p className="display-3 mt-6 text-ink">{member.name}</p>
            <p className="label mt-2 text-[10px]! text-gold">{member.role}</p>
            <ul className="mt-5 flex justify-center gap-2">
              {member.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on ${s.label}`}
                    className="grid size-10 place-items-center rounded-full bg-white text-wine transition-colors hover:border-wine hover:bg-wine hover:text-white"
                  >
                    <SocialIcon name={s.name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 border-t border-line text-left">
              {contacts.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-center gap-3 border-b border-line px-1 py-3.5 transition-colors last:border-b-0">
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
        </div>

        <div className="min-w-0">
          <Eyebrow label={aboutLabel} />
          <p data-reveal="up" data-delay="1" className="statement mt-6 text-wine">
            {lead}
          </p>
          {rest.map((p, i) => (
            <p key={i} data-reveal="up" data-delay="2" className="lead mt-5 text-body">
              {p}
            </p>
          ))}

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal="up" data-delay={i + 1} className="flex flex-col rounded-[24px] bg-mist p-6">
                <dt className="order-2 mt-1 text-[13px] text-muted">{f.label}</dt>
                <dd className="order-1 font-display text-[21px] font-semibold leading-snug text-ink">
                  <span aria-hidden="true" className="mb-4 grid size-12 place-items-center rounded-full bg-white text-gold">
                    <FeatureIcon name={f.icon} className="size-6" />
                  </span>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div data-reveal="up">
              <h2 className="display-3 flex items-center gap-4 text-ink">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                {expertiseLabel}
              </h2>
              <ul className="mt-5 space-y-3">
                {member.expertise.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-[16px] font-medium text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-gold" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="up" data-delay="1">
              <h2 className="display-3 flex items-center gap-4 text-ink">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                {educationLabel}
              </h2>
              <ul className="mt-5 space-y-3">
                {member.education.map((e) => (
                  <li key={e} className="border-l-2 border-gold pl-4 text-[16px] leading-[1.6] text-body">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link data-reveal="up" href={button.href} className="btn btn-primary mt-12">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
