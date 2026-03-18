import { Menu, Divider } from '@/component';
import { ReactNode } from 'react';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Menu />

      <div className="relative w-full h-[calc(100vh-6px)] flex items-end pb-12 2xl:pb-35">
        {/* Background */}
        <img
          src="/img/banner/hero-portal.png"
          alt="Portal Background"
          className="absolute inset-0 w-full h-full object-cover -z-20"
        />



        {/* Conteúdo */}
        <div className="container mx-auto px-6 md:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

            {/* Lado esquerdo */}
            <div className="text-center md:text-left">
              <img
                src="/img/logo/showtime.br.png"
                alt="Showtime"
                className="max-w-full md:max-w-120 mx-auto md:mx-0"
              />

              <p className="text-white mt-4 text-xl md:text-3xl font-semibold">
                Seu portal para o cinema.
              </p>
            </div>

            {/* Lado direito (botões / children) */}
            <div className="flex justify-center md:justify-end">
              {children}
            </div>

          </div>
        </div>
      </div>

      <Divider />
    </>
  );
}