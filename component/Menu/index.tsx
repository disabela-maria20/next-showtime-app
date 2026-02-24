'use client';

import React from 'react';
import text from '../../services/localization/pt.json';
import { useLocationStore } from '@/services/store/locationStore';
import Link from 'next/link';
import StreamButton from '../StreamButton';

const Menu = () => {
  const { city } = useLocationStore();

  return (
    <header className="w-full z-50 text-white absolute bg-linear-to-b from-black via-black/70 to-transparent">
      <div className="relative w-full md:max-w-360 m-auto ">
        <div
          className="
            mx-auto px-5 md:px-6 lg:px-7 py-3 md:py-9
            grid gap-3 lg:gap-6 items-center

            grid-cols-[auto_1fr_auto]
            grid-rows-2

            md:grid-rows-1
            md:grid-cols-[auto_auto_1fr_auto]
          "
        >
          {/* LOGO */}
          <Link href="/" className="row-start-1 col-start-1">
            <img
              src={text.menu.logo.src}
              alt={text.menu.logo.alt}
              className="h-6 md:h-7 w-auto object-contain"
            />
          </Link>

          {/* SELECT CIDADE */}
          <div className="row-start-1 col-start-2 md:col-start-2">
            <select
              className="bg-gray-800 border border-gray-600 text-sm px-2 py-1 rounded-md w-full lg:w-45.5"
              aria-label="Selecionar cidade"
            >
              <option>{city}</option>
            </select>
          </div>

          {/* AÇÕES */}
          <div className="row-start-1 col-start-3 md:col-start-4 grid grid-flow-col gap-2 justify-self-end">
            <StreamButton href="/login" icon="pi pi-user">
            <span className='hidden md:block'>{text.menu.entrar}</span>  
            </StreamButton>

            <StreamButton href="/sair" icon="pi pi-sign-in">
            <span className='hidden md:block'>{text.menu.sair}</span>  
            </StreamButton>
          </div>

          {/* MENU */}
          <nav
            className="
              row-start-2 col-span-3
              md:row-start-1 md:col-start-3 md:col-span-1
              justify-self-center
            "
          >
            <ul className="grid grid-flow-col gap-6 md:gap-7 lg:gap-16 text-sm">
              {text.menu.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors duration-300 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Menu;
