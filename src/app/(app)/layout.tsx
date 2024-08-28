import { Nunito_Sans as NunitoSans } from 'next/font/google'
import '../globals.css'
import { Sidebar } from '@/components/sidebar'

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  variable: '--font-nunito_sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={nunitoSans.variable} lang="pt-BR">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <div className="flex gap-2 w-full">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
