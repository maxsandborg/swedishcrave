import type { Metadata } from 'next';
import { Inter, Fredoka_One } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const fredokaOne = Fredoka_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
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
      <body className={`${inter.className} ${fredokaOne.variable} bg-sc-bg text-sc-text`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
