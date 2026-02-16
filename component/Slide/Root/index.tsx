'use client';

import { useKeenSlider, KeenSliderOptions } from 'keen-slider/react';
import { useState } from 'react';

import 'keen-slider/keen-slider.min.css';
import { SlideContext } from '../Slide.context';

type Props = {
  children: React.ReactNode;
  options?: KeenSliderOptions;
  plugins?: any[];
};

const Root = ({ children, options, plugins = [] }: Props) => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
        setCurrent(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      ...options,
    },
    plugins
  );

  return (
    <SlideContext.Provider value={{ sliderRef, instanceRef, current, loaded }}>
      <div className="relative">{children}</div>
    </SlideContext.Provider>
  );
};

export default Root;
