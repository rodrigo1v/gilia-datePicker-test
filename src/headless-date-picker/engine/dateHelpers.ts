import type { CalendarDate } from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemporalAPI = (globalThis as any).Temporal;

export function getDaysInMonth(year: number, month: number): number {
  if (TemporalAPI) {
    const firstDayOfMonth = TemporalAPI.PlainDate.from({ year, month, day: 1 });
    return firstDayOfMonth.daysInMonth;
  }

  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function getDayOfWeek(date: CalendarDate): number {
  if (TemporalAPI) {
    const dayOfWeek = TemporalAPI.PlainDate.from(date).dayOfWeek;
    return dayOfWeek === 7 ? 0 : dayOfWeek;
  }

  return new Date(
    Date.UTC(date.year, date.month - 1, date.day)
  ).getUTCDay();
}

export function addMonths(date: CalendarDate, delta: number): CalendarDate {
  if (TemporalAPI) {
    const updatedDate = TemporalAPI.PlainDate.from(date).add({ months: delta });

    return {
      year: updatedDate.year,
      month: updatedDate.month,
      day: updatedDate.day,
    };
  }

  const shiftedDate = new Date(
    Date.UTC(date.year, date.month - 1 + delta, 1)
  );

  return {
    year: shiftedDate.getUTCFullYear(),
    month: shiftedDate.getUTCMonth() + 1,
    day: date.day,
  };
}

export function addYears(date: CalendarDate, delta: number): CalendarDate {
  if (TemporalAPI) {
    const updatedDate = TemporalAPI.PlainDate.from(date).add({ years: delta });

    return {
      year: updatedDate.year,
      month: updatedDate.month,
      day: updatedDate.day,
    };
  }

  return {
    year: date.year + delta,
    month: date.month,
    day: date.day,
  };
}

export function isSameDate(a: CalendarDate, b: CalendarDate): boolean {
  return (
    a.year === b.year &&
    a.month === b.month &&
    a.day === b.day
  );
}

export function getTodayCalendarDate(): CalendarDate {
  if (TemporalAPI) {
    const today = TemporalAPI.Now.plainDateISO();

    return {
      year: today.year,
      month: today.month,
      day: today.day,
    };
  }

  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}