import { UserInfo } from '@/app/(app)/profile/[id]/page'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import Image from 'next/image'

import {
  Bookmark,
  BookOpen,
  Books,
  UserList,
} from '@phosphor-icons/react/dist/ssr'

interface UserListProfileProps {
  userId?: string
}

async function getUserInfo(
  id?: string,
): Promise<{ message?: string; userInfo?: UserInfo }> {
  try {
    const response = await api.get(`/user/${id}`)

    const data = response.data

    return data
  } catch (error) {
    return {
      message: 'Not Found',
    }
  }
}

export async function UserListProfile({ userId }: UserListProfileProps) {
  const { userInfo } = await getUserInfo(userId)

  if (!userInfo) {
    return null
  }

  const memberSinceYear = dayjs(userInfo.created_at).get('year')

  return (
    <div className="flex flex-col gap-4 mb-4 items-center justify-center md:border-l md:border-gray-800">
      <Image
        src={userInfo.avatar_url || '/avatar-placeholder.png'}
        alt=""
        width={72}
        height={72}
        className="rounded-full border-4 border-blue-400 w-20 h-20 object-cover"
      />

      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="font-bold text-xl text-center">{userInfo.name}</h1>
        <p className="text-sm text-gray-400">membro desde {memberSinceYear}</p>
      </div>

      <div className="bg-blue-400 w-8 border-4 border-blue-400 rounded-full md:mt-8 mt-2" />

      <div className="grid grid-cols-2 md:flex flex-col gap-5 items-start justify-center md:mt-8 mt-2">
        <div className="flex gap-5 items-center">
          <BookOpen size={32} className="text-cyan-300" />
          <div className="flex flex-col gap-1">
            <span className="font-bold">{userInfo.totalPagesRead}</span>
            <span className="text-sm text-gray-300">Páginas lidas</span>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <Books size={32} className="text-cyan-300" />
          <div className="flex flex-col gap-1">
            <span className="font-bold">{userInfo.evaluatedBooks}</span>
            <span className="text-sm text-gray-300">Livros avaliados</span>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <UserList size={32} className="text-cyan-300" />
          <div className="flex flex-col gap-1">
            <span className="font-bold">{userInfo.authorsRead}</span>
            <span className="text-sm text-gray-300">Autores lidos</span>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <Bookmark size={32} className="text-cyan-300" />
          <div className="flex flex-col gap-1">
            <span className="font-bold">{userInfo.categoryMoreRead}</span>
            <span className="text-sm text-gray-300">Categoria mais lida</span>
          </div>
        </div>
      </div>
    </div>
  )
}
