'use client';

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  avatar?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  matchPercentage?: number;
  isPublic: boolean;
}

interface SkillCardProps {
  user: User;
  onRequestSwap: (userId: string) => void;
}

const SkillCard = ({ user, onRequestSwap }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 ${
        isHovered ? 'transform -translate-y-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Avatar and Match Percentage */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {getInitials(user.name)}
              </div>
            )}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
              user.availability === 'available' ? 'bg-green-500' : 
              user.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(user.availability)}`}>
              {user.availability}
            </span>
          </div>
        </div>
        
        {user.matchPercentage && (
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {user.matchPercentage}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Match
            </div>
          </div>
        )}
      </div>

      {/* Skills Offered */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills Offered
        </h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills Wanted
        </h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onRequestSwap(user.id)}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        Request Swap
      </button>
    </div>
  );
};

export default SkillCard; 