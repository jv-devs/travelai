import './globals.css'

import { Quicksand } from 'next/font/google'

import Footer from './components/Footer'
import Provider from './store/provider'

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
    <html lang="en" className={`${quicksand.variable} h-full font-sans`}>
      <body className="flex h-full min-h-screen flex-col bg-slate-300">
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
