import React from "react";

type GridProps = React.HTMLAttributes<HTMLDivElement>;

const Grid = ({ children, className, ...props }: GridProps) => {
  return (
    <div
      {...props}
      className={`grid ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Grid;