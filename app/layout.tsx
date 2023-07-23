import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/profides/SupabaseProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Player App',
  description: 'A app to add, manage and organize your favorite songs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>
            {children}
          </Sidebar>
        </SupabaseProvider>
      </body>
   </html>
  )
}
