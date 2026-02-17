'use client';

import Link from 'next/link';
import React from 'react';

type CardMovieProps = {
  id: number;
  title: string;
  img: string;
  href: string;
};

const CardMovie = ({ id, title, img, href }: CardMovieProps) => {
  return (
    <div className="group relative bg-neutral-800 rounded p-4 text-center ">
      {/* NUMBER */}
      <div className="absolute top-0 left-0 bg-amber-400 text-black font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-br-lg z-10 transition-all duration-500 group-hover:scale-110">
        {id + 1}
      </div>

      {/* IMAGE */}
      <img
        src={img}
        alt={title}
        className="min-h-52.5 max-h-65 w-full object-cover rounded
        transition-all duration-500
        group-hover:shadow-xl
        "
      />

      {/* TITLE */}
      <h3 className="text-white mt-4 mb-4 font-bold text-lg md:text-xl xl:text-2xl truncate transition-colors duration-500 group-hover:text-neutral-400">
        {title}
      </h3>

      {/* STREAM BUTTON */}
      <Link
        href={href}
        className="relative overflow-hidden block w-full py-2 px-3 rounded text-[12px] md:text-sm font-semibold text-white border border-white/40"
      >
        <span className="relative z-10">Comprar ingressos</span>

        {/* background hover */}
        <span
          className="
          absolute inset-0 bg-amber-400
          translate-y-full
          group-hover:translate-y-0
          transition-transform duration-500 ease-out
        "
        />

        {/* text color change */}
        <span
          className="
          absolute inset-0 flex items-center justify-center
          text-black font-semibold
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
        "
        >
          Comprar ingressos
        </span>
      </Link>
    </div>
  );
};

export default CardMovie;
