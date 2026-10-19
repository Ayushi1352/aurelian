import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";

type BlogCardProps = {
  post: AurelianBlogPost;
  buttonLabel?: string;
  delay?: number;
};

/** Wix-style editorial post: frameless photo, then category and date on a hairline, a large serif title and a short excerpt; the photo zooms on hover. */
export default function BlogCard({ post, buttonLabel, delay = 0 }: BlogCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link href={`/blogs/${post.slug}`} className="group flex h-full flex-col">
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
        <span className="relative mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          <span className="label text-[10px]! text-gold">{post.category}</span>
          <span className="text-[13px] text-muted">{post.date}</span>
        </span>
        <span className="mt-4 block font-display text-[26px] font-semibold leading-[1.2] text-ink transition-colors duration-300 group-hover:text-wine lg:text-[28px]">{post.title}</span>
        <span className="mt-3 line-clamp-2 flex-1 text-[15px] leading-[1.7] text-body">{post.excerpt}</span>
        {buttonLabel && <span className="link-arrow mt-6 text-wine">{buttonLabel}</span>}
      </Link>
    </article>
  );
}
