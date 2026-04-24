'use client';

import { useSlide } from '../Slide.context';

type Props = {
  center?: boolean;
};

const Dots = ({ center = true }: Props) => {
  const { instanceRef, current, loaded } = useSlide();

  if (!loaded || !instanceRef.current) return null;

  // Verificação de segurança - garantir que track e details existam
  const slidesCount = instanceRef.current.track?.details?.slides?.length ?? 0;

  if (slidesCount === 0) return null;

  const containerClass = center
    ? 'absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20'
    : 'flex gap-2 z-20';

  return (
    <div className={containerClass}>
      {Array.from({ length: slidesCount }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => instanceRef.current?.moveToIdx(idx)}
          title={`Go to slide ${idx + 1}`}
          aria-label={`Go to slide ${idx + 1}`}
          className={`h-2 w-2 rounded-full transition-all ${
            current === idx ? 'bg-white' : 'bg-blue-600'
          }`}
        />
      ))}
    </div>
  );
};

export default Dots;
