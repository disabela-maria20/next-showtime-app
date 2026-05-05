'use client';

import { StreamButton } from '@/component';
import { FilterControlsProps } from '../types';

export const FilterControls = ({
  filterOptions,
  filters,
  onUpdateFilter,
  onClearFilters,
}: FilterControlsProps) => {
  const handleAudioClick = (audioType: string) => {
    onUpdateFilter(
      'selectedAudio',
      filters.selectedAudio === audioType ? '' : audioType
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-2 mb-5 items-center">
      {/* Pesquisa */}
      <div className="xl:col-span-3 min-w-0">
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
      <div className="xl:col-span-2 min-w-0">
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

      {/* Cinema */}
      <div className="xl:col-span-2 min-w-0">
        <select
          name="cinema"
          id="cinema"
          value={filters.selectedCinema}
          onChange={(e) => onUpdateFilter('selectedCinema', e.target.value)}
          className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
        >
          <option value="">Todos os cinemas</option>
          {filterOptions.cinemas.map((cinema) => (
            <option key={cinema} value={cinema}>
              {cinema}
            </option>
          ))}
        </select>
      </div>

      {/* Dublado */}
      <div className="xl:col-span-1 min-w-0">
        <button
          className={`w-full p-2 border rounded transition truncate ${
            filters.selectedAudio === 'Dublado'
              ? 'border-amber-400 bg-amber-400 text-black'
              : 'border-amber-400 bg-black text-amber-400'
          }`}
          onClick={() => handleAudioClick('Dublado')}
        >
          Dublado
        </button>
      </div>

      {/* Legendado */}
      <div className="xl:col-span-1 min-w-0">
        <button
          className={`w-full p-2 border rounded transition truncate ${
            filters.selectedAudio === 'Legendado'
              ? 'border-amber-400 bg-amber-400 text-black'
              : 'border-amber-400 bg-black text-amber-400'
          }`}
          onClick={() => handleAudioClick('Legendado')}
        >
          Legendado
        </button>
      </div>

      {/* Tecnologia */}
      <div className="xl:col-span-1 min-w-0">
        <select
          name="tecnologia"
          id="tecnologia"
          value={filters.selectedTechnology}
          onChange={(e) => onUpdateFilter('selectedTechnology', e.target.value)}
          className="w-full p-2 border border-amber-400 bg-black text-amber-400 text-sm rounded"
        >
          <option value="">Tecnologia</option>
          {filterOptions.technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {/* Botão */}
      <div className="xl:col-span-2 min-w-0">
        <StreamButton onClick={onClearFilters} variant="amber" fullWidth>
          Limpar filtros
        </StreamButton>
      </div>
    </div>
  );
};
