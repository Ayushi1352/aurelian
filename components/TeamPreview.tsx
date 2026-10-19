import Image from "next/image";
import Link from "next/link";
import { site, type AurelianTeamMember, type AurelianTeamPreviewData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";

type TeamPreviewProps = SectionProps<AurelianTeamPreviewData> & {
  /** All team members (from the TeamListing section); the first `count` are shown. */
  items?: AurelianTeamMember[];
};

/** Wix-style roll of names: each row is a small portrait, the role and the name set very large; alternate rows step in. */
export default function TeamPreview({ data = site.teamPreviewSection, items = site.teamPage.items }: TeamPreviewProps) {
  const { label, titleLine1, titleLine2, text, count, button } = data;

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading
          label={label}
          line1={titleLine1}
          line2={titleLine2}
          text={text}
          action={
            <Link href={button.href} className="btn btn-outline">
              {button.label}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <ul className="mt-14 border-t border-line lg:mt-16">
          {items.slice(0, count).map((m, i) => (
            <li key={m.slug} data-reveal="up" data-delay={i + 1} className="border-b border-line">
              <Link href={`/our-team/${m.slug}`} className={`group flex items-center gap-5 py-6 sm:gap-8 lg:py-8 ${i % 2 === 1 ? "lg:pl-[18%]" : ""}`}>
                <span className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-bone sm:w-28">
                  <Image
                    src={m.image.src}
                    alt={m.image.alt}
                    fill
                    quality={75}
                    sizes="112px"
                    className="object-cover grayscale transition-[filter,scale] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="label inline-block rounded-full bg-mist px-3 py-1.5 text-[9px]! text-muted transition-colors duration-500 group-hover:bg-gold-pale group-hover:text-wine">{m.role}</span>
                  <span className="mt-3 block font-display text-[34px] font-semibold leading-none text-ink transition-[color,translate] duration-500 group-hover:translate-x-3 group-hover:text-wine sm:text-[56px] lg:text-[76px]">
                    {m.name}
                  </span>
                </span>
                <span aria-hidden="true" className="hidden size-14 shrink-0 place-items-center rounded-full border border-line text-wine transition-[background-color,color,border-color,rotate] duration-500 group-hover:rotate-45 group-hover:border-wine group-hover:bg-wine group-hover:text-white sm:grid">
                  <ArrowUpRight className="size-5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
