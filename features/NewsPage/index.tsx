'use client';
import { Divider, News, Slide, StreamButton } from '@/component';
import { useTruncate } from '@/services/hook/useTruncate';
import { Noticia } from '@/services/models';
import mook from '../../services/mook/index.json';

interface NewsPageProps {
  noticias: Noticia[];
}
const NewsPage = ({ noticias }: NewsPageProps) => {
  const truncate = useTruncate();

  return (
    <main>
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
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-3.5">
                <News.Tag variant="amber" href="/">
                  Nome do portal de noticias
                </News.Tag>

                <News.Title size="md">
                  Lorem ipsum dolor sit lormet adent ament.
                </News.Title>
                <News.Description>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec venenatis, dolor in finibus malesuada, lectus ipsum
                    porta nunc, at iaculis arcu nisi sed mauris.
                  </p>
                  <p>
                    Nulla fermentum vestibulum ex, eget tristique tortor pretium
                    ut. Curabitur elit justo, consequat id condimentum ac,
                    volutpat ornare
                  </p>
                </News.Description>
              </div>
            </div>
            <div className="lg:col-span-4">
              <img
                src="/img/banner/banner-noticias home.png"
                alt="Banner de notícias"
                className="w-full"
              />
              <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-3.5 md:mt-8">
                <div>
                  <h3>30 de Abril nos cinemas</h3>
                  <h2 className="text-xl md:text-2xl font-bold">
                    O Diabo Veste Prada 2
                  </h2>
                </div>
                <StreamButton variant="amber">comprar ingressos</StreamButton>
              </div>
            </div>
            <div className="lg:col-span-4">
              {noticias.slice(0, 3).map((noticia) => (
                <div key={noticia.id} className="mb-6">
                  <News.Tag variant="amber" href={`/noticias/${noticia.category.slug}`}>
                    {noticia.category.label}
                  </News.Tag>
                  <News.Title size="sm">{noticia.content.title}</News.Title>
                  <News.Description>
                    <p>{truncate(noticia.content.description, 100)}</p>
                  </News.Description>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section className="py-14 md:py-32">
        <div className="container max-w-490 m-auto px-12">
          <Slide
            options={{
              loop: false,
              slides: { perView: 1, spacing: 12 },
            }}
          >
            <Slide.Track>
              {mook.noticias.map((item, i) => (
                <Slide.Item key={item.id}>
                  <News.Grid className="grid-cols-1 md:grid-cols-2 gap-4 items-start md:items-center md:gap-16 xl:gap-36">
                    <div className="flex flex-col gap-7 ">
                      <News.Tag href={item.category.slug}>
                        {item.category.label}
                      </News.Tag>
                      <News.Title>{item.content.title}</News.Title>
                      <News.Description>
                        {item.content.description}
                      </News.Description>
                      <div className="flex flex-col items-center gap-3.5 md:flex-row md:items-center md:justify-between">
                        <StreamButton href={item.content.slug} size="lg">
                          Ver mais notícias
                        </StreamButton>
                        <Slide.Dots center={false} />
                      </div>
                    </div>
                    <div>
                      <News.Img
                        src={item.media.src}
                        alt={item.media.alt}
                        className="w-full"
                      />
                    </div>
                  </News.Grid>
                </Slide.Item>
              ))}
            </Slide.Track>
          </Slide>
        </div>
      </section>
      <section className="py-14 md:py-32 bg-neutral-800">
        <div className="container max-w-490 m-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch h-full">
            {mook.noticias.map((item) => (
              <News.Grid
                className="grid grid-cols-1 md:grid-cols-2 gap-9 items-stretch h-full"
                key={item.id}
              >
                {/* TEXTO */}
                <div className="flex flex-col gap-2 justify-center">
                  <News.Tag href={`/noticias/${item.category.slug}`}>
                    {item.category.label}
                  </News.Tag>

                  <News.Title size="md">{item.content.title}</News.Title>

                  <News.Description>
                    {truncate(item.content.description, 80)}
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
          <div className="flex justify-center md:justify-end pt-6 md:pt-16">
            <button className="flex items-center gap-1.5 transition hover:text-blue-600 cursor-pointer">
              <i className="pi pi-plus"></i>
              <span>Ver mais</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
