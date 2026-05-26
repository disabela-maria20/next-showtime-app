// app/(site)/page.tsx
import { Suspense } from 'react';
import { listBanners, listHomeMovies } from '@/services/api';
import { Home } from '@/component';
import { FullMovieProps } from '@/models';

export default async function HomePage() {
  const [bannerResponse, listMovies] = await Promise.all([
    listBanners(),
    listHomeMovies(),
  ]);

  const banner = bannerResponse.banner ? [bannerResponse.banner] : [];

  return (
    <Suspense fallback={<div className="text-amber-400">Carregando...</div>}>
      <Home banner={banner} listMovie={listMovies as FullMovieProps} />
    </Suspense>
  );
}
