'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, createContext } from 'react'

export interface AuthProviderProps {
  children?: ReactNode
  session?: Session | null
}

const SessionContext = createContext({})

export function AuthProvider({
  children,
  session,
}: Readonly<AuthProviderProps>) {
  return (
    <SessionProvider session={session}>
      <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
    </SessionProvider>
  )
}
