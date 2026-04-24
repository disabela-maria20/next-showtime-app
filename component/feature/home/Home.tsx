'use client';

import { HomeHero } from './HomeHero';
import { HomeProps } from '../types';
import { Divider, Newsletter } from '@/component';
import useIsMobile from '@/hooks/useIsMobile';
import { Top10Section } from './Top10Section';
import { NewsSection } from './NewsSection';
import mook from '../../../services/mook/index.json';
import DebutSection from './DebutSection';
import { CinemaSection } from './CinemaSection';
import { useMovieFilters } from '../hook/useMovieFilters';
import { ReleasesSection } from './ReleasesSection';

const Home = ({ banner, listMovie }: HomeProps) => {
  const { isMobile } = useIsMobile();
  const {
    filters,
    filteredMovies,
    filterOptions,
    first,
    rows,
    updateFilter,
    clearFilters,
    onPageChange,
  } = useMovieFilters(listMovie.streaming);
  return (
    <main>
      <HomeHero banner={banner} isMobile={isMobile} />
      {isMobile && <Divider />}
      <Top10Section listMovie={listMovie} />
      <NewsSection noticias={mook.noticias} />
      <DebutSection listMovie={listMovie} />
      {!isMobile && <Divider />}

      <CinemaSection
        filteredMovies={filteredMovies}
        filterOptions={filterOptions}
        filters={filters}
        first={first}
        rows={rows}
        onPageChange={onPageChange}
        onUpdateFilter={updateFilter}
        onClearFilters={clearFilters}
      />
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
                src="/img/section5.png"
                alt="Imagem de um grupo de pessoas assistindo a um filme no cinema"
                className="w-full md:h-screen object-cover relative"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 md:hidden">
                <h2 className="text-2xl font-bold mb-2.5 text-white">
                  "entre nessa comunidade."
                </h2>
                <p className="text-white/90">"Eu aceito receber newsletters"</p>
              </div>
            </div>

            <div className="px-4 md:px-8">
              <div className="hidden md:block mb-8">
                <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold mb-4 text-white">
                  Eu aceito receber newsletters
                </h2>
                <p className="text-white/80">
                  Lorem ipsum dolor sit amet, consectetur incididunt ut labore
                  et dolore magna.
                </p>
              </div>

              <Newsletter />
            </div>
          </div>
        </div>
      </section>
      <ReleasesSection />
    </main>
  );
};

export default Home;
