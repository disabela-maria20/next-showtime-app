'use client';

import useIsMobile from '@/hooks/useIsMobile';
import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import mook from './mook.json';
import { autoplay, CardMovie, CtaButton, Divider, Slide } from '@/component';
import { Rating } from 'primereact/rating';
import text from '../../services/localization/pt.json';
import Link from 'next/link';
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { Banner, Movie } from '@/services/models';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

interface HomeProps {
  banner: Array<Banner>;
  listMovie: {
    releases: Array<Movie>;
    streaming: Array<Movie>;
  };
}

const Home = ({ banner, listMovie }: HomeProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const { isMobile, isLoading } = useIsMobile();

  // Ref para controlar a primeira renderização dos filtros
  const isFirstRender = useRef(true);

  // Estados para paginação
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedAudio, setSelectedAudio] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');

  // Estado para filmes filtrados - inicializado com todos os filmes
  const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>([]);

  const movies = useMemo(
    () => listMovie.releases.concat(listMovie.streaming),
    [listMovie]
  );

  // Inicializar filteredMovies apenas uma vez
  useEffect(() => {
    if (movies.length > 0 && filteredMovies.length === 0) {
      setFilteredMovies(movies);
    }
  }, [movies, filteredMovies.length]);

  // Extrair informações únicas dos filmes para preencher os selects
  const filterOptions = useMemo(() => {
    const genres = new Set<string>();
    const cinemas = new Set<string>();
    const technologies = new Set<string>();
    const audioOptions = new Set(['Dublado', 'Legendado']);

    movies.forEach((movie) => {
      if (movie.genre) genres.add(movie.genre);
      if ((movie as any).cinema) cinemas.add((movie as any).cinema);
      if ((movie as any).technology)
        technologies.add((movie as any).technology);
    });

    return {
      genres: Array.from(genres),
      cinemas: Array.from(cinemas),
      technologies: Array.from(technologies),
      audioOptions: Array.from(audioOptions),
    };
  }, [movies]);

  // Função para aplicar todos os filtros - AGORA DISPARADA MANUALMENTE
  const applyFilters = useCallback(() => {
    let result = [...movies];

    // Filtro por pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(term) ||
          movie.originalTitle?.toLowerCase().includes(term) ||
          movie.synopsis?.toLowerCase().includes(term) ||
          movie.director?.toLowerCase().includes(term) ||
          movie.cast?.toLowerCase().includes(term)
      );
    }

    // Filtro por gênero
    if (selectedGenre) {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // Filtro por cinema
    if (selectedCinema) {
      result = result.filter(
        (movie) => (movie as any).cinema === selectedCinema
      );
    }

    // Filtro por áudio
    if (selectedAudio) {
      result = result.filter((movie) => (movie as any).audio === selectedAudio);
    }

    // Filtro por tecnologia
    if (selectedTechnology) {
      result = result.filter(
        (movie) => (movie as any).technology === selectedTechnology
      );
    }

    setFilteredMovies(result);
    setFirst(0); // Resetar paginação ao filtrar
  }, [
    movies,
    searchTerm,
    selectedGenre,
    selectedCinema,
    selectedAudio,
    selectedTechnology,
  ]);

  // Efeito separado para aplicar filtros apenas quando necessário
  useEffect(() => {
    // Pular a primeira renderização
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Aplicar filtros quando qualquer critério mudar
    applyFilters();
  }, [
    searchTerm,
    selectedGenre,
    selectedCinema,
    selectedAudio,
    selectedTechnology,
    applyFilters,
  ]);

  // Agrupar filmes por data (para manter a funcionalidade existente)
  const moviesByDate = useMemo(() => {
    return movies.reduce((acc: any, movie: any) => {
      if (!acc[movie.releasedate]) acc[movie.releasedate] = [];
      acc[movie.releasedate].push(movie);
      return acc;
    }, {});
  }, [movies]);

  // Função para lidar com a mudança de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedCinema('');
    setSelectedAudio('');
    setSelectedTechnology('');
  };

  // Função para lidar com mudança nos inputs (evitar loop)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleCinemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCinema(e.target.value);
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTechnology(e.target.value);
  };

  const handleAudioClick = (audioType: string) => {
    setSelectedAudio(selectedAudio === audioType ? '' : audioType);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-amber-400 text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-amber-400">Carregando...</div>}>
      <main>
        {/* ===== BANNER ===== */}
        <Slide options={{ loop: true }} plugins={[autoplay(2000)]}>
          <Slide.Track>
            {banner.map((item) => (
              <Slide.Item key={item.id}>
                <div className="relative max-w-490 m-auto">
                  {isMobile ? (
                    <img
                      src={item.bannerMobile}
                      alt={item.title}
                      className="w-full h-screen object-cover"
                    />
                  ) : (
                    <img
                      src={item.bannerDesktop}
                      alt={item.title}
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
                            value={4.5}
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
                            Drama
                          </strong>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere quaerat placeat aperiam modi voluptatibus
                          tenetur, ipsum esse ipsa doloremque iste repellendus
                          minus dolorum dolore explicabo? Voluptates veniam
                          necessitatibus nihil incidunt.
                        </p>
                      </div>
                      <div>
                        <CtaButton href={item.slug}>{text.ctaCompra}</CtaButton>
                      </div>
                    </div>
                  </section>
                </div>
              </Slide.Item>
            ))}
          </Slide.Track>
          <Slide.Dots />
        </Slide>

        {isMobile && <Divider />}

        {/* ===== SEÇÃO 2 ===== */}
        <section
          className="py-14 md:py-32 overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-black/95 before:to-transparent
          before:pointer-events-none before:z-10"
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
                  '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
                  '(min-width: 768px)': { slides: { perView: 3, spacing: 16 } },
                  '(min-width: 1024px)': {
                    slides: { perView: 5, spacing: 20 },
                  },
                },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {listMovie.releases.map((item, i) => (
                  <Slide.Item key={item.id}>
                    <CardMovie index={i} {...item} ranking={true} />
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>
          </div>
        </section>

        {/* ===== SEÇÃO 3 ===== */}
        <section
          className="py-14 md:py-32 bg-neutral-700 overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-neutral-700/95 before:to-transparent
          before:pointer-events-none before:z-10"
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
                  '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
                  '(min-width: 768px)': { slides: { perView: 3, spacing: 16 } },
                  '(min-width: 1024px)': {
                    slides: { perView: 5, spacing: 20 },
                  },
                },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {listMovie.streaming.map((item, i) => (
                  <Slide.Item key={item.id}>
                    <CardMovie index={i} {...item} ranking={false} />
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>
          </div>
        </section>

        {!isMobile && <Divider />}

        {/* ===== SEÇÃO 4 - CINEMA ===== */}
        <section className="py-14 md:py-32 overflow-hidden">
          <div className="container max-w-490 m-auto p-3.5 md:px-12">
            <h2
              className="text-2xl md:text-4xl 2xl:text-5xl mb-6 md:mb-12 text-amber-400"
              dangerouslySetInnerHTML={{ __html: text.secao4 }}
            />

            <div className="grid grid-cols-2 grid-rows-3 gap-2 mb-5 xl:grid-cols-6 lg:grid-rows-1 items-center">
              {/* Pesquisa */}
              <div>
                <input
                  type="text"
                  name="pesquisar"
                  id="pesquisar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-2 border border-amber-400 placeholder-amber-400! bg-black text-amber-400 text-sm rounded"
                  placeholder="Pesquisar filmes..."
                />
              </div>

              {/* Gênero */}
              <div>
                <select
                  name="genero"
                  id="genero"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
                >
                  <option value="">Todos os gêneros</option>
                  {filterOptions.genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cinema */}
              <div>
                <select
                  name="cinema"
                  id="cinema"
                  value={selectedCinema}
                  onChange={handleCinemaChange}
                  className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
                >
                  <option value="">Todos os cinemas</option>
                  {filterOptions.cinemas.map((cinema) => (
                    <option key={cinema} value={cinema}>
                      {cinema}
                    </option>
                  ))}
                </select>
              </div>

              {/* Áudio */}
              <div className="grid grid-cols-2 gap-2 items-center">
                <button
                  className={`w-full p-2 border rounded transition ${
                    selectedAudio === 'Dublado'
                      ? 'border-amber-400 bg-amber-400 text-black'
                      : 'border-amber-400 bg-black text-amber-400'
                  }`}
                  onClick={() => handleAudioClick('Dublado')}
                >
                  Dublado
                </button>
                <button
                  className={`w-full p-2 border rounded transition ${
                    selectedAudio === 'Legendado'
                      ? 'border-amber-400 bg-amber-400 text-black'
                      : 'border-amber-400 bg-black text-amber-400'
                  }`}
                  onClick={() => handleAudioClick('Legendado')}
                >
                  Legendado
                </button>
              </div>

              {/* Tecnologia */}
              <div>
                <select
                  name="tecnologia"
                  id="tecnologia"
                  value={selectedTechnology}
                  onChange={handleTechnologyChange}
                  className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
                >
                  <option value="">Tecnologia</option>
                  {filterOptions.technologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botões */}
              <div>
                <button
                  onClick={clearFilters}
                  className="w-full p-2 border border-amber-400 bg-amber-400 text-black text-sm rounded"
                >
                  limpar filtros
                </button>
              </div>
            </div>

            {/* Versão Mobile - Slide com key baseada no timestamp para forçar recriação quando necessário */}
            <div className="mb-5 md:hidden">
              {filteredMovies.length > 0 ? (
                <Slide
                  key={`mobile-slide-${filteredMovies.length}-${Date.now()}`}
                  options={{
                    loop: false,
                    mode: 'free-snap',
                    slides: { perView: 2, spacing: 20 },
                  }}
                >
                  <Slide.Track style={{ overflow: 'visible' }}>
                    {filteredMovies.map((movie: any) => (
                      <Slide.Item key={movie.id}>
                        <CardMovie {...movie} />
                      </Slide.Item>
                    ))}
                  </Slide.Track>
                </Slide>
              ) : (
                <div className="text-center text-amber-400 py-8">
                  Nenhum filme encontrado
                </div>
              )}
            </div>

            {/* Versão Desktop - Grid com filmes filtrados e paginados */}
            <div className="hidden md:block">
              {filteredMovies.length > 0 ? (
                <>
                  <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 xl:grid-cols-6">
                    {filteredMovies
                      .slice(first, first + rows)
                      .map((movie: any) => (
                        <CardMovie key={movie.id} {...movie} />
                      ))}
                  </div>

                  {/* Paginator */}
                  {filteredMovies.length > rows && (
                    <div className="mt-8 flex justify-center cursor-pointer">
                      <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={filteredMovies.length}
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
                </>
              ) : (
                <div className="text-center text-amber-400 py-12 text-xl">
                  Nenhum filme encontrado com os filtros selecionados
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 5 - FORMULÁRIO ===== */}
        <section>
          <div className="">
            <div className="md:grid grid-cols-2 gap-8 items-center">
              <div
                className="relative mb-8 md:mb-0
                  before:content-[''] before:absolute before:top-0 before:right-0
                  before:h-full before:w-full
                  before:bg-linear-to-t before:from-black/95 before:to-transparent
                  before:pointer-events-none before:z-10 md:before:content-none"
              >
                <img
                  src={text.secao5.img.src}
                  alt={text.secao5.img.alt}
                  className="w-full md:h-screen object-cover relative"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 md:hidden">
                  <h2 className="text-2xl font-bold mb-2.5 text-white">
                    {text.secao5.title}
                  </h2>
                  <p className="text-white/90">{text.secao5.description}</p>
                </div>
              </div>

              <div className="px-4 md:px-8">
                <div className="hidden md:block mb-8">
                  <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-4 text-white">
                    {text.secao5.title}
                  </h2>
                  <p className="text-white/80">{text.secao5.description}</p>
                </div>

                <form action="" className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block mb-1">
                      <span className="text-blue-600 font-medium">Nome:</span>
                    </label>
                    <input
                      id="nome"
                      type="text"
                      className="w-full px-4 py-2.5 bg-black border border-blue-600 rounded-lg text-white focus:border-b-blue-600 focus:outline-none transition"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tel" className="block mb-1">
                        <span className="text-blue-600 font-medium">
                          Telefone:
                        </span>
                      </label>
                      <input
                        id="tel"
                        type="tel"
                        className="w-full px-4 py-2.5 bg-black border border-blue-600 rounded-lg text-white focus:border-blue-600 focus:outline-none transition"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1">
                        <span className="text-blue-600 font-medium">
                          Email:
                        </span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2.5 bg-black border border-blue-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-14 md:0">
                    <label className="flex items-start gap-3 cursor-pointer select-none max-w-xl group">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                      <div
                        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                          ${checked ? 'border-blue-600' : 'border-white/30'}`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-blue-600 transition-all duration-200
                            ${checked ? 'scale-100' : 'scale-0'}`}
                        />
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm text-white peer-checked:text-blue-400 transition-colors">
                          Eu aceito receber newsletters
                        </p>
                        <p className="text-xs text-white/60">
                          Lorem ipsum dolor sit amet, consectetur incididunt ut
                          labore et dolore magna.
                        </p>
                      </div>
                    </label>
                    <CtaButton disabled={!checked}>cadastrar</CtaButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 6 - LANÇAMENTOS ===== */}
        <section
          className="py-14 md:py-32 bg-neutral-700 overflow-hidden relative
          before:content-[''] before:absolute before:top-0 before:right-0
          before:h-full before:w-24 md:before:w-40
          before:bg-linear-to-l before:from-neutral-700/95 before:to-transparent
          before:pointer-events-none before:z-10"
        >
          <div className="container max-w-490 m-auto px-12">
            <Slide
              options={{
                loop: true,
                mode: 'free-snap',
                slides: { perView: 1, spacing: 20 },
                breakpoints: {
                  '(min-width: 768px)': {
                    slides: { perView: 'auto', spacing: 20 },
                  },
                },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {mook.lancamentos.map((item) => (
                  <Slide.Item key={item.id} className="md:w-auto!">
                    <div className="bg-black rounded-lg overflow-hidden bg-radial-[ellipse_at_360%_360%] from-blue-600 to-black to-100% h-full">
                      <div
                        onClick={() =>
                          setOpenId(openId === item.id ? null : item.id)
                        }
                        className="
                          group relative
                          flex flex-row items-center justify-center
                          px-4 h-36 w-full
                          md:px-6 md:h-45 md:w-auto
                          transition-all duration-300 ease-out
                          cursor-pointer
                        "
                      >
                        {/* LOGO */}
                        <div className="shrink-0 flex items-center justify-center w-full md:w-28">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="max-w-20 max-h-16 md:max-w-28 md:max-h-24 object-contain"
                          />
                        </div>

                        {/* CONTENT */}
                        <div
                          className={`
                            flex flex-col justify-center overflow-hidden
                            transition-all duration-300 ease-out
                            md:max-w-0 md:opacity-0
                            md:group-hover:max-w-xs md:group-hover:opacity-100
                            ${
                              openId === item.id
                                ? 'max-w-xs opacity-100'
                                : 'max-w-0 opacity-0'
                            }
                          `}
                        >
                          <div className="flex flex-col whitespace-nowrap pl-4 md:pl-6">
                            <span className="text-white text-xs md:text-sm font-semibold mb-2 md:mb-3">
                              próximos lançamentos
                            </span>
                            <div className="flex flex-col gap-1">
                              {item.list.map((movie) => (
                                <span
                                  key={movie.id}
                                  className="text-white/70 text-xs"
                                >
                                  {movie.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default Home;
