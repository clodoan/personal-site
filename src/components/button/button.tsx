import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ variant, children, onClick, className }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none";
  const primaryStyles = "bg-orange-500 text-white hover:bg-orange-600";
  const secondaryStyles =
    "border border-gray-500 text-gray-500 hover:bg-gray-100";

  const variantClass = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      className={`${baseStyles} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
