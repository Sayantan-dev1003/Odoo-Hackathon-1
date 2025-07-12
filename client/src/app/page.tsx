'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import UiverseFeaturesCard from '../components/UiverseFeaturesCard';
import StatCounter from '../components/StatCounter';

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

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Exchange Skills,
              <br />
              <span className="text-yellow-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>Expand Horizons</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              Connect with peers to teach what you know and learn what you want. 
              SkillLink makes peer-to-peer skill exchange simple and rewarding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '900ms' }}>
              <Link
                href="/browse"
                className="hover:bg-gradient-to-r hover:from-white hover:to-white hover:transition hover:ease-in-out hover:duration-100 hover:scale-105 text-black hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-slate-400 to-white transition-colors duration-200 shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Browse Skills
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/profile"
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Create Profile
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Quick Navigation */}
            <div className="mt-12 flex justify-center space-x-8 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
              <button
                onClick={() => scrollToSection('animate-features')}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('animate-about')}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('animate-testimonials')}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('animate-skills')}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Popular Skills
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('animate-features')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </button>
      </section>

      {/* Features Section */}
      <section id="animate-features" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-features'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How SkillLink Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform makes it easy to connect with others and exchange knowledge
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-[70px] py-10 transition-all duration-1000 ${isVisible['animate-features'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '300ms' }}>
            {/* Feature 1 */}
            <div className="hover-lift">
              <UiverseFeaturesCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Create Your Profile
                  </h3>
                  <p className="text-white text-sm">
                    Share your skills and what you want to learn. Set your availability and make your profile discoverable.
                  </p>
                </div>
              </UiverseFeaturesCard>
            </div>

            {/* Feature 2 */}
            <div className="hover-lift">
              <UiverseFeaturesCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Find Perfect Matches
                  </h3>
                  <p className="text-white text-sm">
                    Browse users by skills and see match percentages. Find people who want to learn what you offer.
                  </p>
                </div>
              </UiverseFeaturesCard>
            </div>

            {/* Feature 3 */}
            <div className="hover-lift">
              <UiverseFeaturesCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Exchange & Learn
                  </h3>
                  <p className="text-white text-sm">
                    Send swap requests, connect with partners, and start learning. Rate your experience when complete.
                  </p>
                </div>
              </UiverseFeaturesCard>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="animate-about" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-about'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About SkillLink
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering communities through peer-to-peer learning and skill exchange
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible['animate-about'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '300ms' }}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                SkillLink was founded on the belief that everyone has something valuable to teach and 
                something meaningful to learn. We create a platform where knowledge flows freely, 
                communities grow stronger, and individuals unlock their full potential.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Whether you're a professional looking to share your expertise, a student eager to 
                learn new skills, or someone passionate about a hobby, SkillLink connects you with 
                like-minded individuals in your community.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Free to Use</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Available</div>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 ${isVisible['animate-about'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '600ms' }}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <h4 className="text-xl font-bold mb-4">Why Choose SkillLink?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-yellow-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform">Smart matching algorithm</span>
                  </li>
                  <li className="flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-yellow-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform">Secure and trusted platform</span>
                  </li>
                  <li className="flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-yellow-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform">Community-driven learning</span>
                  </li>
                  <li className="flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-yellow-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform">Flexible scheduling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="animate-stats" className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${isVisible['animate-stats'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="hover-lift">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                <StatCounter to={1200} duration={2} suffix="+" />
              </div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="hover-lift">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">
                <StatCounter to={500} duration={2} suffix="+" />
              </div>
              <div className="text-gray-600 dark:text-gray-300">Skills Available</div>
            </div>
            <div className="hover-lift">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                <StatCounter to={2800} duration={2.5} suffix="+" />
              </div>
              <div className="text-gray-600 dark:text-gray-300">Successful Swaps</div>
            </div>
            <div className="hover-lift">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-2">
                <StatCounter to={4.8} duration={1.5} suffix="★" />
              </div>
              <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="animate-testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-testimonials'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real stories from real people who've transformed their lives through SkillLink
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift ${isVisible['animate-testimonials'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '300ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  SA
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Anderson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Graphic Designer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "I learned web development from a local developer and taught him design principles in return. 
                It was an amazing experience that opened new career opportunities for me!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current hover:scale-110 transition-transform" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift ${isVisible['animate-testimonials'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '600ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Through SkillLink, I found someone to teach me photography while I helped them with 
                programming. The community is incredibly supportive and welcoming!"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current hover:scale-110 transition-transform" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift ${isVisible['animate-testimonials'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '900ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  EL
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Emily Liu</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "I've made lasting friendships through skill exchanges. It's not just about learning - 
                it's about building a community of lifelong learners and teachers."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current hover:scale-110 transition-transform" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section id="animate-skills" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible['animate-skills'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover the most in-demand skills on our platform
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${isVisible['animate-skills'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '300ms' }}>
            {[
              'Web Development', 'Graphic Design', 'Photography', 'Data Analysis',
              'Language Learning', 'Music Production', 'Digital Marketing', 'Cooking',
              'Writing', 'Video Editing', 'UI/UX Design', 'Public Speaking'
            ].map((skill, index) => (
              <Link
                key={skill}
                href={`/browse?skill=${encodeURIComponent(skill)}`}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {skill}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="animate-cta" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible['animate-cta'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Join thousands of learners and teachers exchanging skills every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profile"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/browse"
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Skills
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
