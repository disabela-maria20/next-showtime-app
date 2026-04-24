type Props = {
  children?: React.ReactNode;
};

const Content = ({ children }: Props) => {
  return (
    <div className="absolute inset-0 flex items-center z-10 px-6 md:px-16">
      <div className="max-w-xl text-white space-y-4">{children}</div>
    </div>
  );
};

export default Content;
