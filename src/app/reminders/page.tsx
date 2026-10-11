'use client';

import React, { useState } from 'react';
import { Bell, Plus, Clock, Calendar, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function RemindersPage() {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'dismissed'>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('02:00 PM');
  const [newDate, setNewDate] = useState('Today');
  const [newCategory, setNewCategory] = useState('Follow-up');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addReminder(newTitle, newTime, newDate, newCategory);
    setNewTitle('');
  };

  const filteredReminders = reminders.filter((r) => {
    if (filter === 'active') return r.active;
    if (filter === 'dismissed') return !r.active;
    return true;
  });

  const activeCount = reminders.filter((r) => r.active).length;

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Reminders & Alerts
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            {activeCount} active time-sensitive alerts
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            All ({reminders.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'active'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter('dismissed')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === 'dismissed'
                ? 'bg-surface-elevated text-content-primary font-semibold'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Dismissed ({reminders.length - activeCount})
          </button>
        </div>
      </div>

      {/* Add Reminder Card */}
      <div className="rounded-xl bg-surface border border-border p-3.5 sm:p-4">
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Set a new reminder..."
            className="flex-1 h-9 px-3.5 text-xs sm:text-sm bg-surface-elevated border border-border rounded-lg text-content-primary placeholder:text-content-dim focus:outline-none focus:border-brand-purple"
          />

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="e.g. 03:30 PM"
              className="w-28 h-9 px-2.5 text-xs bg-surface-elevated border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple font-mono"
            />

            <select
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="h-9 px-2 text-xs bg-surface-elevated border border-border rounded-lg text-content-secondary focus:outline-none focus:border-brand-purple"
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Oct 14">Oct 14</option>
              <option value="Next Week">Next Week</option>
            </select>

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="h-9 px-2 text-xs bg-surface-elevated border border-border rounded-lg text-content-secondary focus:outline-none focus:border-brand-purple"
            >
              <option value="Follow-up">Follow-up</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
              <option value="Design System">Design System</option>
            </select>

            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="h-9 px-3.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1 transition-colors flex-shrink-0"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Set</span>
            </button>
          </div>
        </form>
      </div>

      {/* Reminders List */}
      <div className="rounded-xl bg-surface border border-border divide-y divide-border/60">
        {filteredReminders.length === 0 ? (
          <div className="py-12 text-center text-xs text-content-muted">
            No reminders found in this category.
          </div>
        ) : (
          filteredReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-3.5 flex items-center justify-between gap-4 transition-colors ${
                reminder.active
                  ? 'text-content-primary hover:bg-surface-elevated/40'
                  : 'text-content-muted opacity-60'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleReminder(reminder.id)}
                  className={`mt-0.5 p-1 rounded-md border text-xs transition-colors flex-shrink-0 ${
                    reminder.active
                      ? 'border-brand-purple/40 text-brand-purple bg-brand-purple/10'
                      : 'border-border text-content-dim'
                  }`}
                  aria-label={reminder.active ? 'Dismiss reminder' : 'Activate reminder'}
                >
                  <Bell className="h-3.5 w-3.5" />
                </button>

                <div className="min-w-0">
                  <h2 className={`text-xs sm:text-sm font-medium leading-snug ${!reminder.active ? 'line-through text-content-muted' : ''}`}>
                    {reminder.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2.5 mt-1 text-[11px] text-content-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{reminder.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3 text-content-dim" />
                      <span>{reminder.time}</span>
                    </span>
                    <span>•</span>
                    <span className="text-content-secondary font-medium">{reminder.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-surface-elevated text-content-secondary transition-colors"
                >
                  {reminder.active ? 'Dismiss' : 'Restore'}
                </button>

                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="text-content-dim hover:text-rose-400 p-1.5 rounded hover:bg-surface-elevated transition-colors"
                  aria-label="Delete reminder"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
