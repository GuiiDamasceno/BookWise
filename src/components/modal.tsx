import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
}

export function Modal({ children }: ModalProps) {
  async function handleGoogleSignIn() {
    await signIn('google', { callbackUrl: '/' })
  }

  async function handleGithubSignIn() {
    await signIn('github', { callbackUrl: '/' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>
            {' '}
            <span className="font-bold text-gray-100">
              Faça login para deixar sua avaliação!
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid justify-center items-center gap-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex gap-5 items-center mt-5 justify-start bg-blue-950 p-4 rounded-lg max-w-72 w-full hover:brightness-110"
            >
              <Image src="/google-icon.svg" width={30} height={30} alt="" />
              <span className="font-bold text-lg">Entrar com Google</span>
            </button>
          </div>
          <div className="grid justify-center items-center gap-4">
            <button
              onClick={handleGithubSignIn}
              className="flex gap-5 items-center justify-start bg-blue-950 p-4 rounded-lg max-w-72 w-full hover:brightness-110"
            >
              <Image src="/github-icon.svg" width={30} height={30} alt="" />
              <span className="font-bold text-lg">Entrar com Github</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
