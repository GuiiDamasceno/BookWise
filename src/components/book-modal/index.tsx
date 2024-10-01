import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog-books'

import { RatingProvider } from '@/contexts/rating'

import { BookDetails } from './book-details'
import { RatingButton } from '@/components/book-modal/rating-button'
import { RatingForm } from './rating-form/rating-form'
import { Comments } from '../comments'
import { ReactNode } from 'react'

interface BookModalProps {
  id: string
  children: ReactNode
}

export async function BookModal({ id, children }: BookModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <div className="h-screen 2xl:mr-36 w-full">
          <div className="flex flex-col max-w-[1000px] m-auto px-4">
            <BookDetails id={id} />

            {/* COMMENTS */}
            <RatingProvider>
              <div className="flex flex-col pb-4">
                <div className="flex items-center justify-between mt-10">
                  <span className="text-sm text-gray-200">Avaliações</span>
                  <RatingButton />
                </div>

                <RatingForm bookId={id} />

                <Comments id={id} />
              </div>
            </RatingProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
