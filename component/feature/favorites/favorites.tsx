import { CardMovie } from '@/component';
import { FullMovieProps } from '@/models';
import React, { useMemo } from 'react';

type FavoritesProps = {
  listMovies: FullMovieProps;
};

const Favorites = ({ listMovies }: FavoritesProps) => {
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
};

export default Favorites;
