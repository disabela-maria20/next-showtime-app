import { listHomeMovies } from '@/services/api';
import { FullMovieProps } from '@/models';
import { Shortly } from '@/features';

export default async function pageEmbreve() {
  const listMovies = (await listHomeMovies()) as FullMovieProps;
  return <Shortly movies={listMovies} />;
}
