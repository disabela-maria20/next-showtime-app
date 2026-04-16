'use client';

import { CardMovie, Divider, News, Slide, StreamButton } from '@/component';
import { Movie } from '@/services/models';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useMemo, useState, useTransition } from 'react';
import mook from '../../services/mook/index.json';
import {} from 'react';
interface ShortlyProps {
  movie: {
    releases: Array<Movie>;
    streaming: Array<Movie>;
  };
}

const Shortly = ({ movie }: ShortlyProps) => {
  const [selectGenre, setSelectGenre] = useState<string | null>(null);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);
  const [isPending, startTransition] = useTransition();
  const listGenre = useMemo(() => {
    return [...new Set(movie.streaming.map((data) => data.genre))];
  }, [movie.streaming]);

  const movieFiltered = useMemo(() => {
    return selectGenre
      ? movie.streaming.filter((f) => f.genre === selectGenre)
      : movie.streaming;
  }, [selectGenre, movie.streaming]);

  const moviePaginator = useMemo(() => {
    return movieFiltered.slice(first, first + rows);
  }, [movieFiltered, first, rows]);

  const handleFilterGenre = (genre: string) => {
    startTransition(() => {
      setSelectGenre((prevGenre) => (prevGenre === genre ? null : genre));
      setFirst(0);
    });
  };
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    startTransition(() => {
      setFirst(event.first);
      setRows(event.rows);
    });
  };

  function truncate(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;

    return text.slice(0, maxLength).trimEnd() + '...';
  }
  return (
    <main>
      <section>
        <div className="relative w-full h-[calc(100vh-6px)] flex items-end pb-10 lg:pb-16">
          {/* Background */}
          <div className="bg-[url(/img/banner/banner-embreve.png)] bg-center bg-cover absolute inset-0 w-full h-full -z-20" />

          {/* Overlay (gradiente para contraste) */}
          <div className="absolute inset-0 bg-linear-to-t from-blue-900/70 via-transparent to-transparent -z-10" />

          {/* 🔝 TOPO (dentro do container, alinhado com menu) */}
          <div className="absolute top-6 left-0 w-full pt-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="text-center lg:text-left text-white text-shadow-black/15 text-shadow-sm">
                <p className="text-md md:text-base text-white/80">
                  30 de Abril
                </p>
                <p className="font-bold text-lg md:text-xl">
                  O Diabo Veste Prada 2
                </p>
              </div>
            </div>
          </div>

          {/* 🔽 CONTEÚDO DE BAIXO */}
          <div className="container mx-auto px-6 lg:px-12 w-full">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left gap-6">
              <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-white max-w-xl">
                Em breve nos cinemas
              </h1>

              <StreamButton href="/em-breve" size="lg">
                comprar ingressos
              </StreamButton>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section className="overflow-x-hidden py-10 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-xl text-neutral-400 pb-4">
            Selecione o Gênero que você busca:
          </h2>
          <Slide
            options={{
              loop: false,
              mode: 'free-snap',
              slides: { perView: 'auto', spacing: 20 },
            }}
          >
            <Slide.Track style={{ overflow: 'visible' }}>
              {listGenre.map((genre) => (
                <Slide.Item
                  key={genre}
                  className="overflow-visible! md:w-auto!"
                >
                  <button
                    className={`
                       ${
                         selectGenre === genre
                           ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                           : 'border border-neutral-700 text-white hover:bg-blue-700 hover:text-white'
                       }  
                      py-5 px-6 rounded transition-color cursor-pointer`}
                    onClick={() => handleFilterGenre(genre)}
                  >
                    <span className="w-56 block">{genre}</span>
                  </button>
                </Slide.Item>
              ))}
            </Slide.Track>
          </Slide>

          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 xl:grid-cols-6">
            {isPending ? (
              <div className="flex items-center justify-center min-h-100">
                <p className="text-amber-400 text-xl">Carregando...</p>
              </div>
            ) : (
              moviePaginator.map((movie: any) => (
                <CardMovie key={movie.id} {...movie} />
              ))
            )}
          </div>

          {movieFiltered.length > rows && (
            <div className=" flex justify-center mt-4">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={movieFiltered.length}
                rowsPerPageOptions={[12, 24, 36]}
                onPageChange={onPageChange}
                unstyled={true}
                pt={{
                  root: () => ({
                    className:
                      'flex items-center cursor-pointer gap-2 text-amber-400',
                  }),
                  pageButton: (a) => ({
                    className: `px-3 py-1 mx-1 cursor-pointer border rounded transition ${
                      a?.context.active
                        ? 'bg-amber-400 border-amber-400 text-black'
                        : 'border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black'
                    }`,
                  }),
                }}
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              />
            </div>
          )}
        </div>
      </section>
      <section className="py-8 md:py-16 bg-neutral-800">
        <div className="container max-w-490 m-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch h-full">
            {mook.noticias.slice(0, 2).map((item) => (
              <News.Grid
                className="grid grid-cols-1 md:grid-cols-2 gap-9 items-stretch h-full"
                key={item.id}
              >
                {/* TEXTO */}
                <div className="flex flex-col gap-2 justify-center">
                  <News.Tag href={item.category.slug}>
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
            <StreamButton size="lg">Ver mais notícias</StreamButton>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shortly;
