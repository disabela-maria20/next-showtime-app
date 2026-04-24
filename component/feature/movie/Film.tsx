// components/feature/movie/Film.tsx
'use client';

import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Divider, News, Slide, StreamButton } from '@/component';
import { useQuery } from '@tanstack/react-query';
import useIsMobile from '@/hooks/useIsMobile';
import {
  getSessionLocationsByMovie,
  getSessionsByMovieAndCity,
} from '@/services/api';
import mook from '@/services/mook/index.json';

import { MovieProps, GroupedSession } from './types';
import { truncate } from './helpers';
import { FilmHero } from './FilmHero';
import { FilmGallery } from './FilmGallery';
import { FilmSessions } from './FilmSessions';
import { SessionsResponse, StateCitiesResponse } from '@/models';
import { useLocationStore } from '@/store/locationStore';

export default function Film({ movie }: MovieProps) {
  const today = new Date().toISOString().split('T')[0];
  const [activeDate, setActiveDate] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('');

  const { isMobile } = useIsMobile();
  const { city, state: storedState, setCity, consent } = useLocationStore();

  useEffect(() => {
    if (storedState) setSelectedState(storedState);
  }, [storedState]);

  // Query para locais das sessões
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

  // Query para sessões
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

    filteredSessions.sessions.forEach((session) => {
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

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {/* Hero Section */}
      <FilmHero movie={movie} isMobile={isMobile} />

      <Divider />

      {/* Trailer & Gallery */}
      <section className="overflow-hidden bg-neutral-800">
        <div className="px-9 md:grid md:grid-cols-3 py-12 gap-9">
          {/* Trailer */}
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

          {/* Gallery */}
          <FilmGallery movie={movie} isMobile={isMobile} />
        </div>

        {/* Sessions */}
        <FilmSessions
          movie={movie}
          listSessionLocation={listSessionLocation}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          city={city}
          setCity={setCity}
          listSessions={listSessions}
          isLoadingSessions={isLoadingSessions}
          isFetching={isFetching}
          isInitialLoad={isInitialLoad}
          isErrorSessions={isErrorSessions}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          availableDates={availableDates}
          groupedSessions={groupedSessions}
        />

        {/* News Section */}
        <section className="pb-8 md:pb-16">
          <div className="container max-w-490 m-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch h-full">
              {mook.noticias.slice(0, 2).map((item) => (
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
              <StreamButton size="lg">Ver mais notícias</StreamButton>
            </div>
          </div>
        </section>
      </section>
    </Suspense>
  );
}
