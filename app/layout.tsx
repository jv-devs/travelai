import Footer from './components/Footer'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Providers from './store/provider'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
})

export const metadata = {
  title: 'AI Travel App',
  description: 'Created by JV Devs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} font-sans`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
