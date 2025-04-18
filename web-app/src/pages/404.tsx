// src/pages/404.tsx
import React from 'react';
import Link from 'next/link';
import { buildLogger } from '@/lib/utils/build-logger';

buildLogger.info('[Pages404] module loaded');

export default function Custom404() {
  buildLogger.info('[Pages404] render start');
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
}

// Force this to always be server‑rendered (no static prerender)
export const getServerSideProps = async () => {
  return { props: {} };
};
