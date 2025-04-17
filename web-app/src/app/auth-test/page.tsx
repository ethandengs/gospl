'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

interface AuthStateEntry {
  timestamp: number
  state: string
}

export default function AuthTestPage() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authState, setAuthState] = useState<AuthStateEntry[]>([])

  // Log state changes
  useEffect(() => {
    setAuthState(prev => [...prev, {
      timestamp: Date.now(),
      state: `Loading: ${loading}, User: ${user?.email || 'null'}`
    }])
  }, [loading, user])

  const handleSignIn = async () => {
    try {
      await signIn(email, password)
      toast.success('Signed in successfully')
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error(`Failed to sign in: ${(error as Error).message}`)
    }
  }

  const handleSignUp = async () => {
    try {
      await signUp(email, password)
      toast.success('Signed up successfully')
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error(`Failed to sign up: ${(error as Error).message}`)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error(`Failed to sign out: ${(error as Error).message}`)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
        
        {/* Current State */}
        <div className="bg-secondary p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Current State:</h2>
          <p>Loading: {loading.toString()}</p>
          <p>User: {user?.email || 'Not signed in'}</p>
        </div>

        {/* Auth Form */}
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleSignIn}>Sign In</Button>
            <Button onClick={handleSignUp} variant="outline">Sign Up</Button>
            <Button onClick={handleSignOut} variant="destructive">Sign Out</Button>
          </div>
        </div>

        {/* State History */}
        <div className="mt-8">
          <h2 className="font-semibold mb-2">State History:</h2>
          <div className="bg-secondary p-4 rounded-lg max-h-40 overflow-y-auto">
            {authState.map((entry) => (
              <div key={entry.timestamp} className="text-sm">
                {entry.state}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 