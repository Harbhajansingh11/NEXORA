'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const UpcomingSchedule: React.FC = () => {
  const { calendarEvents } = useApp();

  return (
    <section aria-labelledby="today-schedule-heading" className="rounded-xl bg-surface border border-border p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h2 id="today-schedule-heading" className="text-sm sm:text-base font-semibold text-content-primary">
            Today&apos;s Schedule
          </h2>
          <p className="text-[11px] sm:text-xs text-content-muted">
            {calendarEvents.length} commitments planned
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/calendar"
            className="text-xs text-brand-purple hover:text-brand-purple-hover font-medium flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-surface-elevated"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Event</span>
          </Link>

          <Link
            href="/calendar"
            className="text-xs text-content-muted hover:text-content-primary flex items-center gap-1 transition-colors px-1 py-0.5"
          >
            <span>Agenda</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Agenda Timeline Items */}
      <div className="mt-3 space-y-2">
        {calendarEvents.length === 0 ? (
          <div className="py-8 text-center text-xs text-content-muted">
            No calendar events scheduled for today.
          </div>
        ) : (
          calendarEvents.map((event, idx) => (
            <div
              key={event.id}
              className="p-3 rounded-lg bg-surface-elevated/40 hover:bg-surface-elevated border border-border/80 transition-colors flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {/* Category accent bar */}
                <div
                  className="w-1 self-stretch rounded-full flex-shrink-0 my-0.5"
                  style={{ backgroundColor: event.colorHex }}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-medium text-content-primary truncate leading-tight">
                      {event.title}
                    </h3>
                    {idx === 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-purple/15 text-brand-purple border border-brand-purple/20 font-medium">
                        Next
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-content-muted">
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

              <span
                className="text-[11px] px-2 py-0.5 rounded border flex-shrink-0 font-medium"
                style={{
                  borderColor: `${event.colorHex}30`,
                  backgroundColor: `${event.colorHex}10`,
                  color: event.colorHex
                }}
              >
                {event.categoryLabel}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Footer link */}
      <div className="pt-2.5 border-t border-border mt-3 flex justify-between items-center text-[11px] text-content-muted">
        <span>Calendar in sync</span>
        <Link
          href="/calendar"
          className="text-content-secondary hover:text-content-primary flex items-center gap-1 group transition-colors"
        >
          <span>Open Full Calendar</span>
          <ArrowRight className="h-3 w-3 text-content-dim group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
};
