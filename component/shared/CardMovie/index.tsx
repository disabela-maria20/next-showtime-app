'use client';

import Link from 'next/link';
import { useAutoFontSize } from '@/hooks/useAutoFontSize';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getfavoritesMovie, postfavoritesMovieId } from '@/services/api';
import { translateError } from '@/lib/errors/error-map';
import { Messages } from 'primereact/messages';
import { useRef, useState, useEffect } from 'react';
import { Movie } from '@/models';

type CardMovieProps = {
  index: number;
  title: string;
  cover: string;
  slug: string;
  ranking?: boolean;
  favorites?: boolean;
  idMovie?: number;
};

const CardMovie = ({
  index,
  title,
  cover,
  slug,
  ranking = false,
  favorites = false,
  idMovie,
}: CardMovieProps) => {
  const { containerRef, textRef } = useAutoFontSize();
  const msgs = useRef<Messages | null>(null);
  const queryClient = useQueryClient();

  const [heart, setHeart] = useState(false);

  // 🔹 GET favoritos
  const { data: listMovies = [] } = useQuery<Movie[]>({
    queryKey: ['listMovies'],
    queryFn: getfavoritesMovie,
  });

  // 🔹 sincroniza coração com API
  useEffect(() => {
    if (!idMovie || !listMovies.length) return;

    const exists = listMovies.some((movie) => movie.id === idMovie);
    setHeart(exists);
  }, [listMovies, idMovie]);

  // 🔹 mutation (add/remove)
  const mutation = useMutation({
    mutationFn: async () => {
      if (!idMovie) throw new Error('ID inválido');
      return await postfavoritesMovieId(idMovie);
    },

    // ✅ optimistic update
    onMutate: () => {
      setHeart((prev) => !prev);
    },

    // ❌ rollback se der erro
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

    // 🔄 atualiza cache
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listMovies'] });
    },
  });

  return (
    <>
      <div className="group relative bg-neutral-800 rounded p-2.5 text-center">
        {/* NUMBER */}
        {ranking && (
          <div className="absolute top-0 left-0 bg-amber-400 text-black font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-br-lg z-10 transition-all duration-500 group-hover:scale-110 group-active:scale-110">
            {index + 1}
          </div>
        )}

        {/* FAVORITE */}
        {favorites && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              mutation.mutate();
            }}
            className="cursor-pointer absolute top-0 left-0 bg-amber-400 text-black text-2xl w-8 h-8 flex items-center justify-center rounded-br-lg z-10 transition-all duration-500 group-hover:scale-110 group-active:scale-110"
          >
            {mutation.isPending ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : heart ? (
              <i className="pi pi-heart-fill"></i>
            ) : (
              <i className="pi pi-heart"></i>
            )}
          </div>
        )}

        {/* IMAGE */}
        <img
          src={cover}
          alt={title}
          className="min-h-45.5 md:max-h-80 2xl:max-h-85 w-full object-cover rounded transition-all duration-500 group-hover:shadow-xl group-active:shadow-xl"
        />

        {/* TITLE */}
        <div
          ref={containerRef}
          className="flex justify-center items-center py-1.5"
        >
          <h3
            ref={textRef}
            className="text-white pt-3 pb-3.5 font-bold text-lg md:text-xl xl:text-2xl truncate transition-colors duration-500 group-hover:text-neutral-400 group-active:text-neutral-400"
          >
            {title}
          </h3>
        </div>

        {/* BUTTON */}
        <Link
          href={'/' + slug}
          className="relative overflow-hidden block w-full py-2 sm:px-3 rounded text-[12px] md:text-sm font-semibold border border-neutral-500"
        >
          <span className="absolute inset-0 bg-neutral-500 z-0" />
          <span className="absolute inset-0 bg-amber-400 z-0 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 text-white group-hover:text-black group-active:text-black transition-colors duration-500">
            comprar ingressos
          </span>
        </Link>
      </div>
      <Messages ref={msgs} />
    </>
  );
};

export default CardMovie;
