import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Secure Phonebook',
  description: 'A highly secure, Apple-style designed phonebook',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="antialiased">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-blue-600/20 min-h-screen flex flex-col transition-colors duration-500`}>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" />
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}
