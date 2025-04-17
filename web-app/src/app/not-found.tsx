'use client';

import Link from 'next/link';

// TODO: Enhance this 404 page with:
// - Custom illustrations
// - Better error messaging
// - Analytics tracking
// - Suggested navigation links based on user history
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Return Home</Link>
    </div>
  )
} 