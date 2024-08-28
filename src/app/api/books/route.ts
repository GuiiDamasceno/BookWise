import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const categoryQuery = searchParams.get('category')
    const query = searchParams.get('q')

    if (categoryQuery) {
      const bookInfo = await prisma.book.findMany({
        where: {
          categories: {
            some: {
              category: {
                name: categoryQuery,
              },
            },
          },
        },
        select: {
          id: true,
          cover_url: true,
          name: true,
          author: true,
          ratings: true,
        },
      })

      const bookRating = await prisma.rating.groupBy({
        by: ['book_id'],
        _avg: {
          rate: true,
        },
      })

      const books = bookInfo.map((book) => {
        const bookAvgRating = bookRating.find(
          (avgRating) => avgRating.book_id === book.id,
        )
        const { ratings } = book

        return {
          ...book,
          ratings: ratings.length,
          rate: bookAvgRating?._avg.rate,
        }
      })

      return Response.json({ books })
    }

    if (query) {
      const bookInfo = await prisma.book.findMany({
        where: {
          OR: [
            { name: { contains: query || '' } },
            { author: { contains: query || '' } },
          ],
        },
        select: {
          id: true,
          cover_url: true,
          name: true,
          author: true,
          ratings: true,
        },
      })

      const bookRating = await prisma.rating.groupBy({
        by: ['book_id'],
        _avg: {
          rate: true,
        },
      })

      const books = bookInfo.map((book) => {
        const bookAvgRating = bookRating.find(
          (avgRating) => avgRating.book_id === book.id,
        )
        const { ratings } = book

        return {
          ...book,
          ratings: ratings.length,
          rate: bookAvgRating?._avg.rate,
        }
      })

      return Response.json({ books })
    }

    const books = await prisma.$queryRaw`
      SELECT
        b.id,
        b.cover_url,
        b.name,
        b.author,
        AVG(r.rate) as rate
      FROM
        books b
      JOIN
        ratings r ON b.id = r.book_id
      GROUP BY
        b.id
      ORDER BY
        name ASC
    `

    return Response.json({ books })
  } catch (error) {
    return Response.json(
      { message: 'Não foi possível encontrar os livros!' },
      { status: 403 },
    )
  }
}
