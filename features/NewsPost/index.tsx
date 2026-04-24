import { Noticia } from '@/models';
interface NewsProps {
  noticias: Noticia;
}
const NewsPost = ({ noticias }: NewsProps) => {
  console.log(noticias);

  return <div>{noticias.content.title}</div>;
};

export default NewsPost;
