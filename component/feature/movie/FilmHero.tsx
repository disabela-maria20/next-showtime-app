'use client';

import { CtaButton, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import { Movie } from '@/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postfavoritesMovieId, getfavoritesMovie } from '@/services/api';
import { useState, useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { translateError } from '@/lib/errors/error-map';

type FilmHeroProps = {
  movie: Movie;
  isMobile: boolean;
};

export function FilmHero({ movie, isMobile }: FilmHeroProps) {
  const [heart, setHeart] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const queryClient = useQueryClient();

  // 🔹 GET favoritos
  const { data: listMovies = [] } = useQuery<Movie[]>({
    queryKey: ['listMovies'],
    queryFn: getfavoritesMovie,
    retry: false, // Não tentar novamente em caso de erro 401
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

      // Verifica se é erro de não autenticado (401)
      setShowLoginDialog(true);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listMovies'] });
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate();
  };

  const handleLoginRedirect = () => {
    setShowLoginDialog(false);
    // Redireciona para página de login
    window.location.href = '/login';
    // Ou se estiver usando Next.js navigation:
    // router.push('/login');
  };

  return (
    <section
      className="relative max-w-490 m-auto w-full aspect-video bg-cover bg-center bg-no-repeat pt-44 md:pt-36 xl:h-screen flex items-center"
      style={{
        backgroundImage: `url(${
          isMobile ? movie.bannerMobile : movie.bannerDesktop
        })`,
      }}
    >
      {/* Dialog de Login */}
      <Dialog
        header="Faça login para favoriatar"
        visible={showLoginDialog}
        style={{ width: '450px' }}
        modal
        onHide={() => setShowLoginDialog(false)}
        pt={{
          header: () => {
            return '!text-white !bg-neutral-800  drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"';
          },
          content: () => {
            return '!text-white !bg-neutral-800  opacity-[0.99] drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"';
          },
          footer: () => {
            return '!text-white !bg-neutral-800   drop-shadow-[0px_3px_12px_rgba(0,0,0,0.15)]"';
          },
        }}
        footer={
          <div className="flex items-center justify-center gap-2">
            <StreamButton
              onClick={() => setShowLoginDialog(false)}
              href="/entrar"
              className="p-button-text"
            >
              Entrar
            </StreamButton>
            <StreamButton href="/cadastro" variant="blue-inverted">
              Quero criar uma conta
            </StreamButton>
          </div>
        }
      >
        <div className="flex flex-col align-items-center p-4 text-center">
          <i
            className="pi pi-heart-fill"
            style={{ fontSize: '3rem', color: '#fbbf24', marginBottom: '1rem' }}
          ></i>
          <h3 className="text-xl font-bold mb-3">
            Para favoritar, você precisa estar logado!
          </h3>
          <p className="text-gray-600">
            Faça login na sua conta para adicionar este filme aos seus favoritos
            e aproveitar todas as funcionalidades da plataforma.
          </p>
        </div>
      </Dialog>

      <div className="container max-w-490 m-auto px-12">
        {/* MOBILE */}
        <div className="relative max-w-55 m-auto block md:hidden">
          <div
            onClick={handleFavoriteClick}
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
        <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between pb-10 md:px-0">
          <div className="flex flex-col gap-4 md:max-w-2xl mt-11 relative">
            <h2 className="text-4xl font-bold md:text-6xl">{movie.title}</h2>

            <div className="flex gap-4 items-center">
              {!!movie.contentRating && (
                <Rating
                  value={Number(movie.contentRating)}
                  cancel={false}
                  cancelIcon={''}
                  onIcon={<i className="pi pi-star-fill text-amber-400"></i>}
                  offIcon={<i className="pi pi-star-fill text-white"></i>}
                />
              )}

              <strong className="font-bold text-lg">{movie.genre}</strong>
            </div>

            <p className="font-bold">{movie.director}</p>
            <p className="font-bold">{movie.cast}</p>
            <p>{movie.synopsis}</p>
          </div>

          <div className="hidden md:flex gap-5 md:items-center">
            <div
              onClick={handleFavoriteClick}
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
