import Footer from './components/Footer'
import { Quicksand } from 'next/font/google'
import './globals.css'

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
        {children}
        <Footer />
      </body>
    </html>
  )
}
