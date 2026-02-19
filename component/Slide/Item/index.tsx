import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Item = ({ children, className = '' }: Props) => {
  return (
    <div className={`keen-slider__slide relative ${className}`}>{children}</div>
  );
};

export default Item;
