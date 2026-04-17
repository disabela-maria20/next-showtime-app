import { NewsPost } from '@/screens';
import mook from '@/services/mook/index.json';
import { Noticia } from '@/services/models';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = mook.noticias;

  return posts.map((post) => ({
    slug: post.content.slug,
  }));
}

export default async function PageNewsPost({ params }: PageProps) {
  const { slug } = await params;
  const noticia: Noticia | undefined = mook.noticias.find(
    (n) => n.content.slug === slug
  );

  console.log('====================================');
  console.log(slug, mook.noticias.filter((n) => n.content.slug === slug));
  console.log('====================================');
  // 🔥 evita erro 500
  if (!noticia) {
    return <div>Notícia não encontrada</div>;
  }

  return <NewsPost noticias={noticia} />;
}