'use client';

import { Divider, News, StreamButton } from '@/component';
import { useTruncate } from '@/hooks/useTruncate';
import { Noticia } from '@/models';
import { useDateFormatter } from '@/hooks/useDateFormatter';
import Link from 'next/link';

interface NewsProps {
  noticias: Noticia;
  all: Noticia[];
}
const NewsPost = ({ noticias, all }: NewsProps) => {
  const truncate = useTruncate();
  const { format } = useDateFormatter();
  const releaseDate = format(noticias.highlight.releaseDate, 'full');

  return (
    <>
      <section className="pt-14 md:pt-32 pb-10 md:pb-24  bg-[url(/img/banner/banner-noticias.png)] bg-no-repeat bg-center bg-cover">
        <div className="container max-w-490 m-auto px-12">
          <h1 className="text-4xl font-bold mt-16 md:mt-0">
            <span className="underline underline-offset-4 font-bold">
              notícias quentinhas
            </span>
            &nbsp;
            <span className="font-light block sm:inline">pra você</span>
          </h1>
          <div className="grid gap-8 lg:grid-cols-10 md:gap-16 mt-5 md:mt-10 lg:mt-16">
            <div className="lg:col-span-3">
              <div className="flex flex-col gap-3.5">
                <News.Tag variant="amber" href={noticias.category.slug}>
                  {noticias.category.label}
                </News.Tag>

                <News.Title size="lg" lineclamp={false}>
                  {noticias.content.title}
                </News.Title>
                <News.Description>
                  {noticias.content.description}
                </News.Description>
              </div>
            </div>
            <div className="lg:col-span-7">
              <img
                src="/img/banner/banner-noticias home.png"
                alt="Banner de notícias"
                className="w-full max-h-96 object-cover object-top"
              />
              <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-3.5 md:mt-8">
                <div>
                  <h3>{releaseDate}</h3>
                  <h2 className="text-xl md:text-2xl font-bold">
                    {noticias.highlight.title}
                  </h2>
                </div>
                <StreamButton
                  href={`/${noticias.highlight.slug}`}
                  variant="amber"
                >
                  comprar ingressos
                </StreamButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section>
        <div className="grid lg:grid-cols-12">
          <div className="pt-14 md:pt-32 lg:col-span-7">
            <div
              className="px-12 lg:px-28 pb-12 lg:pb-28"
              dangerouslySetInnerHTML={{ __html: noticias.content.text }}
            />
          </div>
          <div className="lg:col-span-5">
            <div className="bg-neutral-800 px-7 py-6 flex flex-col gap-4 md:gap-6">
              {all.slice(0, 3).map((item) => (
                <News.Grid
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch h-full"
                  key={item.id}
                >
                  {/* TEXTO */}
                  <div className="flex flex-col gap-2 justify-center">
                    <News.Tag
                      variant="amber"
                      href={`/noticias/${item.category.slug}`}
                    >
                      {item.category.label}
                    </News.Tag>

                    <Link href={`noticias/${item.content.slug}`}>
                      <News.Title lineclamp={false} size="xsm">
                        {item.content.title}
                      </News.Title>
                    </Link>

                    <News.Description>
                      {truncate(item.content.description, 40)}
                    </News.Description>
                  </div>

                  {/* IMAGEM */}
                  <div className="h-full">
                    <News.Img
                      src={item.media.src}
                      alt={item.media.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </News.Grid>
              ))}
            </div>
            <div>
              <img src="/img/banner/noticias01.png" alt="" className="w-full" />
              <img src="/img/banner/noticias01.png" alt="" className="w-full" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 md:py-16 bg-neutral-800">
        <div className="container max-w-490 m-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch h-full">
            {all.slice(0, 2).map((item) => (
              <News.Grid
                className="grid grid-cols-1 md:grid-cols-2 gap-9 items-stretch h-full"
                key={item.id}
              >
                <div className="flex flex-col gap-2 justify-center">
                  <News.Tag href={item.category.slug}>
                    {item.category.label}
                  </News.Tag>
                  <News.Title size="md">{item.content.title}</News.Title>
                  <News.Description>
                    {truncate(item.content.description, 80)}
                  </News.Description>
                </div>
                <div className="h-full">
                  <News.Img
                    src={item.media.src}
                    alt={item.media.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </News.Grid>
            ))}
          </div>
          <div className="flex justify-center md:justify-end pt-6 md:pt-16">
            <button className="flex items-center gap-1.5 transition hover:text-blue-600 cursor-pointer">
              <i className="pi pi-plus"></i>
              <span>Ver mais</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPost;
