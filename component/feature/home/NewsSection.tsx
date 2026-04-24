'use client';

import { Slide, News, StreamButton } from '@/component';
import { NewsSectionProps } from '../types';

export const NewsSection = ({ noticias }: NewsSectionProps) => (
  <section className="pb-14 md:pb-32">
    <div className="container max-w-490 m-auto px-12">
      <Slide options={{ loop: false, slides: { perView: 1, spacing: 12 } }}>
        <Slide.Track>
          {noticias.map((item) => (
            <Slide.Item key={item.id}>
              <News.Grid className="grid-cols-1 md:grid-cols-2 gap-4 items-start md:items-center md:gap-16 xl:gap-36">
                <div className="flex flex-col gap-7">
                  <News.Tag href={item.category.slug}>
                    {item.category.label}
                  </News.Tag>
                  <News.Title>{item.content.title}</News.Title>
                  <News.Description>
                    {item.content.description}
                  </News.Description>
                  <div className="flex flex-col items-center gap-3.5 md:flex-row md:items-center md:justify-between">
                    <StreamButton href={item.content.slug} size="lg">
                      Ver mais notícias
                    </StreamButton>
                    <Slide.Dots center={false} />
                  </div>
                </div>
                <div>
                  <News.Img
                    src={item.media.src}
                    alt={item.media.alt}
                    className="md:h-131"
                  />
                </div>
              </News.Grid>
            </Slide.Item>
          ))}
        </Slide.Track>
      </Slide>
    </div>
  </section>
);
