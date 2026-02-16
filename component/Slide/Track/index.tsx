import { useSlide } from '../Slide.context';

type Props = {
  children?: React.ReactNode;
};

const Track = ({ children }: Props) => {
  const { sliderRef } = useSlide();

  return (
    <div ref={sliderRef} className="keen-slider">
      {children}
    </div>
  );
};

export default Track;
