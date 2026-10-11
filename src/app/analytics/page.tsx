'use client';

import React, { useState } from 'react';
import { Clock, Target, Award, Zap, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AnalyticsPage() {
  const { tasks, calendarEvents } = useApp();
  const [selectedWeek, setSelectedWeek] = useState('Week 41 (Oct 5 – 11, 2026)');

  const weeklyTrends = [
    { day: 'Mon', focusHours: 4.5, targetHours: 5.0 },
    { day: 'Tue', focusHours: 6.0, targetHours: 5.0 },
    { day: 'Wed', focusHours: 5.2, targetHours: 5.0 },
    { day: 'Thu', focusHours: 7.1, targetHours: 5.0 },
    { day: 'Fri', focusHours: 4.8, targetHours: 5.0 },
    { day: 'Sat', focusHours: 2.0, targetHours: 2.0 },
    { day: 'Sun', focusHours: 3.5, targetHours: 3.0 },
  ];

  const totalFocus = weeklyTrends.reduce((acc, curr) => acc + curr.focusHours, 0);
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            Focus & Productivity Analytics
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            Deep work duration and schedule defense performance
          </p>
        </div>

        {/* Week Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 text-xs text-content-secondary">
            <button
              onClick={() => setSelectedWeek('Week 40 (Sep 28 – Oct 4, 2026)')}
              className="p-1 rounded hover:bg-surface-elevated text-content-muted hover:text-content-primary transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="font-mono px-2 text-[11px] text-content-primary">{selectedWeek}</span>
            <button
              onClick={() => setSelectedWeek('Week 41 (Oct 5 – 11, 2026)')}
              className="p-1 rounded hover:bg-surface-elevated text-content-muted hover:text-content-primary transition-colors"
              aria-label="Next week"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (Minimal, restrained, no glowing blur) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between text-content-muted mb-2">
            <span className="text-xs">Deep Work Defended</span>
            <Clock className="h-4 w-4 text-brand-purple" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-content-primary font-mono">{totalFocus.toFixed(1)} hrs</div>
          <div className="text-[11px] text-content-secondary mt-1">4.7 hrs daily average</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between text-content-muted mb-2">
            <span className="text-xs">Completed Commitments</span>
            <Target className="h-4 w-4 text-brand-cyan" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-content-primary font-mono">{completedTasks} items</div>
          <div className="text-[11px] text-content-secondary mt-1">From daily priority matrix</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between text-content-muted mb-2">
            <span className="text-xs">Schedule Defense Rate</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-content-primary font-mono">88.5%</div>
          <div className="text-[11px] text-content-secondary mt-1">Guarded focus slots</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between text-content-muted mb-2">
            <span className="text-xs">Active Calendar Blocks</span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-content-primary font-mono">{calendarEvents.length} blocks</div>
          <div className="text-[11px] text-content-secondary mt-1">Today&apos;s scheduled sessions</div>
        </div>
      </div>

      {/* Visual Chart Card */}
      <div className="rounded-xl bg-surface border border-border p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-content-primary">Weekly Deep Focus Distribution</h2>
            <p className="text-[11px] sm:text-xs text-content-muted">Hours dedicated to core architecture and uninterrupted programming</p>
          </div>
          <span className="text-[11px] font-mono text-content-muted bg-surface-elevated px-2 py-0.5 rounded border border-border">
            Target: 30.0 hrs/week
          </span>
        </div>

        {/* Clean, restrained bar chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-48 pt-4">
          {weeklyTrends.map((col) => {
            const heightPercent = Math.min(100, Math.round((col.focusHours / 8) * 100));
            return (
              <div key={col.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[11px] font-mono text-content-muted group-hover:text-brand-purple transition-colors">
                  {col.focusHours}h
                </div>
                <div className="w-full max-w-[36px] bg-surface-elevated rounded-t overflow-hidden h-32 flex items-end">
                  <div
                    className="w-full bg-brand-purple rounded-t transition-all duration-200 group-hover:bg-brand-purple-hover"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-xs text-content-secondary">{col.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restrained AI Insight Callout */}
      <div className="rounded-xl bg-surface border border-border p-4 flex items-start gap-3">
        <Info className="h-4 w-4 text-brand-purple flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-semibold text-content-primary">Schedule Defense Insight</div>
          <p className="text-content-secondary leading-relaxed">
            Your uninterrupted morning focus slots had a 94% defense rate this week. Highest concentration was achieved during Thursday morning&apos;s Core Engine block. Consider continuing to decline afternoon ad-hoc syncs before 3:30 PM.
          </p>
        </div>
      </div>
    </div>
  );
}
