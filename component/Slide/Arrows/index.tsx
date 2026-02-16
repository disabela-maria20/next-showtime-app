import { useSlide } from '../Slide.context';

const Arrows = () => {
  const { instanceRef, loaded } = useSlide();

  if (!loaded || !instanceRef.current) return null;

  return (
    <>
      <button
        onClick={() => instanceRef.current.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                   bg-black/40 hover:bg-black/70
                   text-white w-10 h-10 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={() => instanceRef.current.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                   bg-black/40 hover:bg-black/70
                   text-white w-10 h-10 rounded-full"
      >
        ›
      </button>
    </>
  );
};

export default Arrows;
