import { useSlide } from '../Slide.context';

const Dots = () => {
  const { instanceRef, current, loaded } = useSlide();

  if (!loaded || !instanceRef.current) return null;

  const slides = instanceRef.current.track.details.slides.length;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {[...Array(slides).keys()].map((idx) => (
        <button
          key={idx}
          onClick={() => instanceRef.current.moveToIdx(idx)}
          title={`Go to slide ${idx + 1}`}
          aria-label={`Go to slide ${idx + 1}`}
          className={`h-2 rounded-full transition-all ${
            current === idx ? 'bg-white w-2' : 'bg-blue-600 w-2'
          }`}
        />
      ))}
    </div>
  );
};

export default Dots;
