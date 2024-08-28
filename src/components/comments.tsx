import Image from 'next/image'
import { StartRating } from './stars-rating'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ptBR from 'dayjs/locale/pt-br'
import Link from 'next/link'

dayjs.extend(relativeTime)
dayjs.locale(ptBR)

interface CommentsProps {
  id: string
}

export interface Rating {
  id: string
  created_at: string
  description: string
  rate: number
  user: {
    id: string
    name: string
    avatar_url: string
  }
}

async function getComments(
  id: string,
): Promise<{ message?: string; ratings: Rating[] } | undefined> {
  try {
    const response = await api.get(`/books/${id}/ratings`)

    const data = response.data

    return data
  } catch (error) {
    return {
      ratings: [],
      message: 'Ocorreu um erro ao encontrar as avaliações',
    }
  }
}

export async function Comments({ id }: CommentsProps) {
  const data = await getComments(id)

  return (
    <>
      {data &&
        data.ratings.map((rating) => {
          return (
            <div key={rating.id} className="bg-gray-900 rounded-lg mt-4 p-6">
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <Link href={`/profile/${rating.user.id}`}>
                    {' '}
                    <Image
                      src={rating.user.avatar_url}
                      width={100}
                      height={100}
                      alt=""
                      className="rounded-full w-14 h-14 object-cover border-2 border-cyan-400 hover:border-cyan-300"
                    />
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/profile/${rating.user.id}`}
                      className="hover:text-gray-300"
                    >
                      <h1 className="font-bold">{rating.user.name}</h1>
                    </Link>
                    <span className="text-sm text-gray-400">
                      {dayjs(rating.created_at).fromNow()}
                    </span>
                  </div>
                </div>

                <span className="flex gap-2">
                  <StartRating rating={rating.rate} />
                </span>
              </div>

              <p className="mt-8">{rating.description}</p>
            </div>
          )
        })}
    </>
  )
}
