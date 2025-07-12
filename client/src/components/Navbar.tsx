'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { name: 'Home', href: '/' },
    ...(user ? [
      { name: 'Browse', href: '/browse' },
      { name: 'Swaps', href: '/swaps' },
    ] : []),
    ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  return (
    <nav className="bg-white top-0 z-50 sticky dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">SL</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SkillLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Profile Link - Moved to right */}
            {user && (
              <Link
                href="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === '/profile'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                Profile
              </Link>
            )}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Authentication Buttons */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Profile Link */}
              {user && (
                <Link
                  href="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === '/profile'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
              
              {/* Mobile Authentication */}
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
                    Welcome, {user.firstName}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 border-t border-gray-200 dark:border-gray-600 mt-2 pt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              
              <button
                onClick={toggleDarkMode}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 