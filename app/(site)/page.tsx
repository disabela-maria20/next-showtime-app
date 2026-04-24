// app/(site)/page.tsx
// ✅ SEM 'use client' - isso é Server Component
import { Suspense } from 'react';
import { listBanners, listHomeMovies } from '@/services/api';
import { Home } from '@/component';
import { FullMovieProps } from '@/models';

export default async function HomePage() {
  // Buscar dados no servidor (Server Component)
  const [bannerResponse, listMovies] = await Promise.all([
    listBanners(),
    listHomeMovies(),
  ]);
  const banner = bannerResponse.banners || [];

  return (
    <Suspense fallback={<div className="text-amber-400">Carregando...</div>}>
      {/* Passa os dados para o Client Component */}
      <Home banner={banner} listMovie={listMovies as FullMovieProps} />
    </Suspense>
  );
}
