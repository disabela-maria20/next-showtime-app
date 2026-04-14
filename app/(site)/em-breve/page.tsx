import { listHomeMovies } from '@/services/api';
import { Movie } from '@/services/models';
import { About, Shortly } from '@/screens';

export default async function pageEmbreve() {
  const listMovies = (await listHomeMovies()) as {
    releases: Movie[];
    streaming: Movie[];
  };
  return <Shortly movie={listMovies} />;
}
