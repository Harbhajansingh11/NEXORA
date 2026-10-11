'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  Send,
  ArrowRight,
  Sliders,
  Calendar,
  Layers,
  Loader2,
  Trash2,
  Copy,
  Check,
  CheckSquare
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionCard?: {
    type: 'task' | 'reminder' | 'calendar' | 'email';
    title: string;
    detail: string;
    linkHref?: string;
    linkLabel?: string;
  };
}

export default function AssistantPage() {
  const { tasks, calendarEvents, emails, addTask, addReminder, userProfile, showToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      content:
        `Hello ${userProfile.name.split(' ')[0]}. I am your NEXORA copilot with active context across your calendar, priority tasks, and inbox.\n\nYou can ask me to "Plan my day", "Show my upcoming tasks", "Remind me tomorrow at 10 AM to sync with Marcus", or "Summarize high-priority incoming emails".`,
      timestamp: '08:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const samplePrompts = [
    'Plan my day around deep focus blocks',
    'Show my upcoming tasks',
    'Remind me tomorrow at 10 AM to sync with Marcus',
    'Summarize high-priority incoming emails',
    'Add task: Audit API authentication token expiry'
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: String(Date.now()),
        sender: 'assistant',
        content: `Conversation cleared. Workspace context remains active across your calendar and tasks.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    showToast('Conversation reset');
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    const lower = query.toLowerCase();

    // 160ms responsive transition
    setTimeout(() => {
      setIsTyping(false);
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let replyContent = '';
      let actionCard: ChatMessage['actionCard'] = undefined;

      if (lower.includes('plan my day')) {
        const pending = tasks.filter(t => !t.completed);
        replyContent = `Here is your synthesized daily plan:\n\n• 09:00 AM – 11:30 AM: Deep Work Focus (Core Engine Architecture) — Defended.\n• 12:00 PM – 01:00 PM: Platform Scalability & Reliability Review.\n• 02:30 PM – 03:30 PM: Product Roadmap Sync.\n• 04:15 PM – 05:00 PM: Design System Sync.\n\nRecommended Task Execution: Tackle "${pending[0]?.title || 'Key Priority'}" during your open 1:00 PM–2:30 PM window.`;
        actionCard = {
          type: 'calendar',
          title: 'Daily Plan Active',
          detail: '4 calendar blocks defended • 2.5 hours deep work protected',
          linkHref: '/calendar',
          linkLabel: 'View Agenda'
        };
      } else if (lower.includes('show') && (lower.includes('task') || lower.includes('upcoming'))) {
        const pending = tasks.filter(t => !t.completed);
        replyContent = `You have ${pending.length} pending commitments requiring attention:\n\n` +
          pending.map((t, i) => `${i + 1}. [${t.priority.toUpperCase()}] ${t.title} (${t.category}) — Due ${t.dueDate}`).join('\n');
        actionCard = {
          type: 'task',
          title: 'Tasks Queue',
          detail: `${pending.length} incomplete tasks in matrix`,
          linkHref: '/tasks',
          linkLabel: 'Manage Tasks'
        };
      } else if (lower.includes('remind')) {
        let time = '10:00 AM';
        let date = 'Tomorrow';
        if (lower.includes('today')) date = 'Today';
        if (lower.includes('tomorrow')) date = 'Tomorrow';
        const timeMatch = query.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
        if (timeMatch) time = timeMatch[1].toUpperCase();

        const reminderNote = query.replace(/^remind me\s+/i, '').replace(/\s+(?:tomorrow|today)\s+(?:at\s+)?(?:\d{1,2}(?::\d{2})?\s*(?:am|pm))?/i, '').trim();

        const createdReminder = addReminder(reminderNote || "Follow up on scheduled commitments", time, date);
        replyContent = `I have scheduled a reminder for you:\n\n"${createdReminder.title}"\nTrigger: ${date} at ${time}.`;
        actionCard = {
          type: 'reminder',
          title: `Reminder Set: ${time}`,
          detail: `Date: ${date} • ${createdReminder.title}`,
          linkHref: '/reminders',
          linkLabel: 'View Reminders'
        };
      } else if (lower.startsWith('add task:') || lower.startsWith('add task') || lower.includes('task:')) {
        const taskTitle = query.replace(/^add task:?\s*/i, '').trim();
        const created = addTask(taskTitle || "Review and prioritize backlog", "General", "high");
        replyContent = `Created priority task:\n\n"${created.title}"\nPriority: High • Category: General • Due: Today, 5:00 PM.`;
        actionCard = {
          type: 'task',
          title: 'Task Created',
          detail: created.title,
          linkHref: '/tasks',
          linkLabel: 'View in Matrix'
        };
      } else if (lower.includes('email') || lower.includes('inbox') || lower.includes('summarize')) {
        const unread = emails.filter(e => e.unread);
        replyContent = `Synthesized summary of your ${unread.length} unread priority threads:\n\n` +
          unread.map(e => `• ${e.sender} (${e.subject}):\n  ${e.summary}`).join('\n\n');
        actionCard = {
          type: 'email',
          title: 'Inbox Distillation',
          detail: `${unread.length} unread threads summarized`,
          linkHref: '/email',
          linkLabel: 'Open Inbox'
        };
      } else {
        replyContent = `I have processed your request: "${query}".\n\nNEXORA context engine has logged this action into your active productivity timeline. All connected state (calendar, tasks, reminders) remains in sync.`;
      }

      const assistantReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        content: replyContent,
        timestamp: currentTime,
        actionCard
      };

      setMessages((prev) => [...prev, assistantReply]);
    }, 160);
  };

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            Contextual planning, synthesis, and agenda management
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="text-[11px] font-mono text-content-secondary bg-surface-elevated px-2.5 py-1 rounded-lg border border-border flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Local Context Engine</span>
          </div>

          <button
            onClick={handleClear}
            className="text-xs text-content-muted hover:text-content-primary p-1.5 rounded-lg border border-border hover:bg-surface-elevated transition-colors"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Chat Conversation Stream (8 cols) */}
        <div className="lg:col-span-8 rounded-xl bg-surface border border-border flex flex-col h-[600px]">
          {/* Messages list */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-medium ${
                    msg.sender === 'user'
                      ? 'bg-surface-elevated border border-border text-content-primary'
                      : 'bg-brand-purple/20 text-brand-purple'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    userProfile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>

                <div className="space-y-2 max-w-[85%]">
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-brand-purple text-white shadow-subtle'
                        : 'bg-surface-elevated border border-border text-content-primary shadow-subtle'
                    }`}
                  >
                    {msg.content}

                    <div
                      className={`text-[10px] mt-2 flex items-center justify-between gap-2 pt-1 border-t ${
                        msg.sender === 'user'
                          ? 'border-white/20 text-white/70'
                          : 'border-border/60 text-content-dim'
                      }`}
                    >
                      <span className="font-mono">{msg.timestamp}</span>
                      {msg.sender === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-content-primary p-0.5"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connected Action Card */}
                  {msg.actionCard && (
                    <div className="p-2.5 rounded-lg bg-surface-subtle border border-border text-xs flex items-center justify-between gap-3 animate-dropdown">
                      <div className="min-w-0">
                        <div className="font-medium text-content-primary text-xs truncate">
                          {msg.actionCard.title}
                        </div>
                        <div className="text-[11px] text-content-muted truncate">
                          {msg.actionCard.detail}
                        </div>
                      </div>

                      {msg.actionCard.linkHref && (
                        <Link
                          href={msg.actionCard.linkHref}
                          className="text-[11px] font-medium text-brand-purple hover:text-brand-purple-hover flex items-center gap-1 flex-shrink-0"
                        >
                          <span>{msg.actionCard.linkLabel || 'Open'}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-content-muted p-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-purple" />
                <span>Synthesizing workspace context...</span>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <div className="p-3 border-t border-border bg-surface-subtle/50 rounded-b-xl">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Ask NEXORA: "Plan my day", "Show tasks", "Remind me tomorrow at 10 AM"...'
                className="w-full h-10 pl-3.5 pr-10 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-40 text-white flex items-center justify-center transition-colors"
                aria-label="Send prompt"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Context State & Suggested Prompts (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Suggested Prompts */}
          <div className="rounded-xl bg-surface border border-border p-4">
            <h2 className="text-xs font-semibold text-content-primary uppercase tracking-wider mb-2.5">
              Suggested Workflows
            </h2>
            <div className="space-y-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(p)}
                  className="w-full text-left p-2 rounded-lg bg-surface-elevated/60 hover:bg-surface-elevated border border-border text-xs text-content-secondary hover:text-content-primary transition-colors flex items-start gap-2"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-brand-purple flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Context Indicators */}
          <div className="rounded-xl bg-surface border border-border p-4">
            <h2 className="text-xs font-semibold text-content-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-brand-cyan" />
              <span>Connected Workspace Context</span>
            </h2>
            <div className="space-y-2.5 text-xs">
              <Link
                href="/calendar"
                className="flex items-center justify-between text-content-secondary hover:text-content-primary p-1.5 rounded hover:bg-surface-elevated transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-brand-purple" />
                  <span>Calendar Schedule</span>
                </span>
                <span className="font-mono text-content-muted">{calendarEvents.length} blocks</span>
              </Link>

              <Link
                href="/tasks"
                className="flex items-center justify-between text-content-secondary hover:text-content-primary p-1.5 rounded hover:bg-surface-elevated transition-colors"
              >
                <span className="flex items-center gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Pending Tasks</span>
                </span>
                <span className="font-mono text-content-muted">{pendingTasksCount} items</span>
              </Link>

              <Link
                href="/email"
                className="flex items-center justify-between text-content-secondary hover:text-content-primary p-1.5 rounded hover:bg-surface-elevated transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  <span>Executive Email</span>
                </span>
                <span className="font-mono text-content-muted">{emails.length} threads</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
