'use client';

import { CardMovie, CtaButton, Divider, Slide } from '@/component';
import { FullMovieProps } from '@/models';
import React from 'react';

interface AboutProps {
  listMovies: FullMovieProps;
}

const About = ({ listMovies }: AboutProps) => {
  return (
    <main className=" overflow-hidden">
      {/* Hero Banner */}
      <section className="relative bg-[url(/img/banner/banner-sobre.png)] bg-no-repeat bg-center bg-cover h-[calc(100vh-6px)] 2xl:h-154">
        <div className="absolute inset-0 w-full h-full flex items-end">
          <div className="container mx-auto px-6 lg:px-12 w-full">
            <div className="grid gap-8 md:grid-cols-2 items-center justify-items-center md:justify-items-normal pb-12 md:pb-20">
              <div className="max-w-120">
                <h1 className="text-5xl 2xl:text-7xl font-bold text-white mb-6 md:mb-14 text-center md:text-left">
                  Absolutamente tudo sobre o cinema, no mesmo portal.
                </h1>
                <p className="text-center md:text-left text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
              </div>
              <div className="md:place-self-end">
                <CtaButton>comprar ingressos</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Seção de favoritos e notícias */}
      <section className="bg-[#1C1C1C] py-7 md:py-20">
        <div className="max-w-304.5 m-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold md:text-3xl pb-4 text-white">
                Escolha seus favoritos
              </h2>
              <img
                src="/img/banner/banner-sobre-1.png"
                alt="Escolha seus favoritos"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold md:text-3xl pb-4 text-white">
                Acompanhe as notícias do mercado
              </h2>
              <img
                src="/img/banner/banner-sobre-2.png"
                alt="Acompanhe as notícias do mercado"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16 bg-[#1C1C1C] ">
        <section className=" py-7 md:py-20 relative mb-11">
          <div className="container m-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12 ">
              <div>
                <img
                  src="/img/banner/banner-sobre-gray.png"
                  alt="Banner gray"
                  className="rounded-lg shadow-xl md:absolute md:top-0 md:right-3/6 h-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Lorem ipsum dolor sit lormet adent ament
                </h1>
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-7 md:py-28 relative">
          <div className="container m-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center order-2 md:order-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Lorem ipsum dolor sit lormet adent ament
                </h1>
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="/img/banner/banner-sobre-gray.png"
                  alt="Banner gray"
                  className="rounded-lg shadow-xl md:absolute md:top-0 md:left-3/6 h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section
        className="pb-14 md:pb-20 bg-[#1C1C1C] overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-[#1C1C1C]-700/95 before:to-transparent
          before:pointer-events-none before:z-10"
      >
        <div className="container max-w-490 m-auto px-12">
          <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-12">
            TOP 10 BRASIL
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
              {listMovies.releases.map((item, i) => (
                <Slide.Item key={item.id}>
                  <CardMovie index={i} {...item} ranking={true} />
                </Slide.Item>
              ))}
            </Slide.Track>
          </Slide>
        </div>
      </section>
    </main>
  );
};

export default About;
