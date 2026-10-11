'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FocusTask,
  CalendarEvent,
  Reminder,
  EmailPreview,
  AutomationItem,
  AppNotification,
  UserProfile
} from '@/types/dashboard';
import {
  initialFocusTasks,
  mockCalendarEvents,
  initialReminders,
  mockEmails,
  mockAutomations,
  initialNotifications,
  mockUserProfile
} from '@/lib/mockData';

interface AppContextType {
  tasks: FocusTask[];
  calendarEvents: CalendarEvent[];
  reminders: Reminder[];
  emails: EmailPreview[];
  automations: AutomationItem[];
  notifications: AppNotification[];
  userProfile: UserProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Task actions
  addTask: (title: string, category?: string, priority?: FocusTask['priority'], dueDate?: string) => FocusTask;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Calendar actions
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
  deleteCalendarEvent: (id: string) => void;

  // Reminder actions
  addReminder: (title: string, time: string, date?: string, category?: string) => Reminder;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;

  // Automation actions
  toggleAutomation: (id: string) => void;
  runAutomation: (id: string) => void;

  // Email actions
  markEmailAsRead: (id: string) => void;
  archiveEmail: (id: string) => void;
  deleteEmail: (id: string) => void;
  sendEmailReply: (emailId: string, replyBody: string) => void;

  // Notification actions
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  dismissNotification: (id: string) => void;

  // Profile actions
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<FocusTask[]>(initialFocusTasks);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [emails, setEmails] = useState<EmailPreview[]>(mockEmails);
  const [automations, setAutomations] = useState<AutomationItem[]>(mockAutomations);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const addTask = (
    title: string,
    category: string = 'General',
    priority: FocusTask['priority'] = 'high',
    dueDate: string = 'Today, 5:00 PM'
  ): FocusTask => {
    const newTask: FocusTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      category,
      priority,
      dueDate,
      completed: false,
      estimatedMinutes: 30
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task created: "${newTask.title}"`);
    return newTask;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task removed');
  };

  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>): CalendarEvent => {
    const newEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      ...eventData
    };
    setCalendarEvents((prev) => [...prev, newEvent]);
    showToast(`Scheduled: "${newEvent.title}"`);
    return newEvent;
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event removed from schedule');
  };

  const addReminder = (
    title: string,
    time: string,
    date: string = 'Today',
    category: string = 'Follow-up'
  ): Reminder => {
    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      title: title.trim(),
      time,
      date,
      category,
      active: true
    };
    setReminders((prev) => [newReminder, ...prev]);
    showToast(`Reminder set for ${date} at ${time}`);
    return newReminder;
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    showToast('Reminder deleted');
  };

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'active' ? 'paused' : 'active';
          showToast(`Automation ${nextStatus === 'active' ? 'activated' : 'paused'}: ${a.name}`);
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const runAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, lastTriggered: 'Just now' };
        }
        return a;
      })
    );
    showToast(`Routine executed: ${automations.find(a => a.id === id)?.name || 'Workflow'}`);
  };

  const markEmailAsRead = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, unread: false } : e))
    );
  };

  const archiveEmail = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    showToast('Email archived');
  };

  const deleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    showToast('Email deleted');
  };

  const sendEmailReply = (emailId: string, replyBody: string) => {
    if (replyBody) {
      markEmailAsRead(emailId);
      showToast('Reply dispatched');
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUserProfile((prev) => ({
            ...prev,
            name: data.user.name,
            email: data.user.email,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    window.location.href = '/login';
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast('Profile preferences updated');
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        calendarEvents,
        reminders,
        emails,
        automations,
        notifications,
        userProfile,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        addTask,
        toggleTask,
        deleteTask,
        addCalendarEvent,
        deleteCalendarEvent,
        addReminder,
        toggleReminder,
        deleteReminder,
        toggleAutomation,
        runAutomation,
        markEmailAsRead,
        archiveEmail,
        deleteEmail,
        sendEmailReply,
        markNotificationAsRead,
        clearNotifications,
        dismissNotification,
        updateUserProfile,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
