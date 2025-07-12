import UiverseFeaturesCard from '../UiverseFeaturesCard';

const HowItWorksSection = () => {
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

        {/* Process Flow */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-full px-8 py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">Profile</span>
            </div>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">Match</span>
            </div>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">Learn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 