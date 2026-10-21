import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import FounderMessage from "@/components/FounderMessage";
import PracticePreview from "@/components/PracticePreview";
import Stats from "@/components/Stats";
import BlogPreview from "@/components/BlogPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

export default function HomePage() {
  return (
    <>
      <Hero data={site.hero} />
      <AboutIntro data={site.aboutIntroSection} />
      <FounderMessage data={site.founderSection} />
      <PracticePreview data={site.practicePreviewSection} items={site.practicePage.items} />
      <Stats data={site.statsSection} />
      <BlogPreview data={site.blogPreviewSection} items={site.blogPage.items} />
      <WhyChooseUs data={site.whyChooseUsSection} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
