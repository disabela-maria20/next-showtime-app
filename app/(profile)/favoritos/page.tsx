'use client';

import { listHomeMovies } from '@/services/api';
import { Movie } from '@/models';

import { CardMovie } from '@/component';
import { useMemo } from 'react';

export default async function pageFavorites() {
  const listMovies = (await listHomeMovies()) as {
    releases: Movie[];
    streaming: Movie[];
  };
  const movies = useMemo(
    () => listMovies.releases.concat(listMovies.streaming),
    [listMovies]
  );

  return (
    <section>
      <h1 className="text-white text-4xl text-center md:text-left font-bold mb-8">
        Seus Favoritos
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
        {movies.map((item, i) => (
          <CardMovie index={i} {...item} favorites={true} />
        ))}
      </div>
    </section>
  );
}
