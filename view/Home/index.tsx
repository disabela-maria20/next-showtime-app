'use client';
import useIsMobile from '@/hooks/useIsMobile';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import mook from './mook.json';
import { autoplay, CardMovie, CtaButton, Divider, Slide } from '@/component';
import { Rating } from 'primereact/rating';
import text from '../../services/localization/pt.json';
import Link from 'next/link';
import { useFormattedDate } from '@/hooks/useFormattedDate';

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
      className={`cursor-pointer border-2 rounded-xl px-3 py-2 text-center transition
      ${active ? 'border-amber-400 text-amber-400' : 'border-b-neutral-400 text-neutral-400'}`}
    >
      <p className="text-yellow-400 font-bold text-xs md:text-sm">
        {isToday ? 'HOJE' : weekDay}
      </p>
      <p className="text-xs">{numericDate}</p>
    </button>
  );
};

const Home = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
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
        {/* ===== BANNER ===== */}
        <Slide options={{ loop: true }} plugins={[autoplay(2000)]}>
          <Slide.Track>
            {mook.banner.map((item) => (
              <Slide.Item key={item.id}>
                <div className="relative max-w-490 m-auto">
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
                {mook.estreias.map((item) => (
                  <Slide.Item key={item.id}>
                    <CardMovie {...item} ranking={true} />
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

        {/* ===== SEÇÃO 4 - CINEMA ===== */}
        <section className="py-14 md:py-32 overflow-hidden">
          <div className="container max-w-490 m-auto p-3.5 md:px-12">
            <h2
              className="text-2xl md:text-4xl 2xl:text-5xl mb-6 md:mb-12 text-amber-400"
              dangerouslySetInnerHTML={{ __html: text.secao4 }}
            />
            <div className="mb-5">
              <Slide
                options={{
                  loop: false,
                  mode: 'free-snap',
                  slides: { perView: 'auto', spacing: 20 },
                }}
              >
                <Slide.Track style={{ overflow: 'visible' }}>
                  {dates.map((date) => (
                    <Slide.Item key={date} className="w-auto!">
                      <DateBadge
                        date={date}
                        active={activeDate === date}
                        onClick={() => setActiveDate(date)}
                      />
                    </Slide.Item>
                  ))}
                </Slide.Track>
              </Slide>
            </div>

            <div className="grid grid-cols-2 grid-rows-3 gap-2 mb-5 xl:grid-cols-6 lg:grid-rows-1">
              <div>
                <input
                  type="text"
                  name="pesquisar"
                  id="pesquisar"
                  className="w-full p-2 border border-amber-400 placeholder:text-amber-400 bg-black text-amber-400 text-sm rounded"
                  placeholder="Pesquisar filmes..."
                />
              </div>
              <div>
                <select
                  name="genero"
                  id="genero"
                  className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
                >
                  <option value="">Todos os gêneros</option>
                  <option value="acao">Ação</option>
                  <option value="comedia">Comédia</option>
                  <option value="drama">Drama</option>
                </select>
              </div>
              <div>
                <select
                  name="cinema"
                  id="cinema"
                  className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
                >
                  <option value="">Todos os cinemas</option>
                  <option value="cinema1">Cinema 1</option>
                  <option value="cinema2">Cinema 2</option>
                  <option value="cinema3">Cinema 3</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <button className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded">
                  Dublado
                </button>
                <button className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded">
                  Legendado
                </button>
              </div>
              <div>
                <select
                  name="cinema"
                  id="cinema"
                  className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
                >
                  <option value="">tecnologia</option>
                  <option value="cinema1">tecnologia 1</option>
                  <option value="cinema2">tecnologia 2</option>
                  <option value="cinema3">tecnologia 3</option>
                </select>
              </div>
              <div>
                <button className="w-full p-2 border border-amber-400 bg-amber-400 text-black text-sm rounded">
                  buscar filmes
                </button>
              </div>
            </div>

            <div className="mb-5 md:hidden">
              <Slide
                key={activeDate}
                options={{
                  loop: false,
                  mode: 'free-snap',
                  slides: { perView: 2, spacing: 20 },
                }}
              >
                <Slide.Track style={{ overflow: 'visible' }}>
                  {activeDate &&
                    moviesByDate[activeDate]?.map((movie: any) => (
                      <Slide.Item key={movie.id}>
                        <CardMovie {...movie} />
                      </Slide.Item>
                    ))}
                </Slide.Track>
              </Slide>
            </div>
            <div className="hidden md:flex gap-4 flex-wrap">
              {activeDate &&
                moviesByDate[activeDate]?.map((movie: any) => (
                  <CardMovie key={movie.id} {...movie} />
                ))}
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

                        {/* CONTENT - mobile: abre no click | desktop: abre no hover */}
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
