import type { BlogsData, GlobalUIData } from "@/types/templates.types";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { ui as classes } from "@/components/ui/ui";

export const Blogs = ({ data, ui }: { data?: BlogsData; ui: GlobalUIData }) => {
  if (!data) return null;

  return (
    <section data-plain id="blog-list" className={`scroll-mt-28 ${classes.sectionPlain}`}>
      <div className={classes.container}>
        <BlogGrid items={data.items} perPage={data.perPage} buttonText={data.cardButton} byLabel={data.byLabel} ui={ui} scrollTargetId="blog-list" />
      </div>
    </section>
  );
};
