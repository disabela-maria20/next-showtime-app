'use client';

import Link from 'next/link';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'blue' | 'warning';
type Size = 'sm' | 'md' | 'lg';

type StreamButtonProps = {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: string;
  className?: string;
  variant?: Variant;
  size?: Size;
  iconOnly?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

const variants = {
  primary: {
    text: 'text-white',
    border: 'border-white/60',
    fill: 'bg-white',
    baseBg: 'bg-transparent',
    hoverText: 'group-hover:text-black',
    hoverBorder: 'group-hover:border-white',
    hasFillAnimation: true,
  },

  secondary: {
    text: 'text-black',
    border: 'border-black/40',
    fill: 'bg-black',
    baseBg: 'bg-transparent',
    hoverText: 'group-hover:text-white',
    hoverBorder: 'group-hover:border-black',
    hasFillAnimation: true,
  },

  ghost: {
    text: 'text-white',
    border: 'border-transparent',
    fill: 'bg-white',
    baseBg: 'bg-transparent',
    hoverText: 'group-hover:text-black',
    hoverBorder: '',
    hasFillAnimation: true,
  },

  blue: {
    text: 'text-white',
    border: 'border-blue-600',
    fill: 'bg-blue-600',
    baseBg: 'bg-blue-600',
    hoverText: 'group-hover:text-white',
    hoverBorder: 'group-hover:border-blue-600',
    hasFillAnimation: false,
  },

  warning: {
    text: 'text-black',
    border: 'border-amber-400',
    fill: 'bg-amber-400',
    baseBg: 'bg-amber-400',
    hoverText: 'group-hover:text-black',
    hoverBorder: 'group-hover:border-amber-400',
    hasFillAnimation: false,
  },
};

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

const StreamButton = ({
  href,
  onClick,
  children,
  icon,
  className = '',
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  loading = false,
  fullWidth = false,
}: StreamButtonProps) => {
  const v = variants[variant];

  const baseStyle = `
    group relative
    ${fullWidth ? 'flex w-full' : 'inline-flex w-fit'}
    items-center justify-center
    overflow-hidden
    rounded-md
    box-border
    transition-all duration-300 ease-out
    hover:scale-[1.02] active:scale-[0.98]
    ${v.text}
    ${v.border}
    ${v.baseBg}
    ${sizes[size]}
    ${iconOnly ? 'px-2 py-2' : ''}
    ${className}
  `;

  const content = (
    <>
      {/* FUNDO ANIMADO (somente quando necessário) */}
      {v.hasFillAnimation && (
        <span
          className={`
            absolute inset-0
            ${v.fill}
            translate-y-full
            group-hover:translate-y-0
            transition-transform duration-300 ease-out
          `}
        />
      )}

      {/* CONTEÚDO */}
      <span className="relative z-10 flex items-center justify-center w-full">
        {!iconOnly && (
          <span className={`font-semibold ${v.hoverText}`}>
            {loading ? 'Carregando...' : children}
          </span>
        )}

        {icon && !loading && (
          <i className={`${icon} ${v.hoverText}`} />
        )}

        {loading && <i className="pi pi-spin pi-spinner" />}
      </span>

      {/* BORDA */}
      <span
        className={`
          pointer-events-none
          absolute inset-0
          rounded-md
          border
          ${v.border}
          ${v.hoverBorder}
        `}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle} disabled={loading}>
      {content}
    </button>
  );
};

export default StreamButton;