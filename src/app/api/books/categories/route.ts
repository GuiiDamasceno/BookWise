import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const category = await prisma.category.findMany({})

    return Response.json({ category })
  } catch (error) {
    return Response.json(
      { message: 'Não foi possível carregar as categorias' },
      { status: 404 },
    )
  }
}
