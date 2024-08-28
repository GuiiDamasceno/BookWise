import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  try {
    const query = searchParams.get('q')
    const userId = searchParams.get('userId')

    if (userId) {
      const ratings = await prisma.rating.findMany({
        where: {
          user_id: {
            contains: userId,
          },
          book: {
            name: {
              contains: query || '',
            },
          },
        },
        select: {
          book: {
            select: {
              id: true,
              name: true,
              cover_url: true,
              author: true,
            },
          },
          id: true,
          rate: true,
          description: true,
          created_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      })

      return Response.json({ ratings })
    }

    const ratings = await prisma.rating.findMany({
      where: {
        book: {
          name: {
            contains: query || '',
          },
        },
      },
      select: {
        book: {
          select: {
            id: true,
            name: true,
            cover_url: true,
            author: true,
          },
        },
        id: true,
        rate: true,
        description: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return Response.json({ ratings })
  } catch (error) {
    return Response.json(
      {
        message: 'Não foi possível buscar os livros avaliados',
      },
      { status: 400 },
    )
  }
}
