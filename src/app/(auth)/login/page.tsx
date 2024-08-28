import Image from 'next/image'
import { GoogleLoginButton } from './google-login-button'
import { GithubLoginButton } from './github-login-button'
import { VisitorLoginButton } from './visitor-login-button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <div className="grid grid-cols-6 gap-10 p-6 h-screen w-full items-center justify-center">
      <div className="relative col-span-3 2xl:col-span-2 flex items-center justify-center w-full rounded-lg bg-scroll bg-my-bg-image bg-no-repeat bg-cover h-full">
        <Image
          src="/Logo.svg"
          width={128}
          height={128}
          alt=""
          className="w-72 z-50"
        />
        <div className="absolute z-10 opacity-60 bg-gradient-to-b from-blue-950 from-10% via-cyan-950 via-50% to-blue-950 to-90% h-full w-full rounded-lg" />
      </div>

      {/* CHOOSE LOGIN */}

      <div className="flex flex-col col-span-3 2xl:col-span-4 gap-5 justify-center m-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Boas vindas!</h1>
          <span className="text-gray-200">
            Faça seu login ou acesse como visitante.
          </span>
        </div>

        <GoogleLoginButton />

        <GithubLoginButton />

        <VisitorLoginButton />
      </div>
    </div>
  )
}
