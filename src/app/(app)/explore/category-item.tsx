'use client'

import { useCallback } from 'react'
import { CategoryProps } from './categories'
import {
  useSearchParams,
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation'

interface CategoryItemProps {
  categories: CategoryProps[]
}

export const createQueryString = (
  name: string,
  value: string | null | undefined,
  searchParams: ReadonlyURLSearchParams,
  pathName: string,
) => {
  const params = new URLSearchParams(searchParams.toString())
  if (!value) {
    params.delete(name)
  } else {
    params.set(name, value)
  }

  return pathName + '?' + params.toString()
}

export function CategoryItem({ categories }: CategoryItemProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const createQuery = useCallback(createQueryString, [searchParams])
  const currentCategory = searchParams.get('category')

  function handleSelectCategory(name: string) {
    const url = createQuery('category', name, searchParams, pathname)

    router.replace(url)
  }

  function handleListAllBooks() {
    const url = createQuery('category', null, searchParams, pathname)
    router.replace(url)
  }

  return (
    <>
      <button
        onClick={handleListAllBooks}
        className={
          currentCategory === null
            ? 'mb-4 border border-purple-400 rounded-full px-4 py-1 text-gray-100 bg-purple-400 hover:bg-purple-400 hover:border-purple-100 hover:text-gray-100'
            : 'mb-4 text-purple-400 bg-transparent border border-purple-400 rounded-full px-4 py-1 focus:text-gray-100 focus:bg-purple-400 hover:bg-purple-400 hover:border-purple-100 hover:text-gray-100'
        }
      >
        Tudo
      </button>
      {categories &&
        categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category.name)}
              className={
                currentCategory === category.name
                  ? 'mb-4 border border-purple-400 rounded-full px-4 py-1 text-gray-100 bg-purple-400 hover:bg-purple-400 hover:border-purple-100 hover:text-gray-100'
                  : 'mb-4 text-purple-400 bg-transparent border border-purple-400 rounded-full px-4 py-1 focus:text-gray-100 focus:bg-purple-400 hover:bg-purple-400 hover:border-purple-100 hover:text-gray-100'
              }
            >
              {category.name}
            </button>
          )
        })}{' '}
    </>
  )
}
