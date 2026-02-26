// ==========================
// 🎬 MOVIE
// ==========================

export interface Movie {
  id: number
  title: string
  slug: string
  originalTitle: string
  countryOrigin: string
  contentRating: string
  duration: number
  synopsis: string
  shortSynopsis: string
  cast: string
  director: string
  genreId: number
  genre: string
  age: string
  ageExplain: string
  releaseDate: string
  premiereDate: string
  partnerCode: string
  status: string
  colorStatus: string
  color: string
  trailer: string
  socialCampaign: string
  cover: string
  bannerLogo: string
  bannerMobile: string
  bannerDesktop: string
  hasSession: boolean
  vibezzMovieId: string
  createdAt: string

  videos: MediaUrl[]
  images: MediaUrl[]
  streaming: StreamingPlatform[]
}

export interface MovieDetails {
  movie: Movie
  sessions: Session[]
}

// ==========================
// 🎬 MEDIA
// ==========================

export interface MediaUrl {
  url: string
}

export interface StreamingPlatform {
  platform: string
}

// ==========================
// 🎟 SESSION
// ==========================

export interface Session {
  distance: number
  theaterName: string
  technology: string
  isImax: boolean
  sessionHour: string
  hour: string

  link?: string
  addressComplement?: string
  number?: string

  postalCode: string
  address: string
  city: string
  state: string
  stateName: string

  lat: string
  lng: string

  hours: SessionHour[]
}

export interface SessionHour {
  hour: string
  link: string
}

export interface SessionsByDate {
  date: string
  sessions: Session[]
}

export interface SessionsResponse {
  sessions: SessionsByDate[]
}

// ==========================
// 📍 LOCATION
// ==========================

export interface GeoLocation {
  latitude: number
  longitude: number
}

export interface StateCities {
  state: string
  cities: string[]
}

export interface MovieState {
  city: string
  state: string
}

export interface MovieStatesResponse {
  states: MovieState[]
}

// ==========================
// 🎯 BANNER
// ==========================

export interface Banner {
  id: number
  title: string
  slug: string
  bannerDesktop: string
  bannerMobile: string
}

export interface BannerListResponse {
  banners: Banner[]
}

// ==========================
// 🇧🇷 ESTADOS
// ==========================

export type BrazilianStateCode =
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO'
  | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI'
  | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

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
  TO: 'Tocantins'
}