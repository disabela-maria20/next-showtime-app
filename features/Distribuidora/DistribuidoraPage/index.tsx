'use client';

import {
  autoplay,
  CardMovie,
  Divider,
  News,
  Slide,
  StreamButton,
} from '@/component';
import { useTruncate } from '@/hooks/useTruncate';
import { FullMovieProps, Movie, Noticia } from '@/models';
import { Rating } from 'primereact/rating';
import React, { useState, useTransition } from 'react';

interface DistribuidoraPageProps {
  noticias: Noticia[];
  movie: Movie[];
  comehere: FullMovieProps;
  namePage: string;
}

const DistribuidoraPage = ({
  noticias,
  movie,
  comehere,
  namePage,
}: DistribuidoraPageProps) => {
  const truncate = useTruncate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  return (
    <main>
      <section className="pt-14 md:pt-32 pb-10 md:pb-24 bg-[url(/img/banner/banner-azul.png)] bg-no-repeat bg-center bg-cover">
        <div className="container max-w-490 m-auto px-12">
          <h1 className="text-3xl font-bold mt-16 md:mt-0">
            <span className="underline capitalize">{namePage}</span>
          </h1>

          <Slide
            options={{
              loop: false,
              slides: { perView: 1, spacing: 12 },

              slideChanged(slider) {
                startTransition(() => {
                  setActiveIndex(slider.track.details.rel);
                });
              },
            }}
            plugins={[autoplay(3000)]}
          >
            <Slide.Track>
              {movie?.map((movie, index) => {
                const isActive = index === activeIndex;

                return (
                  <Slide.Item key={movie.id}>
                    <div className="relative w-full">
                      {/* Só renderiza conteúdo pesado quando ativo */}
                      {isActive && (
                        <div
                          className="
                            animate-fadeIn
                            grid gap-8 md:gap-16
                            mt-5 md:mt-10 lg:mt-16
                            lg:grid-cols-10
                            2xl:grid-cols-12
                          "
                        >
                          {/* TEXTO */}
                          <div className="lg:col-span-4 2xl:col-span-4">
                            <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between px-6 md:px-0 pb-10">
                              <div className="flex flex-col gap-4 md:max-w-xl mt-11">
                                <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold leading-tight text-center md:text-left">
                                  {movie.title}
                                </h2>

                                <div className="flex flex-row justify-center md:justify-start gap-4 items-center">
                                  <Rating
                                    value={4}
                                    cancel={false}
                                    cancelIcon={''}
                                    onIcon={
                                      <i className="pi pi-star-fill text-amber-400"></i>
                                    }
                                    offIcon={
                                      <i className="pi pi-star-fill text-white"></i>
                                    }
                                  />
                                  <strong className="text-lg font-bold">
                                    {movie.genre}
                                  </strong>
                                </div>

                                <div className="md:text-[16px]">
                                  <h3>Direção:</h3>
                                  <p className="font-bold">{movie.director}</p>
                                </div>

                                <div className="md:text-[16px]">
                                  <h3>Elenco:</h3>
                                  <p className="font-bold">{movie.cast}</p>
                                </div>

                                <p className="md:text-[16px] leading-relaxed">
                                  {truncate(movie.synopsis, 180)}
                                </p>
                                <div className="pt-5 2xl:hidden">
                                  <StreamButton fullWidth variant="amber">
                                    Comprar ingresso
                                  </StreamButton>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* BANNER */}
                          <div className="lg:col-span-6 2xl:col-span-6">
                            <img
                              src={movie.bannerDesktop}
                              alt="Banner do filme"
                              className="w-full h-full object-cover object-top rounded-lg"
                            />
                          </div>

                          {/* CAPA */}
                          <div className="hidden 2xl:block 2xl:col-span-2 relative">
                            <div className="absolute top-0 left-0 bg-amber-400 text-black font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-br-lg z-10 transition-all duration-500 group-hover:scale-110 group-active:scale-110">
                              <i className="pi pi-heart"></i>
                            </div>
                            <img
                              src={movie.cover}
                              alt={movie.title}
                              className="w-full object-cover"
                            />
                            <div className="pt-5">
                              <StreamButton fullWidth variant="amber">
                                Comprar ingresso
                              </StreamButton>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Slide.Item>
                );
              })}
            </Slide.Track>

            <Slide.Dots />
          </Slide>
        </div>
      </section>

      <Divider />
      <section
        className="py-14 md:py-32 overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-black/95 before:to-transparent
          before:pointer-events-none before:z-10"
      >
        <div className="container max-w-490 m-auto px-12">
          <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-12">
            VEM AÍ
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
              {comehere.releases.map((item, i) => (
                <Slide.Item key={item.id}>
                  <CardMovie index={i} {...item} ranking={true} />
                </Slide.Item>
              ))}
            </Slide.Track>
          </Slide>
        </div>
      </section>
      <section className="pb-14 md:pb-32">
        <div className="container max-w-490 m-auto px-12">
          <Slide options={{ loop: false, slides: { perView: 1, spacing: 12 } }}>
            <Slide.Track>
              {noticias.map((item) => (
                <Slide.Item key={item.id}>
                  <News.Grid className="grid-cols-1 md:grid-cols-2 gap-4 items-start md:items-center md:gap-16 xl:gap-36">
                    <div className="flex flex-col gap-7">
                      <News.Tag href={item.category.slug}>
                        {item.category.label}
                      </News.Tag>
                      <News.Title>{item.content.title}</News.Title>
                      <News.Description>
                        {item.content.description}
                      </News.Description>
                      <div className="flex flex-col items-center gap-3.5 md:flex-row md:items-center md:justify-between">
                        <StreamButton href={item.content.slug} size="lg">
                          Ver mais notícias
                        </StreamButton>
                        <Slide.Dots center={false} />
                      </div>
                    </div>
                    <div>
                      <News.Img
                        src={item.media.src}
                        alt={item.media.alt}
                        className="md:h-131"
                      />
                    </div>
                  </News.Grid>
                </Slide.Item>
              ))}
            </Slide.Track>
          </Slide>
        </div>
      </section>
      <section className="py-8 md:py-16 bg-neutral-800">
        <div className="container max-w-490 m-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch h-full">
            {noticias.slice(0, 2).map((item) => (
              <News.Grid
                className="grid grid-cols-1 md:grid-cols-2 gap-9 items-stretch h-full"
                key={item.id}
              >
                <div className="flex flex-col gap-2 justify-center">
                  <News.Tag href={item.category.slug}>
                    {item.category.label}
                  </News.Tag>
                  <News.Title size="md">{item.content.title}</News.Title>
                  <News.Description>
                    {truncate(item.content.description, 80)}
                  </News.Description>
                </div>
                <div className="h-full">
                  <News.Img
                    src={item.media.src}
                    alt={item.media.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </News.Grid>
            ))}
          </div>
          <div className="flex justify-center md:justify-end pt-6 md:pt-16">
            <button className="flex items-center gap-1.5 transition hover:text-blue-600 cursor-pointer">
              <i className="pi pi-plus"></i>
              <span>Ver mais</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DistribuidoraPage;
