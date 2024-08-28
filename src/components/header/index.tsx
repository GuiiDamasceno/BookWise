import Image from 'next/image'
import { Binoculars, ChartLineUp } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { UserProfileButton } from './user-profile-button'
import { SignInButton } from './sign-in-button'

export function Header() {
  return (
    <header className="md:hidden h-16 p-6 shadow-cyan-900 shadow-md bg-gradient-to-r from-blue-950 from-10% via-cyan-950 via-50% to-blue-950">
      <div className="flex items-center justify-between">
        <Link href="/" className="hover:scale-105 transition-all">
          <Image src="/Logo.svg" width={100} height={100} alt="" />
        </Link>
        <div className="flex gap-2 items-center text-cyan-500">
          <Link href="/">
            <ChartLineUp
              size={24}
              className="hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer"
            />
          </Link>

          <Link href="/explore">
            <Binoculars
              size={24}
              className="hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer"
            />
          </Link>

          <UserProfileButton />
        </div>

        <SignInButton />
      </div>
    </header>
  )
}
