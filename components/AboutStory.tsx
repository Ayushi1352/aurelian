import Image from "next/image";
import { site, type AurelianAboutStoryData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

/*
 * Same editorial opening as the home About section (label left, large title and the story right),
 * then a tall photo beside a wide one, with the Mission / Vision blocks under the wide photo.
 */
export default function AboutStory({ data = site.aboutStorySection }: SectionProps<AurelianAboutStoryData>) {
  const { label, titleLine1, titleLine2, statement, image, imageWide, mission, vision } = data;

  return (
    <section className="section-space">
      <div className="container-site">
        <SectionHeading label={label} line1={titleLine1} line2={titleLine2} text={statement} />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-8">
          <div data-reveal="wipe" className="relative aspect-[14/17] overflow-hidden bg-bone">
            <span className="parallax absolute inset-0 block">
              <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1400px) 540px, (min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </span>
          </div>

          <div>
            <div data-reveal="wipe" data-delay="2" className="relative aspect-[7/5] overflow-hidden bg-bone">
              <span className="parallax absolute inset-0 block">
                <Image src={imageWide.src} alt={imageWide.alt} fill quality={85} sizes="(min-width: 1400px) 760px, (min-width: 1024px) 56vw, 100vw" className="object-cover" />
              </span>
            </div>

            <div className="mt-12 grid border-t border-line sm:grid-cols-2">
              {[mission, vision].map((block, i) => (
                <div key={block.title} data-reveal="up" data-delay={i + 3} className={`group relative pt-8 sm:pr-8 ${i === 1 ? "mt-8 border-t border-line sm:mt-0 sm:border-l sm:border-t-0 sm:pl-8 sm:pr-0" : ""}`}>
                  <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <span className="flex items-center justify-between">
                    <span className="label text-[10px]! text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-12 place-items-center border border-line text-wine transition-colors duration-500 group-hover:border-wine group-hover:bg-wine group-hover:text-gold-light">
                      <FeatureIcon name={block.icon} className="size-5" />
                    </span>
                  </span>
                  <h3 className="display-3 mt-6 text-ink">
                    {block.title}
                    <span className="text-gold">.</span>
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-body">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
