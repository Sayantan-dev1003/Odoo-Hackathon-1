import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: 'available' | 'busy' | 'offline';
  matchPercentage?: number;
  isPublic: boolean;
  bio?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  rating?: number;
  feedback?: string;
}

export interface CreateUserData {
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  isPublic: boolean;
  bio?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
}

export interface CreateSwapRequestData {
  toUserId: string;
  message: string;
}

export interface UpdateSwapRequestData {
  status: 'accepted' | 'rejected' | 'completed';
  rating?: number;
  feedback?: string;
}

// User API functions
export const userApi = {
  // Get all users
  getUsers: async (filters?: { skill?: string; availability?: string }): Promise<User[]> => {
    const params = new URLSearchParams();
    if (filters?.skill) params.append('skill', filters.skill);
    if (filters?.availability) params.append('availability', filters.availability);
    
    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
  },

  // Get user by ID
  getUser: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create user profile
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Update user profile
  updateUser: async (userData: UpdateUserData): Promise<User> => {
    const response = await api.put(`/users/${userData.id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Search users by skill
  searchUsers: async (skill: string): Promise<User[]> => {
    const response = await api.get(`/users/search?skill=${encodeURIComponent(skill)}`);
    return response.data;
  },
};

// Swap API functions
export const swapApi = {
  // Get all swap requests for current user
  getSwapRequests: async (status?: string): Promise<SwapRequest[]> => {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/swaps${params}`);
    return response.data;
  },

  // Get swap request by ID
  getSwapRequest: async (id: string): Promise<SwapRequest> => {
    const response = await api.get(`/swaps/${id}`);
    return response.data;
  },

  // Create swap request
  createSwapRequest: async (requestData: CreateSwapRequestData): Promise<SwapRequest> => {
    const response = await api.post('/swaps', requestData);
    return response.data;
  },

  // Update swap request (accept, reject, complete)
  updateSwapRequest: async (id: string, updateData: UpdateSwapRequestData): Promise<SwapRequest> => {
    const response = await api.put(`/swaps/${id}`, updateData);
    return response.data;
  },

  // Delete swap request
  deleteSwapRequest: async (id: string): Promise<void> => {
    await api.delete(`/swaps/${id}`);
  },

  // Get swap requests sent by current user
  getSentRequests: async (): Promise<SwapRequest[]> => {
    const response = await api.get('/swaps/sent');
    return response.data;
  },

  // Get swap requests received by current user
  getReceivedRequests: async (): Promise<SwapRequest[]> => {
    const response = await api.get('/swaps/received');
    return response.data;
  },
};

// Admin API functions
export const adminApi = {
  // Get all users (admin only)
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Get all swap requests (admin only)
  getAllSwapRequests: async (): Promise<SwapRequest[]> => {
    const response = await api.get('/admin/swaps');
    return response.data;
  },

  // Ban user (admin only)
  banUser: async (id: string): Promise<void> => {
    await api.post(`/admin/users/${id}/ban`);
  },

  // Unban user (admin only)
  unbanUser: async (id: string): Promise<void> => {
    await api.post(`/admin/users/${id}/unban`);
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },

  // Get platform statistics
  getStats: async (): Promise<{
    totalUsers: number;
    totalSwaps: number;
    activeSwaps: number;
    completedSwaps: number;
  }> => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};

// Utility functions
export const calculateMatchPercentage = (user1: User, user2: User): number => {
  const user1Offers = new Set(user1.skillsOffered.map(s => s.toLowerCase()));
  const user2Wants = new Set(user2.skillsWanted.map(s => s.toLowerCase()));
  const user2Offers = new Set(user2.skillsOffered.map(s => s.toLowerCase()));
  const user1Wants = new Set(user1.skillsWanted.map(s => s.toLowerCase()));

  const matchesUser1ToUser2 = [...user1Offers].filter(skill => user2Wants.has(skill)).length;
  const matchesUser2ToUser1 = [...user2Offers].filter(skill => user1Wants.has(skill)).length;

  const totalPossibleMatches = Math.max(user1Wants.size, user2Wants.size);
  const totalMatches = matchesUser1ToUser2 + matchesUser2ToUser1;

  return totalPossibleMatches > 0 ? Math.round((totalMatches / (totalPossibleMatches * 2)) * 100) : 0;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default api; 