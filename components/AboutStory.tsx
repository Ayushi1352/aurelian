import Image from "next/image";
import { site, type AurelianAboutStoryData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

/** Leaf-shaped photo (two rounded corners) with an overlapping rounded wide photo, beside the firm's story and Mission / Vision blocks. */
export default function AboutStory({ data = site.aboutStorySection }: SectionProps<AurelianAboutStoryData>) {
  const { label, titleLine1, titleLine2, statement, image, imageWide, mission, vision } = data;

  return (
    <section className="section-space overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <div className="relative mx-auto w-full max-w-[540px] pb-24 sm:pb-32 lg:mx-0">
          <span aria-hidden="true" data-reveal="fade" data-delay="3" className="absolute left-[6%] top-[-4%] aspect-[14/17] w-[78%] rounded-br-[140px] rounded-tl-[140px] border border-gold/60" />
          <div data-reveal="wipe" className="relative aspect-[14/17] w-[78%] overflow-hidden rounded-br-[140px] rounded-tl-[140px] bg-bone">
            <span className="parallax absolute inset-0 block">
              <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 32vw, 72vw" className="object-cover" />
            </span>
          </div>
          <div data-reveal="wipe" data-delay="4" className="absolute bottom-0 right-0 aspect-[7/5] w-[62%] overflow-hidden rounded-[28px] border-[6px] border-white bg-bone shadow-[0_24px_60px_rgba(37,10,16,0.18)] sm:border-8">
            <Image src={imageWide.src} alt={imageWide.alt} fill quality={85} sizes="(min-width: 1024px) 26vw, 58vw" className="object-cover" />
          </div>
        </div>

        <div>
          <SectionHeading label={label} line1={titleLine1} line2={titleLine2} />
          <p data-reveal="up" data-delay="3" className="mt-6 text-[16px] leading-[1.8] text-body lg:text-[17px]">
            {statement}
          </p>
          <div className="mt-10 grid border-t border-line sm:grid-cols-2">
            {[mission, vision].map((block, i) => (
              <div key={block.title} data-reveal="up" data-delay={i + 4} className={`group relative py-8 sm:pr-8 ${i === 1 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-8 sm:pr-0" : ""}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="grid size-14 place-items-center rounded-full bg-gold-pale text-wine transition-colors duration-500 group-hover:bg-wine group-hover:text-gold-light">
                  <FeatureIcon name={block.icon} className="size-6" />
                </span>
                <h3 className="display-3 mt-4 text-ink">
                  {block.title}
                  <span className="text-gold">.</span>
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-body">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
