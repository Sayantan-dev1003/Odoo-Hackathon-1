import Link from 'next/link';

const PopularSkillsSection = () => {
  const popularSkills = [
    'Web Development', 'Graphic Design', 'Photography', 'Data Analysis',
    'Language Learning', 'Music Production', 'Digital Marketing', 'Cooking',
    'Writing', 'Video Editing', 'UI/UX Design', 'Public Speaking'
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the most in-demand skills on our platform
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {popularSkills.map((skill) => (
            <Link
              key={skill}
              href={`/browse?skill=${encodeURIComponent(skill)}`}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              {skill}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSkillsSection; 