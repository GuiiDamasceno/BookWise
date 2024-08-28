import { BookCard } from '@/components/book-card'
import { TextButton } from '@/components/text-button'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Book } from './page'
import { api } from '@/lib/axios'
import Link from 'next/link'

async function getPopularBook(): Promise<
  { message?: string; books: Book[] } | undefined
> {
  try {
    const response = await api.get('/books/popular')

    const books = response.data

    return books
  } catch (error) {
    return {
      books: [],
      message: 'Não foi possível carregar os livros.',
    }
  }
}

export async function PopularBookList() {
  const data = await getPopularBook()

  return (
    <div className="flex flex-col col-span-4 md:col-span-3 m-8 p-2.5 md:m-3 md:mt-28 lg:m-8 lg:mt-28 mt-16">
      <div className="flex items-center justify-between mb-3 w-full gap-2">
        <span>Livros populares</span>
        <Link href="/explore">
          <TextButton>
            Ver mais <CaretRight />
          </TextButton>
        </Link>
      </div>
      {data?.books &&
        data?.books.map((book) => {
          return <BookCard key={book.id} {...book} />
        })}

      <div className="flex flex-col gap-5 mt-4"></div>
    </div>
  )
}
