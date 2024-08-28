import { SearchInput } from '@/components/input'
import { RecentBook } from './recent-book'
import { UserListProfile } from '@/components/user-list-profile'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { BackButton } from './back-button'

import { Metadata } from 'next'

export interface User {
  name: string
  avatar_url: string
  created_at: string
}

export type UserRatingSearchParams = {
  q?: string
}

export type UserInfo = User & {
  createdAt: string
  evaluatedBooks: number
  authorsRead: number
  totalPagesRead: number
  userReadPages: string | null
  categoryMoreRead: string | null
}

interface ProfileProps {
  params: {
    id: string
  }
  searchParams: UserRatingSearchParams
}

export const metadata: Metadata = {
  title: 'Perfil',
}

export default async function Profile({ params, searchParams }: ProfileProps) {
  return (
    <div className="md:grid md:grid-cols-8 h-screen 2xl:mr-36 w-full">
      <Header />

      <div className="flex flex-col col-span-6 md:col-span-5 xl:col-span-6 md:m-8 m-4">
        <div className="flex flex-col items-start justify-start mt-10">
          <BackButton id={params.id} />

          <div className="mt-8 w-full">
            <SearchInput placeholder="Buscar livros" type="text">
              <MagnifyingGlass className="group-focus-within:text-teal-500 group-hover:text-cyan-500" />
            </SearchInput>
          </div>

          <div className="flex flex-col m-auto mt-8 md:hidden">
            <UserListProfile userId={params.id} />
          </div>

          <div className="pb-2">
            <RecentBook userId={params.id} searchParams={searchParams} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col col-span-4 md:col-span-3 xl:col-span-2 m-8 p-2.5 md:m-3 md:mt-24 lg:mt-24 mt-16">
        <UserListProfile userId={params.id} />
      </div>
    </div>
  )
}
