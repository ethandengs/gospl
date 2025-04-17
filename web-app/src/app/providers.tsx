'use client'

import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { ErrorBoundary } from "@/components/common"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="gospl-ui-theme"
    >
      <AuthProvider>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
} 