'use client';

import Link from 'next/link';
import { useTheme } from '@/components/providers/theme-provider';
import { Logo } from '@/components/ui/logo';
import { useEffect, useState } from 'react';
import { cn } from '@/components/ui/utils';

export default function LandingNavbar() {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle dark mode detection on client side
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);

    // Listen for system color scheme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled 
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
        : "bg-transparent"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Logo 
                darkMode={isDarkMode}
                className="h-10 w-auto group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                href="#features"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                )}
              >
                Features
              </Link>
              <Link
                href="#about"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                )}
              >
                About
              </Link>
              <Link
                href="#contact"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                )}
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-blue to-primary-teal hover:from-[#1B8FAD] hover:to-[#43A695] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue transition-all duration-200 hover:scale-105"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-blue to-primary-teal hover:from-[#1B8FAD] hover:to-[#43A695]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 