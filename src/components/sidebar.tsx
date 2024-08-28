'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Binoculars, ChartLineUp, SignOut, User } from 'phosphor-react/dist'
import { Modal } from './modal'
import { SignIn } from '@phosphor-icons/react/dist/ssr'

export function Sidebar() {
  const pathname = usePathname()
  const session = useSession()

  async function handleSignOut() {
    await signOut({ callbackUrl: '/login' })
  }

  const isSignedIn = session.status === 'authenticated'

  return (
    <>
      <div className="hidden md:flex md:flex-col col-span-2 lg:col-span-3 max-h-screen">
        <div className="flex flex-col m-3 p-6 2xl:mr-12 2xl:ml-12 bg-gradient-to-b from-blue-950 from-10% via-cyan-950 via-50% to-blue-950 to-90% rounded-xl h-full items-center justify-between">
          <div>
            <Image src="/Logo.svg" width={128} height={32} alt="" />
            <div className="flex flex-col items-center mt-8">
              <div className="flex flex-col gap-4 items-start">
                {pathname === '/' ? (
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-100 border-l-4 border-cyan-500 px-3"
                  >
                    <ChartLineUp size={24} /> Início
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-100 border-l-4 border-transparent px-3"
                  >
                    <ChartLineUp size={24} /> Início
                  </Link>
                )}

                {pathname === '/explore' ? (
                  <Link
                    href="/explore"
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-100 px-3 border-l-4 border-cyan-500"
                  >
                    <Binoculars size={24} /> Explorar
                  </Link>
                ) : (
                  <Link
                    href="/explore"
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-100 px-3 border-l-4 border-transparent"
                  >
                    <Binoculars size={24} /> Explorar
                  </Link>
                )}

                {isSignedIn && (
                  <>
                    {pathname === `/profile/${session.data.user.id}` ? (
                      <Link
                        href={`/profile/${session.data.user.id}`}
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-100 px-3 border-l-4 border-cyan-500"
                      >
                        <User size={24} /> Perfil
                      </Link>
                    ) : (
                      <Link
                        href={`/profile/${session.data.user.id}`}
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-100 px-3 border-l-4 border-transparent"
                      >
                        <User size={24} /> Perfil
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleSignOut}
              className="flex flex-col lg:flex-row items-center justify-center gap-2 hover:text-gray-300 transition-all"
            >
              <Image
                src={session.data.user.avatar_url || '/avatar-placeholder.png'}
                width={30}
                height={30}
                alt=""
                className="rounded-full object-cover"
              />
              <p className="text-sm">{session.data.user?.name}</p>{' '}
              <SignOut
                size={24}
                className="text-red-500 hover:scale-105 transition-all"
              />
            </button>
          ) : (
            <Modal>
              <button className="flex flex-col lg:flex-row items-center justify-center gap-2 hover:text-gray-300 transition-all">
                <p className="text-nowrap">Fazer login</p>{' '}
                <SignIn
                  size={24}
                  className="text-cyan-500 hover:scale-105 transition-all"
                />
              </button>
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}
