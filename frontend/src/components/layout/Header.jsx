import React from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ pageTitle, isDark, onToggleTheme, onOpenMobileMenu }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F5F5F5]/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-[#11111112] dark:border-[#FFFFFF14] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Mobile menu button + Page title badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
            className="md:hidden p-2 rounded-xl border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] text-[#111111] dark:text-[#F5F5F5] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] transition-colors duration-200 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#11111166] dark:text-[#F5F5F566] font-semibold">
              CampusFlow
            </span>
            <span className="mx-2 text-[#11111166] dark:text-[#F5F5F566]">/</span>
            <span className="text-sm font-medium text-[#111111] dark:text-[#F5F5F5]">
              {pageTitle}
            </span>
          </div>
        </div>

        {/* Right: Theme Toggle & User Avatar Placeholder */}
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          {/* User / avatar placeholder */}
          <div
            title="User Profile"
            className="w-9 h-9 rounded-full bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] font-medium flex items-center justify-center text-xs tracking-wider shadow-sm select-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            CF
          </div>
        </div>
      </div>
    </header>
  );
}
