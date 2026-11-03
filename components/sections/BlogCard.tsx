import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/templates.types";
import { ui } from "@/components/ui/ui";

type BlogCardProps = {
  post: BlogPost;
  buttonText?: string;
  delay?: number;
};

export const BlogCard = ({ post, buttonText, delay = 0 }: BlogCardProps) => (
  <article data-reveal="up" data-delay={delay} className="h-full">
    <Link href={post.url} className="group flex h-full flex-col">
      <span className="relative block aspect-[4/3] overflow-hidden bg-bone">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          quality={75}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.06]"
        />
      </span>
      <span className="relative mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
        <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
        <span className={`${ui.labelSmall} text-gold`}>{post.category}</span>
        <span className="text-[0.8125rem] text-muted">{post.date}</span>
      </span>
      <span className="mt-4 block flex-1 font-display text-[1.75rem] font-semibold leading-[1.2] text-ink transition-colors duration-300 group-hover:text-navy lg:text-[2rem]">{post.title}</span>
      {buttonText && <span className={`${ui.linkArrow} mt-6 text-navy`}>{buttonText}</span>}
    </Link>
  </article>
);
