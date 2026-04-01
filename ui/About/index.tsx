import { CtaButton, Divider } from '@/component';
import { Movie } from '@/services/models';

interface FavoritesProps {
  movie: {
    releases: Array<Movie>;
    streaming: Array<Movie>;
  };
}
const About = ({ movie }: FavoritesProps) => {
  return (
    <>
      <section className="relative bg-[url(/img/banner/banner-sobre.png)] bg-no-repeat bg-center bg-cover h-[calc(100vh-6px)] 2xl:h-154">
        <div className="absolute inset-0 w-full h-full flex items-end">
          <div className="container mx-auto px-6 lg:px-12 w-full ">
            <div className="grid gap-8 md:grid-cols-2 items-center justify-items-center md:justify-items-normal pb-12 md:pb-20">
              <div className='max-w-120'>
                <h1 className="text-5xl 2xl:text-7xl font-bold text-white mb-6 md:mb-14">
                  Absolutamente tudo sobre o cinema, no mesmo portal.
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.{' '}
                </p>
              </div>
              <div className='md:place-self-end'>
                <CtaButton>comprar ingressos</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider />
    </>
  );
};

export default About;
