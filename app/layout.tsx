import type { Metadata } from 'next'
import './globals.css'
import ClientCursor from '@/components/ClientCursor'
import StoryblokProvider from '@/components/StoryblokProvider';
import LanguageProvider from '@/components/LanguageProvider';
import { SEO } from '@/components/SEO';

export const metadata: Metadata = {
  metadataBase: new URL('https://outplay.pt'),
  title: 'OUTPLAY - we write the rules you follow',
  description: 'Innovative branding, digital experiences, communication strategies, and event design for forward-thinking organizations. Breaking conventions with creative solutions that stand out.',
  keywords: 'OUTPLAY, branding, design, digital experiences, creative agency, communication strategies',
  authors: [{ name: 'OUTPLAY' }],
  creator: 'OUTPLAY',
  publisher: 'OUTPLAY',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://outplay.pt',
    siteName: 'OUTPLAY',
    title: 'OUTPLAY - we write the rules you follow',
    description: 'Innovative branding, digital experiences, communication strategies, and event design for forward-thinking organizations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OUTPLAY - we write the rules you follow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@outplaypt', // Update with your Twitter handle
    creator: '@outplaypt', // Update with your Twitter handle
    title: 'OUTPLAY - we write the rules you follow',
    description: 'Innovative branding, digital experiences, communication strategies, and event design for forward-thinking organizations.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Add an Apple touch icon
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest', // Add a web manifest file
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://outplay.pt',
    languages: {
      'en': 'https://outplay.pt/en',
      'pt-PT': 'https://outplay.pt',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <head>
        <script defer src="https://umami.outplay.pt/script.js" data-website-id="1b732a89-fbdd-4925-ab77-1aa38357fc4f"></script>
      </head>
      <body className="bg-black text-white">
        <LanguageProvider>
          <StoryblokProvider>
            {children}
            <SEO type="organization" />
          </StoryblokProvider>
        </LanguageProvider>
        <ClientCursor />
      </body>
    </html>
  )
}