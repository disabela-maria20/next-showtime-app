'use client';
import { CardMovie } from '@/component';
import { Movie } from '@/models';
import { getfavoritesMovie } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const Favorites = () => {
  const { data: listMovies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ['listMovies'],
    queryFn: async () => {
      return await getfavoritesMovie();
    },
  });

  return (
    <section>
      <h1 className="text-white text-4xl text-center md:text-left font-bold mb-8">
        Seus Favoritos
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
        {listMovies.map((item, i) => (
          <CardMovie index={i} {...item} favorites={true} idMovie={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
