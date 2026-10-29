import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";
import { ArrowUpRight, Calendar, ClockIcon, UserIcon } from "@/components/Icons";
import { ui } from "@/components/ui";

type BlogFeaturedProps = {
  post: AurelianBlogPost;
  buttonLabel: string;
  /** Word before the author name, e.g. "By". */
  byLabel: string;
};

export default function BlogFeatured({ post, buttonLabel, byLabel }: BlogFeaturedProps) {
  const meta = [
    { icon: UserIcon, text: [byLabel, post.author].join(" ") },
    { icon: ClockIcon, text: post.readTime },
    { icon: Calendar, text: post.date },
  ];

  return (
    <article data-reveal="up" className="mb-14 lg:mb-20">
      <Link href={post.href} className="group relative isolate flex min-h-[27.5rem] items-end overflow-hidden bg-navy-deep text-white sm:min-h-[32.5rem] lg:aspect-[21/9] lg:min-h-0">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          quality={75}
          sizes="100vw"
          className="-z-20 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep/95 via-navy-deep/55 to-navy-deep/10" />

        <span className="flex w-full items-end gap-8 p-6 sm:p-10 lg:p-14">
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-5">
              <span className="font-display text-[3.5rem] font-semibold leading-none text-gold lg:text-[4.5rem]">01</span>
              <span className={`${ui.labelSmall} text-gold-light`}>{post.category}</span>
            </span>
            <span className="mt-5 block max-w-[56.25rem] font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.75rem] lg:text-[3.625rem]">{post.title}</span>
            <span className="mt-4 line-clamp-2 block max-w-[42.5rem] text-[1rem] leading-relaxed text-white/75 lg:text-[1.0625rem]">{post.excerpt}</span>
            <span className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem] sm:gap-x-0 text-white/70">
              {meta.map(({ icon: Icon, text }, i) => (
                <span key={text} className={`flex items-center gap-2 ${i > 0 ? "sm:ml-4 sm:border-l sm:border-gold/50 sm:pl-4" : ""}`}>
                  <Icon className="size-[1.125rem] text-gold-light" />
                  {text}
                </span>
              ))}
            </span>
          </span>

          <span
            aria-label={buttonLabel}
            className="hidden size-16 shrink-0 place-items-center border border-gold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white sm:grid"
          >
            <ArrowUpRight className="size-6" />
          </span>
        </span>
      </Link>
    </article>
  );
}
