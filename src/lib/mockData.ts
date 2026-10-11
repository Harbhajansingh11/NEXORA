import { EmailPreview, CalendarEvent, FocusTask, AutomationItem, UserProfile, Reminder, AppNotification } from '@/types/dashboard';
import { getRelativeDateLabel } from './dateUtils';

export const mockUserProfile: UserProfile = {
  name: "Alexander Vance",
  title: "Principal Product Architect",
  email: "alexander.vance@nexora.cloud",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  status: "In Deep Focus"
};

export const mockEmails: EmailPreview[] = [
  {
    id: "em-1",
    sender: "Elena Rostova",
    senderEmail: "elena@vanguard.tech",
    subject: "Q4 Infrastructure Strategy & Cloud Migration Deck",
    summary: "Reviewed the hybrid Kubernetes topology proposal. Team approved the regional staging blueprint for Monday rollout.",
    time: "10:42 AM",
    unread: true,
    priority: "high"
  },
  {
    id: "em-2",
    sender: "Marcus Chen",
    senderEmail: "m.chen@hyperion.io",
    subject: "Client API Rate Limit Escalation - Resolution Notes",
    summary: "Dynamic token-bucket throttling is now live in production. P99 latency dropped by 42ms across all US-East nodes.",
    time: "09:15 AM",
    unread: true,
    priority: "high"
  },
  {
    id: "em-3",
    sender: "Sarah Jenkins",
    senderEmail: "sarah.j@designsync.co",
    subject: "Design Token Specification v2.4 (Figma Sync)",
    summary: "Added revised semantic dark variables for high-contrast accessibility compliance. Ready for your sign-off.",
    time: "Yesterday",
    unread: false,
    priority: "normal"
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "ev-1",
    title: "Deep Work: Core Engine Architecture",
    timeRange: "09:00 AM – 11:30 AM",
    location: "Studio Mode",
    category: "deep-work",
    categoryLabel: "Deep Work",
    colorHex: "#8B5CF6"
  },
  {
    id: "ev-2",
    title: "Platform Scalability & Reliability Review",
    timeRange: "12:00 PM – 01:00 PM",
    location: "Google Meet",
    category: "meeting",
    categoryLabel: "Engineering",
    colorHex: "#06B6D4"
  },
  {
    id: "ev-3",
    title: "Q4 Product Roadmap Sync with Stakeholders",
    timeRange: "02:30 PM – 03:30 PM",
    location: "Virtual Room A",
    category: "sync",
    categoryLabel: "Strategy",
    colorHex: "#10B981"
  },
  {
    id: "ev-4",
    title: "Design System & Accessible Micro-interactions",
    timeRange: "04:15 PM – 05:00 PM",
    location: "Huddle",
    category: "sync",
    categoryLabel: "Design",
    colorHex: "#F59E0B"
  }
];

export const initialFocusTasks: FocusTask[] = [
  {
    id: "task-1",
    title: "Finalize high-density dashboard grid hierarchy",
    category: "Frontend",
    dueDate: "Today, 5:00 PM",
    completed: true,
    priority: "urgent",
    estimatedMinutes: 45
  },
  {
    id: "task-2",
    title: "Audit keyboard navigation and contrast ratios across dark mode",
    category: "Accessibility",
    dueDate: "Today, 6:30 PM",
    completed: false,
    priority: "high",
    estimatedMinutes: 30
  },
  {
    id: "task-3",
    title: "Review automated email summarization heuristic pipeline",
    category: "AI Workflow",
    dueDate: "Tomorrow, 11:00 AM",
    completed: false,
    priority: "medium",
    estimatedMinutes: 40
  },
  {
    id: "task-4",
    title: "Draft system architecture brief for vector indexing service",
    category: "Architecture",
    dueDate: getRelativeDateLabel(2),
    completed: false,
    priority: "low",
    estimatedMinutes: 60
  }
];

export const mockAutomations: AutomationItem[] = [
  {
    id: "auto-1",
    name: "Autonomous Daily Briefing Generator",
    description: "Synthesizes early morning inbox, calendar agenda, and priority task list into an actionable briefing.",
    status: "active",
    lastTriggered: "Today at 07:00 AM",
    category: "daily"
  },
  {
    id: "auto-2",
    name: "Executive Email Thread Distillation",
    description: "Extracts key commitments, pending action items, and urgency tiers from incoming multi-thread emails.",
    status: "active",
    lastTriggered: "18 minutes ago",
    category: "email"
  },
  {
    id: "auto-3",
    name: "Pre-Meeting Context Briefings",
    description: "Surfaces recent shared documents and interaction history 10 minutes prior to scheduled calendar events.",
    status: "active",
    lastTriggered: "2 hours ago",
    category: "calendar"
  },
  {
    id: "auto-4",
    name: "Task Rollover & Prioritization Heuristic",
    description: "Re-ranks uncompleted daily items based on project deadlines and available deep-work calendar blocks.",
    status: "paused",
    lastTriggered: "Yesterday at 11:59 PM",
    category: "tasks"
  }
];

export const initialReminders: Reminder[] = [
  {
    id: 'rem-1',
    title: 'Review canary telemetry metrics before engineering sync',
    time: '01:45 PM',
    date: 'Today',
    category: 'Operations',
    active: true,
  },
  {
    id: 'rem-2',
    title: 'Send updated Figma design tokens to Sarah',
    time: '04:00 PM',
    date: 'Today',
    category: 'Design System',
    active: true,
  },
  {
    id: 'rem-3',
    title: 'Sign off on monthly cloud compute cost report',
    time: '11:00 AM',
    date: 'Tomorrow',
    category: 'Finance',
    active: true,
  },
  {
    id: 'rem-4',
    title: 'Sync with Marcus on rate limit escalation notes',
    time: '09:00 AM',
    date: getRelativeDateLabel(2),
    category: 'Engineering',
    active: false,
  },
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Daily briefing prepared',
    description: 'Synthesized 4 calendar commitments & priority inbox items.',
    time: '07:00 AM',
    category: 'briefing',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Upcoming: Core Engine Architecture',
    description: 'Deep work focus block starts in 25 minutes.',
    time: '08:35 AM',
    category: 'calendar',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Throttling resolution live',
    description: 'Marcus Chen updated client rate limit escalation notes.',
    time: '09:20 AM',
    category: 'email',
    read: true,
  },
];

