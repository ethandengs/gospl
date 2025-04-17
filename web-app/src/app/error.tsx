'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <Button
          variant="default"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </main>
  )
} 