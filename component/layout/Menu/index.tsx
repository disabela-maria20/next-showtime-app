'use client';

import React, { useState, useRef } from 'react';
import text from '../../../lib/localization/pt.json';

import Link from 'next/link';
import StreamButton from '../../shared/StreamButton';
import { useLocationStore } from '@/store/locationStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const Menu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { city } = useLocationStore();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const handleEnter = (href: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(href);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 120); // 👈 evita fechar ao mover mouse
  };

  return (
    <header className="w-full z-10 text-white absolute bg-linear-to-b from-black via-black/70 to-transparent">
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
          {city && (
            <div className="row-start-1 col-start-2 md:col-start-2">
              <select className="bg-gray-800 border border-gray-600 text-sm px-2 py-1 rounded-md w-full lg:w-45.5">
                <option>{city}</option>
              </select>
            </div>
          )}

          {/* AÇÕES */}
          <div className="row-start-1 col-start-3 md:col-start-4 grid grid-flow-col gap-2 justify-self-end">
            {!user?.name && (
              <>
                <StreamButton
                  variant="ghost"
                  size="md"
                  href="/portal"
                  icon="pi pi-user"
                >
                  <span className="hidden md:block">{text.menu.entrar}</span>
                </StreamButton>
              </>
            )}
            {user?.name && (
              <>
                <StreamButton
                  variant="ghost"
                  size="md"
                  href="/favoritos"
                  icon="pi pi-user"
                >
                  <span className="hidden md:block">Perfil</span>
                </StreamButton>
                <StreamButton
                  variant="ghost"
                  size="md"
                  icon="pi pi-sign-in"
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                >
                  <span className="hidden md:block">{text.menu.sair}</span>
                </StreamButton>
              </>
            )}
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
                <li
                  key={link.href}
                  className="relative pt-2" // 👈 área segura
                  onMouseEnter={() => handleEnter(link.href)}
                  onMouseLeave={handleLeave}
                >
                  {link.sub ? (
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === link.href ? null : link.href)
                      }
                      className="hover:text-amber-400 transition-colors duration-300 whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-amber-400 transition-colors duration-300 whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.sub && openMenu === link.href && (
                    <ul
                      className="
                        absolute left-0 top-full
                        translate-y-1
                        bg-black/95 backdrop-blur-md
                        rounded-md shadow-lg
                        min-w-[180px]
                        p-2
                        z-50
                      "
                    >
                      {link.sub.map((data) => (
                        <li key={data.id}>
                          <Link
                            href={`${link.href}${data.href}`}
                            className="
                              block px-3 py-2 text-sm
                              hover:bg-amber-400 hover:text-black
                              rounded-md transition
                            "
                          >
                            {data.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
