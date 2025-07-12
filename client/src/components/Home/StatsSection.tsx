import StatCounter from '../StatCounter';

const StatsSection = () => {
  return (
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
  );
};

export default StatsSection; 