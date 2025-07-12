import HeroSection from '../components/Home/HeroSection';
import AboutSection from '../components/Home/AboutSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import StatsSection from '../components/Home/StatsSection';
import PopularSkillsSection from '../components/Home/PopularSkillsSection';
import CTASection from '../components/Home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <StatsSection />
      <PopularSkillsSection />
      <CTASection />
    </div>
  );
}