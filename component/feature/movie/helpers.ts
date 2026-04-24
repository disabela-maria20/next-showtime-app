// components/feature/movie/helpers.ts
import { BRAZILIAN_STATES } from '@/models';

export function findStateName(sigla: string): string {
  return (
    BRAZILIAN_STATES[sigla as keyof typeof BRAZILIAN_STATES] ??
    'Estado não encontrado'
  );
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
