import { Menu, Divider } from '@/component';
import { ReactNode } from 'react';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Menu />
      <section className="bg-[url(/img/banner/filtro.png)]  lg:bg-none bg-cover bg-center">
        <div className="relative w-full h-[calc(100vh-6px)] flex lg:flex-row flex-col items-end justify-end pb-12 2xl:pb-35">
          {/* Background */}
          <div className="bg-[url(/img/banner/hero-portal-mobile.png)] bg-center bg-cover lg:bg-[url(/img/banner/hero-portal.png)] absolute inset-0 w-full h-full object-cover -z-20" />

          {/* Conteúdo */}
          <div className="container mx-auto px-6 lg:px-12 w-full">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              {/* Lado esquerdo */}
              <div className="text-center lg:text-left">
                <img
                  src="/img/logo/showtime.br.png"
                  alt="Showtime"
                  className="max-w-full lg:max-w-120 mx-auto lg:mx-0"
                />

                <p className="text-white mt-4 text-xl lg:text-3xl font-semibold">
                  Seu portal para o cinema.
                </p>
              </div>

              {/* Lado direito (botões / children) */}
              <div className="hidden lg:flex justify-center lg:justify-end">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div  className="container mx-auto px-6 lg:px-12 w-full pb-8 lg:hidden">
          {children}
        </div>

      </section>

      <Divider />
    </>
  );
}
