import mook from '@/services/mook/index.json';
import distribuidora from '@/services/mook/distribuidora.json';
import { DistribuidoraPage } from '@/features';
import { Noticia } from '@/models';
import { listHomeMovies } from '@/services/api';

export async function generateStaticParams() {
  return Object.keys(distribuidora).map((key) => ({
    slug: key,
  }));
}

export default async function PageDistribuidora({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const listMovies = await listHomeMovies();
  if (!listMovies) return null;

  const news: Noticia[] = mook.noticias;

  const movies: any = distribuidora[slug as keyof typeof distribuidora] || [];

  return (
    <DistribuidoraPage
      noticias={news}
      movie={movies}
      comehere={listMovies}
      namePage={slug}
    />
  );
}
