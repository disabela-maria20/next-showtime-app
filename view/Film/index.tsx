'use client';

import { Image } from 'primereact/image';
import { autoplay, CtaButton, Divider, Slide, StreamButton } from '@/component';
import { Rating } from 'primereact/rating';
import React, { Suspense, useMemo, useState } from 'react';
import text from '../../services/localization/pt.json';
import useIsMobile from '@/hooks/useIsMobile';
import mook from './mook.json';
import { Movie, SessionsByDate } from '@/services/models';
import { useFormattedDate } from '@/hooks/useFormattedDate';

type MovieProps = {
  movie: Movie;
  sessions: SessionsByDate[];
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
      className={`cursor-pointer border-2 rounded px-3 py-2 text-center transition md:w-28
      ${active ? 'border-blue-600 text-blue-600' : 'border-b-neutral-400 text-neutral-400'}`}
    >
      <p className="font-bold text-xs md:text-sm">
        {isToday ? 'HOJE' : weekDay}
      </p>
      <p className="text-xs">{numericDate}</p>
    </button>
  );
};

const Film = ({ movie, sessions }: MovieProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [activeDate, setActiveDate] = useState<string>(today);

  const { isMobile } = useIsMobile();

  const filteredSessions = sessions?.find((item) => item.date === activeDate);

  // 🔥 Agrupamento por cinema
  const groupedSessions = useMemo(() => {
    if (!filteredSessions?.sessions) return [];

    const map = new Map();

    filteredSessions.sessions.forEach((session) => {
      const key = session.theaterName;

      if (!map.has(key)) {
        map.set(key, {
          ...session,
          times: [],
        });
      }

      map.get(key).times.push({
        hour: session.hour,
        link: session.link,
        link_cinemark: session.link_cinemark,
        link_ingresso: session.link_ingresso,
      });
    });

    // Ordena horários
    return Array.from(map.values()).map((cinema) => ({
      ...cinema,
      times: cinema.times.sort((a: any, b: any) =>
        a.hour.localeCompare(b.hour)
      ),
    }));
  }, [filteredSessions]);

  return (
    <Suspense fallback="Carregando">
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
              className="w-full h-full object-cover "
            />
            <div className="pt-5">
              <StreamButton fullWidth variant="warning">
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
                <p className="font-bold ">{movie.cast}</p>
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
                  <Slide.Item key={i}>
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
        <div className="container m-auto px-9 md:px-0">
          <h2
            className="text-2xl md:text-4xl 2xl:text-5xl mb-6 md:mb-12 text-blue-600"
            dangerouslySetInnerHTML={{ __html: text.secao4 }}
          />
          <Slide
            options={{
              loop: false,
              mode: 'free-snap',
              slides: { perView: 'auto', spacing: 20 },
            }}
          >
            <Slide.Track style={{ overflow: 'visible' }}>
              {sessions.map((date) => (
                <Slide.Item key={date.date} className="overflow-visible!">
                  <DateBadge
                    date={date.date}
                    active={activeDate === date.date}
                    onClick={() => setActiveDate(date.date)}
                  />
                </Slide.Item>
              ))}
            </Slide.Track>
          </Slide>
        </div>
        {/* ================= LISTAGEM ================= */}
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

                <select className="w-full p-3  border border-blue-600 text-blue-600 rounded">
                  <option>Gênero</option>
                </select>

                <select className="w-full p-3  border border-blue-600 text-blue-600 rounded">
                  <option>Cinema</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-blue-600 text-blue-600 p-2 rounded">
                    Dublado
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded">
                    Legendado
                  </button>
                </div>

                <select className="w-full p-3  border border-blue-600 text-blue-600 rounded">
                  <option>Tecnologia</option>
                </select>

                <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
                  Buscar Filmes
                </button>
              </div>
            </aside>
            <div className="flex-1 flex flex-col gap-6">
              {groupedSessions.map((session, index) => (
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
                        Sala  VIP
                      </span>
                    </div>
                  </div>

                  {/* Cinema */}
                  <div className="flex-1 bg-neutral-800 rounded-bl-3xl rounded-tl-3xl px-5 py-8">
                    <div className="flex flex-col md:flex-row justify-between ">
                      <div className="w-full md:w-1/2">
                        <h2 className="text-xl font-bold">
                          {session.theaterName}
                        </h2>

                        <p className="text-sm">
                          {session.address}, {session.number} | {session.city} -{' '}
                          {session.state}
                        </p>
                        <div className="mt-7">
                          <span className="bg-blue-600 text-white px-1.5 py-1 rounded">
                            Dublado
                          </span>
                        </div>
                        {/* Horários */}
                        <div className="mt-7 flex flex-wrap gap-3">
                          {session.times.map((time: any, i: number) => (
                            <a
                              key={i}
                              href={
                                time.link_ingresso ||
                                time.link ||
                                time.link_cinemark
                              }
                              target="_blank"
                              className="font-bold border border-blue-600 px-2.5 py-1.5 rounded-md text-blue-600 transition-all hover:bg-blue-600 hover:text-neutral-800"
                            >
                              {time.hour.slice(0, 5)}
                            </a>
                          ))}
                        </div>
                      </div>
                       <div className="flex flex-row md:flex-col gap-5 items-center mt-7 justify-center md:justify-normal">
                          <a href="">
                            <img
                              src="/img/icon/plus.png"
                              alt="plus"
                              className={`${session.isImax ? 'grayscale-0' : 'grayscale'}`}
                            />
                          </a>
                          <a href="">
                            <img
                              src="/img/icon/braco-de-cadeira.png"
                              alt="braco de cadeira"
                              className={`${session.isImax ? 'grayscale-0' : 'grayscale'}`}
                            />
                          </a>
                          <a href="">
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
              ))}

              {!groupedSessions.length && (
                <p className="text-neutral-400">
                  Nenhuma sessão disponível para esta data.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Film;
