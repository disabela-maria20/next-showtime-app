'use client';

import { useState, useMemo, useTransition } from 'react';
import { Movie } from '../types';
import { applyFiltersToMovies, extractFilterOptions } from '../helpers';

export const useMovieFilters = (movies: Movie[]) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedGenre: '',
    selectedCinema: '',
    selectedAudio: '',
    selectedTechnology: '',
  });

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);

  const [isPending, startTransition] = useTransition();

  const filterOptions = useMemo(() => extractFilterOptions(movies), [movies]);

  const filteredMovies = useMemo(() => {
    return applyFiltersToMovies(movies, filters);
  }, [movies, filters]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setFirst(0);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      setFilters({
        searchTerm: '',
        selectedGenre: '',
        selectedCinema: '',
        selectedAudio: '',
        selectedTechnology: '',
      });
      setFirst(0);
    });
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return {
    filters,
    filteredMovies,
    filterOptions,
    first,
    rows,
    isPending, // 👈 importante pra UX
    updateFilter,
    clearFilters,
    onPageChange,
  };
};
