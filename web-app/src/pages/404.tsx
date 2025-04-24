// src/pages/404.tsx
import type { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="mb-4 text-2xl font-bold">404 - Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  );
};

// Use getServerSideProps to ensure server-side rendering
export async function getServerSideProps() {
  return {
    props: {}, // Will be passed to the page component as props
  };
}

export default Custom404;
