import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | GOSPL Health Monitor',
  description: 'Sorry, we couldn\'t find the page you\'re looking for.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Return Home
      </Link>
    </main>
  );
} 