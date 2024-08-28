'use server'

import { serverSession } from '@/lib/auth/get-server-session'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
// import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const createRateSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  rate: z.number().min(0).max(6),
  description: z.string(),
})

type CreateRateData = z.infer<typeof createRateSchema>

type CreateRateResponse = {
  success: boolean
  message?: string
}

export async function CreateRate(
  data: CreateRateData,
): Promise<CreateRateResponse> {
  const session = await serverSession()

  if (!session) {
    return { success: false, message: 'Not authenticated' }
  }

  try {
    const { bookId, description, rate, userId } = createRateSchema.parse(data)

    await prisma.rating.create({
      data: {
        book_id: bookId,
        user_id: userId,
        rate,
        description,
      },
    })

    revalidatePath('/home')

    return { success: true, message: 'Avaliação feita!' }
  } catch (error) {
    return { success: false, message: 'Erro ao criar avaliação' }
  }
}
