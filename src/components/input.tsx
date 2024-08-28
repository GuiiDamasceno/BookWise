'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface SearchInputProps {
  children: ReactNode
  placeholder: string
  value?: string
  type: string
}

const searchInputSchema = z.object({
  query: z.string().min(1),
})

type SearchInputData = z.infer<typeof searchInputSchema>

export const SearchInput = ({ children, type, ...rest }: SearchInputProps) => {
  const { register, watch } = useForm<SearchInputData>({
    resolver: zodResolver(searchInputSchema),
  })
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const subscription = watch((value) =>
      router.replace(pathname + '?' + `q=${value.query}`),
    )
    return () => subscription.unsubscribe()
  }, [watch, router, pathname])

  return (
    <form className="group flex items-center h-12 rounded-md border border-blue-950 hover:border-cyan-500 focus-within:border-teal-500 transition-all bg-transparent px-3">
      <input
        className="bg-transparent text-sm text-gray-400 w-full outline-none"
        type={type}
        {...register('query')}
        {...rest}
      />
      {children}
    </form>
  )
}
