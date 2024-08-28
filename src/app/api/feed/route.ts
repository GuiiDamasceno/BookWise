import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const rates = await prisma.rating.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
      include: {
        user: {
          select: {
            avatar_url: true,
            name: true,
          },
        },
        book: {
          select: {
            id: true,
            name: true,
            author: true,
            cover_url: true,
            summary: true,
            ratings: {
              select: {
                rate: true,
              },
            },
          },
        },
      },
    })

    return Response.json({ rates })
  } catch (error) {
    return Response.json(
      { message: 'Não foi possível carregar os livros' },
      { status: 400 },
    )
  }
}
