'use client';

import React, { useState } from 'react';
import { Bot, ArrowRight, CornerDownLeft, Loader2, CheckCircle2, Clock, Calendar, ListTodo } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AiCommandInputProps {
  onShowTasks?: () => void;
}

export const AiCommandInput: React.FC<AiCommandInputProps> = ({ onShowTasks }) => {
  const { addTask, addReminder, tasks, calendarEvents } = useApp();
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseFeedback, setResponseFeedback] = useState<{
    type: 'success' | 'info' | 'error';
    icon: 'task' | 'clock' | 'calendar' | 'list' | 'alert';
    title: string;
    details?: string;
  } | null>(null);

  const sampleCommands = [
    { label: "Plan my day", cmd: "Plan my day around deep focus blocks" },
    { label: "Remind tomorrow 10 AM", cmd: "Remind me tomorrow at 10 AM to sync with Marcus" },
    { label: "Show upcoming tasks", cmd: "Show my upcoming tasks" },
    { label: "Add task: Review PRs", cmd: "Add task: Review backend PRs by 4 PM" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isProcessing) return;

    setIsProcessing(true);
    setResponseFeedback(null);

    // Fast 150ms deterministic command parsing transition
    setTimeout(() => {
      setIsProcessing(false);
      setQuery('');

      const lower = trimmed.toLowerCase();

      if (lower.startsWith('add task:') || lower.startsWith('add task') || lower.includes('task:')) {
        const taskTitle = trimmed.replace(/^add task:?\s*/i, '').trim();
        const created = addTask(taskTitle || "Review and prioritize backlog", "Workflow", "high");
        setResponseFeedback({
          type: 'success',
          icon: 'task',
          title: `Added task to your daily focus list: "${created.title}"`,
          details: 'Category: Workflow • Priority: High • Due: Today'
        });
      } else if (lower.includes('plan my day')) {
        const pendingCount = tasks.filter(t => !t.completed).length;
        const upcomingEvent = calendarEvents[0];
        setResponseFeedback({
          type: 'info',
          icon: 'calendar',
          title: `Daily Plan Synthesized`,
          details: `Defending 2.5h morning focus block (09:00 AM – 11:30 AM). Next session: "${upcomingEvent?.title || 'Review'}" at ${upcomingEvent?.timeRange.split('–')[0].trim() || '12:00 PM'}. ${pendingCount} priority tasks queued.`
        });
      } else if (lower.includes('remind')) {
        // Extract time if present
        let time = '10:00 AM';
        let date = 'Tomorrow';
        if (lower.includes('today')) date = 'Today';
        if (lower.includes('tomorrow')) date = 'Tomorrow';
        const timeMatch = trimmed.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
        if (timeMatch) time = timeMatch[1].toUpperCase();

        const reminderNote = trimmed.replace(/^remind me\s+/i, '').replace(/\s+(?:tomorrow|today)\s+(?:at\s+)?(?:\d{1,2}(?::\d{2})?\s*(?:am|pm))?/i, '').trim();

        addReminder(reminderNote || "Follow up on scheduled commitments", time, date);
        setResponseFeedback({
          type: 'success',
          icon: 'clock',
          title: `Reminder scheduled for ${date} at ${time}`,
          details: `Note: "${reminderNote || 'Follow up'}"`
        });
      } else if (lower.includes('show') && (lower.includes('task') || lower.includes('upcoming'))) {
        const pending = tasks.filter(t => !t.completed);
        onShowTasks?.();
        setResponseFeedback({
          type: 'info',
          icon: 'list',
          title: `${pending.length} Upcoming Tasks Requiring Attention`,
          details: pending.map(t => t.title).slice(0, 3).join(' • ') + (pending.length > 3 ? ` (+${pending.length - 3} more)` : '')
        });
      } else {
        // Safe, clear fallback for natural language command
        setResponseFeedback({
          type: 'info',
          icon: 'clock',
          title: `Command processed: "${trimmed}"`,
          details: `Connected to local context engine. For conversational multi-turn planning, open AI Assistant in sidebar.`
        });
      }
    }, 160);
  };

  return (
    <section aria-label="AI Command Center" className="rounded-xl bg-surface border border-border p-4 transition-colors">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-content-muted">
            <Bot className="h-4 w-4 text-brand-purple" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isProcessing}
            placeholder='Ask NEXORA: "Plan my day", "Remind me tomorrow at 10 AM", or "Add task: Review Q4 roadmap"...'
            className="w-full h-10 pl-10 pr-20 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all duration-150"
          />

          <div className="absolute right-1.5 flex items-center gap-1">
            {query.trim() && (
              <button
                type="submit"
                disabled={isProcessing}
                className="h-7 px-2.5 rounded-md bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium flex items-center gap-1 transition-colors duration-150"
              >
                {isProcessing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Run</span>
                    <CornerDownLeft className="h-3 w-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-border/60">
          <span className="text-[11px] text-content-muted">Suggested:</span>
          {sampleCommands.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(sample.cmd)}
              className="text-[11px] px-2 py-0.5 rounded bg-surface-subtle hover:bg-surface-elevated border border-border text-content-secondary hover:text-content-primary transition-colors duration-150 flex items-center gap-1"
            >
              <span>{sample.label}</span>
              <ArrowRight className="h-2.5 w-2.5 text-content-dim" />
            </button>
          ))}
        </div>

        {/* Structured Result Feedback Banner */}
        {responseFeedback && (
          <div className="mt-3 p-3 rounded-lg bg-surface-elevated border border-border text-xs animate-dropdown flex items-start gap-2.5">
            <div className="mt-0.5 flex-shrink-0">
              {responseFeedback.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : responseFeedback.icon === 'calendar' ? (
                <Calendar className="h-4 w-4 text-brand-cyan" />
              ) : responseFeedback.icon === 'list' ? (
                <ListTodo className="h-4 w-4 text-brand-purple" />
              ) : (
                <Clock className="h-4 w-4 text-brand-purple" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-medium text-content-primary leading-tight">
                {responseFeedback.title}
              </div>
              {responseFeedback.details && (
                <div className="text-[11px] text-content-muted mt-1 leading-relaxed">
                  {responseFeedback.details}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setResponseFeedback(null)}
              className="text-content-dim hover:text-content-primary p-0.5 text-[10px]"
              aria-label="Dismiss feedback"
            >
              Dismiss
            </button>
          </div>
        )}
      </form>
    </section>
  );
};
