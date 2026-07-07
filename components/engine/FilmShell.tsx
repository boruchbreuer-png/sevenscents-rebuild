'use client';

import { usePathname } from 'next/navigation';
import DawnEngine from './DawnEngine';
import Chrome from '@/components/chrome/Chrome';

/**
 * The film shell — the Dawn Engine, the single light, the film stock, and the
 * Instrument chrome. Present on the film; absent on non-production lab spikes
 * so a plate can be judged on its own, with no chrome or competing clock.
 */
export default function FilmShell() {
  const pathname = usePathname();
  if (pathname?.startsWith('/lab')) return null;
  return (
    <>
      <div className="light" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <DawnEngine />
      <Chrome />
    </>
  );
}
