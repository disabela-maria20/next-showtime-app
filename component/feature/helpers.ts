// home/ts helpers.ts

import { Movie, FilterOptions, MovieFilters } from './types';

/**
 * Extrai opções únicas de filtro dos filmes
 */
export const extractFilterOptions = (movies: Movie[]): FilterOptions => {
  const genres = new Set<string>();
  const cinemas = new Set<string>();
  const technologies = new Set<string>();
  const audioOptions = new Set(['Dublado', 'Legendado']);

  movies.forEach((movie) => {
    if (movie.genre) genres.add(movie.genre);
    if ((movie as any).cinema) cinemas.add((movie as any).cinema);
    if ((movie as any).technology) technologies.add((movie as any).technology);
  });

  return {
    genres: Array.from(genres),
    cinemas: Array.from(cinemas),
    technologies: Array.from(technologies),
    audioOptions: Array.from(audioOptions),
  };
};

/**
 * Aplica todos os filtros aos filmes
 */
export const applyFiltersToMovies = (
  movies: Movie[],
  filters: MovieFilters
): Movie[] => {
  let result = [...movies];

  // Filtro por pesquisa
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    result = result.filter((movie) =>
      movie.title?.toLowerCase().includes(term)
    );
  }

  // Filtro por gênero
  if (filters.selectedGenre) {
    result = result.filter((movie) => movie.genre === filters.selectedGenre);
  }

  // Filtro por cinema
  if (filters.selectedCinema) {
    result = result.filter(
      (movie) => (movie as any).cinema === filters.selectedCinema
    );
  }

  // Filtro por áudio
  if (filters.selectedAudio) {
    result = result.filter(
      (movie) => (movie as any).audio === filters.selectedAudio
    );
  }

  // Filtro por tecnologia
  if (filters.selectedTechnology) {
    result = result.filter(
      (movie) => (movie as any).technology === filters.selectedTechnology
    );
  }

  return result;
};

/**
 * Formata a data para exibição
 */
export const formatReleaseDate = (date?: string): string => {
  if (!date) return 'Em breve';

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return new Date(date).toLocaleDateString('pt-BR', options);
};

/**
 * Calcula a duração formatada (minutos para horas e minutos)
 */
export const formatDuration = (minutes?: number): string => {
  if (!minutes) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

/**
 * Filtra filmes paginados
 */
export const paginateMovies = (
  movies: Movie[],
  first: number,
  rows: number
): Movie[] => {
  return movies.slice(first, first + rows);
};

/**
 * Valida se o filme tem todos os campos necessários
 */
export const isValidMovie = (movie: Movie): boolean => {
  return !!(movie.id && movie.title);
};

/**
 * Ordena filmes por data de lançamento (mais recentes primeiro)
 */
export const sortByReleaseDate = (movies: Movie[]): Movie[] => {
  return [...movies].sort((a, b) => {
    if (!a.releaseDate) return 1;
    if (!b.releaseDate) return -1;
    return (
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  });
};

/**
 * Agrupa filmes por gênero
 */
export const groupByGenre = (movies: Movie[]): Record<string, Movie[]> => {
  return movies.reduce(
    (acc, movie) => {
      const genre = movie.genre || 'Outros';
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(movie);
      return acc;
    },
    {} as Record<string, Movie[]>
  );
};
