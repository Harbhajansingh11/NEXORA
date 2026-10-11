'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  X,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatMonthYear, generateDynamicCalendarDays, useHydratedDate } from '@/lib/dateUtils';

export default function CalendarPage() {
  const { calendarEvents, addCalendarEvent, deleteCalendarEvent } = useApp();
  const { currentDate } = useHydratedDate();
  const [activeDate, setActiveDate] = useState<Date>(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number>(() => new Date().getDate());
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('03:00 PM – 04:00 PM');
  const [newEventCategory, setNewEventCategory] = useState<'deep-work' | 'meeting' | 'sync'>('deep-work');
  const [newEventLocation, setNewEventLocation] = useState('Studio Mode');

  useEffect(() => {
    setActiveDate(currentDate);
    setSelectedDay(currentDate.getDate());
  }, [currentDate]);

  const selectedMonth = formatMonthYear(activeDate);
  const calendarDays = generateDynamicCalendarDays(activeDate);

  const prevMonth = () => {
    setActiveDate((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  };

  const nextMonth = () => {
    setActiveDate((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    addCalendarEvent({
      title: newEventTitle,
      timeRange: newEventTime,
      location: newEventLocation,
      category: newEventCategory,
      categoryLabel: newEventCategory === 'deep-work' ? 'Deep Work' : newEventCategory === 'meeting' ? 'Engineering' : 'Sync',
      colorHex: newEventCategory === 'deep-work' ? '#7C3AED' : newEventCategory === 'meeting' ? '#06B6D4' : '#10B981'
    });

    setNewEventTitle('');
    setShowAddModal(false);
  };

  const filteredEvents = calendarEvents.filter((e) => {
    if (filterCategory === 'all') return true;
    return e.category === filterCategory;
  });

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Calendar & Focus Blocks
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            Defend deep work time and manage upcoming commitments
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="h-8 px-3 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Mini Calendar + Detailed Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Calendar Strip / Month Selector (4 cols) */}
        <div className="lg:col-span-4 rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-content-primary">{selectedMonth}</span>
            <div className="flex items-center gap-1 text-content-muted">
              <button
                onClick={prevMonth}
                className="p-1 rounded hover:bg-surface-elevated text-content-secondary transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 rounded hover:bg-surface-elevated text-content-secondary transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1 text-[11px] text-content-muted">
                {day}
              </div>
            ))}
            {calendarDays.map((item, idx) => {
              const isSelected = item.day === selectedDay;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(item.day)}
                  className={`py-1.5 sm:py-2 rounded-lg text-xs font-medium relative transition-colors ${
                    isSelected
                      ? 'bg-brand-purple text-white font-semibold'
                      : item.isToday
                      ? 'bg-surface-elevated text-brand-purple border border-brand-purple/40'
                      : 'hover:bg-surface-elevated text-content-secondary hover:text-content-primary'
                  }`}
                >
                  {item.day}
                  {item.hasEvents && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-cyan" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Category Filter Pills & Time Defense Metrics */}
          <div className="pt-4 border-t border-border space-y-3 text-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-content-muted uppercase tracking-wider">
              <span>Time Defense</span>
              <ShieldCheck className="h-3.5 w-3.5 text-brand-purple" />
            </div>

            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setFilterCategory(filterCategory === 'deep-work' ? 'all' : 'deep-work')}
                className={`w-full flex items-center justify-between p-1.5 rounded transition-colors ${
                  filterCategory === 'deep-work' ? 'bg-surface-elevated text-content-primary' : 'text-content-secondary hover:bg-surface-elevated/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                  <span>Deep Work</span>
                </span>
                <span className="font-mono text-content-muted">2.5 hrs</span>
              </button>

              <button
                onClick={() => setFilterCategory(filterCategory === 'meeting' ? 'all' : 'meeting')}
                className={`w-full flex items-center justify-between p-1.5 rounded transition-colors ${
                  filterCategory === 'meeting' ? 'bg-surface-elevated text-content-primary' : 'text-content-secondary hover:bg-surface-elevated/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
                  <span>Engineering</span>
                </span>
                <span className="font-mono text-content-muted">1.0 hr</span>
              </button>

              <button
                onClick={() => setFilterCategory(filterCategory === 'sync' ? 'all' : 'sync')}
                className={`w-full flex items-center justify-between p-1.5 rounded transition-colors ${
                  filterCategory === 'sync' ? 'bg-surface-elevated text-content-primary' : 'text-content-secondary hover:bg-surface-elevated/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  <span>Strategy</span>
                </span>
                <span className="font-mono text-content-muted">1.0 hr</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Detailed Agenda */}
        <div className="lg:col-span-8 rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-content-primary">
                Agenda for Sunday, Oct {selectedDay}, 2026
              </h2>
              <p className="text-[11px] sm:text-xs text-content-muted">
                {filteredEvents.length} commitments scheduled
              </p>
            </div>
            <span className="text-[11px] font-mono text-content-muted bg-surface-elevated px-2 py-0.5 rounded border border-border">
              4 total hours defended
            </span>
          </div>

          {/* Events stream */}
          <div className="space-y-2">
            {filteredEvents.length === 0 ? (
              <div className="py-12 text-center text-xs text-content-muted">
                No events found matching this view.
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 sm:p-3.5 rounded-lg bg-surface-elevated/40 hover:bg-surface-elevated border border-border transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className="w-1 self-stretch rounded-full flex-shrink-0 my-0.5"
                      style={{ backgroundColor: event.colorHex }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-content-primary truncate">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2.5 mt-1 text-[11px] text-content-muted">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3 text-content-dim" />
                          <span>{event.timeRange}</span>
                        </span>
                        {event.location && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 truncate text-content-secondary">
                              <MapPin className="h-3 w-3 text-content-dim" />
                              <span>{event.location}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded border font-medium"
                      style={{
                        borderColor: `${event.colorHex}30`,
                        backgroundColor: `${event.colorHex}10`,
                        color: event.colorHex
                      }}
                    >
                      {event.categoryLabel}
                    </span>

                    <button
                      onClick={() => deleteCalendarEvent(event.id)}
                      className="text-content-dim hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      aria-label="Delete event"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-xl bg-surface-elevated border border-border p-5 max-w-md w-full shadow-modal">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-semibold text-content-primary">Schedule New Event</h3>
              <button
                onClick={() => setShowAddModal(false)}
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
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Design System Review"
                  required
                  autoFocus
                  className="w-full h-9 px-3 text-sm bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="text-xs text-content-muted mb-1 block">Time Slot</label>
                <input
                  type="text"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  placeholder="e.g. 02:00 PM – 03:00 PM"
                  className="w-full h-9 px-3 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-content-muted mb-1 block">Category</label>
                <select
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value as 'deep-work' | 'meeting' | 'sync')}
                  className="w-full h-9 px-3 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                >
                  <option value="deep-work">Deep Work Block</option>
                  <option value="meeting">Engineering Meeting</option>
                  <option value="sync">Team Sync</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-content-muted mb-1 block">Location</label>
                <input
                  type="text"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  placeholder="e.g. Studio Mode or Meet"
                  className="w-full h-9 px-3 text-xs bg-surface border border-border rounded-lg text-content-primary focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-border text-xs text-content-secondary hover:text-content-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-medium"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
