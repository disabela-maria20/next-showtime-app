'use client';

import { CtaButton, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import { Movie } from '@/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postfavoritesMovieId, getfavoritesMovie } from '@/services/api';
import { useState, useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';
import { translateError } from '@/lib/errors/error-map';

type FilmHeroProps = {
  movie: Movie;
  isMobile: boolean;
};

export function FilmHero({ movie, isMobile }: FilmHeroProps) {
  const [heart, setHeart] = useState(false);
  const msgs = useRef<Messages | null>(null);
  const queryClient = useQueryClient();

  // 🔹 GET favoritos
  const { data: listMovies = [] } = useQuery<Movie[]>({
    queryKey: ['listMovies'],
    queryFn: getfavoritesMovie,
  });

  // 🔹 sincroniza coração com API
  useEffect(() => {
    if (!movie.id || !listMovies.length) return;

    const exists = listMovies.some((m) => m.id === movie.id);
    setHeart(exists);
  }, [listMovies, movie.id]);

  // 🔹 mutation
  const mutation = useMutation({
    mutationFn: async () => {
      if (!movie.id) throw new Error('ID inválido');
      return await postfavoritesMovieId(movie.id);
    },

    onMutate: () => {
      setHeart((prev) => !prev);
    },

    onError: (error: any) => {
      setHeart((prev) => !prev);

      const message = translateError(
        error?.response?.data?.error || error?.error,
        error?.message
      );

      msgs.current?.clear();
      msgs.current?.show([
        {
          severity: 'error',
          summary: 'Erro',
          detail: message,
          life: 5000,
        },
      ]);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listMovies'] });
    },
  });

  return (
    <section
      className="relative max-w-490 m-auto w-full aspect-video bg-cover bg-center bg-no-repeat pt-44 md:pt-36 xl:h-screen flex items-center"
      style={{
        backgroundImage: `url(${
          isMobile ? movie.bannerMobile : movie.bannerDesktop
        })`,
      }}
    >
      <Messages ref={msgs} />

      <div className="container max-w-490 m-auto px-12">
        {/* MOBILE */}
        <div className="relative max-w-55 m-auto block md:hidden">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              mutation.mutate();
            }}
            className="cursor-pointer absolute top-0 left-0 bg-amber-400 text-black text-2xl w-8 h-8 flex items-center justify-center rounded-br-lg z-10"
          >
            {mutation.isPending ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : heart ? (
              <i className="pi pi-heart-fill"></i>
            ) : (
              <i className="pi pi-heart"></i>
            )}
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

        {/* DESKTOP */}
        <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between px-11 pb-10 md:px-0">
          <div className="flex flex-col gap-4 md:max-w-2xl mt-11 relative">
            {/* coração desktop */}

            <h2 className="text-4xl font-bold md:text-6xl">{movie.title}</h2>

            <div className="flex gap-4 items-center">
              <Rating
                value={4}
                cancel={false}
                cancelIcon={''}
                onIcon={<i className="pi pi-star-fill text-amber-400"></i>}
                offIcon={<i className="pi pi-star-fill text-white"></i>}
              />
              <strong className="font-bold text-lg">{movie.genre}</strong>
            </div>

            <p className="font-bold">{movie.director}</p>
            <p className="font-bold">{movie.cast}</p>
            <p>{movie.synopsis}</p>
          </div>

          <div className="hidden md:flex gap-5 md:items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                mutation.mutate();
              }}
              className="cursor-pointer text-white"
            >
              {mutation.isPending ? (
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: '1.5rem' }}
                ></i>
              ) : heart ? (
                <i
                  className="pi pi-heart-fill"
                  style={{ fontSize: '1.5rem' }}
                ></i>
              ) : (
                <i className="pi pi-heart" style={{ fontSize: '1.5rem' }}></i>
              )}
            </div>

            <CtaButton href="/">comprar ingressos</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
