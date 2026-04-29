'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    tl.fromTo(
      el,
      {
        filter: 'blur(8px)',
      },
      {
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div key={pathname} ref={containerRef} className="overflow-hidden">
      {children}
    </div>
  );
}
