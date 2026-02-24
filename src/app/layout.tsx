import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TelcoComply — Australian Telecommunications Act Compliance',
    template: '%s | TelcoComply',
  },
  description:
    'A compliance reference tool for Australian telecommunications carriers, carriage service providers, and resellers operating under the Telecommunications Act 1997.',
  keywords: [
    'Telecommunications Act 1997',
    'ACMA compliance',
    'carrier licence Australia',
    'carriage service provider obligations',
    'Australian telecom regulation',
    'data retention obligations',
    'TCP Code compliance',
  ],
  authors: [{ name: 'TelcoComply' }],
  creator: 'TelcoComply',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'TelcoComply',
    title: 'TelcoComply — Australian Telecommunications Act Compliance',
    description:
      'Compliance guidance for Australian telecom carriers and service providers under the Telecommunications Act 1997.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TelcoComply — Australian Telecommunications Act Compliance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TelcoComply — Australian Telecommunications Act Compliance',
    description:
      'Compliance guidance for Australian telecom carriers and service providers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <DisclaimerBanner variant="top" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
