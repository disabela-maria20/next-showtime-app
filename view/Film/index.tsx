'use client';

import { Image } from 'primereact/image';
import { autoplay, CtaButton, Divider, Slide, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import React, { Suspense, useMemo, useState, useEffect } from 'react';
import text from '../../services/localization/pt.json';
import useIsMobile from '@/hooks/useIsMobile';
import mook from './mook.json';
import {
  BRAZILIAN_STATES,
  Movie,
  SessionsByDate,
  Session,
  SessionsResponse,
  SessionLocationResponse,
  SessionLocationByDate,
  SessionLocation,
  StateCitiesResponse,
} from '@/services/models';
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { useQuery } from '@tanstack/react-query';
import {
  getSessionLocationsByMovie,
  getSessionsByMovieAndCity,
} from '@/services/api';
import { useLocationStore } from '@/services/store/locationStore';

type MovieProps = {
  movie: Movie;
};

type GroupedSession = {
  theaterName: string;
  address: string;
  number?: string;
  city: string;
  state: string;
  technology: string;
  isImax: boolean;
  times: {
    hour: string;
    link?: string;
    link_cinemark?: string;
    link_ingresso?: string;
  }[];
};

function findStateName(sigla: string): string {
  return (
    BRAZILIAN_STATES[sigla as keyof typeof BRAZILIAN_STATES] ??
    'Estado não encontrado'
  );
}

const DateBadge = ({
  date,
  active,
  onClick,
  disabled = false,
}: {
  date: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) => {
  const { weekDay, numericDate, isToday } = useFormattedDate(date);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer border-2 rounded px-3 py-2 text-center transition md:w-28
      ${active ? 'border-blue-600 text-blue-600' : 'border-b-neutral-400 text-neutral-400'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <p className="font-bold text-xs md:text-sm">
        {isToday ? 'HOJE' : weekDay}
      </p>
      <p className="text-xs">{numericDate}</p>
    </button>
  );
};

const Film = ({ movie }: MovieProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [activeDate, setActiveDate] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('');
  const { isMobile } = useIsMobile();

  const { city, state: storedState, setCity, consent } = useLocationStore();

  // Sincroniza selectedState com o estado do store (geolocalização)
  useEffect(() => {
    if (storedState) setSelectedState(storedState);
  }, [storedState]);

  const {
    data: listSessionLocation,
    isLoading: isLoadingSessionLocation,
    isError: isErrorSessionLocation,
  } = useQuery({
    queryKey: ['listSessionLocation', movie.slug],
    queryFn: () =>
      getSessionLocationsByMovie(movie.slug) as Promise<StateCitiesResponse>,
    enabled: !!movie.slug,
  });

  const isCityExists = useMemo(
    () =>
      city && listSessionLocation?.some((data) => data.cities.includes(city)),
    [city, listSessionLocation]
  );
  console.log(consent === 'denied' ||
            !!isCityExists);
  
  useEffect(() => {
    if (city && listSessionLocation && !selectedState) {
      const foundState = listSessionLocation.find((item) =>
        item.cities.includes(city)
      );
      if (foundState) setSelectedState(foundState.state);
    }
  }, [city, listSessionLocation, selectedState]);

  const {
    data: listSessions,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
    isFetching,
  } = useQuery({
    queryKey: ['listSessions', movie.slug, city],
    queryFn: () =>
      city
        ? (getSessionsByMovieAndCity(
            movie.slug,
            city
          ) as unknown as SessionsResponse)
        : Promise.resolve(null),
    enabled: !!city && !!movie.slug,
  });

  const availableDates = useMemo(() => {
    return listSessions?.sessions?.map((item) => item.date) || [];
  }, [listSessions]);

  useEffect(() => {
    if (availableDates.length > 0 && isInitialLoad) {
      const todayAvailable = availableDates.includes(today);
      setActiveDate(todayAvailable ? today : availableDates[0]);
      setIsInitialLoad(false);
    }
  }, [availableDates, today, isInitialLoad]);

  // Reseta isInitialLoad quando cidade muda para reprocessar datas
  useEffect(() => {
    setIsInitialLoad(true);
    setActiveDate('');
  }, [city]);

  const filteredSessions = useMemo(() => {
    if (
      !listSessions?.sessions ||
      !Array.isArray(listSessions.sessions) ||
      !activeDate
    ) {
      return null;
    }

    return (
      listSessions.sessions.find((item) => item.date === activeDate) || null
    );
  }, [listSessions, activeDate]);

  const groupedSessions: GroupedSession[] = useMemo(() => {
    if (!filteredSessions?.sessions) return [];

    const map = new Map<string, GroupedSession>();

    filteredSessions.sessions.forEach((session: Session) => {
      const key = session.theaterName;

      if (!map.has(key)) {
        map.set(key, {
          theaterName: session.theaterName,
          address: session.address,
          number: session.number,
          city: session.city,
          state: session.state,
          technology: session.technology,
          isImax: session.isImax || false,
          times: [],
        });
      }

      const currentCinema = map.get(key);
      if (currentCinema) {
        currentCinema.times.push({
          hour: session.hour,
          link: session.link,
          link_cinemark: session.link_cinemark,
          link_ingresso: session.link_ingresso,
        });
      }
    });

    return Array.from(map.values()).map((cinema) => ({
      ...cinema,
      times: cinema.times.sort((a, b) => a.hour.localeCompare(b.hour)),
    }));
  }, [filteredSessions]);

  const hasActiveDateSessions = useMemo(() => {
    return groupedSessions.length > 0;
  }, [groupedSessions]);


  const shouldShowLocationSelector = consent === 'denied' || !!isCityExists;
  console.log(listSessions?.sessions === undefined);
  
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {/* ================= HERO ================= */}
      <section
        className="relative max-w-490 m-auto w-full aspect-video bg-cover bg-center bg-no-repeat pt-44 md:pt-36 xl:h-screen flex items-center"
        style={{
          backgroundImage: `url(${
            isMobile ? movie.bannerMobile : movie.bannerDesktop
          })`,
        }}
      >
        <div className="md:container md:mx-auto">
          <div className="relative max-w-55 m-auto block md:hidden">
            <div
              className="
                absolute top-0 left-0 bg-amber-400 text-black font-bold text-2xl
                w-8 h-8 flex items-center justify-center rounded-br-lg z-10
                transition-all duration-500
                group-hover:scale-110
                group-active:scale-110
              "
            >
              <i className="pi pi-heart"></i>
            </div>
            <img
              src={movie.cover}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="pt-5">
              <StreamButton fullWidth variant="amber">
                Comprar ingresso
              </StreamButton>
            </div>
          </div>
          <div className="flex flex-col gap-7 md:flex-row md:items-end justify-between px-11 pb-10 md:px-0">
            <div className="flex flex-col gap-4 md:max-w-2xl mt-11">
              <h2 className="text-4xl text-center md:text-left font-bold md:text-6xl">
                {movie.title}
              </h2>
              <div className="flex flex-row justify-center md:justify-normal gap-4 items-center">
                <Rating
                  value={mook.star}
                  cancel={false}
                  cancelIcon={''}
                  onIcon={<i className="pi pi-star-fill text-amber-400"></i>}
                  offIcon={<i className="pi pi-star-fill text-white"></i>}
                />
                <strong className="block text-center md:text-left font-bold text-lg">
                  {movie.genre}
                </strong>
              </div>
              <div className="md:text-[18px]">
                <h3>Direção: </h3>
                <p className="font-bold">{movie.director}</p>
              </div>
              <div className="md:text-[18px]">
                <h3>Elenco: </h3>
                <p className="font-bold">{movie.cast}</p>
              </div>
              <p className="md:text-[18px]">{movie.synopsis}</p>
            </div>
            <div className="hidden md:block">
              <CtaButton href="/">{text.ctaCompra}</CtaButton>
            </div>
          </div>
        </div>
      </section>

      <Divider />
      <section className="overflow-hidden">
        <div className="px-9 md:grid md:grid-cols-3 py-12 gap-9">
          <div>
            <h2 className="font-extrabold pb-3.5 text-[18px] md:text-3xl">
              assista ao trailer
            </h2>
            <div className="w-full">
              <iframe
                className="w-full aspect-video"
                src={`${movie.trailer}?enablejsapi=1&origin=diamondfilms.com.br`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-extrabold pb-3.5 text-[18px] md:text-3xl">
              galeria
            </h2>
            <Slide
              options={{
                loop: false,
                slides: { perView: 1, spacing: 12 },
                breakpoints: {
                  '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
                },
              }}
            >
              <Slide.Track
                style={{ overflow: isMobile ? 'visible' : 'hidden' }}
              >
                {movie?.images?.map((item, i) => (
                  <Slide.Item key={i} className="md:w-auto!">
                    <Image
                      src={typeof item === 'string' ? item : item.url || ''}
                      className="w-full object-cover"
                      preview
                      pt={{
                        image: () => {
                          return 'aspect-video object-cover rounded';
                        },
                      }}
                    />
                  </Slide.Item>
                ))}
              </Slide.Track>
              <Slide.Arrows />
            </Slide>
          </div>
        </div>

        {/* ================= DATES BADGES ================= */}
        <div className="container m-auto px-9 md:px-0">
          <h2
            className="text-2xl md:text-4xl 2xl:text-5xl mb-6 md:mb-12 text-blue-600"
            dangerouslySetInnerHTML={{ __html: text.secao4 }}
          />

          {
            (shouldShowLocationSelector && (
              <div className="grid gap-4 md:grid-cols-2 mb-6 md:mb-12">
                <select
                  className="w-full p-3 border border-blue-600 text-blue-600 rounded"
                  value={selectedState}
                  onChange={({ target }) => {
                    setSelectedState(target.value);
                    // Limpa cidade ao trocar estado
                    setCity(null);
                  }}
                >
                  <option value="" disabled>
                    Estado
                  </option>
                  {listSessionLocation
                    ?.sort((a, b) => a.state.localeCompare(b.state))
                    ?.map((data) => (
                      <option key={data.state} value={data.state}>
                        {findStateName(data.state)}
                      </option>
                    ))}
                </select>

                <select
                  className="w-full p-3 border border-blue-600 text-blue-600 rounded"
                  value={city || ''}
                  onChange={({ target }) => {
                    if (target.value) setCity(target.value);
                  }}
                >
                  <option value="" disabled>
                    Cidade
                  </option>
                  {listSessionLocation
                    ?.find((item) => item.state === selectedState)
                    ?.cities.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((c: string) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
            ))}

          {isLoadingSessions ? (
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-28 h-20 bg-neutral-800 animate-pulse rounded"
                />
              ))}
            </div>
          ) : (
            <Slide
              options={{
                loop: false,
                mode: 'free-snap',
                slides: { perView: 'auto', spacing: 20 },
              }}
            >
              <Slide.Track style={{ overflow: 'visible' }}>
                {availableDates.map((date) => (
                  <Slide.Item
                    key={date}
                    className="overflow-visible! md:w-auto!"
                  >
                    <DateBadge
                      date={date}
                      active={activeDate === date}
                      onClick={() => setActiveDate(date)}
                    />
                  </Slide.Item>
                ))}
              </Slide.Track>
            </Slide>
          )}
        </div>

        {/* ================= LISTAGEM ================= */}
        {listSessions?.sessions && listSessions.sessions.length > 0 && (
          <div className="container mx-auto px-6 md:px-0 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-72">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  disabled
                  placeholder={movie.title}
                  className="w-full p-3 placeholder-blue-600! border border-blue-600 text-blue-600 rounded"
                />

                <select className="w-full p-3 border border-blue-600 text-blue-600 rounded">
                  <option>Gênero</option>
                </select>

                <select className="w-full p-3 border border-blue-600 text-blue-600 rounded">
                  <option>Cinema</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-blue-600 text-blue-600 p-2 rounded">
                    Normal
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded">
                    imax
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-blue-600 text-blue-600 p-2 rounded">
                    3D
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded">
                    D-Box
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-blue-600 text-blue-600 p-2 rounded">
                    Vip
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded">
                    Laser
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-blue-600 text-blue-600 p-2 rounded">
                    Dublado
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded">
                    Legendado
                  </button>
                </div>

                <select className="w-full p-3 border border-blue-600 text-blue-600 rounded">
                  <option>Tecnologia</option>
                </select>

                <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
                  Buscar Filmes
                </button>
              </div>
            </aside>
            <div className="flex-1 flex flex-col gap-6">
              {isLoadingSessions || isFetching || isInitialLoad ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-row gap-2.5 animate-pulse"
                    >
                      <div className="bg-neutral-800 rounded-br-3xl rounded-tr-3xl px-5 py-8 w-32">
                        <div className="h-8 bg-neutral-700 rounded mb-4"></div>
                        <div className="h-6 bg-neutral-700 rounded"></div>
                      </div>
                      <div className="flex-1 bg-neutral-800 rounded-bl-3xl rounded-tl-3xl px-5 py-8">
                        <div className="h-6 bg-neutral-700 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-neutral-700 rounded w-2/3 mb-4"></div>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4].map((j) => (
                            <div
                              key={j}
                              className="h-8 w-16 bg-neutral-700 rounded"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : isErrorSessions ? (
                <p className="text-red-500">
                  Erro ao carregar sessões. Tente novamente.
                </p>
              ) : !city ? (
                <p className="text-neutral-400">
                  Selecione um estado e cidade para ver as sessões disponíveis.
                </p>
              ) : groupedSessions.length > 0 ? (
                groupedSessions.map((session, index) => (
                  <div key={index} className="flex flex-row gap-2.5">
                    {/* Tecnologia */}
                    <div className="bg-neutral-800 rounded-br-3xl rounded-tr-3xl px-5 py-8 flex items-center gap-8 flex-col justify-center">
                      <h3
                        className={`text-2xl font-bold ${
                          session.technology === '3D'
                            ? 'text-blue-600'
                            : 'text-neutral-400'
                        }`}
                      >
                        {session.technology}
                      </h3>

                      <img
                        src="/img/logos/imax.png"
                        alt="Imax"
                        className={`${session.isImax ? '' : 'grayscale'}`}
                      />
                      <div>
                        <span
                          className={`text-sm w-2 font-bold ${session.isImax ? 'text-blue-600' : 'text-neutral-400'}`}
                        >
                          Sala VIP
                        </span>
                      </div>
                    </div>

                    {/* Cinema */}
                    <div className="flex-1 bg-neutral-800 rounded-bl-3xl rounded-tl-3xl px-5 py-8">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="w-full md:w-1/2">
                          <h2 className="text-xl font-bold">
                            {session.theaterName}
                          </h2>

                          <p className="text-sm">
                            {session.address}, {session.number} | {session.city}{' '}
                            - {findStateName(session.state)}
                          </p>
                          <div className="mt-7">
                            <span className="bg-blue-600 text-white px-1.5 py-1 rounded">
                              Dublado
                            </span>
                          </div>
                          {/* Horários */}
                          <div className="mt-7 flex flex-wrap gap-3">
                            {session.times.map((time, i) => {
                              const ticketLink =
                                time.link_ingresso ||
                                time.link ||
                                time.link_cinemark;
                              return ticketLink ? (
                                <a
                                  key={i}
                                  href={ticketLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold border border-blue-600 px-2.5 py-1.5 rounded-md text-blue-600 transition-all hover:bg-blue-600 hover:text-neutral-800"
                                >
                                  {time.hour.slice(0, 5)}
                                </a>
                              ) : (
                                <span
                                  key={i}
                                  className="font-bold border border-neutral-600 px-2.5 py-1.5 rounded-md text-neutral-600"
                                >
                                  {time.hour.slice(0, 5)}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col gap-5 items-center mt-7 justify-center md:justify-normal">
                          <a href="#" aria-label="Mais informações">
                            <img
                              src="/img/icon/plus.png"
                              alt="plus"
                              className={`${session.isImax ? 'grayscale-0' : 'grayscale'}`}
                            />
                          </a>
                          <a href="#" aria-label="Selecionar assento">
                            <img
                              src="/img/icon/braco-de-cadeira.png"
                              alt="braco de cadeira"
                              className={`${session.isImax ? 'grayscale-0' : 'grayscale'}`}
                            />
                          </a>
                          <a href="#" aria-label="Comprar ingresso">
                            <img
                              src="/img/icon/bilhete.png"
                              alt="bilhete"
                              className={`${session.isImax ? 'grayscale-0' : 'grayscale'}`}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-400">
                  Nenhuma sessão disponível para{' '}
                  {activeDate
                    ? new Date(activeDate).toLocaleDateString('pt-BR')
                    : 'esta data'}
                  .
                </p>
              )}
            </div>
          </div>
        </div>
        )}
        
      </section>
    </Suspense>
  );
};

export default Film;
