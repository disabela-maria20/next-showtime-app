interface NewsTitleProps {
  children: React.ReactNode;
  size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xl';
  lineclamp?: boolean;
}

const sizeMap = {
  xsm: 'text-md sm:text-md md:text-lg',
  sm: 'text-lg sm:text-xl md:text-2xl',
  md: 'text-xl sm:text-2xl md:text-3xl',
  lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl',
};

const Title = ({ children, size = 'md', lineclamp = true }: NewsTitleProps) => {
  return (
    <h2
      className={`${sizeMap[size]} font-bold text-white  ${lineclamp && 'line-clamp-2'}`}
    >
      {children}
    </h2>
  );
};

export default Title;
