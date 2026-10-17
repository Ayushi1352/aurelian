import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";
import { ArrowRight, ClockIcon } from "@/components/Icons";

type BlogCardProps = {
  post: AurelianBlogPost;
  buttonLabel?: string;
  delay?: number;
};

/** "October 08, 2026" -> { day: "08", month: "Oct" } for the date badge on the photo. */
function dateBadge(date: string) {
  const [month = "", day = ""] = date.replace(",", "").split(" ");
  return { day, month: month.slice(0, 3) };
}

/** Bordered card: photo with a date badge, then category, title, excerpt and a read link. */
export default function BlogCard({ post, buttonLabel, delay = 0 }: BlogCardProps) {
  const { day, month } = dateBadge(post.date);

  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link
        href={`/blogs/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-line bg-white transition-[box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(37,10,16,0.14)]"
      >
        <span className="relative block aspect-[16/10] overflow-hidden bg-bone">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <span className="absolute left-5 top-5 flex flex-col items-center rounded-[3px] bg-wine px-3 py-2 text-center text-white shadow-lg">
            <span className="font-display text-[26px] font-semibold leading-none text-gold-light">{day}</span>
            <span className="label mt-1 text-[10px]!">{month}</span>
          </span>
        </span>
        <span className="flex flex-1 flex-col p-6 sm:p-7">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
            <span className="label text-[11px]! text-gold">{post.category}</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-4" />
              {post.readTime}
            </span>
          </span>
          <span className="mt-3 block font-display text-[25px] font-semibold leading-[1.2] text-ink transition-colors group-hover:text-wine">{post.title}</span>
          <span className="mt-3 line-clamp-2 flex-1 text-[15px] leading-[1.7] text-body">{post.excerpt}</span>
          {buttonLabel && (
            <span className="label mt-6 inline-flex items-center gap-3 border-t border-line pt-5 text-wine">
              {buttonLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </span>
      </Link>
    </article>
  );
}
