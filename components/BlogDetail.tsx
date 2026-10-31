import Image from "next/image";
import Link from "next/link";
import { site, type AurelianBlogDetailData, type AurelianBlogPost, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { Calendar, Check, UserIcon } from "@/components/Icons";
import { ui } from "@/components/ui";

type BlogDetailProps = SectionProps<AurelianBlogDetailData> & {
  post: AurelianBlogPost;
};

type Block = AurelianBlogPost["content"][number];

function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 font-display text-[1.75rem] font-semibold leading-[1.2] text-ink lg:text-[2.125rem]">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-12 border-l-4 border-gold bg-mist px-8 py-8">
          <p className="font-display text-[1.5rem] font-semibold italic leading-[1.4] text-navy lg:text-[1.75rem]">&ldquo;{block.text}&rdquo;</p>
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items?.map((item) => (
            <li key={item} className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-ink">
              <span className="mt-1 grid size-6 shrink-0 place-items-center bg-navy text-gold-light">
                <Check className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-6 text-[1.0625rem] leading-[1.9] text-body lg:text-[1.125rem]">{block.text}</p>;
  }
}

export default function BlogDetail({ data = site.blogDetailPage, post }: BlogDetailProps) {
  const { parent, byLabel, backLabel } = data;
  const meta = [
    { Icon: UserIcon, text: [byLabel, post.author].join(" ") },
    { Icon: Calendar, text: post.date },
  ];

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <div className="mx-auto max-w-[51.25rem]">
          <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Eyebrow label={post.category} />
            <ul data-reveal="up" className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-muted">
              {meta.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="size-4 text-gold" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <h2 data-reveal="up" data-delay="1" className={`${ui.display2} mt-10 text-ink`}>{post.title}</h2>
          <p data-reveal="up" data-delay="2" className="mt-8 font-display text-[1.625rem] font-medium leading-[1.35] text-ink lg:text-[2.125rem]">
            {post.excerpt}
          </p>
        </div>

        <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-bone sm:aspect-[16/10] lg:mt-20">
          <span data-parallax className={`${ui.parallax} absolute inset-0 block`}>
            <Image src={post.image.src} alt={post.image.alt} fill priority quality={75} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
          </span>
        </div>

        <article data-reveal="up" className="mx-auto mt-8 max-w-[51.25rem] lg:mt-12">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          <div className="mt-16 border-t border-line pt-8">
            <Link href={parent.href} className={`${ui.linkArrow} text-navy`}>
              {backLabel}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
