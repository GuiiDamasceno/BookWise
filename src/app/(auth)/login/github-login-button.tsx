'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export function GithubLoginButton() {
  async function handleSignIn() {
    await signIn('github', { callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex gap-5 items-center justify-start bg-blue-950 p-4 rounded-lg max-w-72 w-full"
    >
      <Image src="/github-icon.svg" width={30} height={30} alt="" />
      <span className="font-bold text-lg">Entrar com Github</span>
    </button>
  )
}
