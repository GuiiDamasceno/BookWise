'use client'

import { User } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function UserProfileButton() {
  const session = useSession()

  return (
    <>
      {session.data && (
        <Link href={`/profile/${session.data.user.id}`}>
          <User
            size={24}
            className="hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer"
          />
        </Link>
      )}
    </>
  )
}
