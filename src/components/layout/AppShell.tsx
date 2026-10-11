'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AppProvider } from '@/context/AppContext';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // On public marketing and auth pages, render without authenticated dashboard chrome
  const isPublicPage = ['/', '/login', '/register', '/forgot-password', '/reset-password'].includes(pathname);
  if (isPublicPage) {
    return (
      <AppProvider>
        <div className="min-h-screen bg-nb-yellow text-nb-charcoal">
          {children}
        </div>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-content-primary flex antialiased selection:bg-brand-purple/30 selection:text-white">
        {/* Persistent Desktop & Responsive Mobile Sidebar */}
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:pl-60 min-w-0">
          <Header
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  );
};
