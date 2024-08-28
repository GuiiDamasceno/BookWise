'use client'

import { Modal } from '@/components/modal'
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
        <Modal>
          <TextButton>Avaliar</TextButton>
        </Modal>
      )}
    </>
  )
}
