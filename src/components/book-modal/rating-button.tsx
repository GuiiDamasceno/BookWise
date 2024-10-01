'use client'

import { LoginModal } from '@/components/login-modal'
import { TextButton } from '@/components/text-button'
import { useRating } from '@/contexts/rating'

export function RatingButton() {
  const { ratingFormVisible, setRatingFormVisible, availableForm } = useRating()

  async function handleRatingBook() {
    if (!ratingFormVisible) {
      setRatingFormVisible(true)
    }
  }

  return (
    <>
      {availableForm ? (
        <button
          onClick={handleRatingBook}
          className="text-purple-300 font-bold"
        >
          Avaliar
        </button>
      ) : (
        <LoginModal>
          <TextButton>Avaliar</TextButton>
        </LoginModal>
      )}
    </>
  )
}
