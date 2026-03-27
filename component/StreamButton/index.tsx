'use client';

import Link from 'next/link';
import React from 'react';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'blue'
  | 'amber'
  | 'white'
  | 'blue-inverted';
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
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean; // Adicionando a prop disabled
};

const variants = {
  primary: {
    text: 'text-white',
    border: 'border-blue-600',
    fill: 'bg-white',
    baseBg: 'bg-blue-600',
    hoverText: 'group-hover:text-blue-600',
    hoverBorder: 'group-hover:border-blue-600',
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
    border: 'border-white',
    fill: 'bg-white',
    baseBg: 'bg-transparent',
    hoverText: 'group-hover:text-black',
    hoverBorder: 'group-hover:border-white',
    hasFillAnimation: true,
  },

  blue: {
    text: 'text-white',
    border: 'border-blue-600',
    fill: 'bg-white',
    baseBg: 'bg-blue-600',
    hoverText: 'group-hover:text-blue-600',
    hoverBorder: 'group-hover:border-blue-600',
    hasFillAnimation: true,
  },

  amber: {
    text: 'text-black',
    border: 'border-amber-400',
    fill: 'bg-black',
    baseBg: 'bg-amber-400',
    hoverText: 'group-hover:text-amber-400',
    hoverBorder: 'group-hover:border-black',
    hasFillAnimation: true,
  },

  'blue-inverted': {
    text: 'text-blue-600',
    border: 'border-white',
    fill: 'bg-blue-600',
    baseBg: 'bg-white',
    hoverText: 'group-hover:text-white',
    hoverBorder: 'group-hover:border-blue-600',
    hasFillAnimation: true,
  },

  white: {
    text: 'text-neutral-400',
    border: 'border-neutral-400',
    fill: 'bg-blue-600',
    baseBg: 'bg-transparent',
    hoverText: 'group-hover:text-white',
    hoverBorder: 'group-hover:border-blue-600',
    hasFillAnimation: true,
  },
};
// text-neutral-400
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
  type = 'button',
  disabled = false, // Adicionando valor padrão para disabled
  ...props
}: StreamButtonProps) => {
  const v = variants[variant];

  const baseStyle = `
    group relative
    ${fullWidth ? 'flex w-full' : 'inline-flex w-fit'}
    items-center justify-center
    overflow-hidden
    rounded
    border
    transition-all duration-300 ease-out
    hover:scale-[1.02] active:scale-[0.98]
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
    ${v.text}
    ${v.border}
    ${v.baseBg}
    ${sizes[size]}
    ${iconOnly ? 'px-2 py-2' : ''}
    ${className}
  `;

  const content = (
    <>
      {v.hasFillAnimation && !disabled && !loading && (
        <span
          className={`
            absolute inset-0
            ${v.fill}
            -translate-x-full
            group-hover:translate-x-0
            group-active:translate-x-0
            transition-transform duration-300 ease-out
            z-0
           
            
          `}
        />
      )}

      <span
        className={`relative z-10 flex items-center justify-center gap-2 w-full transition-colors duration-300 ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {!iconOnly && (
          <span
            className={`font-normal ${!disabled && !loading ? v.hoverText : ''}`}
          >
            {loading ? 'Carregando...' : children}
          </span>
        )}

        {icon && !loading && (
          <i
            className={`${icon} ${!disabled && !loading ? v.hoverText : ''}`}
          />
        )}

        {loading && <i className="pi pi-spin pi-spinner" />}
      </span>

      {!disabled && !loading && (
        <span
          className={`
            pointer-events-none
            absolute inset-0
            rounded
            border
            ${v.border}
            ${v.hoverBorder}
          `}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        {...props}
        className={baseStyle}
        aria-disabled={disabled}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      {...props}
      onClick={onClick}
      className={baseStyle}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

export default StreamButton;
