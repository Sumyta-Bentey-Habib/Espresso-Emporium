import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 shadow-lg overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative h-6 w-6">
        <Sun
          className={`absolute inset-0 transform transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          size={24}
        />
        <Moon
          className={`absolute inset-0 transform transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          size={24}
        />
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none" />
    </button>
  );
};

export default ThemeToggle;
