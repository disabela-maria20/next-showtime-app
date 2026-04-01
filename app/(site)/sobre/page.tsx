import { listHomeMovies } from '@/services/api';
import { Movie } from '@/services/models';
import { About } from '@/ui';

export default async function pageSobre() {
  const listMovies = (await listHomeMovies()) as {
    releases: Movie[];
    streaming: Movie[];
  };
  return <About movie={listMovies} />;
}
