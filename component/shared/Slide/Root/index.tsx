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
<<<<<<< HEAD
};

const Root = ({ children, options = {}, plugins = [] }: Props) => {
=======
  className?: string;
};

const Root = ({ children, options = {}, plugins = [], className }: Props) => {
>>>>>>> 574814ae7a2c85053049a50464e7574a316becb9
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      ...options,

<<<<<<< HEAD
=======
      // 👇 mantém suas funções internas + permite sobrescrever
>>>>>>> 574814ae7a2c85053049a50464e7574a316becb9
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
<<<<<<< HEAD
      <div className="relative">{children}</div>
=======
      <div className={`relative keen-slider ${className || ''}`}>
        {children}
      </div>
>>>>>>> 574814ae7a2c85053049a50464e7574a316becb9
    </SlideContext.Provider>
  );
};

export default Root;
