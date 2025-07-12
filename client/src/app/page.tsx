import Link from 'next/link';
import UiverseFeaturesCard from '../components/Uiversecard';
import StatCounter from '../components/StatCounter'; // adjust path as needed



export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Exchange Skills,
              <br />
              <span className="text-yellow-300">Expand Horizons</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
              Connect with peers to teach what you know and learn what you want. 
              SkillLink makes peer-to-peer skill exchange simple and rewarding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                Browse Skills
              </Link>
              <Link
                href="/profile"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Create Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How SkillLink Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform makes it easy to connect with others and exchange knowledge
            </p>
          </div>

           <div className="flex flex-wrap justify-center gap-[70px] py-10 ">
      {/* Feature 1 */}
      <UiverseFeaturesCard>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Feature 2 */}
      <UiverseFeaturesCard>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Feature 3 */}
      <UiverseFeaturesCard>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              <StatCounter to={1200} duration={2} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-gray-300">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              <StatCounter to={500} duration={2} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-gray-300">Skills Available</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              <StatCounter to={2800} duration={2.5} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-gray-300">Successful Swaps</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              <StatCounter to={4.8} duration={1.5} suffix="★" />
            </div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>


      {/* Popular Skills Section */}
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
            {[
              'Web Development', 'Graphic Design', 'Photography', 'Data Analysis',
              'Language Learning', 'Music Production', 'Digital Marketing', 'Cooking',
              'Writing', 'Video Editing', 'UI/UX Design', 'Public Speaking'
            ].map((skill) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of learners and teachers exchanging skills every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profile"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Get Started Now
            </Link>
            <Link
              href="/browse"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors duration-200"
            >
              Explore Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
