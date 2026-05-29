// app/(site)/page.tsx
// ✅ SEM 'use client' - isso é Server Component
import { Suspense } from 'react';
import { getMovieTop, listBanners, listHomeMovies } from '@/services/api';
import { Home } from '@/component';
import { FullMovieProps } from '@/models';

export default async function HomePage() {
  // Buscar dados no servidor (Server Component)
  const [bannerResponse, listMovies, topMovies] = await Promise.all([
    listBanners(),
    listHomeMovies(),
    getMovieTop(),
  ]);

  return (
    <Suspense fallback={<div className="text-amber-400">Carregando...</div>}>
      {/* Passa os dados para o Client Component */}
      <Home
        banner={bannerResponse.banners}
        top={topMovies}
        listMovie={listMovies as FullMovieProps}
      />
    </Suspense>
  );
}
