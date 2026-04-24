// components/feature/movie/FilmHero.tsx
'use client';

import { CtaButton, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import text from '@/services/localization/pt.json';
import { Movie } from '@/models';

type FilmHeroProps = {
  movie: Movie;
  isMobile: boolean;
};

export function FilmHero({ movie, isMobile }: FilmHeroProps) {
  return (
    <section
      className="relative max-w-490 m-auto w-full aspect-video bg-cover bg-center bg-no-repeat pt-44 md:pt-36 xl:h-screen flex items-center"
      style={{
        backgroundImage: `url(${
          isMobile ? movie.bannerMobile : movie.bannerDesktop
        })`,
      }}
    >
      <div className="container max-w-490 m-auto px-12">
        {/* Mobile version */}
        <div className="relative max-w-55 m-auto block md:hidden">
          <div className="absolute top-0 left-0 bg-amber-400 text-black font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-br-lg z-10 transition-all duration-500 group-hover:scale-110 group-active:scale-110">
            <i className="pi pi-heart"></i>
          </div>
          <img
            src={movie.cover}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="pt-5">
            <StreamButton fullWidth variant="amber">
              Comprar ingresso
            </StreamButton>
          </div>
        </div>

        {/* Desktop version */}
        <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between px-11 pb-10 md:px-0">
          <div className="flex flex-col gap-4 md:max-w-2xl mt-11">
            <h2 className="text-4xl text-center md:text-left font-bold md:text-6xl">
              {movie.title}
            </h2>
            <div className="flex flex-row justify-center md:justify-normal gap-4 items-center">
              <Rating
                value={4}
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
              <p className="font-bold">{movie.cast}</p>
            </div>
            <p className="md:text-[18px]">{movie.synopsis}</p>
          </div>
          <div className="hidden md:block">
            <CtaButton href="/">{text.ctaCompra}</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
