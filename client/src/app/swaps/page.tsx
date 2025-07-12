'use client';

import { useState, useEffect } from 'react';
import { swapApi, SwapRequest, formatDateTime } from '@/utils/api';
import RatingStars from '@/components/RatingStars';
import toast from 'react-hot-toast';

export default function SwapsPage() {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'completed'>('pending');
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<SwapRequest | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchSwapRequests();
  }, []);

  const fetchSwapRequests = async () => {
    try {
      setIsLoading(true);
      const requests = await swapApi.getSwapRequests();
      setSwapRequests(requests);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      toast.error('Failed to load swap requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapAction = async (swapId: string, action: 'accepted' | 'rejected') => {
    try {
      await swapApi.updateSwapRequest(swapId, { status: action });
      toast.success(`Swap ${action} successfully!`);
      fetchSwapRequests();
    } catch (error) {
      console.error(`Error ${action} swap:`, error);
      toast.error(`Failed to ${action} swap`);
    }
  };

  const handleCompleteSwap = async (swapId: string) => {
    try {
      await swapApi.updateSwapRequest(swapId, { status: 'completed' });
      toast.success('Swap marked as completed!');
      fetchSwapRequests();
    } catch (error) {
      console.error('Error completing swap:', error);
      toast.error('Failed to complete swap');
    }
  };

  const handleRateSwap = (swap: SwapRequest) => {
    setSelectedSwap(swap);
    setRatingModalOpen(true);
  };

  const submitRating = async () => {
    if (!selectedSwap) return;

    try {
      await swapApi.updateSwapRequest(selectedSwap.id, {
        status: 'completed',
        rating,
        feedback
      });
      toast.success('Rating submitted successfully!');
      setRatingModalOpen(false);
      setSelectedSwap(null);
      setRating(0);
      setFeedback('');
      fetchSwapRequests();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    }
  };

  const getFilteredSwaps = () => {
    return swapRequests.filter(swap => {
      if (activeTab === 'pending') return swap.status === 'pending';
      if (activeTab === 'accepted') return swap.status === 'accepted';
      if (activeTab === 'completed') return swap.status === 'completed';
      return false;
    });
  };

  const getSwapPartner = (swap: SwapRequest, currentUserId: string) => {
    return swap.fromUserId === currentUserId ? swap.toUser : swap.fromUser;
  };

  const isSwapSentByCurrentUser = (swap: SwapRequest, currentUserId: string) => {
    return swap.fromUserId === currentUserId;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredSwaps = getFilteredSwaps();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Swaps
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your skill exchange requests and partnerships
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'pending', label: 'Pending', count: swapRequests.filter(s => s.status === 'pending').length },
                { key: 'accepted', label: 'Active', count: swapRequests.filter(s => s.status === 'accepted').length },
                { key: 'completed', label: 'Completed', count: swapRequests.filter(s => s.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'pending' | 'accepted' | 'completed')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredSwaps.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No {activeTab} swaps
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeTab === 'pending' 
                    ? 'You have no pending swap requests'
                    : activeTab === 'accepted'
                    ? 'You have no active swaps'
                    : 'You have no completed swaps'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSwaps.map((swap) => {
                  const partner = getSwapPartner(swap, 'current-user-id'); // This would come from auth context
                  const isSentByMe = isSwapSentByCurrentUser(swap, 'current-user-id');
                  
                  return (
                    <div key={swap.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {getInitials(partner.name)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {partner.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {isSentByMe ? 'Request sent to' : 'Request from'} • {formatDateTime(swap.createdAt)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            swap.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : swap.status === 'accepted'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {swap.status === 'accepted' ? 'Active' : swap.status}
                          </span>
                        </div>
                      </div>

                      {/* Message */}
                      {swap.message && (
                        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            &quot;{swap.message}&quot;
                          </p>
                        </div>
                      )}

                      {/* Skills */}
                      <div className="mt-4 grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            They offer:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {partner.skillsOffered.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            They want:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {partner.skillsWanted.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end space-x-3">
                        {swap.status === 'pending' && !isSentByMe && (
                          <>
                            <button
                              onClick={() => handleSwapAction(swap.id, 'rejected')}
                              className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => handleSwapAction(swap.id, 'accepted')}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                            >
                              Accept
                            </button>
                          </>
                        )}
                        
                        {swap.status === 'accepted' && (
                          <button
                            onClick={() => handleCompleteSwap(swap.id)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                        
                        {swap.status === 'completed' && !swap.rating && (
                          <button
                            onClick={() => handleRateSwap(swap)}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          >
                            Rate Experience
                          </button>
                        )}
                        
                        {swap.status === 'completed' && swap.rating && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Your rating:</span>
                            <RatingStars rating={swap.rating} readOnly size="sm" showLabel={false} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {ratingModalOpen && selectedSwap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Rate Your Experience
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              How was your skill exchange with {getSwapPartner(selectedSwap, 'current-user-id').name}?
            </p>
            
            <div className="mb-6">
              <RatingStars 
                rating={rating} 
                onRatingChange={setRating} 
                size="lg" 
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Feedback (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                rows={3}
                placeholder="Share your experience..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setRatingModalOpen(false);
                  setSelectedSwap(null);
                  setRating(0);
                  setFeedback('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                disabled={rating === 0}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 