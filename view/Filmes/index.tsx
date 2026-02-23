'use client';

import { autoplay, CtaButton, Divider, Slide } from '@/component';
import { Rating } from 'primereact/rating';
import React, { Suspense } from 'react';
import text from '../../services/localization/pt.json';
import useIsMobile from '@/hooks/useIsMobile';

const Filmes = () => {
  const { isMobile, isLoading } = useIsMobile();
  return (
    <Suspense fallback="Carregando">
      <Slide options={{ loop: true }} plugins={[autoplay(2000)]}>
        <Slide.Track>
          {/* {mook.banner.map((item) => (
            <Slide.Item key={item.id}>
              <div className="relative max-w-490 m-auto">
                {isMobile ? (
                  <img
                    src={item.bannerMobile.src}
                    alt={item.bannerMobile.alt}
                    className="w-full h-screen object-cover"
                  />
                ) : (
                  <img
                    src={item.bannerDesktop.src}
                    alt={item.bannerDesktop.alt}
                    className="w-full h-screen 2xl:h-auto object-cover"
                  />
                )}
                <section className="absolute bottom-0 w-full text-center md:text-left mb-[20%] md:mb-[5%] px-10">
                  <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between">
                    <div className="flex flex-col gap-4 md:max-w-2xl">
                      <h2 className="text-4xl font-bold md:text-6xl">
                        {item.title}
                      </h2>
                      <div className="flex flex-col md:flex-row justify-center md:justify-normal gap-4 items-center">
                        <Rating
                          value={item.star}
                          cancel={false}
                          cancelIcon={''}
                          onIcon={
                            <i className="pi pi-star-fill text-amber-400"></i>
                          }
                          offIcon={
                            <i className="pi pi-star-fill text-white"></i>
                          }
                        />
                        <strong className="block text-center md:text-left font-bold text-lg">
                          {item.gender}
                        </strong>
                      </div>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <CtaButton href="/">{text.ctaCompra}</CtaButton>
                    </div>
                  </div>
                </section>
              </div>
            </Slide.Item>
          ))} */}
        </Slide.Track>
        <Slide.Arrows />
        <Slide.Dots />
      </Slide>

      {isMobile && <Divider />}
    </Suspense>
  );
};

export default Filmes;
