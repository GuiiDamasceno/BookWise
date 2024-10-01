import { Book } from '@/app/(app)/(home)/page'
import { StartRating } from '@/components/stars-rating'
import { api } from '@/lib/axios'
import { Bookmark, BookOpen } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

interface BookDetailsProps {
  id: string
}

async function getBookDetails(
  id: string,
): Promise<{ message?: string; books: Book | null }> {
  try {
    const response = await api.get(`/books/${id}`)

    const books = response.data

    return books
  } catch (error) {
    return {
      books: null,
      message: 'Livro não encontrado.',
    }
  }
}

export async function BookDetails({ id }: BookDetailsProps) {
  const { books } = await getBookDetails(id)

  if (!books) {
    return null
  }
  return (
    <div className="bg-gray-900 rounded-lg mt-8 p-6">
      {/* BOOK DETAILS */}
      <div className="flex gap-5 pb-10 border-b-2 border-gray-700">
        <Image src={`/${books.cover_url}`} width={150} height={150} alt="" />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{books?.name}</h1>
            <span className="text-gray-300">{books?.author}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex gap-2">
              <StartRating rating={books.rate} />
            </span>
            <span className="text-sm text-gray-400">
              {books.rates_count}{' '}
              {books.rates_count > 1 ? 'avaliações' : 'avaliação'}
            </span>
          </div>
        </div>
      </div>

      {/* CATEGORY AND PAGES */}
      <div className="mt-10 flex gap-20">
        <div className="flex gap-5 items-center">
          <Bookmark size={32} className="text-cyan-400" />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-400">Categoria</span>
            <span className="font-bold text-gray-200">
              {books.categories.map((category) => category.name).join(', ')}
            </span>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <BookOpen size={32} className="text-cyan-400" />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-400">Páginas</span>
            <span className="font-bold text-gray-200">{books.total_pages}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
