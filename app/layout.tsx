import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/cursor'
import localFont from 'next/font/local'
import './ghost-content.css';


export const metadata: Metadata = {
  title: 'OUTPLAY - we write the rules you follow',
  description: 'Innovative branding, digital experiences, communication strategies, and event design for forward-thinking organizations. Breaking conventions with creative solutions that stand out.',
  icons: {
    icon: '/favicon.ico',
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" >
      <head>
      <script defer src="https://umami.outplay.cloud/script.js" data-website-id="1b732a89-fbdd-4925-ab77-1aa38357fc4f"></script>
      </head>
      <body className="bg-black text-white">
        {children}
        <Cursor />
      </body>
    </html>
  )
}