'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true, 
  adminOnly = false 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // Redirect to login if authentication is required but user is not logged in
        router.push('/login');
        return;
      }

      if (adminOnly && (!user || user.role !== 'admin')) {
        // Redirect to login if admin access is required but user is not admin
        router.push('/admin/login');
        return;
      }
    }
  }, [user, loading, requireAuth, adminOnly, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if authentication requirements are not met
  if (requireAuth && !user) {
    return null;
  }

  if (adminOnly && (!user || user.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 