import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';

export const metadata: Metadata = {
  title: 'Radio Roulette',
  description: 'Welcome to radioroulette.uk! The game is simple - spin the wheel to discover a random radio station from around the UK. Who knows, it could become the new soundtrack to your day.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          { children }
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
