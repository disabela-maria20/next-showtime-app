'use client';
import useIsMobile from '@/hooks/useIsMobile';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import mook from './mook.json';
import { autoplay, CardMovie, CtaButton, Divider, Slide } from '@/component';
import { Rating } from 'primereact/rating';
import text from '../../services/localization/pt.json';
import Link from 'next/link';
import { useFormattedDate } from '@/hooks/useFormattedDate';

type Movie = {
  id: number;
  title: string;
  genre: string;
  partnerCode: string; // cinema
  technology?: string;
  dubbed?: boolean;
  releasedate: string;
};

type Props = {
  movies: Movie[];
  onFilter: (movies: Movie[]) => void;
  activeDate: string | null;
};

const DateBadge = ({
  date,
  active,
  onClick,
}: {
  date: string;
  active: boolean;
  onClick: () => void;
}) => {
  const { weekDay, numericDate, isToday } = useFormattedDate(date);
  return (
    <button
      onClick={onClick}
      className={` cursor-pointer  border-2 rounded-xl px-3 py-2 text-center transition
      ${active ? 'border-amber-400 text-amber-400' : 'border-b-neutral-400 text-neutral-400'}`}
    >
      <p className="text-yellow-400 font-bold text-xs md:text-sm">
        {isToday ? 'HOJE' : weekDay}
      </p>
      <p className=" text-xs">{numericDate}</p>
    </button>
  );
};

