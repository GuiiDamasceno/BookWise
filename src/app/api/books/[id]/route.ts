import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    if (!book) {
      return Response.json({ message: 'Book not found' })
    }

    const categories = await prisma.categoriesOnBooks.findMany({
      where: {
        book_id: id,
      },
      select: {
        category: true,
      },
    })

    const rates = await prisma.rating.aggregate({
      _avg: {
        rate: true,
      },
      _count: {
        rate: true,
      },
      where: {
        book_id: id,
      },
    })

    const formatCategory = categories.map((item) => item.category)

    return Response.json({
      books: {
        ...book,
        categories: formatCategory,
        rate: rates._avg.rate,
        rates_count: rates._count.rate,
      },
    })
  } catch (error) {
    return Response.json({
      book: null,
      message: 'Não foi possível encontrar o livro',
    })
  }
}
