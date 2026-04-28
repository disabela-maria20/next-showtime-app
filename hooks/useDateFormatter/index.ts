import { useCallback } from 'react';

interface DateFormatter {
  format: (date: string | Date, formatType?: string) => string;
  relative: (date: string | Date) => string;
  toISO: (date: string | Date) => string;
  isValid: (date: string | Date) => boolean;
  getParts: (date: string | Date) => DateParts;
}

interface DateParts {
  day: number;
  month: number;
  monthName: string;
  year: number;
  weekday: string;
  hour: number;
  minute: number;
}

export const useDateFormatter = (locale: string = 'pt-BR'): DateFormatter => {
  const isValid = useCallback((date: string | Date): boolean => {
    const d = new Date(date);
    return !isNaN(d.getTime());
  }, []);

  const getParts = useCallback(
    (date: string | Date): DateParts => {
      const d = new Date(date);

      if (!isValid(d)) {
        throw new Error('Data inválida');
      }

      const monthName = d.toLocaleString(locale, { month: 'long' });
      const weekday = d.toLocaleString(locale, { weekday: 'long' });

      return {
        day: d.getDate(),
        month: d.getMonth() + 1,
        monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        year: d.getFullYear(),
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
        hour: d.getHours(),
        minute: d.getMinutes(),
      };
    },
    [locale, isValid]
  );

  const format = useCallback(
    (date: string | Date, formatType: string = 'full'): string => {
      try {
        const d = new Date(date);

        if (!isValid(d)) {
          return 'Data inválida';
        }

        const parts = getParts(d);

        const formats: Record<string, string> = {
          full: `${parts.day} de ${parts.monthName} de ${parts.year}`,
          dayMonth: `${parts.day} de ${parts.monthName}`,
          monthYear: `${parts.monthName} de ${parts.year}`,
          numeric: `${parts.day}/${parts.month}/${parts.year}`,
          numericWithTime: `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute.toString().padStart(2, '0')}`,
          weekday: `${parts.weekday}, ${parts.day} de ${parts.monthName}`,
          compact: `${parts.day}/${parts.month}`,
        };

        return formats[formatType] || formats.full;
      } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Data inválida';
      }
    },
    [isValid, getParts]
  );

  const relative = useCallback(
    (date: string | Date): string => {
      try {
        const d = new Date(date);

        if (!isValid(d)) {
          return 'Data inválida';
        }

        const now = new Date();
        const diffTime = now.getTime() - d.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffMinutes < 1) return 'Agora mesmo';
        if (diffMinutes < 60)
          return `${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''} atrás`;
        if (diffHours < 24)
          return `${diffHours} hora${diffHours !== 1 ? 's' : ''} atrás`;
        if (diffDays === 0) return 'Hoje';
        if (diffDays === 1) return 'Ontem';
        if (diffDays === -1) return 'Amanhã';
        if (Math.abs(diffDays) < 7) return `${Math.abs(diffDays)} dias atrás`;
        if (Math.abs(diffDays) < 30)
          return `${Math.floor(Math.abs(diffDays) / 7)} semana${Math.floor(Math.abs(diffDays) / 7) !== 1 ? 's' : ''} atrás`;
        if (Math.abs(diffDays) < 365)
          return `${Math.floor(Math.abs(diffDays) / 30)} mês${Math.floor(Math.abs(diffDays) / 30) !== 1 ? 'es' : ''} atrás`;

        return format(date, 'full');
      } catch (error) {
        console.error('Erro ao calcular data relativa:', error);
        return 'Data inválida';
      }
    },
    [isValid, format]
  );

  const toISO = useCallback(
    (date: string | Date): string => {
      const d = new Date(date);
      if (!isValid(d)) return '';
      return d.toISOString();
    },
    [isValid]
  );

  return {
    format,
    relative,
    toISO,
    isValid,
    getParts,
  };
};
