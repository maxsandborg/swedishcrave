import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | SwedishCrave',
    default: 'SwedishCrave — Your Guide to Swedish Candy',
  },
  description:
    'Discover authentic Swedish candy with detailed reviews, ratings, and where to buy in the US. Explore sweets from Marabou, BUBS, Malaco, and more.',
  keywords:
    'Swedish candy, Nordic sweets, candy reviews, where to buy Swedish candy, BUBS, Marabou, Malaco',
  authors: [{ name: 'SwedishCrave' }],
  creator: 'SwedishCrave',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.swedishcrave.com',
    siteName: 'SwedishCrave',
    title: 'SwedishCrave — Your Guide to Swedish Candy',
    description:
      'Discover authentic Swedish candy with detailed reviews, ratings, and where to buy in the US.',
    images: [
      {
        url: 'https://www.swedishcrave.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'SwedishCrave — Your Guide to Swedish Candy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwedishCrave — Your Guide to Swedish Candy',
    description: 'Discover authentic Swedish candy with detailed reviews, ratings, and where to buy in the US.',
    images: ['https://www.swedishcrave.com/images/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${dmSans.variable} ${spaceGrotesk.variable} bg-sc-bg text-sc-text`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
