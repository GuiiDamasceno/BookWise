import type { Metadata } from 'next'
import { Nunito_Sans as NunitoSans } from 'next/font/google'
import '../globals.css'

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  variable: '--font-nunito_sans',
})
export const metadata: Metadata = {
  title: {
    template: '%s | BookWise',
    default: 'BookWise',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={nunitoSans.variable} lang="pt-BR">
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  )
}
