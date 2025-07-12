import React from 'react';

const testimonials = [
  {
    name: 'Sarah Anderson',
    role: 'Graphic Designer',
    initials: 'SA',
    gradient: 'from-blue-500 to-purple-600',
    text: `I learned web development from a local developer and taught him design principles in return. It was an amazing experience that opened new career opportunities for me!`,
    stars: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Software Engineer',
    initials: 'MR',
    gradient: 'from-green-500 to-teal-600',
    text: `Through SkillLink, I found someone to teach me photography while I helped them with programming. The community is incredibly supportive and welcoming!`,
    stars: 5,
  },
  {
    name: 'Emily Liu',
    role: 'Marketing Specialist',
    initials: 'EL',
    gradient: 'from-purple-500 to-pink-600',
    text: `I've made lasting friendships through skill exchanges. It's not just about learning - it's about building a community of lifelong learners and teachers.`,
    stars: 5,
  },
];

const TestimonialsSection = ({ isVisible }: { isVisible: Record<string, boolean> }) => (
  <section id="animate-testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['animate-testimonials'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Community Says
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Real stories from real people who&apos;ve transformed their lives through SkillLink
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift ${isVisible['animate-testimonials'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: `${300 * (idx + 1)}ms` }}
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${t.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                {t.initials}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t.text}
            </p>
            <div className="flex text-yellow-400">
              {[...Array(t.stars)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current hover:scale-110 transition-transform" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection; 