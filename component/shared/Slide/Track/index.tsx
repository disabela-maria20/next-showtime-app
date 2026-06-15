import { CSSProperties } from 'react';
import { useSlide } from '../Slide.context';

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Track = ({ children, className, style }: Props) => {
  const { sliderRef, loaded } = useSlide();

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-neutral-800 rounded" />
      )}

      <div
        ref={sliderRef}
        className={`keen-slider transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};
export default Track;
