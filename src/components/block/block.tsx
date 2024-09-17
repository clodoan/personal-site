import React from "react";

type BlockProps = {
  children: React.ReactNode;
};

const Block = ({ children }: BlockProps) => {
  return <div className="max-w-[520px] mx-auto">{children}</div>;
};

export default Block;
