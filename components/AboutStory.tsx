import Image from "next/image";
import { site, type AurelianAboutStoryData, type SectionProps } from "@/data";
import { Eyebrow } from "@/components/SectionHeading";
import { FeatureIcon } from "@/components/Icons";

/** Arched photo with an overlapping wide photo beside the firm's story and Mission / Vision cards. */
export default function AboutStory({ data = site.aboutStorySection }: SectionProps<AurelianAboutStoryData>) {
  const { label, titleLine1, titleLine2, statement, image, imageWide, mission, vision } = data;

  return (
    <section className="section-space overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <div data-reveal="up" className="relative mx-auto w-full max-w-[540px] pb-24 sm:pb-32 lg:mx-0">
          <div className="arch relative aspect-[14/17] w-[78%] overflow-hidden bg-bone">
            <Image src={image.src} alt={image.alt} fill quality={85} sizes="(min-width: 1024px) 32vw, 72vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-[7/5] w-[62%] overflow-hidden rounded-[3px] border-[6px] border-white bg-bone shadow-[0_24px_60px_rgba(37,10,16,0.18)] sm:border-8">
            <Image src={imageWide.src} alt={imageWide.alt} fill quality={85} sizes="(min-width: 1024px) 26vw, 58vw" className="object-cover" />
          </div>
          <span aria-hidden="true" className="arch absolute right-[6%] top-[8%] h-[38%] w-[26%] border border-gold/50" />
        </div>

        <div>
          <Eyebrow label={label} />
          <h2 data-reveal="up" data-delay="1" className="display-2 mt-5 text-ink">
            {titleLine1} <span className="italic text-gold">{titleLine2}</span>
          </h2>
          <p data-reveal="up" data-delay="2" className="lead mt-6 text-body">
            {statement}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[mission, vision].map((block, i) => (
              <div key={block.title} data-reveal="up" data-delay={i + 3} className="group rounded-[3px] border border-line bg-mist p-7 transition-colors duration-500 hover:border-wine hover:bg-wine">
                <span className="grid size-14 place-items-center rounded-full bg-wine text-gold-light transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                  <FeatureIcon name={block.icon} className="size-6" />
                </span>
                <h3 className="display-3 mt-5 text-ink transition-colors duration-500 group-hover:text-white">{block.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-body transition-colors duration-500 group-hover:text-white/75">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
