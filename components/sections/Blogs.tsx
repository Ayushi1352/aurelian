'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { BlogMetaData, BlogPost, BlogsData, BlogsProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pagination, usePagination } from '@/components/ui/Pagination';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { pickByIds } from '@/components/ui/text';

/** Author and date of a post, with their icons. */
const postMeta = (post: BlogPost, meta: BlogMetaData) => [
  { icon: meta.authorIcon, text: [meta.byLabel, post.author].join(' ') },
  { icon: meta.dateIcon, text: post.date },
];

/** Smaller post card under the lead post on the home page. */
const BlogCard = ({ post, delay = 0 }: { post: BlogPost; delay?: number }) => (
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
    </Link>
  </article>
);

/** Big photo card of the first post on the Blogs page. */
const BlogFeatured = ({ post, data }: { post: BlogPost; data: BlogsData }) => (
  <article data-reveal="up" className="mb-14 lg:mb-20">
    <Link href={post.url} className="group relative isolate flex min-h-[27.5rem] items-end overflow-hidden bg-navy-deep text-white sm:min-h-[32.5rem] lg:aspect-[21/9] lg:min-h-0">
      <Image
        src={post.image}
        alt={post.imageAlt}
        fill
        quality={75}
        sizes="100vw"
        className="-z-20 object-cover transition-transform duration-[1.6s] ease-smooth group-hover:scale-[1.05]"
      />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-navy-deep/10" />

      <span className="flex w-full items-end gap-8 p-6 sm:p-10 lg:p-14">
        <span className="min-w-0 flex-1">
          <span className={`${ui.labelSmall} block text-gold-light`}>{post.category}</span>
          <span className="mt-5 block max-w-[56.25rem] font-display text-[2rem] font-semibold leading-[1.1] sm:text-[2.75rem] lg:text-[3.625rem]">{post.title}</span>
          <span className="mt-4 line-clamp-2 block max-w-[42.5rem] text-[1rem] leading-relaxed text-white/75 lg:text-[1.0625rem]">{post.excerpt}</span>
          <span className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem] text-white/70 sm:gap-x-0">
            {postMeta(post, data.meta).map(({ icon, text }, i) => (
              <span key={text} className={`flex items-center gap-2 ${i > 0 ? 'sm:ml-4 sm:border-l sm:border-gold/50 sm:pl-4' : ''}`}>
                <Icon name={icon} className="size-[1.125rem] text-gold-light" />
                {text}
              </span>
            ))}
          </span>
        </span>

        <span
          aria-label={data.readLabel}
          className="hidden size-16 shrink-0 place-items-center border border-gold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white sm:grid"
        >
          <Icon name={data.readIcon} className="size-6" strokeWidth={2} />
        </span>
      </span>
    </Link>
  </article>
);

/** Row of the Blogs page list; `reverse` puts the photo on the right, so rows alternate sides. */
const BlogRow = ({ post, data, reverse = false, delay = 0 }: { post: BlogPost; data: BlogsData; reverse?: boolean; delay?: number }) => (
  <article data-reveal="up" data-delay={delay} className="border-b border-line py-10 first:pt-0 lg:py-14">
    <Link
      href={post.url}
      className={`group grid items-center gap-8 lg:gap-14 ${
        reverse ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]' : 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]'
      }`}
    >
      <span className={`relative block aspect-[16/10] overflow-hidden bg-bone ${reverse ? 'md:order-2' : ''}`}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          quality={75}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-[1.06]"
        />
      </span>

      <span className="flex items-center gap-8">
        <span className="min-w-0 flex-1">
          <span className={`${ui.labelSmall} block text-gold`}>{post.category}</span>
          <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem] text-muted sm:gap-x-0">
            {postMeta(post, data.meta).map(({ icon, text }, i) => (
              <span key={text} className={`flex items-center gap-2 ${i > 0 ? 'sm:ml-4 sm:border-l sm:border-gold/50 sm:pl-4' : ''}`}>
                <Icon name={icon} className="size-[1.125rem] text-navy/70" />
                {text}
              </span>
            ))}
          </span>
          <span className="mt-4 block font-display text-[1.75rem] font-semibold leading-[1.15] text-navy transition-colors duration-300 group-hover:text-gold sm:text-[2.125rem] lg:text-[2.5rem]">
            {post.title}
          </span>
          <span className="mt-4 line-clamp-2 block text-[1rem] leading-relaxed text-muted lg:text-[1.0625rem]">{post.excerpt}</span>
        </span>

        <span
          aria-label={data.readLabel}
          className="hidden size-16 shrink-0 place-items-center border border-gold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white lg:grid"
        >
          <Icon name={data.readIcon} className="size-6" strokeWidth={2} />
        </span>
      </span>
    </Link>
  </article>
);

/** Blogs page: the first post is featured on page 1; the rest are paged rows. */
const BlogList = ({ data, posts, scrollTargetId }: { data: BlogsData; posts: BlogPost[]; scrollTargetId: string }) => {
  const [featured, ...rest] = posts;
  const { page, setPage, totalPages, pageItems } = usePagination(rest, data.perPage);

  return (
    <>
      {page === 1 && featured && <BlogFeatured post={featured} data={data} />}
      <div>
        {pageItems.map((post, i) => (
          <BlogRow key={post.id} post={post} data={data} reverse={i % 2 === 1} delay={(i % 2) + 1} />
        ))}
      </div>
      <Pagination data={data.pagination} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
};

/** Home page: a lead post and cards of homePostIds. Blogs page (showAll): the listingPostIds list. */
export const Blogs = ({ data, showAll = false }: BlogsProps) => {
  if (!data) return null;

  if (showAll) {
    return (
      <section data-plain id="blog-list" className={`scroll-mt-28 ${ui.sectionPlain}`}>
        <div className={ui.container}>
          <BlogList data={data} posts={pickByIds(data.posts, data.listingPostIds)} scrollTargetId="blog-list" />
        </div>
      </section>
    );
  }

  const { home } = data;
  const [lead, ...rest] = pickByIds(data.posts, data.homePostIds);

  return (
    <section data-plain className={ui.sectionPlain}>
      <div className={ui.container}>
        <SectionHeading
          label={home.label}
          title={home.title}
          titleHighlight={home.titleHighlight}
          text={home.text}
          action={
            <Link href={home.buttonUrl} className={`${ui.linkArrow} text-navy`}>
              {home.buttonText}
            </Link>
          }
        />

        {lead && (
          <Link href={lead.url} className="group relative mt-14 flex aspect-[4/3] items-end overflow-hidden bg-navy-deep text-white sm:aspect-[2/1] lg:mt-20">
            <span data-reveal="wipe" className="absolute inset-0 block">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                quality={75}
                sizes="(min-width: 1400px) 1320px, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-smooth group-hover:scale-[1.04]"
              />
            </span>
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
            <span className="relative p-6 sm:p-10">
              <span className={`${ui.labelSmall} text-gold-light`}>
                {lead.category} &nbsp;/&nbsp; {lead.date}
              </span>
              <span className="mt-4 block max-w-[47.5rem] font-display text-[1.875rem] font-semibold leading-[1.12] sm:text-[2.75rem] lg:text-[3.5rem]">{lead.title}</span>
            </span>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-16">
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} delay={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
