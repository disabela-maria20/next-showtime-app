// components/feature/movie/FilmGallery.tsx
'use client';

import { Image } from 'primereact/image';
import { Slide } from '@/component';
import { Movie } from '@/models';

type FilmGalleryProps = {
  movie: Movie;
  isMobile: boolean;
};

export function FilmGallery({ movie, isMobile }: FilmGalleryProps) {
  if (!movie?.images?.length) return null;

  return (
    <div className="md:col-span-2">
      <h2 className="font-extrabold pb-3.5 text-[18px] md:text-3xl">galeria</h2>
      <Slide
        options={{
          loop: false,
          slides: { perView: 1, spacing: 12 },
          breakpoints: {
            '(min-width: 640px)': {
              slides: { perView: 2, spacing: 16 },
            },
          },
        }}
      >
        <Slide.Track style={{ overflow: isMobile ? 'visible' : 'hidden' }}>
          {movie.images.map((item, i) => (
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
  );
}
