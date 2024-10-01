import Image from 'next/image'
import { StartRating } from './stars-rating'
import { Book } from '@/app/(app)/(home)/page'
import { BookModal } from './book-modal/index'

export type PopularBook = Omit<
  Book,
  'categories' | 'total_pages' | 'summary' | 'rates_count'
>

interface PopularBookCardProps extends PopularBook {
  onPress?: (id: string) => void
  rating?: number
}

export function BookCard(props: PopularBookCardProps) {
  return (
    <div className="relative bg-gray-900 w-full mb-2 p-3 rounded-lg border-[3px] border-transparent hover:border-[3px]  hover:border-blue-900">
      {props.alreadyRead && (
        <div className="absolute top-0 right-0 bg-cyan-950 text-teal-500 px-2 py-1 rounded-es-md rounded-se-md font-bold text-xs">
          LIDO
        </div>
      )}
      <BookModal id={props.id}>
        <div className="flex gap-4 cursor-pointer">
          <Image
            src={`/${props.cover_url}`}
            width={200}
            height={200}
            alt=""
            className="object-cover w-20 h-32 rounded-md"
          />

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold md:text-sm lg:text-base line-clamp-3 max-w-32">
                {props.name}
              </h1>
              <span className="text-sm text-gray-400">{props.author}</span>
            </div>
            <span>
              <StartRating rating={props.rate} />
            </span>
          </div>
        </div>
      </BookModal>
    </div>
  )
}
