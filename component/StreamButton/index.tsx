'use client';

import Link from 'next/link';
import React from 'react';

type StreamButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: string;
  className?: string;
};

const StreamButton = ({
  href,
  onClick,
  children,
  icon,
  className = '',
}: StreamButtonProps) => {
  const content = (
    <>
      {/* FUNDO ANIMADO */}
      <span
        className="
          absolute inset-0
          bg-white
          translate-y-full
          group-hover:translate-y-0
          group-active:translate-y-0
          transition-transform duration-300 ease-out
          z-0
        "
      />

      {/* CONTEÚDO */}
      <span className="relative z-10 flex items-center transition-colors duration-300">
        <span
          className="
          pr-4 hidden md:inline
          group-hover:text-black
          group-active:text-black
        "
        >
          {children}
        </span>

        {icon && (
          <i
            className={`
              ${icon}
              transition-colors duration-300
              group-hover:text-black
              group-active:text-black
            `}
          />
        )}
      </span>

      {/* BORDA */}
      <span
        className="
          absolute inset-0
          border border-white/60
          rounded-md
          group-hover:border-white
          group-active:border-white
        "
      />
    </>
  );

  const baseStyle = `
    group
    flex items-center
    border border-white/60
    px-3 py-1
    rounded-md
    text-white
    overflow-hidden
    relative

    transition-all duration-300 ease-out

    hover:scale-105
    active:scale-95

    cursor-pointer
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle}>
      {content}
    </button>
  );
};

export default StreamButton;
