const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  location?: string;
  role: 'user' | 'admin';
  offeredSkills: string[];
  wantedSkills: string[];
  availability: string[];
  rating: number;
  totalRatings: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  description?: string;
  category: string;
  popularity: number;
  isActive: boolean;
}

export interface Swap {
  _id: string;
  requesterId: User;
  providerId: User;
  requestedSkill: string;
  offeredSkill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message?: string;
  scheduledDate?: string;
  completedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rating {
  _id: string;
  swapId: string;
  raterId: User;
  ratedUserId: User;
  rating: number;
  comment?: string;
  tags: string[];
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

// Helper functions
export const calculateMatchPercentage = (user1: User, user2: User): number => {
  const user1Wanted = new Set(user1.wantedSkills.map(s => s.toLowerCase()));
  const user2Offered = new Set(user2.offeredSkills.map(s => s.toLowerCase()));
  
  const matches = [...user1Wanted].filter(skill => user2Offered.has(skill));
  return matches.length > 0 ? (matches.length / user1Wanted.size) * 100 : 0;
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Merge with any existing headers from options
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    console.log('Making API request:', { url, method: options.method || 'GET', headers });

    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('API response:', { status: response.status, statusText: response.statusText });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      console.error('API error response:', error);
      
      const errorMessage = error.message || `HTTP error! status: ${response.status}`;
      const customError = new Error(errorMessage);
      (customError as any).response = error;
      (customError as any).status = response.status;
      
      throw customError;
    }

    const result = await response.json();
    console.log('API success response:', result);
    return result;
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio?: string;
    location?: string;
    offeredSkills?: string[];
    wantedSkills?: string[];
    availability?: string[];
  }): Promise<{ user: User; message: string }> {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.token = response.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
      }
    }
    
    return response;
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // User endpoints
  async getCurrentUser(): Promise<User> {
    return this.request('/users/profile');
  }

  async updateProfile(userData: Partial<User>): Promise<{ user: User; message: string }> {
    return this.request('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async getAllUsers(): Promise<{ users: User[] }> {
    return this.request('/users');
  }

  async searchUsersBySkills(skills: string[]): Promise<{ users: User[] }> {
    return this.request('/users/search', {
      method: 'POST',
      body: JSON.stringify({ skills }),
    });
  }

  async getSmartMatches(): Promise<{ users: User[] }> {
    return this.request('/users/matches');
  }

  // Skill endpoints
  async getAllSkills(): Promise<{ skills: Skill[] }> {
    return this.request('/skills');
  }

  async getPopularSkills(): Promise<{ skills: Skill[] }> {
    return this.request('/skills/popular');
  }

  // Swap endpoints
  async createSwap(swapData: {
    providerId: string;
    requestedSkill: string;
    offeredSkill: string;
    message?: string;
    scheduledDate?: string;
  }): Promise<{ swap: Swap; message: string }> {
    return this.request('/swaps', {
      method: 'POST',
      body: JSON.stringify(swapData),
    });
  }

  async getMySwaps(): Promise<{ swaps: Swap[] }> {
    return this.request('/swaps/my-swaps');
  }

  async getAllSwaps(): Promise<{ swaps: Swap[] }> {
    return this.request('/swaps');
  }

  async acceptSwap(swapId: string): Promise<{ swap: Swap; message: string }> {
    return this.request(`/swaps/${swapId}/accept`, {
      method: 'PATCH',
    });
  }

  async rejectSwap(swapId: string): Promise<{ swap: Swap; message: string }> {
    return this.request(`/swaps/${swapId}/reject`, {
      method: 'PATCH',
    });
  }

  async completeSwap(swapId: string): Promise<{ swap: Swap; message: string }> {
    return this.request(`/swaps/${swapId}/complete`, {
      method: 'PATCH',
    });
  }

  async cancelSwap(swapId: string): Promise<{ swap: Swap; message: string }> {
    return this.request(`/swaps/${swapId}/cancel`, {
      method: 'PATCH',
    });
  }

  // Rating endpoints
  async createRating(ratingData: {
    swapId: string;
    ratedUserId: string;
    rating: number;
    comment?: string;
    tags?: string[];
  }): Promise<{ rating: Rating; message: string }> {
    return this.request('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  }

  async getUserRatings(userId: string): Promise<{ ratings: Rating[] }> {
    return this.request(`/ratings/user/${userId}`);
  }

  async getAverageRating(userId: string): Promise<{ average: { average: number; total: number } }> {
    return this.request(`/ratings/average/${userId}`);
  }

  // Legacy methods for backward compatibility
  async getUsers(): Promise<User[]> {
    const response = await this.getAllUsers();
    return response.users;
  }

  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio?: string;
    location?: string;
    offeredSkills?: string[];
    wantedSkills?: string[];
    availability?: string[];
  }): Promise<User> {
    const response = await this.register(userData);
    return response.user;
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    const response = await this.updateProfile(userData);
    return response.user;
  }

  async getSwapRequests(): Promise<Swap[]> {
    const response = await this.getMySwaps();
    return response.swaps;
  }

  async createSwapRequest(swapData: {
    providerId: string;
    requestedSkill: string;
    offeredSkill: string;
    message?: string;
    scheduledDate?: string;
  }): Promise<Swap> {
    const response = await this.createSwap(swapData);
    return response.swap;
  }

  async updateSwapRequest(swapId: string, updateData: Partial<Swap>): Promise<Swap> {
    const response = await this.request<{ swap: Swap }>(`/swaps/${swapId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
    return response.swap;
  }
}

export const apiService = new ApiService();

// Legacy exports for backward compatibility
export const userApi = apiService;
export const swapApi = apiService;
export const adminApi = apiService;