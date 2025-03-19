import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/cursor'
import localFont from 'next/font/local'
import './ghost-content.css';


export const metadata: Metadata = {
  title: 'OUTPLAY - we write the rules you follow',
  description: 'Innovative branding, digital experiences, communication strategies, and event design for forward-thinking organizations. Breaking conventions with creative solutions that stand out.',
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