import React from "react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      className={`text-blue-600 hover:text-amber-400 transition ${className ?? ""}`}
    >
      {children}
    </a>
  );
};

export default Link;