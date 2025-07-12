'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '@/components/UserForm';
import { userApi, CreateUserData, User } from '@/utils/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await userApi.getCurrentUser();
      setCurrentUser(user);
    } catch {
      console.log('No current user found, creating new profile');
      setIsEditing(true);
    }
  };

  const handleSubmit = async (formData: CreateUserData) => {
    setIsLoading(true);
    try {
      if (currentUser) {
        // Update existing user
        await userApi.updateUser({ ...formData, id: currentUser.id });
        toast.success('Profile updated successfully!');
        setCurrentUser({ ...currentUser, ...formData, availability: formData.availability as 'available' | 'busy' | 'offline' });
        setIsEditing(false);
      } else {
        // Create new user
        const newUser = await userApi.createUser(formData);
        toast.success('Profile created successfully!');
        setCurrentUser(newUser);
        setIsEditing(false);
        router.push('/browse');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {currentUser && !isEditing ? 'Your Profile' : 'Create Your Profile'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {currentUser && !isEditing
              ? 'Manage your skills and availability'
              : 'Tell the community about your skills and what you want to learn'
            }
          </p>
        </div>

        {/* Profile Display or Edit Form */}
        {currentUser && !isEditing ? (
          <div className="max-w-2xl mx-auto">
            {/* Profile Display */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                    {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentUser.name}
                    </h2>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      currentUser.availability === 'available' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : currentUser.availability === 'busy'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {currentUser.availability}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              </div>

              {currentUser.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bio</h3>
                  <p className="text-gray-600 dark:text-gray-300">{currentUser.bio}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Skills I Offer
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Skills I Want to Learn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Profile Visibility</span>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {currentUser.isPublic ? 'Public' : 'Private'}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {new Date(currentUser.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/browse')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
              >
                Browse Skills
              </button>
              <button
                onClick={() => router.push('/swaps')}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-all duration-200"
              >
                View Swaps
              </button>
            </div>
          </div>
        ) : (
          <UserForm
            initialData={currentUser || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
} 