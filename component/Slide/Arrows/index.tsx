import { useSlide } from '../Slide.context';

const Arrows = () => {
  const { instanceRef, loaded } = useSlide();

  if (!loaded || !instanceRef.current) return null;

  return (
    <>
      <button
        onClick={() => instanceRef.current.prev()}
        className="absolute left-0 bottom-0 z-20 p-1.5 pb-4">
        <img src="/img/icon/arrow-left.png" alt="" />
      </button>

      <button
        onClick={() => instanceRef.current.next()}
        className="absolute right-0 bottom-0 z-20 p-1.5 pb-4">
        <img src="/img/icon/arrow-right.png" alt="" />
      </button>
    </>
  );
};

export default Arrows;
