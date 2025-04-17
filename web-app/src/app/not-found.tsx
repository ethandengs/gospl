import Link from 'next/link'
import { Button } from '@/components/ui/button'

// TODO: Enhance this 404 page with:
// - Custom illustrations
// - Better error messaging
// - Analytics tracking
// - Suggested navigation links based on user history
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404 - Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href="/" className="inline-block">
          <Button>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
} 