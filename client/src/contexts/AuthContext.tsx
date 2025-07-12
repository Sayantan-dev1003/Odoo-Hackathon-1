'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, apiService } from '@/utils/api';

interface RegisterUserData {
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

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      // Try to get current user with the stored token
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const currentUser = await apiService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error getting current user:', error);
      // Token might be invalid, remove it
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterUserData) => {
    try {
      const response = await apiService.register(userData);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    apiService.logout();
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 