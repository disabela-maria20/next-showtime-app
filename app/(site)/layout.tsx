import { Footer, Loading, Menu } from '@/component';
import React, { ReactNode, Suspense } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <Menu />
      {children}
      <Footer />
    </Suspense>
  );
}
