'use client';

import {
  useKeenSlider,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider/react';
import { useState, useTransition } from 'react';

import 'keen-slider/keen-slider.min.css';
import { SlideContext } from '../Slide.context';

type Props = {
  children: React.ReactNode;
  options?: KeenSliderOptions;
  plugins?: KeenSliderPlugin[];
};

const Root = ({ children, options = {}, plugins = [] }: Props) => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      ...options,

      created: (slider) => {
        setLoaded(true);
        options?.created?.(slider);
      },

      slideChanged: (slider) => {
        startTransition(() => {
          setCurrent(slider.track.details.rel);
        });
        options?.slideChanged?.(slider);
      },
    },
    plugins
  );

  return (
    <SlideContext.Provider
      value={{
        sliderRef,
        instanceRef,
        current,
        loaded,
        isPending,
      }}
    >
      <div className="relative">{children}</div>
    </SlideContext.Provider>
  );
};

export default Root;
