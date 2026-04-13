import React from "react";

const Input = ({ 
  label, 
  icon: Icon, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  disabled = false,
  className = "",
  error,
  isLocked = false
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
          {Icon && <Icon size={12} />}
          {label}
        </label>
      )}
      
      <div className="relative">
        <input 
          type={type} 
          value={value}
          onChange={onChange}
          disabled={disabled || isLocked}
          placeholder={placeholder}
          className={`w-full bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50 ${error ? "border-rose-500 ring-rose-500/20" : ""}`}
        />
        {isLocked && (
            <p className="text-[8px] text-amber-600 font-bold italic tracking-wider mt-1 absolute -bottom-5 left-0">
                LOCKED (SYSTEM PROTECTED)
            </p>
        )}
      </div>
      {error && <p className="text-[8px] text-rose-500 font-bold mt-1 uppercase">{error}</p>}
    </div>
  );
};

export default Input;
