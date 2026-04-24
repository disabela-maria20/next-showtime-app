// components/feature/shortly/ShortlyNews.tsx
'use client';

import { News, StreamButton } from '@/component';
import { useTruncate } from '@/hooks/useTruncate';
import mook from '@/services/mook/index.json';

export function ShortlyNews() {
  const truncate = useTruncate();

  return (
    <section className="py-8 md:py-16 bg-neutral-800">
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
  );
}
