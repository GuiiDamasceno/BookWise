'use client'

import { TextButton } from '@/components/text-button'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  function handleClickButton() {
    router.back()
  }

  return (
    <div className="mt-8">
      <TextButton onClick={handleClickButton}>
        <CaretLeft />
        Voltar
      </TextButton>
    </div>
  )
}
