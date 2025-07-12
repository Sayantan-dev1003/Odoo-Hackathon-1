import { User, SwapRequest } from './api';

// Demo users data
export const demoUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    skillsOffered: ['Web Development', 'React', 'TypeScript'],
    skillsWanted: ['UI/UX Design', 'Figma', 'Photography'],
    availability: 'available',
    matchPercentage: 85,
    isPublic: true,
    bio: 'Full-stack developer with 5 years of experience. Love building modern web applications and learning new technologies.',
    rating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-01T15:30:00Z',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    skillsOffered: ['Graphic Design', 'Photoshop', 'Illustrator'],
    skillsWanted: ['Web Development', 'JavaScript', 'CSS'],
    availability: 'busy',
    matchPercentage: 92,
    isPublic: true,
    bio: 'Creative designer specializing in brand identity and digital graphics. Always eager to learn new skills.',
    rating: 4.6,
    createdAt: '2024-02-20T14:00:00Z',
    updatedAt: '2024-12-01T12:15:00Z',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    skillsOffered: ['Photography', 'Lightroom', 'Portrait Photography'],
    skillsWanted: ['Video Editing', 'After Effects', 'Motion Graphics'],
    availability: 'available',
    matchPercentage: 78,
    isPublic: true,
    bio: 'Professional photographer with a passion for capturing moments. Looking to expand into video production.',
    rating: 4.9,
    createdAt: '2024-03-10T09:30:00Z',
    updatedAt: '2024-12-01T11:45:00Z',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    skillsOffered: ['Data Analysis', 'Python', 'Machine Learning'],
    skillsWanted: ['Public Speaking', 'Presentation Skills', 'Communication'],
    availability: 'available',
    matchPercentage: 65,
    isPublic: true,
    bio: 'Data scientist working with ML models. Want to improve my communication skills for better presentations.',
    rating: 4.7,
    createdAt: '2024-04-05T16:20:00Z',
    updatedAt: '2024-12-01T10:30:00Z',
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@example.com',
    skillsOffered: ['Digital Marketing', 'SEO', 'Content Writing'],
    skillsWanted: ['Graphic Design', 'Canva', 'Brand Design'],
    availability: 'offline',
    matchPercentage: 73,
    isPublic: true,
    bio: 'Marketing professional with expertise in digital campaigns. Looking to improve my design skills.',
    rating: 4.5,
    createdAt: '2024-05-12T13:45:00Z',
    updatedAt: '2024-12-01T09:15:00Z',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    skillsOffered: ['Music Production', 'Audio Engineering', 'Logic Pro'],
    skillsWanted: ['Video Production', 'Premiere Pro', 'Color Grading'],
    availability: 'available',
    matchPercentage: 56,
    isPublic: true,
    bio: 'Music producer and audio engineer. Interested in learning video production to create music videos.',
    rating: 4.4,
    createdAt: '2024-06-18T11:00:00Z',
    updatedAt: '2024-12-01T14:20:00Z',
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace@example.com',
    skillsOffered: ['Language Learning', 'Spanish', 'French'],
    skillsWanted: ['Cooking', 'Baking', 'Culinary Arts'],
    availability: 'busy',
    matchPercentage: 42,
    isPublic: true,
    bio: 'Multilingual teacher passionate about languages and cultures. Love to learn new culinary techniques.',
    rating: 4.8,
    createdAt: '2024-07-25T08:30:00Z',
    updatedAt: '2024-12-01T16:45:00Z',
  },
  {
    id: '8',
    name: 'Henry Garcia',
    email: 'henry@example.com',
    skillsOffered: ['Fitness Training', 'Yoga', 'Nutrition'],
    skillsWanted: ['Photography', 'Social Media', 'Content Creation'],
    availability: 'available',
    matchPercentage: 69,
    isPublic: true,
    bio: 'Certified fitness trainer and yoga instructor. Want to learn photography to better showcase my work.',
    rating: 4.6,
    createdAt: '2024-08-30T07:15:00Z',
    updatedAt: '2024-12-01T13:30:00Z',
  },
];

