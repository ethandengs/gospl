// web-app/src/app/not-found.tsx
export const dynamic = 'force-dynamic'; // always render at runtime, never prerender
export const revalidate = 0;           // no ISR for this route

import React from 'react';
import { buildLogger } from '@/lib/utils/build-logger';

// log module load (runs once, at startup)
buildLogger.info('[NotFound] module loaded');

export default function NotFound() {
  buildLogger.info('[NotFound] render start');

  try {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="mb-4 text-3xl font-bold">404 – Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
          Oops! We can’t find the page you’re looking for.
        </p>
        <a
          href="/"
          className="text-base underline hover:no-underline focus:outline-none focus:ring"
        >
          ← Back to Home
        </a>
      </main>
    );
  } catch (error) {
    buildLogger.error('[NotFound] render error', error instanceof Error ? error : new Error(String(error)));
    // re‑throw so Next.js still knows this page failed
    throw error;
  }
}
