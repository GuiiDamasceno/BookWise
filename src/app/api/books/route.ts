import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'
import { serverSession } from '@/lib/auth/get-server-session'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const categoryQuery = searchParams.get('category')
    const query = searchParams.get('q')

    const currentSessionId = searchParams.get('session')

    const sessionId = currentSessionId || (await serverSession())?.user.id

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

      let userBooksId: string[] = []

      if (sessionId) {
        const userBooks = await prisma.book.findMany({
          where: {
            ratings: {
              some: {
                user_id: String(sessionId),
              },
            },
          },
        })

        userBooksId = userBooks.map((book) => book.id)
      }

      const books = bookInfo.map((book) => {
        const bookAvgRating = bookRating.find(
          (avgRating) => avgRating.book_id === book.id,
        )
        const { ratings } = book

        return {
          ...book,
          ratings: ratings.length,
          rate: bookAvgRating?._avg.rate,
          alreadyRead: userBooksId.includes(book.id),
        }
      })

      return Response.json({ books })
    }

    if (query) {
      const bookInfo = await prisma.book.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
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

      let userBooksId: string[] = []

      if (sessionId) {
        const userBooks = await prisma.book.findMany({
          where: {
            ratings: {
              some: {
                user_id: String(sessionId),
              },
            },
          },
        })

        userBooksId = userBooks.map((book) => book.id)
      }

      const books = bookInfo.map((book) => {
        const bookAvgRating = bookRating.find(
          (avgRating) => avgRating.book_id === book.id,
        )
        const { ratings } = book

        return {
          ...book,
          ratings: ratings.length,
          rate: bookAvgRating?._avg.rate,
          alreadyRead: userBooksId.includes(book.id),
        }
      })

      return Response.json({ books })
    }

    const bookInfo = await prisma.book.findMany({
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

    let userBooksId: string[] = []

    if (sessionId) {
      const userBooks = await prisma.book.findMany({
        where: {
          ratings: {
            some: {
              user_id: String(sessionId),
            },
          },
        },
      })

      userBooksId = userBooks.map((book) => book.id)
    }

    const books = bookInfo.map((book) => {
      const bookAvgRating = bookRating.find(
        (avgRating) => avgRating.book_id === book.id,
      )

      return {
        ...book,
        rate: bookAvgRating?._avg.rate,
        alreadyRead: userBooksId.includes(book.id),
      }
    })

    return Response.json({ books })
  } catch (error) {
    return Response.json(
      { message: 'Não foi possível encontrar os livros!' },
      { status: 403 },
    )
  }
}
