'use client';

import { autoplay, CtaButton, Divider, Slide, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import React, { Suspense } from 'react';
import text from '../../services/localization/pt.json';
import useIsMobile from '@/hooks/useIsMobile';
import mook from './mook.json';

const Filmes = () => {
  const { isMobile, isLoading } = useIsMobile();
  return (
    <Suspense fallback="Carregando">
      <div
        className="relative max-w-490 m-auto w-full aspect-video bg-cover bg-center bg-no-repeat pt-44 md:pt-36 xl:h-screen"
        style={{
          backgroundImage: `url(${
            isMobile ? mook.bannerMobile : mook.bannerDesktop
          })`,
        }}
      >
        <section>
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
              src={mook.cover}
              alt={mook.title}
              className="w-full h-full object-cover "
            />
            <div className='pt-5'>
              <StreamButton fullWidth variant='warning'>Comprar ingresso</StreamButton>
            </div>
          </div>
          <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between px-11 pb-10">
            <div className="flex flex-col gap-4 md:max-w-2xl mt-11">
              <h2 className="text-4xl text-center md:text-left font-bold md:text-6xl">{mook.title}</h2>
              <div className="flex flex-row justify-center md:justify-normal gap-4 items-center">
                <Rating
                  value={mook.star}
                  cancel={false}
                  cancelIcon={''}
                  onIcon={<i className="pi pi-star-fill text-amber-400"></i>}
                  offIcon={<i className="pi pi-star-fill text-white"></i>}
                />
                <strong className="block text-center md:text-left font-bold text-lg">
                  {mook.genre}
                </strong>
              </div>
              <div>
                <h3>Direção: </h3>
                <p className='font-bold'>{mook.director}</p>
              </div>
              <div>
                <h3>Elenco: </h3>
                <p className='font-bold'>{mook.cast}</p>
              </div>
              <p className='md:text-xl'>{mook.synopsis}</p>
            </div>
            <div className='hidden md:block'>
              <CtaButton href="/">{text.ctaCompra}</CtaButton>
            </div>
          </div>
        </section>
      </div>
      <Divider />
      
    </Suspense>
  );
};

export default Filmes;
