import { listHomeMovies } from '@/services/api';
import { Movie } from '@/models';
import About from '@/component/feature/about';

export default async function pageSobre() {
  const listMovies = (await listHomeMovies()) as {
    releases: Movie[];
    streaming: Movie[];
  };
  return <About listMovies={listMovies} />;
}
