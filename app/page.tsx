import Hero from "@/components/Hero";
import PracticeMarquee from "@/components/PracticeMarquee";
import AboutIntro from "@/components/AboutIntro";
import PracticePreview from "@/components/PracticePreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import FounderMessage from "@/components/FounderMessage";
import TeamPreview from "@/components/TeamPreview";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import CallToAction from "@/components/CallToAction";
import { site } from "@/data";

export default function HomePage() {
  return (
    <>
      <Hero data={site.hero} />
      <PracticeMarquee items={site.practicePage.items} />
      <AboutIntro data={site.aboutIntroSection} />
      <PracticePreview data={site.practicePreviewSection} items={site.practicePage.items} />
      <WhyChooseUs data={site.whyChooseUsSection} />
      <Stats data={site.statsSection} />
      <FounderMessage data={site.founderSection} />
      <TeamPreview data={site.teamPreviewSection} items={site.teamPage.items} />
      <Testimonials data={site.testimonialsSection} />
      <BlogPreview data={site.blogPreviewSection} items={site.blogPage.items} />
      <CallToAction data={site.ctaSection} />
    </>
  );
}
