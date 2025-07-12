'use client';
import { useEffect, useState } from 'react';

import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import AboutSection from '../components/Home/AboutSection';
import StatsSection from '../components/Home/StatsSection';
import PopularSkillsSection from '../components/Home/PopularSkillsSection';
import CTASection from '../components/Home/CTASection';
import TestimonialsSection from '../components/Home/TestimonialsSection';

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/4 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Stats Section */}
      <StatsSection />
      {/* Testimonials Section */}
      <TestimonialsSection isVisible={isVisible} />
      {/* Popular Skills Section */}
      <PopularSkillsSection />
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}