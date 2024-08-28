import { Nunito_Sans as NunitoSans } from 'next/font/google'
import '../globals.css'
import { Sidebar } from '@/components/sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { AuthProvider } from '@/contexts/auth-provider'
import { Metadata } from 'next'

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
  const session = await getServerSession(authOptions)
  return (
    <html className={nunitoSans.variable} lang="pt-BR">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <div className="flex gap-2 w-full">
          <AuthProvider session={session}>
            <Sidebar />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
