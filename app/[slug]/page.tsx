// app/filmes/[slug]/page.tsx

import { getMovieBySlug, listHomeMovies } from '@/services/api';
import { Movie, Session, SessionsByDate } from '@/services/models';
import { Film } from '@/view';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type MovieProps = {
  movie: Movie;
  sessions: SessionsByDate[];
};
export async function generateMetadata(
  props: PageProps<'/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params;
  const filme = await getMovieBySlug(slug) as MovieProps;
  if (!filme) {
    return {
      title: 'Filme não encontrado',
    };
  }

  return {
    title: `Showtime - ${filme.movie.title}`,
    description: filme.movie.shortSynopsis,
    openGraph: {
      title: filme.movie.title,
      description: filme.movie.shortSynopsis,
      images: [`https://showtime.com.br${filme.movie.bannerDesktop}`],
    },
  };
}

export default async function Page(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params;

  const filme = (await getMovieBySlug(slug)) as MovieProps;

  if (!filme) notFound();
  return <Film movie={filme.movie} />;
}

export async function generateStaticParams() {
  const posts = (await listHomeMovies()) as {
    releases: { slug: string }[];
    streaming: { slug: string }[];
  };
  const releases = posts.releases.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
  const streaming = posts.streaming.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
  return [...releases, ...streaming];
}
