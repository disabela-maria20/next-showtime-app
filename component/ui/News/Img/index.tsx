import React from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Img = (props: ImgProps) => {
  return (
    <img
      {...props}
      className={`w-full h-full object-cover ${props.className ?? ""}`}
    />
  );
};

export default Img;