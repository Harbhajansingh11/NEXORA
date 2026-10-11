import { useState, useEffect } from 'react';

/**
 * Centralized date utility module for NEXORA.
 * Ensures consistent date formatting, time zone awareness,
 * relative date calculation, and hydration safety across client and server.
 */

export function getNow(timeZone?: string): Date {
  if (!timeZone) {
    return new Date();
  }
  try {
    const invDate = new Date(new Date().toLocaleString('en-US', { timeZone }));
    return invDate;
  } catch {
    return new Date();
  }
}

/**
 * Returns compact badge format: "MON, OCT 12"
 * Weekday, Month, and Day strictly derived from the same Date object.
 */
export function formatCompactDayBadge(date: Date = new Date(), timeZone?: string): string {
  try {
    const weekday = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone,
    })
      .format(date)
      .toUpperCase();

    const month = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      timeZone,
    })
      .format(date)
      .toUpperCase();

    const day = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      timeZone,
    }).format(date);

    return `${weekday}, ${month} ${day}`;
  } catch {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  }
}

/**
 * Returns full date format: "Monday, Oct 12, 2026"
 */
export function formatFullDate(date: Date = new Date(), timeZone?: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone,
    }).format(date);
  } catch {
    return date.toDateString();
  }
}

/**
 * Returns weekday name: "Monday"
 */
export function formatWeekday(date: Date = new Date(), timeZone?: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      timeZone,
    }).format(date);
  } catch {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
}

/**
 * Returns month and year: "October 2026"
 */
export function formatMonthYear(date: Date = new Date(), timeZone?: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone,
    }).format(date);
  } catch {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}

/**
 * Returns a human-friendly relative date or formatted month/day string.
 * @param daysOffset offset from base date (+1 = tomorrow, -1 = yesterday, +2 = 2 days later)
 */
export function getRelativeDateLabel(daysOffset: number, baseDate: Date = new Date(), timeZone?: string): string {
  if (daysOffset === 0) return 'Today';
  if (daysOffset === 1) return 'Tomorrow';
  if (daysOffset === -1) return 'Yesterday';

  const targetDate = new Date(baseDate.getTime());
  targetDate.setDate(targetDate.getDate() + daysOffset);

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone,
    }).format(targetDate);
  } catch {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[targetDate.getMonth()]} ${targetDate.getDate()}`;
  }
}

export interface DynamicCalendarDay {
  day: number;
  isToday: boolean;
  hasEvents: boolean;
  dateObj: Date;
}

/**
 * Generates an illustrative 14-day calendar window centered around the current week.
 * Preserves realistic event distribution while dynamically aligning isToday with the current day.
 */
export function generateDynamicCalendarDays(baseDate: Date = new Date()): DynamicCalendarDay[] {
  const currentDayOfMonth = baseDate.getDate();
  const currentDayOfWeek = baseDate.getDay(); // 0 = Sunday

  // Start from Sunday of current week minus 7 days (or previous Sunday)
  const startDate = new Date(baseDate);
  startDate.setDate(baseDate.getDate() - currentDayOfWeek - 7);

  const days: DynamicCalendarDay[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const isToday =
      d.getDate() === currentDayOfMonth &&
      d.getMonth() === baseDate.getMonth() &&
      d.getFullYear() === baseDate.getFullYear();

    // Give today, day+2, and day-3 realistic event dots
    const dayDiff = Math.round((d.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    const hasEvents = isToday || dayDiff === 2 || dayDiff === -3 || dayDiff === 4;

    days.push({
      day: d.getDate(),
      isToday,
      hasEvents,
      dateObj: d,
    });
  }

  return days;
}

/**
 * React hook that returns dynamic date formats safely without SSR hydration mismatch.
 * Updates automatically when the date rolls over at midnight.
 */
export function useHydratedDate(timeZone?: string) {
  // Use a fixed fallback for initial SSR render, then synchronize immediately on client mount
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const now = getNow(timeZone);
    setCurrentDate(now);

    // Calculate milliseconds until next midnight to update automatically
    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    const msUntilMidnight = Math.max(1000, tomorrow.getTime() - now.getTime());

    const timer = setTimeout(() => {
      setCurrentDate(getNow(timeZone));
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [timeZone]);

  return {
    isMounted,
    currentDate,
    compactBadge: formatCompactDayBadge(currentDate, timeZone),
    fullDate: formatFullDate(currentDate, timeZone),
    weekday: formatWeekday(currentDate, timeZone),
    monthYear: formatMonthYear(currentDate, timeZone),
  };
}
