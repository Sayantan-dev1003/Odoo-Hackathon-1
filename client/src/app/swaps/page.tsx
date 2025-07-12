'use client';

import { useState, useEffect } from 'react';
import { apiService, Swap, formatDateTime } from '@/utils/api';
import RatingStars from '@/components/RatingStars';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function SwapsPage() {
  const [swapRequests, setSwapRequests] = useState<Swap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'completed'>('pending');
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<Swap | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchSwapRequests();
  }, []);

  const fetchSwapRequests = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMySwaps();
      setSwapRequests(response.swaps);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      toast.error('Failed to load swap requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapAction = async (swapId: string, action: 'accepted' | 'rejected') => {
    try {
      console.log(`Attempting to ${action} swap:`, swapId);
      console.log('Current user:', currentUser);
      
      if (action === 'accepted') {
        const result = await apiService.acceptSwap(swapId);
        console.log('Accept swap result:', result);
        toast.success('Swap accepted successfully! 🎉');
      } else {
        const result = await apiService.rejectSwap(swapId);
        console.log('Reject swap result:', result);
        toast.success('Swap declined');
      }
      
      // Refresh the swaps list
      await fetchSwapRequests();
    } catch (error: unknown) {
      console.error(`Error ${action} swap:`, error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        response: (error as Error & { response?: unknown })?.response,
        status: (error as Error & { status?: number })?.status
      });
      
      // More specific error messages
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('Only the provider can accept')) {
        toast.error('You can only accept swaps that were sent to you');
      } else if (errorMessage.includes('not in pending status')) {
        toast.error('This swap is no longer pending');
      } else if (errorMessage.includes('Unauthorized')) {
        toast.error('Please log in to perform this action');
      } else {
        toast.error(`Failed to ${action} swap: ${errorMessage}`);
      }
    }
  };

  const handleCompleteSwap = async (swapId: string) => {
    try {
      await apiService.completeSwap(swapId);
      toast.success('Swap marked as completed! 🎉');
      fetchSwapRequests();
    } catch (error) {
      console.error('Error completing swap:', error);
      toast.error('Failed to complete swap');
    }
  };

  const handleRateSwap = (swap: Swap) => {
    setSelectedSwap(swap);
    setRatingModalOpen(true);
  };

  const submitRating = async () => {
    if (!selectedSwap || !currentUser) return;

    try {
      const ratedUserId = selectedSwap.requesterId._id === currentUser._id 
        ? selectedSwap.providerId._id 
        : selectedSwap.requesterId._id;

      await apiService.createRating({
        swapId: selectedSwap._id,
        ratedUserId,
        rating,
        comment: feedback,
        tags: []
      });
      
      toast.success('Rating submitted successfully! ⭐');
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

  const getSwapPartner = (swap: Swap, currentUserId: string) => {
    return swap.requesterId._id === currentUserId ? swap.providerId : swap.requesterId;
  };

  const isSwapSentByCurrentUser = (swap: Swap, currentUserId: string) => {
    return swap.requesterId._id === currentUserId;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const filteredSwaps = getFilteredSwaps();

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              My Swaps
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Manage your skill exchange requests and partnerships
            </p>
            
            {/* Debug refresh button */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={fetchSwapRequests}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                🔄 Refresh Swaps
              </button>
            )}
            
            <div className="mt-6 flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Exchanges</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Skill Growth</span>
              </div>
            </div>
          </div>

          {/* Debug Panel - Remove this after fixing */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
              <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Debug Information</h3>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">
                <p>Current User ID: {currentUser?._id}</p>
                <p>Total Swaps: {swapRequests.length}</p>
                <p>Pending Swaps: {swapRequests.filter(s => s.status === 'pending').length}</p>
                <p>Active Tab: {activeTab}</p>
                <p>Filtered Swaps: {filteredSwaps.length}</p>
                {filteredSwaps.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">First Swap Details:</p>
                    <pre className="text-xs bg-yellow-100 dark:bg-yellow-800 p-2 rounded mt-1">
                      {JSON.stringify({
                        id: filteredSwaps[0]._id,
                        requesterId: filteredSwaps[0].requesterId._id,
                        providerId: filteredSwaps[0].providerId._id,
                        status: filteredSwaps[0].status,
                        isSentByCurrentUser: currentUser ? isSwapSentByCurrentUser(filteredSwaps[0], currentUser._id) : false
                      }, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {[
                  { 
                    key: 'pending', 
                    label: 'Pending', 
                    count: swapRequests.filter(s => s.status === 'pending').length,
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  { 
                    key: 'accepted', 
                    label: 'Active', 
                    count: swapRequests.filter(s => s.status === 'accepted').length,
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  { 
                    key: 'completed', 
                    label: 'Completed', 
                    count: swapRequests.filter(s => s.status === 'completed').length,
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'pending' | 'accepted' | 'completed')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${
                        activeTab === tab.key
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                      }`}>
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
                      <div className="flex items-center space-x-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredSwaps.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No {activeTab} swaps
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {activeTab === 'pending' 
                      ? 'You have no pending swap requests. Browse skills to find new learning opportunities!'
                      : activeTab === 'accepted'
                      ? 'You have no active swaps. Accept pending requests to start learning!'
                      : 'You have no completed swaps yet. Complete your active swaps to build your reputation!'
                    }
                  </p>
                  {activeTab === 'pending' && (
                    <a
                      href="/browse"
                      className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Browse Skills
                    </a>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredSwaps.map((swap, index) => {
                    const partner = currentUser ? getSwapPartner(swap, currentUser._id) : swap.providerId;
                    const isSentByMe = currentUser ? isSwapSentByCurrentUser(swap, currentUser._id) : false;
                    
                    return (
                      <div 
                        key={swap._id} 
                        className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {getInitials(`${partner.firstName} ${partner.lastName}`)}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {partner.firstName} {partner.lastName}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {isSentByMe ? 'Request sent to' : 'Request from'} • {formatDateTime(swap.createdAt || '')}
                              </p>
                              <div className="flex items-center mt-2">
                                <div className="flex text-yellow-400 mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(partner.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {partner.rating.toFixed(1)} ({partner.totalRatings} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(swap.status)}`}>
                              {swap.status === 'accepted' ? 'Active' : swap.status}
                            </span>
                          </div>
                        </div>

                        {/* Message */}
                        {swap.message && (
                          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                              &quot;{swap.message}&quot;
                            </p>
                          </div>
                        )}

                        {/* Swap Details */}
                        <div className="mb-6">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700/50">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                              </svg>
                              Skill Exchange Details
                            </h4>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700/50">
                                <h5 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                  {isSentByMe ? 'You want to learn' : 'They want to learn'}
                                </h5>
                                <span className="px-3 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-lg text-sm font-medium">
                                  {swap.requestedSkill}
                                </span>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700/50">
                                <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                  {isSentByMe ? 'You offer to teach' : 'They offer to teach'}
                                </h5>
                                <span className="px-3 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg text-sm font-medium">
                                  {swap.offeredSkill}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3">
                          {/* Debug info for development */}
                          {process.env.NODE_ENV === 'development' && (
                            <div className="text-xs text-gray-500 mr-4 bg-gray-100 p-2 rounded">
                              <p><strong>Debug Info:</strong></p>
                              <p>Current User: {currentUser?._id}</p>
                              <p>Requester: {swap.requesterId._id}</p>
                              <p>Provider: {swap.providerId._id}</p>
                              <p>Status: {swap.status}</p>
                              <p>Sent by me: {isSentByMe ? 'Yes' : 'No'}</p>
                              <p>Am I provider: {currentUser?._id === swap.providerId._id ? 'Yes' : 'No'}</p>
                              <p>Show buttons: {(swap.status === 'pending' && !isSentByMe) ? 'Yes' : 'No'}</p>
                              <p>Button condition: pending={swap.status === 'pending'} AND notSentByMe={!isSentByMe}</p>
                            </div>
                          )}
                          
                          {/* Show accept/reject buttons if: 1) swap is pending AND 2) current user is the provider (recipient) */}
                          {swap.status === 'pending' && (
                            // Primary condition: not sent by current user (they are the recipient/provider)
                            !isSentByMe || 
                            // Fallback condition: current user is explicitly the provider
                            (currentUser && currentUser._id === swap.providerId._id)
                          ) && (
                            <>
                              <button
                                onClick={() => handleSwapAction(swap._id, 'rejected')}
                                className="px-6 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors font-medium"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => handleSwapAction(swap._id, 'accepted')}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                              >
                                Accept
                              </button>
                            </>
                          )}
                          
                          {swap.status === 'pending' && isSentByMe && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                              Waiting for response...
                            </div>
                          )}
                          
                          {swap.status === 'accepted' && (
                            <button
                              onClick={() => handleCompleteSwap(swap._id)}
                              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                            >
                              Mark Complete
                            </button>
                          )}
                          
                          {swap.status === 'completed' && (
                            <button
                              onClick={() => handleRateSwap(swap)}
                              className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                            >
                              Rate Experience
                            </button>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 shadow-2xl animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Rate Your Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  How was your skill exchange with {currentUser ? getSwapPartner(selectedSwap, currentUser._id).firstName : 'your partner'}?
                </p>
              </div>
              
              <div className="mb-6 text-center">
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none transition-all duration-200"
                  rows={4}
                  placeholder="Share your experience and help others in the community..."
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
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRating}
                  disabled={rating === 0}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-medium"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 