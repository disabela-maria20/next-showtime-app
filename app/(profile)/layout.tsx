import { Divider, Footer, Menu, StreamButton } from '@/component';
import React, { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Menu />
      <section className="bg-[url(/img/banner/hero-perfil.png)] bg-no-repeat bg-center bg-cover h-auto md:h-100 2xl:h-154">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center md:justify-normal md:items-end h-auto md:h-100 2xl:h-154 text-center md:text-left text-white pt-40 md:pb-7 ">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Olá, Giovanna
            </h1>
            <div className="px-14 pb-32 flex flex-col gap-4 md:hidden">
              <img src="/img/foto.png" alt="Foto de perfil" />
              <StreamButton variant="ghost" fullWidth>
                Alterar Avatar
              </StreamButton>
              <StreamButton variant="ghost" fullWidth>
                Favoritos
              </StreamButton>
              <StreamButton variant="ghost" fullWidth>
                Dados
              </StreamButton>
              <StreamButton variant="ghost" fullWidth>
                Termos
              </StreamButton>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section>
        <div className="container mx-auto px-6">{children}</div>
      </section>

      <Footer />
    </>
  );
}
