'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { AiCommandInput } from '@/components/dashboard/AiCommandInput';
import { PriorityTasksList } from '@/components/dashboard/PriorityTasksList';
import { UpcomingSchedule } from '@/components/dashboard/UpcomingSchedule';
import { useApp } from '@/context/AppContext';
import { useHydratedDate } from '@/lib/dateUtils';

export default function DashboardPage() {
  const { tasks, calendarEvents, userProfile } = useApp();
  const { fullDate, currentDate } = useHydratedDate();

  const currentHour = currentDate.getHours();
  let greetingTime = 'Good morning';
  if (currentHour >= 12 && currentHour < 17) {
    greetingTime = 'Good afternoon';
  } else if (currentHour >= 17) {
    greetingTime = 'Good evening';
  }

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const eventsCount = calendarEvents.length;

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in">
      {/* 1. Restrained Greeting with Short Natural Sentence */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-3.5">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-content-primary">
            {greetingTime}, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            You have <strong className="text-content-primary font-medium">{pendingTasksCount} tasks</strong> requiring attention and <strong className="text-content-primary font-medium">{eventsCount} commitments</strong> scheduled today.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-content-muted self-start sm:self-auto">
          <Calendar className="h-3.5 w-3.5 text-content-dim" />
          <span>{fullDate}</span>
        </div>
      </div>

      {/* 2. Prominent, Compact AI Command Input */}
      <AiCommandInput />

      {/* 3. Core Daily Workflow: Priority Tasks & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Today's Focus Priority Tasks (7 cols) */}
        <div className="lg:col-span-7">
          <PriorityTasksList />
        </div>

        {/* Today's Schedule Agenda (5 cols) */}
        <div className="lg:col-span-5">
          <UpcomingSchedule />
        </div>
      </div>
    </div>
  );
}
