import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";
import { ArrowUpRight, Calendar, ClockIcon, UserIcon } from "@/components/Icons";

type BlogRowProps = {
  post: AurelianBlogPost;
  buttonLabel: string;
  /** Word before the author name, e.g. "By". */
  byLabel: string;
  /** Position in the whole list, shown as a large gold "02", "03"… */
  number: number;
  /** Puts the photo on the right, so rows alternate sides. */
  reverse?: boolean;
  delay?: number;
};

export default function BlogRow({ post, buttonLabel, byLabel, number, reverse = false, delay = 0 }: BlogRowProps) {
  const meta = [
    { icon: UserIcon, text: [byLabel, post.author].join(" ") },
    { icon: ClockIcon, text: post.readTime },
    { icon: Calendar, text: post.date },
  ];

  return (
    <article data-reveal="up" data-delay={delay} className="border-b border-line py-10 first:pt-0 lg:py-14">
      <Link
        href={`/blogs/${post.slug}`}
        className={`group grid items-center gap-8 lg:gap-14 ${
          reverse ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : "md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
        }`}
      >
        <span className={`relative block aspect-[16/10] overflow-hidden bg-bone ${reverse ? "md:order-2" : ""}`}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            quality={75}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </span>

        <span className="flex items-center gap-8">
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-5">
              <span className="font-display text-[48px] font-semibold leading-none text-gold/80 lg:text-[64px]">{String(number).padStart(2, "0")}</span>
              <span className="label text-[10px]! text-gold">{post.category}</span>
            </span>
            <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] sm:gap-x-0 text-muted">
              {meta.map(({ icon: Icon, text }, i) => (
                <span key={text} className={`flex items-center gap-2 ${i > 0 ? "sm:ml-4 sm:border-l sm:border-gold/50 sm:pl-4" : ""}`}>
                  <Icon className="size-[18px] text-navy/70" />
                  {text}
                </span>
              ))}
            </span>
            <span className="mt-4 block font-display text-[28px] font-semibold leading-[1.15] text-navy transition-colors duration-300 group-hover:text-gold sm:text-[34px] lg:text-[40px]">
              {post.title}
            </span>
            <span className="mt-4 line-clamp-2 block text-[16px] leading-relaxed text-muted lg:text-[17px]">{post.excerpt}</span>
          </span>

          <span
            aria-label={buttonLabel}
            className="hidden size-16 shrink-0 place-items-center border border-gold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white lg:grid"
          >
            <ArrowUpRight className="size-6" />
          </span>
        </span>
      </Link>
    </article>
  );
}
