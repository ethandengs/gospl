import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | GOSPL Health Monitor',
  description: 'Sorry, we couldn\'t find the page you\'re looking for.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Could not find requested resource
        </p>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Return Home
        </a>
      </div>
    </div>
  );
} 