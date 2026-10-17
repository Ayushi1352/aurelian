import Image from "next/image";
import Link from "next/link";
import type { AurelianTeamMember } from "@/data";
import { SocialIcon } from "@/components/Icons";

type TeamCardProps = {
  member: AurelianTeamMember;
  delay?: number;
};

/** Arch-topped black-and-white portrait that warms to colour on hover; social links slide up; name and role centred underneath. */
export default function TeamCard({ member, delay = 0 }: TeamCardProps) {
  const href = `/our-team/${member.slug}`;

  return (
    <article data-reveal="up" data-delay={delay} className="group text-center">
      <div className="relative p-2.5">
        <span aria-hidden="true" className="absolute inset-0 rounded-t-full border border-gold/40 transition-colors duration-500 group-hover:border-gold" />
        <Link href={href} aria-label={member.name} className="relative block aspect-[4/5] overflow-hidden rounded-t-full bg-bone">
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
      <div className="mt-5">
        <Link href={href} className="block font-display text-[24px] font-semibold leading-tight text-ink transition-colors hover:text-wine lg:text-[26px]">
          {member.name}
        </Link>
        <p className="label mt-2 text-[10px]! text-gold">{member.role}</p>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-8 bg-gold transition-[width] duration-500 group-hover:w-20" />
      </div>
    </article>
  );
}
