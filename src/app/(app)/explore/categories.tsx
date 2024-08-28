import { api } from '@/lib/axios'
import { CategoryItem } from './category-item'

export interface CategoryProps {
  id: string
  name: string
}

async function getCategories(): Promise<
  { message?: string; category: CategoryProps[] } | undefined
> {
  try {
    const response = await api.get('/books/categories')

    const categories = response.data

    return categories
  } catch (error) {}
}

export async function Categories() {
  const data = await getCategories()

  return (
    <>
      {data && (
        <div className="flex gap-3 mt-8 overflow-x-scroll max-h-56">
          <CategoryItem categories={data.category} />
        </div>
      )}
    </>
  )
}
