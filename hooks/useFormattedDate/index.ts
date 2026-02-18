import { useMemo } from 'react';

const WEEK_DAYS = [
  'SÁBADO',
  'DOMINGO',
  'SEGUNDA',
  'TERÇA',
  'QUARTA',
  'QUINTA',
  'SEXTA',
];

function parseLocalDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function useFormattedDate(date: string) {
  return useMemo(() => {
    const currentDate = parseLocalDate(date);

    const today = new Date();
    const isToday = currentDate.toDateString() === today.toDateString();

    const weekDay = WEEK_DAYS[currentDate.getDay()];

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    return {
      weekDay,
      numericDate: `${day}/${month}`,
      isToday,
    };
  }, [date]);
}
