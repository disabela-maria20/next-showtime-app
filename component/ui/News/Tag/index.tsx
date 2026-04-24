import React from "react";

type Variant = "blue" | "amber" | "danger";

type TagProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const variants: Record<Variant, string> = {
  blue: "text-blue-600 hover:text-amber-400",
  amber: "text-amber-400 hover:text-blue-600",
  danger: "text-red-600 hover:text-red-800",
};

const Tag  = ({
  children,
  className = "",
  variant = "blue",
  ...props
}: TagProps) => {
  return (
    <a
      {...props}
      className={`${variants[variant]} transition ${className}`}
    >
      {children}
    </a>
  );
};

export default Tag;