import React from "react";

const Card = ({ 
  children, 
  variant = "white", 
  padding = "p-8", 
  className = "",
  rounded = "rounded-[2.5rem]"
}) => {
  const variants = {
    white: "bg-white border border-amber-900/10 shadow-xl shadow-amber-900/5",
    dark: "bg-amber-950 text-white shadow-2xl shadow-amber-950/20",
    glass: "bg-amber-50/50 border-2 border-dashed border-amber-900/10"
  };

  return (
    <div className={`${variants[variant]} ${padding} ${rounded} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
