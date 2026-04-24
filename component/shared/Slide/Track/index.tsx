import { CSSProperties } from 'react';
import { useSlide } from '../Slide.context';

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Track = ({ children, className, style }: Props) => {
  const { sliderRef } = useSlide();

  return (
    <div ref={sliderRef} className={`keen-slider ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Track;
