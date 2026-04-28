import { listHomeMovies } from '@/services/api';
import { Favorites } from '@/component';

export default async function pageFavorites() {
  const listMovies = await listHomeMovies();

  if (!listMovies) return null;

  return <Favorites listMovies={listMovies} />;
}
