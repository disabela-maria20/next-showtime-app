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
              <StreamButton variant="white" fullWidth>
                Alterar Avatar
              </StreamButton>
              <StreamButton variant="white" fullWidth>
                Favoritos
              </StreamButton>
              <StreamButton variant="white" fullWidth>
                Dados
              </StreamButton>
              <StreamButton variant="white" fullWidth>
                Termos
              </StreamButton>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section className="bg-[#1C1C1C] py-14 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hidden md:flex flex-col gap-8">
              <div className="bg-neutral-700 p-6 rounded">
                <div className="flex flex-col gap-4">
                  <img src="/img/foto.png" alt="Foto de perfil" />
                  <StreamButton variant="white" fullWidth>
                    Alterar Avatar
                  </StreamButton>
                  <div className="flex gap-2 items-center">
                    <StreamButton href='/favoritos' variant="white" fullWidth>
                      Favoritos
                    </StreamButton>
                    <StreamButton href='/dados' variant="white" fullWidth>
                      Dados
                    </StreamButton>
                    <StreamButton href='/termos' variant="white" fullWidth>
                      Termos
                    </StreamButton>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-2'>{children}</div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
