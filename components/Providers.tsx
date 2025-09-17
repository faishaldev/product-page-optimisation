'use client';

import { ProgressProvider } from '@bprogress/next/app';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressProvider />
      {children}
    </>
  );
}
