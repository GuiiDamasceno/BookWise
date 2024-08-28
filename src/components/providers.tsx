'use client'

import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { AuthProvider } from '../contexts/auth-provider'

interface ProvidersProps {
  children?: ReactNode
  session?: Session | null
}

export function Providers({ children, session }: ProvidersProps) {
  return <AuthProvider session={session}>{children}</AuthProvider>
}
