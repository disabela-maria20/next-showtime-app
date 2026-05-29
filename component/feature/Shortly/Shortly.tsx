// components/feature/shortly/ShortlyClient.tsx
'use client';

import { useMemo, useState, useTransition } from 'react';
import { CardMovie, Divider } from '@/component';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { ShortlyClientProps } from '../types';
import { ShortlyHero } from './Hero';
import { ShortlyFilters } from './Filters';
import { ShortlyNews } from './News';

export default function ShortlyClient({ movies }: ShortlyClientProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);
  const [isPending, startTransition] = useTransition();

  // Extrair gêneros únicos
  const genres = useMemo(() => {
    const streaming = movies?.coming_soon || [];
    return [...new Set(streaming.map((data) => data.genre))];
  }, [movies]);

  // Filtrar por gênero
  const filteredMovies = useMemo(() => {
    const streaming = movies?.coming_soon || [];
    return selectedGenre
      ? streaming.filter((f) => f.genre === selectedGenre)
      : streaming;
  }, [selectedGenre, movies]);

  // Paginar
  const paginatedMovies = useMemo(() => {
    return filteredMovies.slice(first, first + rows);
  }, [filteredMovies, first, rows]);

  const handleGenreChange = (genre: string) => {
    startTransition(() => {
      setSelectedGenre((prevGenre) => (prevGenre === genre ? null : genre));
      setFirst(0);
    });
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    startTransition(() => {
      setFirst(event.first);
      setRows(event.rows);
    });
  };

  return (
    <main>
      <ShortlyHero />
      <Divider />

      <section className="overflow-x-hidden py-10 lg:py-16">
        <ShortlyFilters
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />

        <div className="container mx-auto px-6 lg:px-12">
          {/* Grid de Filmes */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 xl:grid-cols-6">
            {isPending ? (
              <div className="col-span-full flex items-center justify-center min-h-100">
                <p className="text-amber-400 text-xl">Carregando...</p>
              </div>
            ) : (
              paginatedMovies.map((movie: any) => (
                <CardMovie key={movie.id} {...movie} />
              ))
            )}
          </div>

          {/* Paginação */}
          {filteredMovies.length > rows && (
            <div className="flex justify-center mt-4">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredMovies.length}
                rowsPerPageOptions={[12, 24, 36]}
                onPageChange={onPageChange}
                unstyled={true}
                pt={{
                  root: () => ({
                    className:
                      'flex items-center cursor-pointer gap-2 text-amber-400',
                  }),
                  pageButton: (a) => ({
                    className: `px-3 py-1 mx-1 cursor-pointer border rounded transition ${
                      a?.context.active
                        ? 'bg-amber-400 border-amber-400 text-black'
                        : 'border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black'
                    }`,
                  }),
                }}
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              />
            </div>
          )}
        </div>
      </section>

      <ShortlyNews />
    </main>
  );
}
