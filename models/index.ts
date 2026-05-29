// ==========================
// 🎬 MOVIE
// ==========================

import { JSX } from 'react/jsx-runtime';
export interface FullMovieProps {
  releases: Array<Movie>;
  streaming: Array<Movie>;
  box_office_hits: Array<Movie>;
  coming_soon: Array<Movie>;
  release_week: Array<Movie>;
}

export interface Movie {
  id: number;
  title: string;
  slug: string;
  originalTitle: string;
  countryOrigin: string;
  contentRating: string;
  duration: number;
  synopsis: string;
  shortSynopsis: string;
  cast: string;
  director: string;
  genreId: number;
  genre: string;
  age: string;
  ageExplain: string;
  releaseDate: string;
  premiereDate: string;
  partnerCode: string;
  status: string;
  colorStatus: string;
  color: string;
  trailer: string;
  socialCampaign: string;
  cover: string;
  bannerLogo: string;
  bannerMobile: string;
  bannerDesktop: string;
  hasSession: boolean;
  vibezzMovieId: string;
  createdAt: string;

  videos: MediaUrl[];
  images: MediaUrl[];
  streaming: StreamingPlatform[];
}

export interface MovieDetails {
  movie: Movie;
  sessions: SessionsByDate[];
}

// ==========================
// 🎬 MEDIA
// ==========================

export interface MediaUrl {
  url: string;
}

export interface StreamingPlatform {
  platform: string;
}

// ==========================
// 🎟 SESSION (para sessões regulares)
// ==========================

export interface Session {
  date(date: any): unknown;
  distance: number;
  theaterName: string;
  technology: string;
  isImax: boolean;
  sessionHour: string;
  hour: string;

  link?: string;
  addressComplement?: string;
  number?: string;
  link_cinemark?: string;
  link_ingresso?: string;
  postalCode: string;
  address: string;
  city: string;
  state: string;
  stateName: string;

  lat: string;
  lng: string;

  hours: SessionHour[];
}

export interface SessionHour {
  hour: string;
  link: string;
}

export interface SessionsByDate {
  date: string;
  sessions: Session[];
}

export interface SessionsResponse {
  sessions: SessionsByDate[];
}

// ==========================
// 🎟 SESSION LOCATION (para getSessionLocationsByMovie)
// ==========================

export interface SessionLocation {
  exhibitor: string;
  date: string;
  hour: string;
  theaterName: string;
  link: string;
  alternative_link: string;
  link_cinemark: string;
  link_ingresso: string;
  technology: string;
  isImax: boolean;
  postalCode: string;
  address: string;
  lat: string;
  lng: string;
  addressComplement: string;
  number: string;
  city: string;
  state: string;
}

export interface SessionLocationByDate {
  date: string;
  sessions: SessionLocation[];
}

export interface SessionLocationResponse {
  sessions: SessionLocationByDate[];
}

// ==========================
// 🎯 BANNER
// ==========================

export interface Banner {
  id: number;
  title: string;
  slug: string;
  bannerDesktop: string;
  bannerMobile: string;
}

// ==========================
// 🇧🇷 ESTADOS
// ==========================

export type BrazilianStateCode =
  | 'AC'
  | 'AL'
  | 'AP'
  | 'AM'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MT'
  | 'MS'
  | 'MG'
  | 'PA'
  | 'PB'
  | 'PR'
  | 'PE'
  | 'PI'
  | 'RJ'
  | 'RN'
  | 'RS'
  | 'RO'
  | 'RR'
  | 'SC'
  | 'SP'
  | 'SE'
  | 'TO';

export const BRAZILIAN_STATES: Record<BrazilianStateCode, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

export type GeoLocationIp = {
  city?: string;
  regionName?: string;
  country?: string;
};
export interface StateCities {
  state: BrazilianStateCode;
  cities: string[];
}

export type StateCitiesResponse = StateCities[];

export interface NoticiasResponse {
  noticias: Noticia[];
}

export interface Noticia {
  id: number;
  publishedAt: string; // ISO date
  category: Category;
  content: Content;
  media: Media;
  highlight: Highlight;
}

export interface Category {
  label: string;
  slug: string;
}

export interface Content {
  title: string;
  description: string;
  slug: string;
  text: string;
}

export interface Media {
  type: string;
  src: string;
  alt: string;
}

export interface Highlight {
  id: number;
  title: string;
  slug: string;
  publishedAt: string; // ISO date
  releaseDate: string; // YYYY-MM-DD
  label: string;
  media: Media;
}
