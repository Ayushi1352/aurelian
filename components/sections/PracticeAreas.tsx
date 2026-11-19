'use client';

import Link from 'next/link';
import type { PracticeArea, PracticeAreasData, PracticeAreasProps } from '@/types/templates.types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PracticeCard } from '@/components/ui/PracticeCard';
import { Pagination, usePagination } from '@/components/ui/Pagination';
import { ui } from '@/components/ui/ui';
import { pickByIds } from '@/components/ui/text';

/** Paged tiles of the Practice Areas page: 2 rows of the 3-column desktop grid per page. */
const PracticeGrid = ({ data, items, scrollTargetId }: { data: PracticeAreasData; items: PracticeArea[]; scrollTargetId: string }) => {
  const { page, setPage, totalPages, pageItems } = usePagination(items, data.perPage);

  return (
    <>
      <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {pageItems.map((item, i) => (
          <PracticeCard key={item.id} item={item} label={data.cardLabel} icon={data.cardIcon} delay={(i % 3) + 1} />
        ))}
      </div>
      <Pagination data={data.pagination} page={page} totalPages={totalPages} onChange={setPage} scrollTargetId={scrollTargetId} />
    </>
  );
};

/** Home page: the homeItemIds tiles with a link to every area. Practice Areas page (showAll): the paged listingItemIds. */
export const PracticeAreas = ({ data, showAll = false }: PracticeAreasProps) => {
  if (!data) return null;

  if (showAll) {
    const { label, title, titleHighlight, text } = data.intro;
    return (
      <section data-plain id="practice-list" className={`scroll-mt-28 ${ui.sectionPlain}`}>
        <div className={ui.container}>
          <SectionHeading label={label} title={title} titleHighlight={titleHighlight} text={text} />
          <PracticeGrid data={data} items={pickByIds(data.items, data.listingItemIds)} scrollTargetId="practice-list" />
        </div>
      </section>
    );
  }

  const { home } = data;
  return (
    <section className={`bg-mist ${ui.sectionSpace}`}>
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
        <div className="mt-14 grid gap-2 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {pickByIds(data.items, data.homeItemIds).map((item, i) => (
            <PracticeCard key={item.id} item={item} label={home.cardLabel} icon={data.cardIcon} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
