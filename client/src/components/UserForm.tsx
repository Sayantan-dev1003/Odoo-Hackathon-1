'use client';

import { useState, useEffect, useRef } from 'react';
import { CreateUserData } from '@/types';

interface UserFormProps {
  initialData?: Partial<CreateUserData>;
  onSubmit: (data: CreateUserData) => void;
  isLoading?: boolean;
}

const AVAILABILITY_OPTIONS = [
  'Weekends',
  'Weekdays', 
  'Evenings',
  'Mornings',
  'Flexible'
];

export default function UserForm({ initialData, onSubmit, isLoading = false }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    offeredSkills: [],
    wantedSkills: [],
    availability: []
  });

  const [offeredSkillInput, setOfferedSkillInput] = useState('');
  const [wantedSkillInput, setWantedSkillInput] = useState('');
  const offeredInputRef = useRef<HTMLInputElement>(null);
  const wantedInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email || '',
        password: '', // Don't populate password for security
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        bio: initialData.bio || '',
        location: initialData.location || '',
        offeredSkills: initialData.offeredSkills ?? [],
        wantedSkills: initialData.wantedSkills ?? [],
        availability: initialData.availability ?? []
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!initialData && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if ((formData.offeredSkills ?? []).length === 0) {
      newErrors.offeredSkills = 'Please select at least one skill you can offer';
    }

    if ((formData.wantedSkills ?? []).length === 0) {
      newErrors.wantedSkills = 'Please select at least one skill you want to learn';
    }

    if ((formData.availability ?? []).length === 0) {
      newErrors.availability = 'Please select your availability';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const toggleAvailability = (availability: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability?.includes(availability)
        ? prev.availability?.filter(a => a !== availability) || []
        : [...(prev.availability || []), availability]
    }));
  };

  // Add skill to offeredSkills
  const addOfferedSkill = () => {
    const skill = offeredSkillInput.trim();
    if (skill && !(formData.offeredSkills ?? []).includes(skill)) {
      setFormData(prev => ({
        ...prev,
        offeredSkills: [...(prev.offeredSkills ?? []), skill]
      }));
      setOfferedSkillInput('');
      offeredInputRef.current?.focus();
    }
  };

  // Remove skill from offeredSkills
  const removeOfferedSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      offeredSkills: (prev.offeredSkills ?? []).filter(s => s !== skill)
    }));
  };

  // Add skill to wantedSkills
  const addWantedSkill = () => {
    const skill = wantedSkillInput.trim();
    if (skill && !(formData.wantedSkills ?? []).includes(skill)) {
      setFormData(prev => ({
        ...prev,
        wantedSkills: [...(prev.wantedSkills ?? []), skill]
      }));
      setWantedSkillInput('');
      wantedInputRef.current?.focus();
    }
  };

  // Remove skill from wantedSkills
  const removeWantedSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      wantedSkills: (prev.wantedSkills ?? []).filter(s => s !== skill)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {!initialData && (
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="City, Country"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Skills Offered */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills I Can Offer *
            </h3>
            <div className="flex gap-2 mb-2">
              <input
                ref={offeredInputRef}
                type="text"
                value={offeredSkillInput}
                onChange={e => setOfferedSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addOfferedSkill();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Type a skill and press Enter"
              />
              <button
                type="button"
                onClick={addOfferedSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.offeredSkills ?? []).map(skill => (
                <span
                  key={skill}
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeOfferedSkill(skill)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {errors.offeredSkills && <p className="mt-2 text-sm text-red-600">{errors.offeredSkills}</p>}
          </div>

          {/* Skills Wanted */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills I Want to Learn *
            </h3>
            <div className="flex gap-2 mb-2">
              <input
                ref={wantedInputRef}
                type="text"
                value={wantedSkillInput}
                onChange={e => setWantedSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addWantedSkill();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Type a skill and press Enter"
              />
              <button
                type="button"
                onClick={addWantedSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.wantedSkills ?? []).map(skill => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeWantedSkill(skill)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {errors.wantedSkills && <p className="mt-2 text-sm text-red-600">{errors.wantedSkills}</p>}
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Availability *
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {AVAILABILITY_OPTIONS.map((availability) => (
                <label key={availability} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.availability?.includes(availability)}
                    onChange={() => toggleAvailability(availability)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{availability}</span>
                </label>
              ))}
            </div>
            {errors.availability && <p className="mt-2 text-sm text-red-600">{errors.availability}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Saving...' : (initialData ? 'Update Profile' : 'Create Profile')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 