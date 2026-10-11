'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
  CheckCircle2,
  Calendar as CalendarIcon,
  Bot,
  Circle,
  ChevronDown
} from 'lucide-react';
import { FocusTask } from '@/types/dashboard';
import { useApp } from '@/context/AppContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Overview of commitments, AI workflow, and agenda' },
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of commitments, AI workflow, and agenda' },
  '/assistant': { title: 'AI Assistant', subtitle: 'Contextual synthesis and daily command planning' },
  '/calendar': { title: 'Calendar', subtitle: 'Scheduled focus blocks and commitments' },
  '/tasks': { title: 'Tasks', subtitle: 'Priority execution matrix organized by scope' },
  '/reminders': { title: 'Reminders', subtitle: 'Time-sensitive alerts and follow-ups' },
  '/email': { title: 'Email', subtitle: 'Distilled inbox threads and executive summaries' },
  '/automations': { title: 'Automations', subtitle: 'Background triggers and autonomous routines' },
  '/analytics': { title: 'Analytics', subtitle: 'Deep work metrics and schedule defense trends' },
  '/settings': { title: 'Settings', subtitle: 'Workspace preferences and assistant configuration' },
};

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    tasks,
    calendarEvents,
    reminders,
    emails,
    notifications,
    userProfile,
    searchQuery,
    setSearchQuery,
    addTask,
    addCalendarEvent,
    addReminder,
    markNotificationAsRead,
    clearNotifications,
    dismissNotification,
    updateUserProfile,
    logout,
    toastMessage
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Modal states
  const [activeModal, setActiveModal] = useState<'task' | 'event' | 'reminder' | null>(null);

  // Form states for modals
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('Frontend');
  const [taskPriority, setTaskPriority] = useState<'urgent' | 'high' | 'medium' | 'low'>('high');

  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('02:00 PM – 03:00 PM');
  const [eventCategory, setEventCategory] = useState<'deep-work' | 'meeting' | 'sync'>('deep-work');
  const [eventLocation, setEventLocation] = useState('Virtual');

  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderTime, setReminderTime] = useState('03:30 PM');
  const [reminderDate, setReminderDate] = useState('Today');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const currentPage = pageTitles[pathname] || {
    title: 'Workspace',
    subtitle: 'NEXORA Environment'
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Keyboard shortcut listener (/ to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchDropdown(true);
      }
      if (e.key === 'Escape') {
        setShowSearchDropdown(false);
        setShowNotifications(false);
        setShowCreateMenu(false);
        setShowProfileMenu(false);
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter search results
  const trimmedSearch = searchQuery.trim().toLowerCase();
  const searchResults = trimmedSearch.length > 0 ? {
    tasks: tasks.filter(t => t.title.toLowerCase().includes(trimmedSearch) || t.category.toLowerCase().includes(trimmedSearch)),
    events: calendarEvents.filter(e => e.title.toLowerCase().includes(trimmedSearch)),
    reminders: reminders.filter(r => r.title.toLowerCase().includes(trimmedSearch)),
    emails: emails.filter(e => e.subject.toLowerCase().includes(trimmedSearch) || e.sender.toLowerCase().includes(trimmedSearch)),
  } : null;

  const totalResultsCount = searchResults
    ? searchResults.tasks.length + searchResults.events.length + searchResults.reminders.length + searchResults.emails.length
    : 0;

  // Handle modal submits
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask(taskTitle, taskCategory, taskPriority);
    setTaskTitle('');
    setActiveModal(null);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    addCalendarEvent({
      title: eventTitle,
      timeRange: eventTime,
      category: eventCategory,
      categoryLabel: eventCategory === 'deep-work' ? 'Deep Work' : eventCategory === 'meeting' ? 'Engineering' : 'Sync',
      colorHex: eventCategory === 'deep-work' ? '#7C3AED' : eventCategory === 'meeting' ? '#06B6D4' : '#10B981',
      location: eventLocation
    });
    setEventTitle('');
    setActiveModal(null);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderTitle.trim()) return;
    addReminder(reminderTitle, reminderTime, reminderDate);
    setReminderTitle('');
    setActiveModal(null);
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-14 bg-surface/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & clean Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-elevated transition-colors"
            aria-label="Open navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-content-primary truncate leading-tight">
              {currentPage.title}
            </h1>
            <p className="text-[11px] text-content-muted hidden sm:block truncate leading-tight">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Search Input & Quick Search Dropdown */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6 hidden md:block relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-content-muted pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search tasks, schedule, inbox... (Press / to focus)"
              className="w-full h-8 pl-8 pr-8 text-xs bg-surface-subtle border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
            />
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary p-0.5"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:flex items-center text-[10px] font-mono text-content-dim bg-surface-elevated px-1 py-0.5 rounded border border-border pointer-events-none">
                /
              </div>
            )}
          </div>

          {/* Search Results Popover */}
          {showSearchDropdown && trimmedSearch.length > 0 && (
            <div className="absolute left-0 right-0 top-10 rounded-xl bg-surface-elevated border border-border shadow-dropdown p-2 z-50 animate-dropdown max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] text-content-muted border-b border-border/80 mb-1">
                <span>{totalResultsCount} matches for &quot;{searchQuery}&quot;</span>
                <button
                  onClick={() => setShowSearchDropdown(false)}
                  className="text-content-dim hover:text-content-primary text-[10px]"
                >
                  Close
                </button>
              </div>

              {totalResultsCount === 0 ? (
                <div className="p-4 text-center text-xs text-content-muted">
                  No matches found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {/* Tasks results */}
                  {searchResults?.tasks && searchResults.tasks.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] uppercase font-semibold text-content-muted">Tasks</div>
                      {searchResults.tasks.slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          onClick={() => {
                            router.push('/tasks');
                            setShowSearchDropdown(false);
                          }}
                          className="px-2 py-1.5 rounded-lg hover:bg-surface-hover flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span className={`truncate text-content-primary ${task.completed ? 'line-through text-content-muted' : ''}`}>
                            {task.title}
                          </span>
                          <span className="text-[10px] text-content-muted font-mono ml-2 flex-shrink-0">{task.category}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Calendar results */}
                  {searchResults?.events && searchResults.events.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] uppercase font-semibold text-content-muted">Calendar</div>
                      {searchResults.events.slice(0, 3).map(ev => (
                        <div
                          key={ev.id}
                          onClick={() => {
                            router.push('/calendar');
                            setShowSearchDropdown(false);
                          }}
                          className="px-2 py-1.5 rounded-lg hover:bg-surface-hover flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span className="truncate text-content-primary">{ev.title}</span>
                          <span className="text-[10px] text-content-muted font-mono ml-2 flex-shrink-0">{ev.timeRange}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Email results */}
                  {searchResults?.emails && searchResults.emails.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] uppercase font-semibold text-content-muted">Emails</div>
                      {searchResults.emails.slice(0, 2).map(em => (
                        <div
                          key={em.id}
                          onClick={() => {
                            router.push('/email');
                            setShowSearchDropdown(false);
                          }}
                          className="px-2 py-1.5 rounded-lg hover:bg-surface-hover flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span className="truncate text-content-primary">{em.subject}</span>
                          <span className="text-[10px] text-content-muted ml-2 flex-shrink-0">{em.sender}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Primary Create Action */}
          <div className="relative" ref={createMenuRef}>
            <button
              onClick={() => {
                setShowCreateMenu(!showCreateMenu);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="h-8 px-3 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              aria-expanded={showCreateMenu}
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Create</span>
            </button>

            {/* Create Menu Dropdown */}
            {showCreateMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-elevated border border-border shadow-dropdown p-1.5 z-50 animate-dropdown">
                <div className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-content-muted">
                  Quick Actions
                </div>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    setActiveModal('task');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-content-primary hover:bg-surface-hover rounded-lg flex items-center gap-2.5 transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-purple" />
                  <span>New Task</span>
                </button>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    setActiveModal('event');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-content-primary hover:bg-surface-hover rounded-lg flex items-center gap-2.5 transition-colors"
                >
                  <CalendarIcon className="h-3.5 w-3.5 text-brand-cyan" />
                  <span>Schedule Event</span>
                </button>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    setActiveModal('reminder');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-content-primary hover:bg-surface-hover rounded-lg flex items-center gap-2.5 transition-colors"
                >
                  <Bell className="h-3.5 w-3.5 text-amber-400" />
                  <span>Set Reminder</span>
                </button>
                <button
                  onClick={() => {
                    setShowCreateMenu(false);
                    router.push('/assistant');
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-content-primary hover:bg-surface-hover rounded-lg flex items-center gap-2.5 transition-colors border-t border-border mt-1 pt-1.5"
                >
                  <Bot className="h-3.5 w-3.5 text-brand-purple" />
                  <span>Ask Assistant</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowCreateMenu(false);
                setShowProfileMenu(false);
              }}
              className="h-8 w-8 rounded-lg bg-surface-elevated border border-border hover:border-border-strong text-content-secondary hover:text-content-primary flex items-center justify-center transition-colors relative"
              aria-label="View notifications"
              aria-expanded={showNotifications}
            >
              <Bell className="h-3.5 w-3.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-purple" />
              )}
            </button>

            {/* Notifications Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-surface-elevated border border-border shadow-dropdown p-3 z-50 animate-dropdown">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-content-primary">Notifications</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-purple/20 text-brand-purple font-medium">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] text-content-muted hover:text-content-primary transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-content-muted">
                      No notifications. All caught up!
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-2.5 rounded-lg border text-xs transition-colors cursor-pointer relative group ${
                          notif.read
                            ? 'bg-surface-subtle/50 border-border/60 text-content-secondary'
                            : 'bg-surface-subtle border-border text-content-primary font-normal'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-medium text-xs text-content-primary flex items-center gap-1.5">
                            {!notif.read && (
                              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple flex-shrink-0" />
                            )}
                            <span>{notif.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-content-dim flex-shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-content-muted mt-1 leading-relaxed">
                          {notif.description}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notif.id);
                          }}
                          className="absolute right-2 bottom-2 text-content-dim hover:text-content-primary opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                          aria-label="Dismiss notification"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative pl-1 border-l border-border" ref={profileMenuRef}>
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowCreateMenu(false);
              }}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-elevated transition-colors text-left"
              aria-label="User profile menu"
              aria-expanded={showProfileMenu}
            >
              <div className="h-7 w-7 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-xs font-semibold text-content-primary">
                {userProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <ChevronDown className="h-3 w-3 text-content-muted hidden sm:block" />
            </button>

            {/* Profile Menu Popover */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-elevated border border-border shadow-dropdown p-2 z-50 animate-dropdown">
                <div className="px-2 py-1.5 border-b border-border mb-1.5">
                  <div className="text-xs font-semibold text-content-primary truncate">{userProfile.name}</div>
                  <div className="text-[11px] text-content-muted truncate">{userProfile.email}</div>
                </div>

                <div className="px-2 py-1 text-[10px] uppercase font-semibold text-content-muted">
                  Focus Status
                </div>
                {['In Deep Focus', 'Available', 'In Meetings', 'Away'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      updateUserProfile({ status });
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs rounded-md flex items-center gap-2 transition-colors ${
                      userProfile.status === status
                        ? 'bg-surface-hover text-brand-purple font-medium'
                        : 'text-content-secondary hover:text-content-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Circle
                      className={`h-2 w-2 fill-current ${
                        status === 'In Deep Focus' ? 'text-brand-purple' : status === 'Available' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    />
                    <span>{status}</span>
                  </button>
                ))}

                <div className="border-t border-border mt-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      router.push('/settings');
                    }}
                    className="w-full text-left px-2 py-1 text-xs text-content-secondary hover:text-content-primary hover:bg-surface-hover rounded-md transition-colors"
                  >
                    Workspace Settings
                  </button>
                  <button
                    onClick={async () => {
                      setShowProfileMenu(false);
                      await logout();
                    }}
                    className="w-full text-left px-2 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-surface-elevated border border-border text-content-primary px-3.5 py-2 rounded-lg shadow-dropdown text-xs font-medium flex items-center gap-2 animate-dropdown">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal: New Task */}
      {activeModal === 'task' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-xl bg-surface-elevated border border-border p-5 max-w-md w-full shadow-modal">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-sm font-semibold text-content-primary">Create Priority Task</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-content-muted hover:text-content-primary p-1"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-xs text-content-muted mb-1 block">Task Description</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Audit API authentication token expiry"
                  autoFocus
                  required
                  className="w-full h-9 px-3 text-sm bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-content-muted mb-1 block">Category</label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full h-9 px-2 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Accessibility">Accessibility</option>
                    <option value="AI Workflow">AI Workflow</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-content-muted mb-1 block">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as FocusTask['priority'])}
                    className="w-full h-9 px-2 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-1.5 rounded-lg border border-border text-xs text-content-secondary hover:text-content-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Event */}
      {activeModal === 'event' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-xl bg-surface-elevated border border-border p-5 max-w-md w-full shadow-modal">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-sm font-semibold text-content-primary">Schedule Calendar Event</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-content-muted hover:text-content-primary p-1"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-xs text-content-muted mb-1 block">Event Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Core Engine Performance Deep Dive"
                  autoFocus
                  required
                  className="w-full h-9 px-3 text-sm bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-content-muted mb-1 block">Time Slot</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full h-9 px-3 text-xs font-mono bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="text-xs text-content-muted mb-1 block">Category</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as 'deep-work' | 'meeting' | 'sync')}
                    className="w-full h-9 px-2 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                  >
                    <option value="deep-work">Deep Work Block</option>
                    <option value="meeting">Engineering Meeting</option>
                    <option value="sync">Team Sync</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-content-muted mb-1 block">Location / Platform</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g. Google Meet or Studio Mode"
                  className="w-full h-9 px-3 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-1.5 rounded-lg border border-border text-xs text-content-secondary hover:text-content-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium"
                >
                  Save Commitment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Reminder */}
      {activeModal === 'reminder' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-xl bg-surface-elevated border border-border p-5 max-w-md w-full shadow-modal">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-sm font-semibold text-content-primary">Set Reminder</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-content-muted hover:text-content-primary p-1"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="space-y-3">
              <div>
                <label className="text-xs text-content-muted mb-1 block">Reminder Note</label>
                <input
                  type="text"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  placeholder="e.g. Follow up with security lead on pen-test report"
                  autoFocus
                  required
                  className="w-full h-9 px-3 text-sm bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-content-muted mb-1 block">Time</label>
                  <input
                    type="text"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full h-9 px-3 text-xs font-mono bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="text-xs text-content-muted mb-1 block">Date</label>
                  <select
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full h-9 px-2 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-1.5 rounded-lg border border-border text-xs text-content-secondary hover:text-content-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium"
                >
                  Set Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
