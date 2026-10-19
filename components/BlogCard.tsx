import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";

type BlogCardProps = {
  post: AurelianBlogPost;
  buttonLabel?: string;
  delay?: number;
};

/** Wix-style post card: large photo on top, then date, title and a short excerpt on a white panel; the photo zooms on hover. */
export default function BlogCard({ post, buttonLabel, delay = 0 }: BlogCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link href={`/blogs/${post.slug}`} className="group flex h-full flex-col bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(37,10,16,0.12)]">
        <span className="relative block aspect-[4/3] overflow-hidden bg-bone">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            quality={85}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </span>
        <span className="flex flex-1 flex-col p-6 sm:p-8">
          <span className="flex items-center gap-3 text-[13px] text-muted">
            {post.date}
            <span aria-hidden="true" className="h-px w-4 bg-line" />
            <span className="label text-[9px]! text-gold">{post.category}</span>
          </span>
          <span className="mt-3 block font-display text-[24px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-wine">{post.title}</span>
          <span className="mt-3 line-clamp-2 flex-1 text-[15px] leading-[1.7] text-body">{post.excerpt}</span>
          {buttonLabel && <span className="link-arrow mt-6 text-wine">{buttonLabel}</span>}
        </span>
      </Link>
    </article>
  );
}
