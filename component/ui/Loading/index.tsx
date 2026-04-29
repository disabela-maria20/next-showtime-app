'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loading() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline();

    // 🔥 começa igual à saída da página
    tl.fromTo(
      el,
      {
        filter: 'blur(12px)',
        opacity: 0.6,
      },
      {
        filter: 'blur(12px)',
        opacity: 0.6,
        duration: 0.2,
      }
    );

    // 🔥 animação contínua leve (respiração)
    tl.to(el, {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <div className="loader" />
    </div>
  );
}
