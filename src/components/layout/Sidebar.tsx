'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  Calendar,
  CheckSquare,
  Bell,
  Mail,
  Zap,
  BarChart3,
  Settings,
  X,
  Circle,
  LogOut
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const { tasks, reminders, emails, userProfile, logout } = useApp();

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const activeRemindersCount = reminders.filter((r) => r.active).length;
  const unreadEmailCount = emails.filter((e) => e.unread).length;

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Assistant', href: '/assistant', icon: Bot },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: CheckSquare,
      badgeCount: pendingTasksCount > 0 ? pendingTasksCount : undefined
    },
    {
      name: 'Reminders',
      href: '/reminders',
      icon: Bell,
      badgeCount: activeRemindersCount > 0 ? activeRemindersCount : undefined
    },
    {
      name: 'Email',
      href: '/email',
      icon: Mail,
      badgeCount: unreadEmailCount > 0 ? unreadEmailCount : undefined
    },
    { name: 'Automations', href: '/automations', icon: Zap },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-surface border-r border-border select-none">
      {/* Brand & Logo Header */}
      <div>
        <div className="flex h-14 items-center justify-between px-4 border-b border-border">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-md py-1"
          >
            {/* Geometric N Icon */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-elevated border border-border">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 4.5V19.5M5 4.5L19 19.5M19 4.5V19.5"
                  stroke="#7C3AED"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="5" cy="4.5" r="1.5" fill="#06B6D4" />
                <circle cx="19" cy="19.5" r="1.5" fill="#06B6D4" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-content-primary text-sm tracking-tight leading-tight">
                NEXORA
              </span>
              <span className="text-[11px] text-content-muted leading-none">
                Workplace Assistant
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close navigation sidebar"
              className="md:hidden p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-elevated transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Primary Navigation Items */}
        <nav className="p-3 space-y-0.5" aria-label="Main Navigation">
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-content-muted">
            Workspace
          </div>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors relative ${
                  isActive
                    ? 'bg-surface-elevated text-content-primary font-medium border border-border shadow-subtle'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated/50'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-brand-purple rounded-r" />
                )}

                <div className="flex items-center gap-2.5">
                  <IconComponent
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-brand-purple' : 'text-content-muted group-hover:text-content-secondary'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badgeCount !== undefined && (
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-subtle text-content-secondary border border-border/80">
                    {item.badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-border">
        <div className="rounded-lg bg-surface-subtle border border-border p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="h-7 w-7 rounded-full bg-surface-elevated border border-border overflow-hidden flex items-center justify-center">
                <span className="text-xs font-semibold text-content-primary">
                  {userProfile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
              <div
                className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-surface"
                title="Online"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-content-primary truncate">
                {userProfile.name}
              </div>
              <div className="text-[11px] text-content-muted truncate flex items-center gap-1.5">
                <Circle className="h-1.5 w-1.5 fill-emerald-500 text-emerald-500" />
                <span>{userProfile.status}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/settings"
              onClick={onClose}
              aria-label="User settings"
              className="p-1.5 rounded-md text-content-muted hover:text-content-primary hover:bg-surface-elevated transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={async () => {
                if (onClose) onClose();
                await logout();
              }}
              aria-label="Log out"
              title="Log out"
              className="p-1.5 rounded-md text-content-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-64 max-w-[85vw] shadow-modal transition-transform animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
