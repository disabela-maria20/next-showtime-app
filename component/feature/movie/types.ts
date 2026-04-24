// components/feature/movie/types.ts
import { Movie, Session } from '@/models';

export type MovieProps = {
  movie: Movie;
};

export type GroupedSession = {
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
