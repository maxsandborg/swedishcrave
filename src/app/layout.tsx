import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.swedishcrave.com'),
  title: {
    template: '%s | SwedishCrave',
    default: 'SwedishCrave — Your Guide to Swedish Candy',
  },
  description:
    'Discover authentic Swedish candy, detailed reviews, ratings, and where to buy. Explore traditional Swedish sweets from iconic brands like Marabou, BUBS, Malaco, and more.',
  keywords:
    'Swedish candy, Nordic sweets, candy reviews, where to buy Swedish candy, BUBS, Marabou, Malaco',
  authors: [{ name: 'SwedishCrave' }],
  creator: 'SwedishCrave',
  verification: {
    google: 'hikPhRPcgvqY2ENJvp0XfHQPOPnPHejUiTRvcn7QzVc',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.swedishcrave.com',
    siteName: 'SwedishCrave',
    title: 'SwedishCrave — Your Guide to Swedish Candy',
    description:
      'Discover authentic Swedish candy, detailed reviews, ratings, and where to buy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwedishCrave — Your Guide to Swedish Candy',
    description: 'Discover authentic Swedish candy, detailed reviews, and ratings.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics — privacy-friendly, no cookie banner needed */}
        <Script
          defer
          src="https://plausible.io/js/pa-MjotRBSZhxz1rCPJgqlcx.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-sc-bg text-sc-text`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
