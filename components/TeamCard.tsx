import Image from "next/image";
import Link from "next/link";
import type { AurelianTeamMember } from "@/data";
import { SocialIcon } from "@/components/Icons";

type TeamCardProps = {
  member: AurelianTeamMember;
  delay?: number;
};

/** Tall black-and-white portrait that warms to colour on hover; social links slide up; name and role underneath (Wix-style, no frame). */
export default function TeamCard({ member, delay = 0 }: TeamCardProps) {
  const href = `/our-team/${member.slug}`;

  return (
    <article data-reveal="up" data-delay={delay} className="group">
      <div className="relative overflow-hidden">
        <Link href={href} aria-label={member.name} className="relative block aspect-[3/4] overflow-hidden bg-bone">
          <Image
            src={member.image.src}
            alt={member.image.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover grayscale transition-[scale,filter] duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
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
                className="grid size-10 place-items-center rounded-full bg-white text-wine transition-colors hover:bg-gold hover:text-white"
              >
                <SocialIcon name={s.name} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4">
        <div>
        <Link href={href} className="block font-display text-[24px] font-semibold leading-tight text-ink transition-colors hover:text-wine lg:text-[26px]">
          {member.name}
        </Link>
        <p className="label mt-2 text-[10px]! text-muted">{member.role}</p>
        </div>
        <span aria-hidden="true" className="mt-1 h-px w-6 shrink-0 bg-gold transition-[width] duration-500 group-hover:w-12" />
      </div>
    </article>
  );
}
