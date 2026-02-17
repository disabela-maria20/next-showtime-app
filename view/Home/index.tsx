'use client';
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';
import mook from './mook.json';
import { autoplay, CardMovie, CtaButton, Divider, Slide } from '@/component';
import { Rating } from 'primereact/rating';
import text from '../../services/localization/pt.json';
import Link from 'next/link';
const Home = () => {
  const { isMobile, isLoading } = useIsMobile();
  return (
    <main>
      <section>
        {/* {isMobile ? (
          <img
            src={mook.bannerMobile.src}
            alt={mook.bannerMobile.alt}
            className="w-full"
          />
        ) : (
          <img
            src={mook.bannerDesktop.src}
            alt={mook.bannerDesktop.alt}
            className="w-full"
          />
        )} */}
      </section>

      <Slide options={{ loop: true }} plugins={[autoplay(2000)]}>
        <Slide.Track>
          {mook.banner.map((item) => (
            <Slide.Item key={item.id}>
              <div className="relative max-w-360 m-auto ">
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
                      <CtaButton href="/">comprar ingressos</CtaButton>
                    </div>
                  </div>
                </section>
              </div>
            </Slide.Item>
          ))}
        </Slide.Track>

        <Slide.Arrows />
        <Slide.Dots />
      </Slide>
      {isMobile && <Divider />}
      <section className="py-14 md:py-32 overflow-hidden">
        <div className="container px-12 ">
          <h2 className="text-2xl md:text-5xl 2xl:text-6xl font-bold mb-6 md:mb-12">
            {text.secao2}
          </h2>
          <Slide
            options={{
              loop: false,
              slides: {
                perView: 2,
                spacing: 12,
              },
              breakpoints: {
                '(min-width: 768px)': {
                  slides: { perView: 3, spacing: 16 },
                },
                '(min-width: 1024px)': {
                  slides: { perView: 5, spacing: 20 },
                },
              },
            }}
          >
            <Slide.Track style={{ overflow: 'visible' }}>
              {mook.estreias.map((item) => (
                <Slide.Item key={item.id}>
                  <CardMovie
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    href="/"
                  />
                </Slide.Item>
              ))}
            </Slide.Track>

            {/* <Slide.Arrows />
            <Slide.Dots /> */}
          </Slide>
        </div>
      </section>
    </main>
  );
};

export default Home;
