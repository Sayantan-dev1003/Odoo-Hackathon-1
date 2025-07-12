'use client';

import { useState } from 'react';

interface UserFormData {
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  isPublic: boolean;
  bio?: string;
}

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
}

const UserForm = ({ initialData = {}, onSubmit, isLoading = false }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData.name || '',
    skillsOffered: initialData.skillsOffered || [],
    skillsWanted: initialData.skillsWanted || [],
    availability: initialData.availability || 'available',
    isPublic: initialData.isPublic ?? true,
    bio: initialData.bio || '',
  });

  const [skillInputs, setSkillInputs] = useState({
    offered: '',
    wanted: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    const skill = skillInputs[type].trim();
    if (skill && !formData[type === 'offered' ? 'skillsOffered' : 'skillsWanted'].includes(skill)) {
      setFormData(prev => ({
        ...prev,
        [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: [
          ...prev[type === 'offered' ? 'skillsOffered' : 'skillsWanted'],
          skill
        ]
      }));
      setSkillInputs(prev => ({ ...prev, [type]: '' }));
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: prev[type === 'offered' ? 'skillsOffered' : 'skillsWanted'].filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'offered' | 'wanted') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {initialData.name ? 'Edit Profile' : 'Create Your Profile'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
                      Tell others about your skills and what you&apos;d like to learn
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your full name"
          />
        </div>

        {/* Bio Field */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio (Optional)
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            rows={3}
            placeholder="Tell others about yourself..."
            maxLength={300}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formData.bio?.length || 0}/300 characters
          </p>
        </div>

        {/* Skills Offered */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills You Can Offer *
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={skillInputs.offered}
              onChange={(e) => setSkillInputs(prev => ({ ...prev, offered: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, 'offered')}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Web Development, Graphic Design"
            />
            <button
              type="button"
              onClick={() => addSkill('offered')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skillsOffered.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill('offered', index)}
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {formData.skillsOffered.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add at least one skill you can offer
            </p>
          )}
        </div>

        {/* Skills Wanted */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills You Want to Learn *
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={skillInputs.wanted}
              onChange={(e) => setSkillInputs(prev => ({ ...prev, wanted: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, 'wanted')}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Photography, Data Analysis"
            />
            <button
              type="button"
              onClick={() => addSkill('wanted')}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skillsWanted.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill('wanted', index)}
                  className="ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {formData.skillsWanted.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add at least one skill you want to learn
            </p>
          )}
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Availability Status
          </label>
          <select
            id="availability"
            value={formData.availability}
            onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Privacy Settings */}
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Public Profile
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Make your profile visible to other users
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isPublic ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isPublic ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading || formData.skillsOffered.length === 0 || formData.skillsWanted.length === 0 || !formData.name.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              initialData.name ? 'Update Profile' : 'Create Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 