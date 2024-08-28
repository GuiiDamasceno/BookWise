import { ReviewedBookCard } from '@/components/reviewed-book-card'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr'
import { FeedItems } from './page'
import { api } from '@/lib/axios'

async function getFeedBooks(): Promise<FeedItems[] | undefined> {
  try {
    const response = await api.get('/feed')

    const feed = response.data

    return feed.rates
  } catch (error) {
    return []
  }
}

export async function FeedList() {
  const feed = await getFeedBooks()

  return (
    <div className="flex flex-col col-span-6 md:col-span-5 h-full md:m-8 m-4">
      <div className="flex flex-col items-start justify-start mt-5">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <ChartLineUp className="text-cyan-500" size={32} /> Livros
        </h1>
        <span className="mt-8">Avaliações mais recentes</span>
      </div>

      {feed &&
        feed.map((item) => {
          return <ReviewedBookCard key={item.id} {...item} />
        })}
    </div>
  )
}
