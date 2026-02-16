import { KeenSliderPlugin } from 'keen-slider/react';

export const autoplay = (interval = 3000): KeenSliderPlugin => {
  return (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => slider.next(), interval);
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true;
        clearNextTimeout();
      });

      slider.container.addEventListener('mouseout', () => {
        mouseOver = false;
        nextTimeout();
      });

      nextTimeout();
    });

    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);
  };
};
