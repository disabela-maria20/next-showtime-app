import { News, NewsPost } from '@/screens';
import mook from '@/services/mook/index.json';

export default async function pageNoticias() {
  const news = mook.noticias;
  return <News noticias={news} />;
}
