import { listHomeMovies } from '@/services/api';
import { Movie } from '@/services/models';
import { About } from '@/screens';

export default async function pageSobre() {
  const listMovies = (await listHomeMovies()) as {
    releases: Movie[];
    streaming: Movie[];
  };
  return <About movie={listMovies} />;
}
