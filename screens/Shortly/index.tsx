import { Divider, StreamButton } from '@/component';
import { Movie } from '@/services/models';

interface ShortlyProps {
  movie: {
    releases: Array<Movie>;
    streaming: Array<Movie>;
  };
}

const Shortly = ({ movie }: ShortlyProps) => {
  return (
    <main>
      <section>
        <div className="relative w-full h-[calc(100vh-6px)] flex items-end pb-10 lg:pb-20">

          {/* Background */}
          <div className="bg-[url(/img/banner/banner-embreve.png)] bg-center bg-cover absolute inset-0 w-full h-full -z-20" />

          {/* Overlay (gradiente para contraste) */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent -z-10" />

          {/* 🔝 TOPO (dentro do container, alinhado com menu) */}
          <div className="absolute top-6 left-0 w-full pt-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="text-center lg:text-left text-white text-shadow-black/15 text-shadow-sm">
                <p className="text-md md:text-base text-white/80">
                  30 de Abril
                </p>
                <p className="font-bold text-lg md:text-xl">
                  O Diabo Veste Prada 2
                </p>
              </div>
            </div>
          </div>

          {/* 🔽 CONTEÚDO DE BAIXO */}
          <div className="container mx-auto px-6 lg:px-12 w-full">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left gap-6">

              <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-white max-w-xl">
                Em breve nos cinemas
              </h1>

              <StreamButton href="/em-breve" size="lg">
                comprar ingressos
              </StreamButton>
            </div>
          </div>

        </div>
      </section>

      <Divider />
    </main>
  );
};

export default Shortly;