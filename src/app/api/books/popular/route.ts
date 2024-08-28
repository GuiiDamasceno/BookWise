import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const popularBooks = await prisma.book.findMany({
      take: 5,
      select: {
        id: true,
        cover_url: true,
        name: true,
        author: true,
      },
    })

    const bookRating = await prisma.rating.groupBy({
      by: ['book_id'],
      _avg: {
        rate: true,
      },
    })

    const books = popularBooks.map((book) => {
      const bookAvgRating = bookRating.find(
        (avgRating) => avgRating.book_id === book.id,
      )

      return {
        ...book,
        rate: bookAvgRating?._avg.rate,
      }
    })

    return Response.json({ books })
  } catch (error) {
    return Response.json(
      {
        message: 'Não foi possível encontrar os livros',
      },
      { status: 400 },
    )
  }
}
