import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('campusflow-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('campusflow-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('campusflow-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'students':
        return 'Students';
      case 'courses':
        return 'Courses (Coming Soon)';
      case 'settings':
        return 'Settings (Coming Soon)';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#111111] text-[#111111] dark:text-[#F5F5F5] transition-colors duration-300 flex flex-col md:flex-row antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(pageId) => {
          if (pageId === 'courses' || pageId === 'settings') {
            setCurrentPage(pageId);
          } else {
            setCurrentPage(pageId);
          }
        }}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 lg:pl-72 transition-all duration-300">
        <Header
          pageTitle={getPageTitle()}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:px-10 md:py-10">
          {currentPage === 'dashboard' && (
            <Dashboard onNavigateToStudents={() => setCurrentPage('students')} />
          )}

          {currentPage === 'students' && <Students />}

          {(currentPage === 'courses' || currentPage === 'settings') && (
            <div className="rounded-3xl border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] p-12 text-center max-w-xl mx-auto my-12 space-y-4">
              <h2
                className="text-2xl font-semibold text-[#111111] dark:text-[#F5F5F5]"
                style={{ letterSpacing: '-0.03em' }}
              >
                {currentPage === 'courses' ? 'Courses Module' : 'Workspace Settings'}
              </h2>
              <p className="text-sm text-[#11111199] dark:text-[#F5F5F599]">
                This section is a navigation placeholder for future phases. You can explore the Dashboard and Student Directory today.
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage('students')}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] font-medium text-sm hover:opacity-90 transition-all cursor-pointer"
              >
                Back to Students
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
