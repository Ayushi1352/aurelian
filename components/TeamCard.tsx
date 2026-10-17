import Image from "next/image";
import Link from "next/link";
import type { AurelianTeamMember } from "@/data";
import { SocialIcon } from "@/components/Icons";

type TeamCardProps = {
  member: AurelianTeamMember;
  delay?: number;
};

/** Arched portrait; social links slide up on hover; name and role centred underneath. */
export default function TeamCard({ member, delay = 0 }: TeamCardProps) {
  const href = `/our-team/${member.slug}`;

  return (
    <article data-reveal="up" data-delay={delay} className="group text-center">
      <div className="relative">
        <Link href={href} aria-label={member.name} className="arch relative block aspect-[4/5] overflow-hidden bg-bone">
          <Image
            src={member.image.src}
            alt={member.image.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-wine-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
        {/* Sits outside the link (no nested anchors); always visible on touch screens. */}
        <ul className="absolute inset-x-0 bottom-5 flex justify-center gap-2 transition-[opacity,translate] duration-500 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100">
          {member.socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${s.label}`}
                className="grid size-10 place-items-center rounded-full bg-white text-wine shadow-md transition-colors hover:bg-gold hover:text-white"
              >
                <SocialIcon name={s.name} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Link href={href} className="mt-6 block font-display text-[26px] font-semibold leading-tight text-ink transition-colors hover:text-wine lg:text-[28px]">
        {member.name}
      </Link>
      <p className="label mt-2 text-[11px]! text-gold">{member.role}</p>
    </article>
  );
}
