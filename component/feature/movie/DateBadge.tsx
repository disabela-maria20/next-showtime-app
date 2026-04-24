'use client';

import { useFormattedDate } from '@/hooks/useFormattedDate';

type DateBadgeProps = {
  date: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function DateBadge({
  date,
  active,
  onClick,
  disabled = false,
}: DateBadgeProps) {
  const { weekDay, numericDate, isToday } = useFormattedDate(date);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer border-2 rounded px-3 py-2 text-center transition md:w-28
      ${active ? 'border-blue-600 text-blue-600' : 'border-b-neutral-400 text-neutral-400'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <p className="font-bold text-xs md:text-sm">
        {isToday ? 'HOJE' : weekDay}
      </p>
      <p className="text-xs">{numericDate}</p>
    </button>
  );
}
