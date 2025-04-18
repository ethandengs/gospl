// src/app/not-found.tsx
export const dynamic = 'force-dynamic'; // always render at runtime
export const revalidate = 0;           // disable ISR

import React from 'react';
import Link from 'next/link';
import { buildLogger } from '@/lib/utils/build-logger';

// Log when this module is loaded
buildLogger.info('[NotFound] module initialized');

export default function NotFound() {
  buildLogger.info('[NotFound] render start');

  try {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="mb-4 text-3xl font-bold">404 – Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
          Oops! We can’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="text-base underline hover:no-underline focus:outline-none focus:ring"
        >
          ← Back to Home
        </Link>
      </main>
    );
  } catch (error) {
    buildLogger.error(
      '[NotFound] render error',
      error instanceof Error ? error : new Error(String(error))
    );
    throw error;
  }
}
