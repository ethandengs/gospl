import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-xl font-semibold">404 - Page Not Found</h2>
      <p className="mt-4">The page you're looking for doesn't exist.</p>
    </div>
  )
} 