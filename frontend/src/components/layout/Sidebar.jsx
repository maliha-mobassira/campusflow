import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  X,
  GraduationCap
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen, isPlaceholder: true },
  { id: 'settings', label: 'Settings', icon: Settings, isPlaceholder: true },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isMobileOpen,
  onCloseMobile
}) {
  const content = (
    <div className="h-full flex flex-col justify-between py-6 px-4">
      {/* Brand & Top */}
      <div>
        <div className="flex items-center justify-between px-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span
                className="font-semibold text-lg text-[#111111] dark:text-[#F5F5F5] tracking-tight block leading-none"
                style={{ letterSpacing: '-0.03em' }}
              >
                CampusFlow
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#11111166] dark:text-[#F5F5F566] font-medium">
                Workspace
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="md:hidden p-1.5 rounded-lg text-[#11111199] dark:text-[#F5F5F599] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#EAEAEA] dark:bg-[#242424] text-[#111111] dark:text-[#F5F5F5] shadow-xs'
                    : 'text-[#11111199] dark:text-[#F5F5F599] hover:bg-[#EAEAEA]/70 dark:hover:bg-[#2A2A2A]/70 hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-[#111111] dark:text-[#F5F5F5]'
                        : 'text-[#11111199] dark:text-[#F5F5F599]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.isPlaceholder && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#1111110a] dark:bg-[#ffffff10] text-[#11111166] dark:text-[#F5F5F566]">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info in Sidebar */}
      <div className="px-3 pt-4 border-t border-[#11111112] dark:border-[#FFFFFF14]">
        <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#242424] border border-[#11111112] dark:border-[#FFFFFF14]">
          <p className="text-xs font-medium text-[#111111] dark:text-[#F5F5F5]">
            CampusFlow v1.0
          </p>
          <p className="text-[11px] text-[#11111166] dark:text-[#F5F5F566] mt-0.5">
            SaaS Dashboard Foundation
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 left-0 bg-white dark:bg-[#1C1C1C] border-r border-[#11111112] dark:border-[#FFFFFF14] transition-colors duration-300 z-20">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop & Slide-over */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-[#1C1C1C] h-full shadow-2xl flex flex-col z-10 border-r border-[#11111112] dark:border-[#FFFFFF14] animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
