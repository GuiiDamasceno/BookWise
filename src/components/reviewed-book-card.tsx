import Image from 'next/image'
import { TextButton } from './text-button'
import { StartRating } from './stars-rating'
import { FeedItems } from '@/app/(app)/(home)/page'
import Link from 'next/link'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import ptBR from 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale(ptBR)

type ReviewedBooksCardProps = FeedItems

export function ReviewedBookCard(props: ReviewedBooksCardProps) {
  return (
    <div className="bg-gray-900 w-full p-2 rounded-lg mt-4 border-[3px] border-transparent hover:border-[3px] hover:border-blue-900">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Link
            href={`/profile/${props.user_id}`}
            className=" border-2 rounded-full border-transparent hover:border-blue-900"
          >
            <Image
              src={props.user.avatar_url}
              width={50}
              height={50}
              alt=""
              className="rounded-full object-cover w-12 h-12"
            />
          </Link>
          <div>
            <Link
              href={`/profile/${props.user_id}`}
              className="hover:text-gray-300"
            >
              <h1>{props.user.name}</h1>
            </Link>
            <span className="text-gray-400 text-sm">
              {dayjs(props.created_at).fromNow()}
            </span>
          </div>
        </div>

        <span className="flex mt-2 gap-2 items-center justify-center">
          <StartRating rating={props.rate} />
        </span>
      </div>

      <div className="flex gap-4 mt-4">
        <Image
          src={`/${props.book.cover_url}`}
          width={150}
          height={150}
          alt=""
          className="w-[150px] h-[150px] hover:scale-105"
        />

        <div className="flex flex-col gap-1">
          <div>
            <h1 className="font-bold line-clamp-2">{props.book.name}</h1>
            <span className="text-sm text-gray-400">{props.book.author}</span>
          </div>
          <div className="">
            <p className="text-sm text-gray-300 line-clamp-3">
              {props.book.summary}
            </p>
            <Link href={`/books/${props.book_id}`}>
              <TextButton>Ver mais</TextButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
