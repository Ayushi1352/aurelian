import Image from "next/image";
import Link from "next/link";
import { site, type AurelianBlogDetailData, type AurelianBlogPost, type SectionProps } from "@/data";
import HelpCard from "@/components/HelpCard";
import { ArrowLeft, Calendar, ClockIcon, UserIcon } from "@/components/Icons";

type BlogDetailProps = SectionProps<AurelianBlogDetailData> & {
  post: AurelianBlogPost;
  /** All posts, for the "More Insights" sidebar list. */
  allPosts?: AurelianBlogPost[];
};

type Block = AurelianBlogPost["content"][number];

function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="display-3 mt-12 text-ink">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="relative my-12 rounded-[3px] border-l-4 border-gold bg-mist px-7 py-8 sm:px-10">
          <p className="statement italic text-wine">&ldquo;{block.text}&rdquo;</p>
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items?.map((item, i) => (
            <li key={item} className="flex items-start gap-4 text-[17px] leading-[1.7] text-ink">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-wine font-display text-[15px] font-semibold text-gold-light">{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-6 text-[17px] leading-[1.85] text-body">{block.text}</p>;
  }
}

/** Article column with a sidebar of recent posts and a help card. */
export default function BlogDetail({ data = site.blogDetailPage, post, allPosts = site.blogPage.items }: BlogDetailProps) {
  const { parent, byLabel, recentLabel, recentCount, backLabel, helpCard, button } = data;
  const recent = allPosts.filter((p) => p.slug !== post.slug).slice(0, recentCount);
  const meta = [
    { Icon: UserIcon, text: `${byLabel} ${post.author}` },
    { Icon: Calendar, text: post.date },
    { Icon: ClockIcon, text: post.readTime },
  ];

  return (
    <section className="section-space">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_360px] xl:gap-20">
        <article className="min-w-0">
          <div data-reveal="up" className="relative aspect-[16/9] overflow-hidden rounded-[3px] bg-bone">
            <Image src={post.image.src} alt={post.image.alt} fill quality={85} sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
            <span className="label absolute left-5 top-5 rounded-[3px] bg-wine px-4 py-2 text-[11px]! text-gold-light">{post.category}</span>
          </div>

          <ul data-reveal="up" className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-6 text-[14px] text-muted">
            {meta.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-4 text-gold" />
                {text}
              </li>
            ))}
          </ul>

          <p data-reveal="up" className="statement mt-8 text-ink">
            {post.excerpt}
          </p>
          <div data-reveal="up">
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <Link href={parent.href} className="group btn border border-wine text-wine hover:bg-wine hover:text-white">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              {backLabel}
            </Link>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[3px] border border-line bg-mist p-6 sm:p-7">
            <h2 className="display-3 text-ink">{recentLabel}</h2>
            <ul className="mt-5 space-y-4">
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blogs/${p.slug}`} className="group flex items-center gap-4">
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-[3px] bg-bone">
                      <Image src={p.image.src} alt={p.image.alt} fill quality={75} sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] text-muted">{p.date}</span>
                      <span className="mt-1 line-clamp-2 block font-display text-[18px] font-semibold leading-snug text-ink transition-colors group-hover:text-wine">{p.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <HelpCard data={helpCard} button={button} />
        </aside>
      </div>
    </section>
  );
}
