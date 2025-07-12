export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: string;
  location?: string;
  offeredSkills?: string[];
  wantedSkills?: string[];
  availability?: string[];
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  offeredSkills?: string[];
  wantedSkills?: string[];
  availability?: string[];
}

// Legacy interface for backward compatibility
export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  rating: number;
  totalRatings: number;
  isPublic: boolean;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  feedback?: string;
} 