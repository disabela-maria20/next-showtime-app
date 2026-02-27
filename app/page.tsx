import { listBanners, listHomeMovies } from '@/services/api';
import { Home } from '@/view';

export default async function PageHome() {
  const banner = await listBanners();
  const listMovies = await listHomeMovies();

  return (
    <Home
      banner={banner?.banners || []}
      listMovie={listMovies as { releases: any[]; streaming: any[] }}
    />
  );
}
