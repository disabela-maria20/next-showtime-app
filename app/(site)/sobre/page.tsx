import { listHomeMovies } from '@/services/api';
import { Movie } from '@/models';
import About from '@/component/feature/about';

export default async function pageSobre() {
  const listMovies = (await listHomeMovies()) as {
    releases: Movie[];
    streaming: Movie[];
    box_office_hits: Movie[];
    coming_soon: Movie[];
    release_week: Movie[];
  };
  return <About listMovies={listMovies} />;
}
