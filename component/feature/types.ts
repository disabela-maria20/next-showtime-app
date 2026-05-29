// home/ts types.ts
export interface HomeProps {
  banner: Array<Banner>;
  listMovie: FullMovieProps;
  top: FullMovieProps;
}
// Tipos de filtros
export interface FilterOptions {
  genres: string[];
  cinemas: string[];
  technologies: string[];
  audioOptions: string[];
}

export interface MovieFilters {
  searchTerm: string;
  selectedGenre: string;
  selectedCinema: string;
  selectedAudio: string;
  selectedTechnology: string;
}

// Props dos componentes
export interface HomeBannerProps {
  banner: Banner[];
  isMobile: boolean;
}

export interface Top10SectionProps {
  listMovie: FullMovieProps;
}

export interface SuccessSectionProps {
  listMovie: FullMovieProps;
}

export interface DebutHomeProps {
  listMovie: Movie[];
}

export interface NewsSectionProps {
  noticias: Noticia[];
}

export interface ComeHereProps {
  listMovie: FullMovieProps;
}

export interface StreamingSectionProps {
  streaming: Movie[];
  text: any;
}

export interface CinemaSectionProps {
  filteredMovies: Movie[];
  filterOptions: FilterOptions;
  filters: MovieFilters;
  first: number;
  rows: number;
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  onUpdateFilter: (key: keyof MovieFilters, value: string) => void;
  onClearFilters: () => void;
}

export interface ReleasesSectionProps {
  lancamentos: Lancamento[];
  openId: number | null;
  onToggleOpen: (id: number) => void;
}

export interface FilterControlsProps {
  filterOptions: FilterOptions;
  filters: MovieFilters;
  onUpdateFilter: (key: keyof MovieFilters, value: string) => void;
  onClearFilters: () => void;
}

export interface BannerResponse {
  banners: Banner[];
}

// Tipos de dados
export interface Banner {
  id: number;
  slug: string;
  title: string;
  description: string;
  partnerCode: string;
  bannerDesktop: string;
  bannerMobile: string;
  color: string;
  movieId: number;
  rating: number | null;
}

export interface Movie {
  id: number;
  title?: string;
  originalTitle?: string;
  synopsis?: string;
  director?: string;
  cast?: string;
  genre?: string;
  cinema?: string;
  audio?: string;
  technology?: string;
  poster?: string;
  backdrop?: string;
  releaseDate?: string;
  duration?: number;
  rating?: number;
}

export interface Noticia {
  id: number;
  category: {
    slug: string;
    label: string;
  };
  content: {
    title: string;
    description: string;
    slug: string;
  };
  media: {
    src: string;
    alt: string;
  };
}

export interface Lancamento {
  id: number;
  title: string;
  img: string;
  list: MovieLancamento[];
}

export interface MovieLancamento {
  id: number;
  title: string;
}

export interface ShortlyClientProps {
  movies: FullMovieProps;
}
import { FullMovieProps } from '@/models';
// Importações necessárias
import { PaginatorPageChangeEvent } from 'primereact/paginator';
