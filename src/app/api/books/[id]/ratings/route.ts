import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const booksRatings = await prisma.rating.findMany({
      where: {
        book_id: id,
      },
      select: {
        id: true,
        created_at: true,
        description: true,
        rate: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return Response.json({ ratings: booksRatings })
  } catch (error) {
    return Response.json(
      {
        ratings: [],
        message: 'Não foi possível encontrar as avaliações do livro',
      },
      { status: 400 },
    )
  }
}
