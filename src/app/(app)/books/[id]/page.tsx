import { Comments } from '../../../../components/comments'
import { Header } from '@/components/header'
import { BookDetails } from './book-details'
import { RatingProvider } from '@/contexts/rating'
import { RatingButton } from './rating-button'
import { RatingForm } from './rating-form/rating-form'
import { BackButton } from './back-button'
import { Metadata } from 'next'
import { api } from '@/lib/axios'
import { Book } from '../../(home)/page'

interface BooksProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: BooksProps): Promise<Metadata> {
  const bookId = params.id

  const response = await api.get(`/books/${bookId}`)

  const data: { books: Book } = response.data

  return {
    title: data.books.name,
    description: data.books.summary,
  }
}

export default async function Books({ params }: BooksProps) {
  return (
    <div className="h-screen 2xl:mr-36 w-full">
      <Header />

      <div className="flex flex-col max-w-[1000px] m-auto px-4 md:px-6 lg:px-16 xl:px-auto">
        <BackButton />

        <BookDetails id={params.id} />

        {/* COMMENTS */}
        <RatingProvider>
          <div className="flex flex-col pb-4">
            <div className="flex items-center justify-between mt-10">
              <span className="text-sm text-gray-200">Avaliações</span>
              <RatingButton />
            </div>

            <RatingForm />

            <Comments id={params.id} />
          </div>
        </RatingProvider>
      </div>
    </div>
  )
}
