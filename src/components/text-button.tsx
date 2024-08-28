import { ReactNode } from 'react'

interface TextButtonProps {
  children: ReactNode
  onClick?: () => void
}

export function TextButton({ children, ...props }: TextButtonProps) {
  return (
    <button
      {...props}
      className="flex gap-1 items-center justify-center text-purple-300 hover:text-purple-400"
    >
      {children}
    </button>
  )
}
