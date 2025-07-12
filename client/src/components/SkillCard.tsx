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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {getInitials(fullName)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {fullName}
          </h3>
          <div className="flex items-center space-x-2">
            <RatingStars rating={user.rating} />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({user.totalRatings} reviews)
            </span>
          </div>
        </div>
        {user.matchPercentage !== undefined && (
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              {Math.round(user.matchPercentage)}% Match
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      {user.location && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          📍 {user.location}
        </p>
      )}

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {user.bio}
        </p>
      )}

      {/* Skills Offered */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Offers:
        </h4>
        <div className="flex flex-wrap gap-1">
          {user.offeredSkills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {user.offeredSkills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
              +{user.offeredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Wants to learn:
        </h4>
        <div className="flex flex-wrap gap-1">
          {user.wantedSkills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {user.wantedSkills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
              +{user.wantedSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Available:
        </h4>
        <div className="flex flex-wrap gap-1">
          {user.availability.slice(0, 2).map((time, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-xs font-medium"
            >
              {time}
            </span>
          ))}
          {user.availability.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
              +{user.availability.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onRequestSwap(user._id)}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
      >
        Request Swap
      </button>
    </div>
  );
};

export default SkillCard; 