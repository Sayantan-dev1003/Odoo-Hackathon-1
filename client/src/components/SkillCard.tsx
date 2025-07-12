'use client';

import { User } from '@/utils/api';
import RatingStars from './RatingStars';

interface SkillCardProps {
  user: User & { matchPercentage?: number };
  onRequestSwap: (userId: string) => void;
}

const SkillCard = ({ user, onRequestSwap }: SkillCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 overflow-hidden group">
      {/* Match Percentage Badge */}
      {user.matchPercentage !== undefined && user.matchPercentage > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {Math.round(user.matchPercentage)}% Match
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              {getInitials(fullName)}
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
              {fullName}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <RatingStars rating={user.rating} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({user.totalRatings})
              </span>
            </div>
            {/* Location */}
            {user.location && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{user.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {user.bio && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
            {user.bio}
          </p>
        </div>
      )}

      {/* Skills Section */}
      <div className="px-6 pb-4 space-y-4">
        {/* Skills Offered */}
        <div>
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Teaching
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.offeredSkills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-lg text-sm font-medium border border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                {skill}
              </span>
            ))}
            {user.offeredSkills.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
                +{user.offeredSkills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div>
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Learning
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.wantedSkills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                {skill}
              </span>
            ))}
            {user.wantedSkills.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
                +{user.wantedSkills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        <div>
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Available
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.availability.slice(0, 2).map((time, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
              >
                {time}
              </span>
            ))}
            {user.availability.length > 2 && (
              <span className="px-3 py-1.5 bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
                +{user.availability.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-4 bg-gray-50 dark:bg-gray-700/50">
        <button
          onClick={() => onRequestSwap(user._id)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
        >
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Request Skill Swap
          </span>
        </button>
      </div>
    </div>
  );
};

export default SkillCard; 