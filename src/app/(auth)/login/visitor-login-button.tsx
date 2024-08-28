'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function VisitorLoginButton() {
  const router = useRouter()
  const { data, status } = useSession()

  const isAuthenticated = status === 'authenticated'

  function handleLoginAsVisitor() {
    router.push('/')
  }

  return (
    <button
      onClick={handleLoginAsVisitor}
      className="flex gap-5 items-center justify-start bg-blue-950 p-4 rounded-lg max-w-72 w-full"
    >
      <Image src="/visitor-icon.svg" width={30} height={30} alt="" />
      <span className="font-bold text-lg">
        Entrar como {!isAuthenticated ? 'visitante' : `${data.user.name}`}
      </span>
    </button>
  )
}
