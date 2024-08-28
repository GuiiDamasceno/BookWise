import { Header } from '@/components/header'
import { SearchInput } from '@/components/input'

import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { api } from '@/lib/axios'
import { BookCard, PopularBook } from '@/components/book-card'
import { Categories } from './categories'

import { Metadata } from 'next'

export type ExploreSearchParams = {
  category?: string
  q?: string
}

interface ExploreProps {
  searchParams: ExploreSearchParams
}

export const metadata: Metadata = {
  title: 'Explorar',
}

async function getPopularBook(
  searchParams?: ExploreSearchParams,
): Promise<{ message?: string; books: PopularBook[] } | undefined> {
  try {
    const params = new URLSearchParams(searchParams)
    const url = `/books?${params.toString()}`

    const response = await api.get(url)

    const books = response.data

    return books
  } catch (error) {
    return {
      books: [],
      message: 'Não foi possível carregar os livros.',
    }
  }
}

export default async function Explore({ searchParams }: ExploreProps) {
  const data = await getPopularBook(searchParams)

  return (
    // SIDEBAR
    <div className="md:grid md:grid-cols-8 h-screen 2xl:mr-36 w-full">
      <Header />

      <div className="flex flex-col col-span-8 md:m-8 m-4">
        <div className="flex mt-5 gap-10 items-center justify-between">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Binoculars className="text-cyan-500" size={32} /> Explorar
          </h1>

          <div className="w-full md:w-96">
            <SearchInput placeholder="Buscar livro ou autor" type="text">
              <MagnifyingGlass className="group-focus-within:text-teal-500 group-hover:text-cyan-500" />
            </SearchInput>
          </div>
        </div>

        <Categories />

        <div className="grid grid-cols-2 mt-8 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data?.books &&
            data.books.map((book) => {
              return <BookCard key={book.id} {...book} />
            })}
        </div>
      </div>
    </div>
  )
}
