'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-3xl font-bold">Something went wrong!</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
        We&apos;re sorry, but something went wrong. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </main>
  );
} 