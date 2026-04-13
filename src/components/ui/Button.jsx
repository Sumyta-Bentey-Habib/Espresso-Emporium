import React from "react";

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  className = "", 
  icon: Icon,
  disabled = false,
  type = "button"
}) => {
  const baseStyles = "flex items-center justify-center gap-2 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-amber-950 text-white shadow-amber-950/20 hover:bg-black",
    secondary: "bg-amber-100 text-amber-900 border border-amber-900/10 hover:bg-amber-200 shadow-amber-900/5",
    success: "bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700",
    ghost: "bg-stone-100 text-stone-500 hover:bg-stone-200 shadow-none",
    outline: "border-2 border-amber-900/20 text-amber-950 hover:bg-amber-100 shadow-none"
  };

  const sizes = {
    sm: "px-4 py-2 text-[8px]",
    md: "px-6 py-3 text-[10px]",
    lg: "px-8 py-4 text-[12px]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
};

export default Button;
