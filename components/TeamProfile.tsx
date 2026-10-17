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
          <div data-reveal="up" className="rounded-[3px] border border-line bg-mist p-5 text-center sm:p-6">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-bone">
              <Image src={member.image.src} alt={member.image.alt} fill priority quality={90} sizes="(min-width: 768px) 36vw, 92vw" className="object-cover" />
            </div>
            <p className="display-3 mt-6 text-ink">{member.name}</p>
            <p className="label mt-2 text-[11px]! text-gold">{member.role}</p>
            <ul className="mt-5 flex justify-center gap-2">
              {member.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on ${s.label}`}
                    className="grid size-10 place-items-center rounded-full bg-white text-wine transition-colors hover:bg-wine hover:text-white"
                  >
                    <SocialIcon name={s.name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2 border-t border-line pt-6 text-left">
              {contacts.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-center gap-3 rounded-[3px] bg-white px-4 py-3 transition-colors hover:bg-wine">
                    <Icon className="size-5 shrink-0 text-gold" />
                    <span className="min-w-0">
                      <span className="block text-[12px] text-muted transition-colors group-hover:text-white/60">{label}</span>
                      <span className="block break-all text-[15px] font-medium text-ink transition-colors group-hover:text-white">{value}</span>
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
              <div key={f.label} data-reveal="up" data-delay={i + 1} className="flex flex-col rounded-[3px] border border-line p-5">
                <dt className="order-2 mt-1 text-[13px] text-muted">{f.label}</dt>
                <dd className="order-1 font-display text-[21px] font-semibold leading-snug text-ink">
                  <span aria-hidden="true" className="arch mb-4 grid h-14 w-12 place-items-center bg-wine pt-1 text-gold-light">
                    <FeatureIcon name={f.icon} className="size-6" />
                  </span>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div data-reveal="up">
              <h2 className="display-3 flex items-center gap-3 text-ink">
                <span aria-hidden="true" className="diamond text-gold" />
                {expertiseLabel}
              </h2>
              <ul className="mt-5 space-y-3">
                {member.expertise.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-[16px] font-medium text-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold-pale text-gold">
                      <Check className="size-3.5" />
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="up" data-delay="1">
              <h2 className="display-3 flex items-center gap-3 text-ink">
                <span aria-hidden="true" className="diamond text-gold" />
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

          <Link data-reveal="up" href={button.href} className="btn mt-12 bg-wine text-white hover:bg-gold">
            {button.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
