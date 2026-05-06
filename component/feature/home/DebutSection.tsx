import { CardMovie, Slide } from '@/component';
import React from 'react';
import { DebutHomeProps } from '../types';

const DebutSection = ({ listMovie }: DebutHomeProps) => {
  return (
    <section
      className="pb-14 md:pb-32 overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-black/95 before:to-transparent
          before:pointer-events-none before:z-10"
    >
      <div className="container max-w-490 m-auto px-12">
        <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-12">
          ESTREIAS DA SEMANA
        </h2>
        <Slide
          options={{
            loop: false,
            slides: { perView: 2, spacing: 12 },
            breakpoints: {
              '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
              '(min-width: 768px)': { slides: { perView: 3, spacing: 16 } },
              '(min-width: 1024px)': {
                slides: { perView: 5, spacing: 20 },
              },
            },
          }}
        >
          <Slide.Track style={{ overflow: 'visible' }}>
            {listMovie.streaming.map((item, i) => (
              <Slide.Item key={item.id}>
                <CardMovie index={i} {...item} ranking={false} />
              </Slide.Item>
            ))}
          </Slide.Track>
        </Slide>
      </div>
    </section>
  );
};

export default DebutSection;
