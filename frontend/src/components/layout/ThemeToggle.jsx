import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2.5 rounded-full border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] transition-colors duration-300 flex items-center justify-center shadow-sm cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F5F5F5] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#111111] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
