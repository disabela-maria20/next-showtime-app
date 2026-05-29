'use client';

import { StreamButton } from '@/component';
import { FilterControlsProps } from '../types';

export const FilterControls = ({
  filterOptions,
  filters,
  onUpdateFilter,
  onClearFilters,
}: FilterControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-5 items-center max-w-[750px]">
      {/* Pesquisa */}
      <div className="md:col-span-5 min-w-0">
        <input
          type="text"
          name="pesquisar"
          id="pesquisar"
          value={filters.searchTerm}
          onChange={(e) => onUpdateFilter('searchTerm', e.target.value)}
          className="w-full p-2 border border-amber-400 placeholder-amber-400! bg-black text-amber-400 text-sm rounded"
          placeholder="Pesquisar filmes..."
        />
      </div>

      {/* Gênero */}
      <div className="md:col-span-3 min-w-0">
        <select
          name="genero"
          id="genero"
          value={filters.selectedGenre}
          onChange={(e) => onUpdateFilter('selectedGenre', e.target.value)}
          className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
        >
          <option value="">Todos os gêneros</option>
          {filterOptions.genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Botão */}
      <div className="md:col-span-4 min-w-0">
        <StreamButton onClick={onClearFilters} variant="amber" fullWidth>
          Limpar filtros
        </StreamButton>
      </div>
    </div>
  );
};
