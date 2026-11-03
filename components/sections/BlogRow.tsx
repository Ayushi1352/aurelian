import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { ui } from "@/components/ui/ui";

type BlogRowProps = {
  post: BlogPost;
  buttonText: string;
  /** Word before the author name, e.g. "By". */
  byLabel: string;
  /** Puts the photo on the right, so rows alternate sides. */
  reverse?: boolean;
  delay?: number;
};

export const BlogRow = ({ post, buttonText, byLabel, reverse = false, delay = 0 }: BlogRowProps) => {
  const meta = [
    { icon: "LuUser", text: [byLabel, post.author].join(" ") },
    { icon: "LuCalendar", text: post.date },
  ];

  return (
    <article data-reveal="up" data-delay={delay} className="border-b border-line py-10 first:pt-0 lg:py-14">
      <Link
        href={post.url}
        className={`group grid items-center gap-8 lg:gap-14 ${
          reverse ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : "md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
        }`}
      >
        <span className={`relative block aspect-[16/10] overflow-hidden bg-bone ${reverse ? "md:order-2" : ""}`}>
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            quality={75}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.06]"
          />
        </span>

        <span className="flex items-center gap-8">
          <span className="min-w-0 flex-1">
            <span className={`${ui.labelSmall} block text-gold`}>{post.category}</span>
            <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem] text-muted sm:gap-x-0">
              {meta.map(({ icon, text }, i) => (
                <span key={text} className={`flex items-center gap-2 ${i > 0 ? "sm:ml-4 sm:border-l sm:border-gold/50 sm:pl-4" : ""}`}>
                  <Icon name={icon} className="size-[1.125rem] text-navy/70" />
                  {text}
                </span>
              ))}
            </span>
            <span className="mt-4 block font-display text-[1.75rem] font-semibold leading-[1.15] text-navy transition-colors duration-300 group-hover:text-gold sm:text-[2.125rem] lg:text-[2.5rem]">
              {post.title}
            </span>
            <span className="mt-4 line-clamp-2 block text-[1rem] leading-relaxed text-muted lg:text-[1.0625rem]">{post.excerpt}</span>
          </span>

          <span
            aria-label={buttonText}
            className="hidden size-16 shrink-0 place-items-center border border-gold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white lg:grid"
          >
            <Icon name="LuArrowUpRight" className="size-6" strokeWidth={2} />
          </span>
        </span>
      </Link>
    </article>
  );
};
