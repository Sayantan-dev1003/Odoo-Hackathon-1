'use client';

import { useState, useEffect } from 'react';
import { User } from '@/utils/api';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  currentUser: User | null;
  onConfirm: (userId: string, requestedSkill: string, offeredSkill: string, message: string) => void;
}

const SwapModal = ({ isOpen, onClose, user, currentUser, onConfirm }: SwapModalProps) => {
  const [message, setMessage] = useState('');
  const [requestedSkill, setRequestedSkill] = useState('');
  const [offeredSkill, setOfferedSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setRequestedSkill('');
      setOfferedSkill('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !requestedSkill || !offeredSkill) return;

    setIsSubmitting(true);
    try {
      await onConfirm(user._id, requestedSkill, offeredSkill, message);
      setMessage('');
      setRequestedSkill('');
      setOfferedSkill('');
      onClose();
    } catch (error) {
      console.error('Error sending swap request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (!isOpen || !user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Request Skill Swap
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exchange skills with {user.firstName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {getInitials(fullName)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {fullName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.location && `📍 ${user.location}`}
              </p>
            </div>
          </div>

          {/* Skills Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700/50">
              <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                They can teach
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.offeredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50">
              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                They want to learn
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.wantedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Skill Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* What you want to learn */}
            <div>
              <label htmlFor="requestedSkill" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  I want to learn
                </span>
              </label>
              <select
                id="requestedSkill"
                value={requestedSkill}
                onChange={(e) => setRequestedSkill(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a skill...</option>
                {user.offeredSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* What you offer */}
            <div>
              <label htmlFor="offeredSkill" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  I can teach
                </span>
              </label>
              <select
                id="offeredSkill"
                value={offeredSkill}
                onChange={(e) => setOfferedSkill(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a skill...</option>
                {currentUser?.offeredSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${user.firstName}! I'd love to learn ${requestedSkill || '[skill]'} from you. In return, I can teach you ${offeredSkill || '[skill]'}. Let's connect!`}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {message.length}/500 characters
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Be friendly and specific about your goals
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !requestedSkill || !offeredSkill}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Request...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Swap Request
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapModal; 