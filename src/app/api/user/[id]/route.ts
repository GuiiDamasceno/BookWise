import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        avatar_url: true,
        created_at: true,
      },
    })

    const userBooksRatings = await prisma.book.count({
      where: {
        ratings: {
          some: {
            user_id: id,
          },
        },
      },
    })

    const userBooksAuthor = await prisma.book.groupBy({
      by: ['author'],
      where: {
        ratings: {
          some: {
            user_id: id,
          },
        },
      },
      _sum: {
        total_pages: true,
      },
    })

    const totalPagesRead = userBooksAuthor.reduce((acc, author) => {
      if (author._sum === null || author._sum.total_pages === null) {
        return acc
      }
      return acc + author._sum.total_pages
    }, 0)

    const categoryMoreRead: { name: string | null }[] = await prisma.$queryRaw`
      SELECT c.name FROM categories c
      JOIN "CategoriesOnBooks" cb ON cb."category_id" = c.id
      JOIN books b ON b.id = cb.book_id
      JOIN ratings r ON r.book_id = b.id
      WHERE r.user_id = ${id}
      GROUP BY c.name
      ORDER BY COUNT(c.name) desc
      LIMIT 1;
    `

    const userInfo = {
      ...user,
      evaluatedBooks: userBooksRatings,
      authorsRead: userBooksAuthor.length,
      totalPagesRead,
      categoryMoreRead: categoryMoreRead[0]?.name || null,
    }

    return Response.json({ userInfo })
  } catch (error) {
    return Response.json(
      {
        message: 'Não foi possível encontrar as informações do usuário',
      },
      { status: 400 },
    )
  }
}
