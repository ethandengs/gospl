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
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Page Not Found
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div>
          <Link href="/" passHref>
            <Button variant="default">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 