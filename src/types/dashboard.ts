export interface EmailPreview {
  id: string;
  sender: string;
  senderEmail: string;
  avatar?: string;
  subject: string;
  summary: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'normal' | 'low';
}

export interface CalendarEvent {
  id: string;
  title: string;
  timeRange: string;
  location?: string;
  category: 'deep-work' | 'meeting' | 'sync' | 'personal';
  categoryLabel: string;
  colorHex: string;
}

export interface FocusTask {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  estimatedMinutes?: number;
}

export interface AutomationItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'ready';
  lastTriggered: string;
  category: 'email' | 'calendar' | 'daily' | 'tasks';
}

export interface ResearchBriefData {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  keyTakeaways: string[];
  sourceCount: number;
  lastUpdated: string;
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  avatarUrl: string;
  status: string;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  category: string;
  active: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'briefing' | 'calendar' | 'task' | 'email';
  read: boolean;
}

