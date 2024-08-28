import type { Metadata } from 'next'
import { Nunito_Sans as NunitoSans } from 'next/font/google'
import '../globals.css'
import { AuthProvider } from '@/contexts/auth-provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  variable: '--font-nunito_sans',
  display: 'swap',
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
  const session = await getServerSession(authOptions)

  return (
    <html className={nunitoSans.variable} lang="pt-BR">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  )
}
