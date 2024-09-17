import React from "react";

export type TextVariant =
  | "body-1"
  | "body-2"
  | "body-3"
  | "label-1"
  | "label-2"
  | "label-3"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4";

export type TextProps = {
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles = {
  "body-1": "text-base font-regular pt-4 font-sans opacity-90",
  "body-2": "text-sm font-regular pt-4 font-sans opacity-90",
  "body-3": "text-xs font-regular pt-4 font-sans opacity-90",
  "label-1": "text-base font-medium pt-4 font-sans",
  "label-2": "text-sm font-medium pt-4 font-sans",
  "label-3": "text-xs font-medium pt-4 font-sans",
  "heading-1": "text-4xl font-bold font-serif",
  "heading-2": "text-3xl font-bold font-serif",
  "heading-3": "text-2xl font-bold font-serif",
  "heading-4": "text-xl font-bold font-serif",
};

const Text: React.FC<TextProps> = ({
  tag = "p",
  variant = "body-1",
  children,
  className,
}) => {
  const Tag = tag;
  const variantClass = variantStyles[variant];

  return (
    <Tag
      className={`${variantClass} text-light-text dark:text-dark-text ${className} backdrop-filter blur(9.5px) brightness(9.5) saturate(11.5) mask-linear-gradient(#000 0 0) border-box text-shadow-0-1px-#000000a`}
    >
      {children}
    </Tag>
  );
};

export default Text;
