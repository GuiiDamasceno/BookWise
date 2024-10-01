import Image from 'next/image'
import { StartRating } from '@/components/stars-rating'
import { Book } from '../../(home)/page'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ptBR from 'dayjs/locale/pt-br'
import { UserRatingSearchParams } from './page'
import { BookModal } from '@/components/book-modal/index'

dayjs.extend(relativeTime)
dayjs.locale(ptBR)

interface RecentBookProps {
  userId: string
  searchParams: UserRatingSearchParams
}

interface BookRating {
  book: Book
  id: string
  rate: number
  description: string
  created_at: string
}

async function getRecentBook(
  searchParams: UserRatingSearchParams,
  id: string,
): Promise<{ message?: string; ratings: BookRating[] }> {
  try {
    const params = new URLSearchParams(searchParams)
    const response = await api.get(`/ratings?userId=${id}&${params.toString()}`)

    const data = response.data

    return data
  } catch (error) {
    return {
      message: 'Não foi possível encontrar os livros avaliados.',
      ratings: [],
    }
  }
}

export async function RecentBook({ userId, searchParams }: RecentBookProps) {
  const { ratings } = await getRecentBook(searchParams, userId)

  return (
    <>
      {ratings.map((rating) => {
        return (
          <BookModal key={rating.id} id={rating.book.id}>
            <div className="mt-8 cursor-pointer">
              <span>{dayjs(rating.created_at).fromNow()}</span>
              <div className="bg-gray-900 p-3 rounded-lg mt-3 border-[3px] border-transparent hover:border-[3px] hover:border-blue-900">
                <div className="flex gap-4">
                  <Image
                    src={`/${rating.book.cover_url}`}
                    alt=""
                    width={150}
                    height={150}
                    className="object-cover w-[120px] h-[160px] rounded-md hover:scale-105 transition"
                  />
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg text-gray-100 md:max-w-[200px] lg:max-w-full hover:text-gray-300">
                        {rating.book.name}
                      </h1>
                      <span className="text-gray-400 text-sm">
                        {rating.book.author}
                      </span>
                    </div>
                    <span className="flex gap-2">
                      <StartRating rating={rating.rate} />
                    </span>
                  </div>
                </div>
                <p className="mt-8 text-gray-300 text-sm">
                  {rating.description}
                </p>
              </div>
            </div>
          </BookModal>
        )
      })}
    </>
  )
}
