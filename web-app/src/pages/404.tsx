// src/pages/404.tsx
import type { NextPage } from 'next';

// Force dynamic rendering to avoid static optimization issues
export const dynamic = 'force-dynamic';
// Use the correct experimental edge runtime
export const runtime = 'experimental-edge';

const Custom404: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="mb-4 text-2xl font-bold">404 - Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  );
};

// Disable static page generation
export const getStaticProps = () => {
  return {
    props: {},
    revalidate: 0, // This ensures the page is always rendered at runtime
  };
};

export default Custom404;
