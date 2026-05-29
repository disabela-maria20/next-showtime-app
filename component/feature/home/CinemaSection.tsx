'use client';

import { Slide, CardMovie } from '@/component';
import { Paginator } from 'primereact/paginator';

import { FilterControls } from './FilterControls';
import { CinemaSectionProps } from '../types';
import { paginateMovies } from '../helpers';
import { useMovieFilters } from '../hook/useMovieFilters';

export const CinemaSection = ({
  filteredMovies,
  filterOptions,
  filters,
  first,
  rows,
  onPageChange,
  onUpdateFilter,
  onClearFilters,
}: CinemaSectionProps) => {
  const paginatedMovies = paginateMovies(filteredMovies, first, rows);

  const { isPending } = useMovieFilters(filteredMovies);
  return (
    <section className="py-14 md:py-32 overflow-hidden">
      <div className="container max-w-490 m-auto p-3.5 md:px-12">
        <div className=" md:flex items-center md:justify-between">
          <h2 className="font-bold text-2xl md:text-4xl 2xl:text-5xl mb-6 md:mb-12 text-amber-400">
            SUCESSOS
          </h2>

          <FilterControls
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
            onClearFilters={onClearFilters}
          />
        </div>

        {isPending && 'Carregando'}
        {!isPending && (
          <>
            {/* Versão Mobile - Slide */}
            <div className="mb-5 md:hidden">
              {filteredMovies.length > 0 ? (
                <Slide
                  key={`mobile-slide-${filteredMovies.length}`}
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

            {/* Versão Desktop - Grid */}
            <div className="hidden md:block">
              {filteredMovies.length > 0 ? (
                <>
                  <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 xl:grid-cols-6">
                    {paginatedMovies.map((movie: any) => (
                      <CardMovie key={movie.id} {...movie} />
                    ))}
                  </div>

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
          </>
        )}
      </div>
    </section>
  );
};
