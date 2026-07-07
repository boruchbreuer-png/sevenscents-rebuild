import type { Metadata } from 'next';
import localFont from 'next/font/local';
import FilmShell from '@/components/engine/FilmShell';
import './globals.css';

const voice = localFont({
  src: './fonts/fraunces-var-latin.woff2',
  variable: '--font-voice',
  weight: '300 600',
  display: 'swap',
});
const record = localFont({
  src: './fonts/instrument-sans-var-latin.woff2',
  variable: '--font-record',
  weight: '400 700',
  display: 'swap',
});
const instrument = localFont({
  src: './fonts/fragment-mono-latin.woff2',
  variable: '--font-instrument',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RITUAL — Tomorrow is already proving.',
  description:
    'We do not sell bread. We protect mornings. Forty loaves; then the oven rests.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${voice.variable} ${record.variable} ${instrument.variable}`}>
      <body>
        {/* the single light, the film stock, the Dawn Engine, the chrome —
            present on the film, absent on lab spikes */}
        <FilmShell />
        {children}
      </body>
    </html>
  );
}
