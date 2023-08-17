"use client";

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const TrackPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    load('XSHRUUND', {
      includedDomains: ['radioroulette.uk'],
    })
  });

  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense>
      <TrackPageView />
    </Suspense>
  );
}