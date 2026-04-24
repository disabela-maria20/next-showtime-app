import { createContext, useContext } from 'react';

export const SlideContext = createContext<any>(null);

export const useSlide = () => useContext(SlideContext);
