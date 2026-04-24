'use client';

import { Slide } from '@/component';
import React, { useState } from 'react';
import mooks from '../../../services/mook/mook.json';

export const ReleasesSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section
      className="py-14 md:py-32 bg-neutral-700 overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-neutral-700/95 before:to-transparent
          before:pointer-events-none before:z-10"
    >
      <div className="container max-w-490 m-auto px-12">
        <Slide
          options={{
            loop: true,
            mode: 'free-snap',
            slides: { perView: 1, spacing: 20 },
            breakpoints: {
              '(min-width: 768px)': {
                slides: { perView: 'auto', spacing: 20 },
              },
            },
          }}
        >
          <Slide.Track style={{ overflow: 'visible' }}>
            {mooks.lancamentos.map((item) => (
              <Slide.Item key={item.id} className="md:w-auto!">
                <div className="bg-black rounded-lg overflow-hidden bg-radial-[ellipse_at_360%_360%] from-blue-600 to-black to-100% h-full">
                  <div
                    onClick={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                    className="
                          group relative
                          flex flex-row items-center justify-center
                          px-4 h-36 w-full
                          md:px-6 md:h-45 md:w-auto
                          transition-all duration-300 ease-out
                          cursor-pointer
                        "
                  >
                    {/* LOGO */}
                    <div className="shrink-0 flex items-center justify-center w-full md:w-28">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="max-w-20 max-h-16 md:max-w-28 md:max-h-24 object-contain"
                      />
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`
                            flex flex-col justify-center overflow-hidden
                            transition-all duration-300 ease-out
                            md:max-w-0 md:opacity-0
                            md:group-hover:max-w-xs md:group-hover:opacity-100
                            ${
                              openId === item.id
                                ? 'max-w-xs opacity-100'
                                : 'max-w-0 opacity-0'
                            }
                          `}
                    >
                      <div className="flex flex-col whitespace-nowrap pl-4 md:pl-6">
                        <span className="text-white text-xs md:text-sm font-semibold mb-2 md:mb-3">
                          próximos lançamentos
                        </span>
                        <div className="flex flex-col gap-1">
                          {item.list.map((movie) => (
                            <span
                              key={movie.id}
                              className="text-white/70 text-xs"
                            >
                              {movie.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Slide.Item>
            ))}
          </Slide.Track>
        </Slide>
      </div>
    </section>
  );
};
