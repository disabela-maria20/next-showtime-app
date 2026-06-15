'use client';

import { useSlide } from '../Slide.context';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const WhenLoaded = ({ children, fallback }: Props) => {
  const { loaded } = useSlide();

  if (!loaded) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default WhenLoaded;
