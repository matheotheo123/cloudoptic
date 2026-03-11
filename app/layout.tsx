import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'CloudOptic — Cut Your AI & Cloud Costs by 30%',
  description:
    'CloudOptic connects companies with elite FinOps engineers who reduce infrastructure spend without sacrificing performance. Get your free cloud cost audit today.',
  keywords: [
    'FinOps consulting',
    'cloud cost optimization',
    'AI infrastructure costs',
    'Kubernetes optimization',
    'AWS cost reduction',
    'GCP cost reduction',
    'Azure cost optimization',
    'cloud spend',
  ],
  metadataBase: new URL('https://cloudoptic.com'),
  authors: [{ name: 'CloudOptic' }],
  openGraph: {
    title: 'CloudOptic — Cut Your AI & Cloud Costs by 30%',
    description:
      'Elite FinOps engineers who reduce your cloud infrastructure spend without sacrificing performance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CloudOptic',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudOptic — Cut Your AI & Cloud Costs by 30%',
    description:
      'Elite FinOps engineers who reduce your cloud infrastructure spend without sacrificing performance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-white text-gray-900 antialiased font-sans">{children}</body>
    </html>
  )
}
