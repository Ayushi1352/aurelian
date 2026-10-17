import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";
import { ClockIcon } from "@/components/Icons";

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

/** Rounded photo with a round date badge; a white text panel overlaps its lower edge and rises on hover. */
export default function BlogCard({ post, buttonLabel, delay = 0 }: BlogCardProps) {
  const { day, month } = dateBadge(post.date);

  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link href={`/blogs/${post.slug}`} className="group flex h-full flex-col">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[24px] bg-bone">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
          <span className="absolute right-4 top-4 grid size-16 place-items-center rounded-full bg-white text-center text-wine shadow-lg">
            <span>
              <span className="block font-display text-[22px] font-semibold leading-none">{day}</span>
              <span className="label mt-0.5 block text-[8px]! text-gold">{month}</span>
            </span>
          </span>
        </span>
        <span className="relative mx-4 -mt-14 flex flex-1 flex-col rounded-[20px] bg-white p-6 shadow-[0_20px_50px_rgba(37,10,16,0.08)] transition-[translate,box-shadow] duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(37,10,16,0.14)] sm:p-7">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
            <span className="label text-[10px]! text-gold">{post.category}</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-4" />
              {post.readTime}
            </span>
          </span>
          <span className="mt-3 block font-display text-[23px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-wine">{post.title}</span>
          <span className="mt-3 line-clamp-2 flex-1 text-[15px] leading-[1.7] text-body">{post.excerpt}</span>
          {buttonLabel && <span className="link-arrow mt-6 text-wine">{buttonLabel}</span>}
        </span>
      </Link>
    </article>
  );
}
