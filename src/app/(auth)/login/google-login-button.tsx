'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export function GoogleLoginButton() {
  async function handleSignIn() {
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex gap-5 items-center mt-5 justify-start bg-blue-950 p-4 rounded-lg max-w-72 w-full"
    >
      <Image src="/google-icon.svg" width={30} height={30} alt="" />
      <span className="font-bold text-lg">Entrar com Google</span>
    </button>
  )
}
