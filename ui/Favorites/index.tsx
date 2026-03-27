import { CardMovie } from '@/component';
import { Movie } from '@/services/models';
import React, { useMemo } from 'react';

interface FavoritesProps {
  movie: {
    releases: Array<Movie>;
    streaming: Array<Movie>;
  };
}

const Favorites = ({ movie }: FavoritesProps) => {
  const movies = useMemo(() => movie.releases.concat(movie.streaming), [movie]);

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
