import mook from '@/services/mook/index.json';
import { Noticia } from '@/models';
import { NewsPost } from '@/features';

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
  const posts = mook.noticias;
  const noticia: Noticia | undefined = mook.noticias.find(
    (n) => n.content.slug === slug
  );

  if (!noticia) {
    return <div>Notícia não encontrada</div>;
  }

  return <NewsPost noticias={noticia} all={posts} />;
}
