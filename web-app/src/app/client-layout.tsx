'use client'

import { ReactNode } from 'react'
import { Providers } from './providers'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen">
      <Providers>
        {children}
      </Providers>
    </div>
  )
} 