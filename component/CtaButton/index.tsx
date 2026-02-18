'use client';

import React from 'react';
import Link from 'next/link';

type CtaButtonProps = {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
}) => {
  const content = (
    <>
      {/* FUNDO ANIMADO */}
      <span
        className="
          absolute inset-0
          bg-white
          -translate-x-full
          group-hover:translate-x-0
          group-active:translate-x-0
          transition-transform duration-300 ease-out
          z-0
        "
      />

      {/* TEXTO */}
      <span
        className="
          relative z-10
          flex items-center justify-center
          transition-colors duration-300
          group-hover:text-blue-600
          group-active:text-blue-600
        "
      >
        {children}
      </span>
    </>
  );

  const baseStyle = `
    group
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    px-10
    md:px-18
    py-4
    rounded
    font-bold
    text-lg
    lowercase
    text-white
    bg-blue-600
    shadow-md
    transition-all
    duration-300

    hover:scale-105
    active:scale-95

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

export default CtaButton;
