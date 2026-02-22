'use client';

import React from 'react';
import Link from 'next/link';

type BaseProps = {
  children?: React.ReactNode;
  className?: string;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type CtaButtonProps = ButtonProps | AnchorProps;

export default function CtaButton(props: CtaButtonProps) {
  const { children, className = '' } = props;

  const baseStyle = `
    group relative inline-flex items-center justify-center overflow-hidden
    px-10 md:px-18 py-4 rounded font-bold text-lg lowercase
    text-white bg-blue-600 shadow-md transition-all duration-300
    hover:scale-105 active:scale-95
    ${className}
  `;

  const content = (
    <>
      <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out z-0" />
      <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:text-blue-600 group-active:text-blue-600">
        {children}
      </span>
    </>
  );

  // 🔥 NARROWING CORRETO
  if ('href' in props) {
    const { href, ...anchorProps } = props as AnchorProps;

    return (
      <Link href={href} className={baseStyle} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { ...buttonProps } = props;

  return (
    <button className={baseStyle} {...buttonProps}>
      {content}
    </button>
  );
}
