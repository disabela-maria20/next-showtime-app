'use client';

import { useEffect, useState, useTransition } from 'react';

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = event.matches;

      startTransition(() => {
        setIsMobile(matches);
      });
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    isMobile: !!isMobile,
    isReady: isMobile !== null,
  };
};

export default useIsMobile;