// Demo swap requests
export const demoSwapRequests: SwapRequest[] = [
  {
    id: 'swap-1',
    fromUserId: '1',
    toUserId: '2',
    fromUser: demoUsers[0],
    toUser: demoUsers[1],
    message: 'Hi Bob! I\'d love to learn graphic design from you. I can teach you React and modern web development techniques in return.',
    status: 'pending',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'swap-2',
    fromUserId: '3',
    toUserId: '1',
    fromUser: demoUsers[2],
    toUser: demoUsers[0],
    message: 'Hello Alice! I can help you with photography and Lightroom. Would you be interested in teaching me some TypeScript?',
    status: 'accepted',
    createdAt: '2024-11-28T14:30:00Z',
    updatedAt: '2024-11-29T09:15:00Z',
  },
  {
    id: 'swap-3',
    fromUserId: '4',
    toUserId: '7',
    fromUser: demoUsers[3],
    toUser: demoUsers[6],
    message: 'Hi Grace! I can teach you Python and data analysis. I\'d love to learn Spanish from you!',
    status: 'completed',
    createdAt: '2024-11-20T16:45:00Z',
    updatedAt: '2024-11-25T11:30:00Z',
    completedAt: '2024-11-25T11:30:00Z',
    rating: 5,
    feedback: 'Grace was an excellent teacher! Very patient and structured lessons.',
  },
  {
    id: 'swap-4',
    fromUserId: '5',
    toUserId: '2',
    fromUser: demoUsers[4],
    toUser: demoUsers[1],
    message: 'Hey Bob! I can help you with SEO and digital marketing. Could you teach me some graphic design basics?',
    status: 'accepted',
    createdAt: '2024-11-25T12:00:00Z',
    updatedAt: '2024-11-26T08:45:00Z',
  },
  {
    id: 'swap-5',
    fromUserId: '6',
    toUserId: '3',
    fromUser: demoUsers[5],
    toUser: demoUsers[2],
    message: 'Hi Carol! I\'d love to learn photography from you. I can teach you music production and audio engineering.',
    status: 'pending',
    createdAt: '2024-12-01T15:20:00Z',
    updatedAt: '2024-12-01T15:20:00Z',
  },
];

// Demo stats
export const demoStats = {
  totalUsers: 1247,
  totalSwaps: 2856,
  activeSwaps: 342,
  completedSwaps: 2184,
};

// Current user (for demo purposes)
export const currentUser: User = {
  id: 'current-user',
  name: 'John Doe',
  email: 'john@example.com',
  skillsOffered: ['JavaScript', 'Node.js', 'React'],
  skillsWanted: ['UI/UX Design', 'Figma', 'User Research'],
  availability: 'available',
  isPublic: true,
  bio: 'Full-stack developer passionate about creating great user experiences.',
  rating: 4.7,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-12-01T12:00:00Z',
};

// Helper function to simulate API delay
export const simulateDelay = (ms: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API functions for demo
export const mockApi = {
  getUsers: async (): Promise<User[]> => {
    await simulateDelay(800);
    return demoUsers;
  },

  getCurrentUser: async (): Promise<User> => {
    await simulateDelay(500);
    return currentUser;
  },

  getSwapRequests: async (): Promise<SwapRequest[]> => {
    await simulateDelay(600);
    return demoSwapRequests;
  },

  createSwapRequest: async (data: { toUserId: string; message: string }): Promise<SwapRequest> => {
    await simulateDelay(1000);
    const toUser = demoUsers.find(u => u.id === data.toUserId);
    if (!toUser) throw new Error('User not found');
    
    const newSwap: SwapRequest = {
      id: `swap-${Date.now()}`,
      fromUserId: currentUser.id,
      toUserId: data.toUserId,
      fromUser: currentUser,
      toUser: toUser,
      message: data.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newSwap;
  },

  updateSwapRequest: async (id: string, data: Partial<SwapRequest>): Promise<SwapRequest> => {
    await simulateDelay(800);
    const swap = demoSwapRequests.find(s => s.id === id);
    if (!swap) throw new Error('Swap not found');
    
    return {
      ...swap,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  },

  getStats: async () => {
    await simulateDelay(400);
    return demoStats;
  },
};

export default mockApi; 