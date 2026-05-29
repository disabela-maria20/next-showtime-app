import { getMovieTop } from '@/services/api';
import { FullMovieProps } from '@/models';
import { Shortly } from '@/features';

export default async function pageEmbreve() {
  const listMovies = (await getMovieTop()) as FullMovieProps;
  return <Shortly movies={listMovies} />;
}
