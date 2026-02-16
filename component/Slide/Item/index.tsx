import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Item = ({ children }: Props) => {
  return <div className="keen-slider__slide relative">{children}</div>;
};

export default Item;
