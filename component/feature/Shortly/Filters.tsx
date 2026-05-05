// components/feature/shortly/ShortlyFilters.tsx
'use client';

import { Slide } from '@/component';

interface ShortlyFiltersProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreChange: (genre: string) => void;
}

export function ShortlyFilters({
  genres,
  selectedGenre,
  onGenreChange,
}: ShortlyFiltersProps) {
  return (
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
          {genres.map((genre) => (
            <Slide.Item key={genre} className="overflow-visible! md:w-auto!">
              <button
                className={`
                  py-2.5 px-6 rounded transition-color cursor-pointer
                  ${
                    selectedGenre === genre
                      ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                      : 'border border-neutral-700 text-white hover:bg-blue-700 hover:text-white'
                  }
                `}
                onClick={() => onGenreChange(genre)}
              >
                <span className="block whitespace-nowrap">{genre}</span>
              </button>
            </Slide.Item>
          ))}
        </Slide.Track>
      </Slide>
    </div>
  );
}
