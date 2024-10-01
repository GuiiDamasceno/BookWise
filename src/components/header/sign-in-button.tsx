'use client'

import Image from 'next/image'
import { SignIn, SignOut } from 'phosphor-react'
import { signOut, useSession } from 'next-auth/react'
import { LoginModal } from '../login-modal'

export function SignInButton() {
  const session = useSession()

  const isSignedIn = session.status === 'authenticated'

  async function handleSignOut() {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      {isSignedIn ? (
        <button
          onClick={handleSignOut}
          className="flex lg:flex-row items-center justify-center gap-2 hover:scale-105 transition-all"
        >
          <Image
            src={
              String(session.data.user.avatar_url) || '/avatar-placeholder.png'
            }
            width={30}
            height={30}
            alt=""
            className="rounded-full object-cover"
          />
          <SignOut size={24} className="text-red-500" />
        </button>
      ) : (
        <LoginModal>
          <button className="flex lg:flex-row items-center justify-center gap-2 hover:scale-105 transition-all">
            <p className="text-nowrap">Fazer login</p>{' '}
            <SignIn size={24} className="text-cyan-500" />
          </button>
        </LoginModal>
      )}
    </>
  )
}
