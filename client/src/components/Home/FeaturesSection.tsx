import UiverseFeaturesCard from '../UiverseFeaturesCard';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SkillLink</span> Works
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform makes it easy to connect with others and exchange knowledge through a simple, 
            intuitive process designed for maximum learning outcomes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-[70px] py-10">
          {/* Step 1 */}
          <UiverseFeaturesCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-xs font-semibold text-blue-50 mb-2">STEP 1</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Create Your Profile
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Share your skills and what you want to learn. Set your availability and make your profile discoverable.
              </p>
            </div>
          </UiverseFeaturesCard>

          {/* Step 2 */}
          <UiverseFeaturesCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="text-xs font-semibold text-purple-100 mb-2">STEP 2</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Find Perfect Matches
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Browse users by skills and see match percentages. Find people who want to learn what you offer.
              </p>
            </div>
          </UiverseFeaturesCard>

          {/* Step 3 */}
          <UiverseFeaturesCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="text-xs font-semibold text-green-200 mb-2">STEP 3</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Exchange & Learn
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Send swap requests, connect with partners, and start learning. Rate your experience when complete.
              </p>
            </div>
          </UiverseFeaturesCard>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Matching</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our algorithm finds the best skill matches based on your preferences and availability.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rating System</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Build trust through our community rating system and detailed feedback.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Scheduling</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Set your own availability and find partners who match your schedule.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Join a growing community of learners and teachers from around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 