// components/feature/movie/FilmSessions.tsx
'use client';

import { Slide } from '@/component';
import { DateBadge } from './DateBadge';
import { findStateName } from './helpers';
import { GroupedSession } from './types';
import { StateCitiesResponse, SessionsResponse, Movie } from '@/models';

type FilmSessionsProps = {
  movie: Movie;
  listSessionLocation: StateCitiesResponse | undefined;
  selectedState: string;
  setSelectedState: (state: string) => void;
  city: string | null;
  setCity: (city: string | null) => void;
  listSessions: SessionsResponse | null | undefined;
  isLoadingSessions: boolean;
  isFetching: boolean;
  isInitialLoad: boolean;
  isErrorSessions: boolean;
  activeDate: string;
  setActiveDate: (date: string) => void;
  availableDates: string[];
  groupedSessions: GroupedSession[];
};

export function FilmSessions({
  movie,
  listSessionLocation,
  selectedState,
  setSelectedState,
  city,
  setCity,
  listSessions,
  isLoadingSessions,
  isFetching,
  isInitialLoad,
  isErrorSessions,
  activeDate,
  setActiveDate,
  availableDates,
  groupedSessions,
}: FilmSessionsProps) {
  if (!movie.hasSession) return null;

  return (
    <div className="container m-auto px-9 md:px-0">
      {/* Location Selectors */}
      <div className="grid gap-4 md:grid-cols-2 mb-6 md:mb-12">
        <select
          className="w-full p-3 border border-blue-600 text-blue-600 rounded"
          value={selectedState}
          onChange={({ target }) => {
            setSelectedState(target.value);
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

      {/* Date Badges */}
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
              <Slide.Item key={date} className="overflow-visible! md:w-auto!">
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

      {/* Sessions List */}
      {listSessions?.sessions && listSessions.sessions.length > 0 && (
        <div className="py-12">
          {/* Sessions content - simplified for brevity */}
          <div className="flex flex-col gap-6">
            {isLoadingSessions || isFetching || isInitialLoad ? (
              <div className="space-y-6">{/* Loading skeletons */}</div>
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
                  {/* Session card content */}
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
      )}
    </div>
  );
}
