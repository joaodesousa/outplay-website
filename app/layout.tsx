import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/cursor'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'OUTPLAY - your storytelling partner',
  description: 'Transforming your work into stories that resonate',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" >
      <body className="bg-black text-white">
        {children}
        <Cursor />
      </body>
    </html>
  )
}