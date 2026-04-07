import { listHomeMovies } from '@/services/api';
import { Movie } from '@/services/models';
import { Favorites } from '@/screens';

export default async function pageFavorites() {
  const listMovies = await listHomeMovies() as { releases: Movie[]; streaming: Movie[] };
  return <Favorites movie={listMovies} />
}
