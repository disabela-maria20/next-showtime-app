import { NewsPage } from '@/features';
import mook from '@/services/mook/index.json';

export default async function pageNoticias() {
  const news = mook.noticias;
  return <NewsPage noticias={news} />;
}
