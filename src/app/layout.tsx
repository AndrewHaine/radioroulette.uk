import type { Metadata } from 'next';
import { headers } from 'next/headers';
import StyledWrapper from './styles/StyledWrapper';
import Header from './components/Header/Header';
import { BodyContent } from './styles/Layout';
import Footer from './components/Footer/Footer';
import Fathom from './components/Fathom/Fathom';

export const metadata: Metadata = {
  title: 'Radio Roulette',
  description: 'Welcome to radioroulette.uk! The game is simple - spin the wheel to discover a random radio station from around the UK. Who knows, it could become the new soundtrack to your day.',
  openGraph: {
    type: 'website',
    'siteName': 'Radio Roulette',
    'url': 'https://radioroulette.uk',
    'images': [
      '/images/og-image.png'
    ],
  },
  twitter: {
    'card': 'summary',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const csrfToken = headers().get('X-CSRF-TOKEN') || 'missing';

  return (
    <html lang="en">
      <head>
        <meta name="csrf-token" content={csrfToken} />
      </head>
      <body>
        <Fathom />
        <StyledWrapper>
          <Header />
          <BodyContent>
            { children }
          </BodyContent>
          <Footer />
        </StyledWrapper>
      </body>
    </html>
  )
}
