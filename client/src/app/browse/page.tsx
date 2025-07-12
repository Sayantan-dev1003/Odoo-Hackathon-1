'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SkillCard from '@/components/SkillCard';
import SwapModal from '@/components/SwapModal';
import { userApi, swapApi, User, calculateMatchPercentage } from '@/utils/api';
import toast from 'react-hot-toast';

function BrowseContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
    
    // Check if there's a skill parameter in the URL
    const skillParam = searchParams.get('skill');
    if (skillParam) {
      setSearchTerm(skillParam);
    }
  }, [searchParams]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersData = await userApi.getUsers();
      setUsers(usersData.filter(user => user.isPublic));
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const user = await userApi.getCurrentUser();
      setCurrentUser(user);
    } catch {
      console.log('No current user found');
    }
  };

  const filterUsers = useCallback(() => {
    let filtered = users;

    // Filter out current user
    if (currentUser) {
      filtered = filtered.filter(user => user.id !== currentUser.id);
    }

    // Filter by search term (skills)
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.skillsOffered.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        user.skillsWanted.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by availability
    if (selectedAvailability !== 'all') {
      filtered = filtered.filter(user => user.availability === selectedAvailability);
    }

    // Calculate match percentages if current user exists
    if (currentUser) {
      filtered = filtered.map(user => ({
        ...user,
        matchPercentage: calculateMatchPercentage(currentUser, user)
      }));

      // Sort by match percentage (highest first)
      filtered.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedAvailability, currentUser]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const handleRequestSwap = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleSwapConfirm = async (userId: string, message: string) => {
    try {
      await swapApi.createSwapRequest({
        toUserId: userId,
        message
      });
      toast.success('Swap request sent successfully!');
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error sending swap request:', error);
      toast.error('Failed to send swap request');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Skills
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover talented people and find your perfect skill exchange partner
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search skills</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Search by skill or name..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {isLoading ? 'Loading...' : `Found ${filteredUsers.length} ${filteredUsers.length === 1 ? 'person' : 'people'}`}
          </p>
        </div>

        {/* User Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <SkillCard
                key={user.id}
                user={user}
                onRequestSwap={handleRequestSwap}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && filteredUsers.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={fetchUsers}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Swap Modal */}
      <SwapModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onConfirm={handleSwapConfirm}
      />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
} 