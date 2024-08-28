'use client'

import { Check, X } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRating } from '@/contexts/rating'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { CreateRate } from './create-rate'
import { StarsEvaluation } from './stars-evaluation'

const writeCommentSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'O texto precisa ter no mínimo um caractere' })
    .max(450),
  rate: z.number().min(0).max(6),
})

type WriteCommentData = z.infer<typeof writeCommentSchema>

export function RatingForm() {
  const { ratingFormVisible: visible } = useRating()
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<WriteCommentData>({
    resolver: zodResolver(writeCommentSchema),
    defaultValues: {
      rate: 0,
    },
  })

  const params = useParams<{ id: string }>()
  const { setRatingFormVisible } = useRating()
  const session = useSession()

  if (!visible) {
    return null
  }

  const bookId = params.id

  async function handleSubmitComment(data: WriteCommentData) {
    if (session.data?.user.id) {
      const body = {
        ...data,
        userId: session?.data?.user.id,
        bookId,
      }

      const response = await CreateRate(body)

      if (response.success) {
        setRatingFormVisible(false)
      } else {
        setError('root', {
          message: response.message,
        })
      }
    }

    setError('root', {
      message: 'Algo deu errado',
    })
  }

  function handleCancelComment() {
    setRatingFormVisible(false)
    reset()
  }

  return (
    <div className="flex flex-col mt-4 bg-gray-900 rounded-lg p-6">
      <form onSubmit={handleSubmit(handleSubmitComment)}>
        <div className="flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <Image
              src={session.data?.user.avatar_url || '/avatar-placeholder.png'}
              width={60}
              height={60}
              alt=""
              className="rounded-full border-2 border-cyan-500"
            />
            <h1>{session.data?.user.name}</h1>
          </div>

          <Controller
            name="rate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <StarsEvaluation onChangeValue={onChange} value={value} />
            )}
          />
        </div>

        <textarea
          id="rate"
          className="bg-gray-800 w-full rounded-lg px-5 py-4 mt-6 h-40 resize-none outline-none focus:outline-teal-500 focus:shadow-md hover:outline-cyan-500"
          placeholder="Escreva sua avaliação"
          {...register('description')}
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}

        <div className="flex items-center justify-end gap-2 mt-2">
          <button
            onClick={handleCancelComment}
            disabled={isSubmitting}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-600"
          >
            <X className="text-purple-400" />
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-600"
          >
            <Check className="text-green-500" />
          </button>
        </div>
      </form>
    </div>
  )
}
