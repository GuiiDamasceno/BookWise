import { PopularBookList } from './popular-books-list'
import { Header } from '@/components/header'
import { FeedList } from './feed-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Início',
}

export interface Book {
  id: string
  name: string
  cover_url: string
  author: string
  rate: number
  summary: string
  total_pages: number
  categories: {
    id: string
    name: string
  }[]
  rates_count: number
}

export interface FeedItems {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
  user: {
    avatar_url: string
    name: string
  }
  book: {
    id: string
    name: string
    author: string
    cover_url: string
    summary: string
    ratings: {
      rate: number
    }[]
  }
}

export default function Home() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-8 h-full 2xl:mr-36 w-full">
      <Header />

      <FeedList />

      <PopularBookList />
    </div>
  )
}
