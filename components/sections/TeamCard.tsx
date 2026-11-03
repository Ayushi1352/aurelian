import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";
import { fill } from "@/components/ui/text";

type TeamCardProps = {
  member: TeamMember;
  /** `{name}` and `{platform}` are filled in. */
  socialProfile: string;
  delay?: number;
};

/** Portrait stays black-and-white on mouse devices until hovered; always in colour on touch screens. */
export const TeamCard = ({ member, socialProfile, delay = 0 }: TeamCardProps) => (
  <article data-reveal="up" data-delay={delay} className="group">
    <div className="relative overflow-hidden">
      <Link href={member.url} aria-label={member.name} className="relative block aspect-[4/5] overflow-hidden bg-bone">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          quality={75}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover object-top transition-[transform,filter] duration-[1.2s] ease-smooth group-hover:scale-[1.05] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>
      {/* Sits outside the link (no nested anchors); always visible on touch screens. */}
      <ul className="absolute inset-x-0 bottom-5 flex justify-center gap-2 transition-[opacity,transform] duration-500 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
        {member.socials.map((social) => (
          <li key={social.id}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fill(socialProfile, { name: member.name, platform: social.label })}
              className="grid size-10 place-items-center bg-white text-navy transition-colors hover:bg-gold hover:text-white"
            >
              <Icon name={social.icon} className="size-4" />
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4">
      <div>
        <Link href={member.url} className="block font-display text-[1.75rem] font-semibold leading-tight text-ink transition-colors hover:text-navy lg:text-[2rem]">
          {member.name}
        </Link>
        <p className={`${ui.labelSmall} mt-2 text-muted`}>{member.role}</p>
      </div>
      <span aria-hidden="true" className="mt-3 h-px w-6 shrink-0 bg-gold transition-[width] duration-500 group-hover:w-12" />
    </div>
  </article>
);
