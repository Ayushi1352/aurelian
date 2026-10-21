import Image from "next/image";
import Link from "next/link";
import type { AurelianBlogPost } from "@/data";

type BlogCardProps = {
  post: AurelianBlogPost;
  buttonLabel?: string;
  delay?: number;
};

export default function BlogCard({ post, buttonLabel, delay = 0 }: BlogCardProps) {
  return (
    <article data-reveal="up" data-delay={delay} className="h-full">
      <Link href={`/blogs/${post.slug}`} className="group flex h-full flex-col">
        <span className="relative block aspect-[4/3] overflow-hidden bg-bone">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            quality={75}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </span>
        <span className="relative mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          <span className="label text-[10px]! text-gold">{post.category}</span>
          <span className="text-[13px] text-muted">{post.date}</span>
        </span>
        <span className="mt-4 block flex-1 font-display text-[28px] font-semibold leading-[1.2] text-ink transition-colors duration-300 group-hover:text-navy lg:text-[32px]">{post.title}</span>
        {buttonLabel && <span className="link-arrow mt-6 text-navy">{buttonLabel}</span>}
      </Link>
    </article>
  );
}
