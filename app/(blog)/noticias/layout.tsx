import { Footer, Menu } from '@/component';
import React, { ReactNode } from 'react';

export default function NoticiasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
}