function MovieFilters({ movies, onFilter, activeDate }: Props) {
  const [title, setTitle] = useState("");
  const [cinema, setCinema] = useState("");
  const [genre, setGenre] = useState("");
  const [technology, setTechnology] = useState("");
  const [dubbed, setDubbed] = useState(false);

  // remove duplicados
  const getUniqueValues = (array: (string | undefined)[]) => {
    return [...new Set(array.filter(Boolean))] as string[];
  };

  // options dinâmicos baseados nos filmes da data ativa
  const moviesForCurrentDate = useMemo(() => {
    if (!activeDate) return movies;
    return movies.filter(m => m.releasedate === activeDate);
  }, [movies, activeDate]);

  const cinemas = useMemo(
    () => getUniqueValues(moviesForCurrentDate.map((m) => m.partnerCode)),
    [moviesForCurrentDate]
  );

  const genres = useMemo(
    () => getUniqueValues(moviesForCurrentDate.map((m) => m.genre)),
    [moviesForCurrentDate]
  );

  const technologies = useMemo(
    () => getUniqueValues(moviesForCurrentDate.map((m) => m.technology)),
    [moviesForCurrentDate]
  );

  // ação do botão buscar
  const handleSearch = () => {
    console.log('Filtrando com:', { title, cinema, genre, technology, dubbed, activeDate });
    
    const result = movies.filter((movie) => {
      // Primeiro filtra pela data se activeDate existir
      if (activeDate && movie.releasedate !== activeDate) {
        return false;
      }

      // Depois aplica os outros filtros
      const matchesTitle = title === "" || 
        movie.title.toLowerCase().includes(title.toLowerCase());
      
      const matchesCinema = cinema === "" || movie.partnerCode === cinema;
      
      const matchesGenre = genre === "" || movie.genre === genre;
      
      const matchesTechnology = technology === "" || movie.technology === technology;
      
      const matchesDubbed = !dubbed || movie.dubbed === true;

      return matchesTitle && matchesCinema && matchesGenre && matchesTechnology && matchesDubbed;
    });

    console.log('Resultado:', result.length, 'filmes');
    onFilter(result);
  };

  // Efeito para aplicar filtro quando activeDate ou qualquer filtro mudar
  useEffect(() => {
    handleSearch();
  }, [activeDate, title, cinema, genre, technology, dubbed]);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* LINHA 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* INPUT TITULO */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pesquisar filme"
          className="input"
        />

        {/* GENERO */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="select"
        >
          <option value="">Gênero</option>
          {genres.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* CINEMA */}
        <select
          value={cinema}
          onChange={(e) => setCinema(e.target.value)}
          className="select"
        >
          <option value="">Cinema</option>
          {cinemas.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* DUBLADO TOGGLE */}
        <button
          onClick={() => setDubbed(!dubbed)}
          className={`rounded-lg border px-6 py-3 transition
          ${
            dubbed
              ? "bg-yellow-400 text-black border-yellow-400"
              : "border-yellow-400 text-yellow-400"
          }`}
        >
          Dublado
        </button>
      </div>

      {/* LINHA 2 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* TECNOLOGIA */}
        <select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          className="select"
        >
          <option value="">Tecnologia</option>
          {technologies.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        {/* BOTÃO BUSCAR */}
        <button
          onClick={handleSearch}
          className="md:col-span-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition"
        >
          Buscar Filmes
        </button>
      </div>
    </div>
  );
}

const Home = () => {
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [filteredMovies, setFilteredMovies] = useState(mook.cinema);

  const { isMobile, isLoading } = useIsMobile();

  const moviesByDate = useMemo(() => {
    return mook.cinema.reduce((acc: any, movie: any) => {
      if (!acc[movie.releasedate]) acc[movie.releasedate] = [];
      acc[movie.releasedate].push(movie);
      return acc;
    }, {});
  }, []);

  const dates = useMemo(
    () =>
      Object.keys(moviesByDate).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      ),
    [moviesByDate]
  );

  // ✅ selecionar HOJE automaticamente
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    if (dates.includes(today)) {
      setActiveDate(today);
    } else if (dates.length) {
      setActiveDate(dates[0]);
    }
  }, [dates]);

  if (isLoading) {
    return 'Carregando';
  }

  return (
    <Suspense fallback="Carregando">
      <main>
        <Slide options={{ loop: true }} plugins={[autoplay(2000)]}>
          <Slide.Track>
            {mook.banner.map((item) => (
              <Slide.Item key={item.id}>
                <div className="relative max-w-490 m-auto ">
                  {isMobile ? (
                    <img
                      src={item.bannerMobile.src}
                      alt={item.bannerMobile.alt}
                      className="w-full h-screen object-cover"
                    />
                  ) : (
                    <img
                      src={item.bannerDesktop.src}
                      alt={item.bannerDesktop.alt}
                      className="w-full h-screen 2xl:h-auto object-cover"
                    />
                  )}
                  <section className="absolute bottom-0 w-full text-center md:text-left mb-[20%] md:mb-[5%] px-10">
                    <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between">
                      <div className="flex flex-col gap-4 md:max-w-2xl">
                        <h2 className="text-4xl font-bold md:text-6xl">
                          {item.title}
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center md:justify-normal gap-4 items-center">
                          <Rating
                            value={item.star}
                            cancel={false}
                            cancelIcon={''}
                            onIcon={
                              <i className="pi pi-star-fill text-amber-400"></i>
                            }
                            offIcon={
                              <i className="pi pi-star-fill text-white"></i>
                            }
                          />
                          <strong className="block text-center md:text-left font-bold text-lg">
                            {item.gender}
                          </strong>
                        </div>

                        <p>{item.description}</p>
                      </div>
                      <div>
                        <CtaButton href="/">{text.ctaCompra}</CtaButton>
                      </div>
                    </div>
                  </section>
                </div>
              </Slide.Item>
            ))}
          </Slide.Track>

          <Slide.Arrows />
          <Slide.Dots />
        </Slide>
        {isMobile && <Divider />}
        <section
          className="py-14 md:py-32 overflow-hidden relative
          before:content-['']
          before:absolute
          before:top-0
          before:right-0
          before:h-full
          before:w-24 md:before:w-40
          before:bg-linear-to-l
          before:from-black/95
          before:to-transparent
          before:pointer-events-none
          before:z-10"
        >
          <div className="container max-w-490 m-auto px-12">
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-12">
              {text.secao2}
            </h2>

            <Slide
              options={{
                loop: false,
                slides: { perView: 2, spacing: 12 },
                breakpoints: {
                  '(min-width: 640px)': {
                    slides: { perView: 2, spacing: 16 },
                  },
                  '(min-width: 768px)': {
                    slides: { perView: 3, spacing: 16 },
                  },
                  '(min-width: 1024px)': {
                    slides: { perView: 5, spacing: 20 },
                  },
                },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {mook.estreias.map((item) => (
                  <Slide.Item key={item.id}>
                    <CardMovie {...item} ranking={true} />
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>
          </div>
        </section>
        <section
          className="py-14 md:py-32 bg-neutral-700 overflow-hidden relative
          before:content-['']
          before:absolute
          before:top-0
          before:right-0
          before:h-full
          before:w-24 md:before:w-40
          before:bg-linear-to-l
          before:from-neutral-700/95
          before:to-transparent
          before:pointer-events-none
          before:z-10"
        >
          <div className="container max-w-490 m-auto px-12">
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-12">
              {text.secao3}
            </h2>

            <Slide
              options={{
                loop: false,
                slides: { perView: 2, spacing: 12 },
                breakpoints: {
                  '(min-width: 640px)': {
                    slides: { perView: 2, spacing: 16 },
                  },
                  '(min-width: 768px)': {
                    slides: { perView: 3, spacing: 16 },
                  },
                  '(min-width: 1024px)': {
                    slides: { perView: 5, spacing: 20 },
                  },
                },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {mook.estreias.map((item) => (
                  <Slide.Item key={item.id}>
                    <CardMovie {...item} ranking={true} />
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>
          </div>
        </section>
        {!isMobile && <Divider />}
        <section className="py-14 md:py-32 overflow-hidden">
          <div className="container max-w-490 m-auto px-12">
            {/* 🎬 DATAS */}
            <h2
              className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-12 text-amber-400"
              dangerouslySetInnerHTML={{ __html: text.secao4 }}
            />
            <Slide
              options={{
                loop: false,
                slides: { perView: 4, spacing: 5 },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {dates.map((date) => (
                  <Slide.Item key={date}>
                    <DateBadge
                      date={date}
                      active={activeDate === date}
                      onClick={() => setActiveDate(date)}
                    />
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>

            <MovieFilters 
              movies={mook.cinema} 
              onFilter={setFilteredMovies} 
              activeDate={activeDate}
            />

            <div className="mt-5 md:hidden">
              <Slide
                options={{
                  slides: { perView: 2, spacing: 22},
                }}
              >
                <Slide.Track style={{ overflow: 'visible' }}>
                  {filteredMovies.map((movie: any) => (
                    <Slide.Item key={movie.id}>
                      <CardMovie key={movie.id} {...movie} />
                    </Slide.Item>
                  ))}
                </Slide.Track>
              </Slide>
            </div>

            <div className="hidden md:grid mt-5 gap-5 grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {filteredMovies.map((movie: any) => (
                <CardMovie key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default Home;