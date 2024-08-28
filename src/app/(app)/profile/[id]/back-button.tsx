'use client'

import { TextButton } from '@/components/text-button'
import { CaretLeft, User } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  id: string
}

export function BackButton({ id }: BackButtonProps) {
  const router = useRouter()
  const session = useSession()

  return (
    <>
      {session.data?.user.id === `${id}` ? (
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <User className="text-cyan-500" size={24} /> Perfil
        </h1>
      ) : (
        <TextButton onClick={() => router.back()}>
          <CaretLeft />
          Voltar
        </TextButton>
      )}
    </>
  )
}
