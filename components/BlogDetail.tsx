import Image from "next/image";
import Link from "next/link";
import { site, type AurelianBlogDetailData, type AurelianBlogPost, type SectionProps } from "@/data";
import SectionHeading, { Eyebrow } from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import HelpBand from "@/components/HelpBand";
import { Calendar, ClockIcon, UserIcon } from "@/components/Icons";

type BlogDetailProps = SectionProps<AurelianBlogDetailData> & {
  post: AurelianBlogPost;
  /** All posts, for the "More Insights" cards. */
  allPosts?: AurelianBlogPost[];
};

type Block = AurelianBlogPost["content"][number];

function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-14 font-display text-[28px] font-semibold leading-[1.2] text-ink lg:text-[36px]">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-14 border-y border-line py-10 text-center">
          <p className="mx-auto max-w-[680px] font-display text-[26px] font-medium italic leading-[1.35] text-wine lg:text-[34px]">&ldquo;{block.text}&rdquo;</p>
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-6 border-t border-line">
          {block.items?.map((item, i) => (
            <li key={item} className="flex items-baseline gap-5 border-b border-line py-4 text-[17px] leading-[1.7] text-ink">
              <span className="label shrink-0 text-[10px]! text-gold">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-6 text-[17px] leading-[1.9] text-body lg:text-[18px]">{block.text}</p>;
  }
}

/** Wix-style article: a narrow reading column with the lead set large, a full-width photo, then more posts and a help band. */
export default function BlogDetail({ data = site.blogDetailPage, post, allPosts = site.blogPage.items }: BlogDetailProps) {
  const { parent, byLabel, recentLabel, recentCount, backLabel, helpCard, button } = data;
  const recent = allPosts.filter((p) => p.slug !== post.slug).slice(0, recentCount);
  const meta = [
    { Icon: UserIcon, text: `${byLabel} ${post.author}` },
    { Icon: Calendar, text: post.date },
    { Icon: ClockIcon, text: post.readTime },
  ];

  return (
    <>
      <section className="section-space">
        <div className="container-site">
          <div className="mx-auto max-w-[820px]">
            <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Eyebrow label={post.category} />
              <ul data-reveal="up" className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted">
                {meta.map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <Icon className="size-4 text-gold" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <p data-reveal="up" data-delay="2" className="mt-10 font-display text-[26px] font-medium leading-[1.35] text-ink lg:text-[34px]">
              {post.excerpt}
            </p>
          </div>

          <div data-reveal="wipe" className="relative mt-14 aspect-[4/3] overflow-hidden bg-bone sm:aspect-[16/10] lg:mt-20">
            <span className="parallax absolute inset-0 block">
              <Image src={post.image.src} alt={post.image.alt} fill quality={85} sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" />
            </span>
          </div>

          <article data-reveal="up" className="mx-auto mt-8 max-w-[820px] lg:mt-12">
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}

            <div className="mt-16 border-t border-line pt-8">
              <Link href={parent.href} className="link-arrow text-wine">
                {backLabel}
              </Link>
            </div>
          </article>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="bg-mist section-space">
          <div className="container-site">
            <SectionHeading label={parent.label} line1={recentLabel} />
            <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {recent.map((p, i) => (
                <BlogCard key={p.slug} post={p} delay={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      <HelpBand data={helpCard} button={button} label={parent.label} />
    </>
  );
}
