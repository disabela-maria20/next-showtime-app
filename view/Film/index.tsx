'use client';

import { Image } from 'primereact/image';
import { autoplay, CtaButton, Divider, Slide, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import React, { Suspense } from 'react';
import text from '../../services/localization/pt.json';
import useIsMobile from '@/hooks/useIsMobile';
import mook from './mook.json';
import { Movie, Session } from '@/services/models';

type MovieProps = {
  movie: Movie;
  sessions: Session[];
};
const Film = ({ movie, sessions }: MovieProps) => {
  console.log(movie);

  const { isMobile, isLoading } = useIsMobile();
  return (
    <Suspense fallback="Carregando">
      <section
        className="relative max-w-490 m-auto w-full aspect-video bg-cover bg-center bg-no-repeat pt-44 md:pt-36 xl:h-screen flex items-center"
        style={{
          backgroundImage: `url(${
            isMobile ? movie.bannerMobile : movie.bannerDesktop
          })`,
        }}
      >
        <div className="md:container md:mx-auto">
          <div className="relative max-w-55 m-auto block md:hidden">
            <div
              className="
                absolute top-0 left-0 bg-amber-400 text-black font-bold text-2xl
                w-8 h-8 flex items-center justify-center rounded-br-lg z-10
                transition-all duration-500
                group-hover:scale-110
                group-active:scale-110
              "
            >
              <i className="pi pi-heart"></i>
            </div>
            <img
              src={movie.cover}
              alt={movie.title}
              className="w-full h-full object-cover "
            />
            <div className="pt-5">
              <StreamButton fullWidth variant="warning">
                Comprar ingresso
              </StreamButton>
            </div>
          </div>
          <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between px-11 pb-10 md:px-0">
            <div className="flex flex-col gap-4 md:max-w-2xl mt-11">
              <h2 className="text-4xl text-center md:text-left font-bold md:text-6xl">
                {mook.title}
              </h2>
              <div className="flex flex-row justify-center md:justify-normal gap-4 items-center">
                <Rating
                  value={mook.star}
                  cancel={false}
                  cancelIcon={''}
                  onIcon={<i className="pi pi-star-fill text-amber-400"></i>}
                  offIcon={<i className="pi pi-star-fill text-white"></i>}
                />
                <strong className="block text-center md:text-left font-bold text-lg">
                  {movie.genre}
                </strong>
              </div>
              <div className="md:text-[18px]">
                <h3>Direção: </h3>
                <p className="font-bold">{movie.director}</p>
              </div>
              <div className="md:text-[18px]">
                <h3>Elenco: </h3>
                <p className="font-bold ">{movie.cast}</p>
              </div>
              <p className="md:text-[18px]">{movie.synopsis}</p>
            </div>
            <div className="hidden md:block">
              <CtaButton href="/">{text.ctaCompra}</CtaButton>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section className="overflow-hidden">
        <div className="px-9 md:grid md:grid-cols-3 py-12 gap-9">
          <div>
            <h2 className="font-extrabold pb-3.5 text-[18px] md:text-3xl">
              assista ao trailer
            </h2>
            <div className="w-full">
              <iframe
                className="w-full aspect-video"
                src={`${movie.trailer}?enablejsapi=1&origin=diamondfilms.com.br`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-extrabold pb-3.5 text-[18px] md:text-3xl">
              galeria
            </h2>
            <Slide
              options={{
                loop: false,
                slides: { perView: 1, spacing: 12 },
                breakpoints: {
                  '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
                },
              }}
            >
              <Slide.Track
                style={{ overflow: isMobile ? 'visible' : 'hidden' }}
              >
                {movie?.images?.map((item, i) => (
                  <Slide.Item key={i}>
                    <Image
                      src={typeof item === 'string' ? item : item.url || ''}
                      className="w-full object-cover"
                      preview
                    />
                  </Slide.Item>
                ))}
              </Slide.Track>
              <Slide.Arrows />
            </Slide>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto"></div>
      </section>
    </Suspense>
  );
};

export default Film;
