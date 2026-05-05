import type {
  CalendarDate, CalendarCell, CalendarState, CalendarMonth, IDatePickerEngine, MonthGrid,
} from './types.js';
import {
  getDaysInMonth, getDayOfWeek, addMonths, addYears, isSameDate, getTodayCalendarDate,
} from './dateHelpers.js';

export class HeadlessDatePickerEngine implements IDatePickerEngine {
  private _state: CalendarState;

  constructor(initialDate?: CalendarDate) {
    const today = getTodayCalendarDate();
    this._state = initialDate
      ? {
          visibleMonth: initialDate.month,
          visibleYear: initialDate.year,
          selectedDate: { ...initialDate },
        } : {
          visibleMonth: today.month,
          visibleYear: today.year,
          selectedDate: null,
        };
  }

  getVisibleMonth(): CalendarMonth {
    const { visibleMonth, visibleYear } = this._state;
    return { month: visibleMonth, year: visibleYear };
  }

  getInputValue(): string {
    const date = this._state.selectedDate;
    if (!date) return '';
    const { year, month, day } = date;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  nextMonth() {
    const { visibleYear, visibleMonth } = this._state;
    const d = addMonths({ year: visibleYear, month: visibleMonth, day: 1 }, 1);
    this._state = { ...this._state, visibleMonth: d.month, visibleYear: d.year };
  }

  prevMonth() {
    const { visibleYear, visibleMonth } = this._state;
    const d = addMonths({ year: visibleYear, month: visibleMonth, day: 1 }, -1);
    this._state = { ...this._state, visibleMonth: d.month, visibleYear: d.year };
  }

  nextYear() {
    const { visibleYear, visibleMonth } = this._state;
    const d = addYears({ year: visibleYear, month: visibleMonth, day: 1 }, 1);
    this._state = { ...this._state, visibleYear: d.year };
  }

  prevYear() {
    const { visibleYear, visibleMonth } = this._state;
    const d = addYears({ year: visibleYear, month: visibleMonth, day: 1 }, -1);
    this._state = { ...this._state, visibleYear: d.year };
  }

  selectDate(date: CalendarDate) {
    const max = getDaysInMonth(date.year, date.month);
    if (date.day < 1 || date.day > max) return;

    this._state = {
      ...this._state,
      selectedDate: { ...date },
      visibleMonth: date.month,
      visibleYear: date.year,
    };
  }

  getMonthGrid(): MonthGrid {
    const { visibleMonth, visibleYear, selectedDate } = this._state;
    const today = getTodayCalendarDate();

    const dates: CalendarDate[] = [];

    const firstDayOfWeek = getDayOfWeek({
      year: visibleYear,
      month: visibleMonth,
      day: 1,
    });

    if (firstDayOfWeek > 0) {
      const prevMonthDate = addMonths(
        { year: visibleYear, month: visibleMonth, day: 1 },
        -1
      );

      const prevMonthDays = getDaysInMonth(prevMonthDate.year, prevMonthDate.month);

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        dates.push({
          year: prevMonthDate.year,
          month: prevMonthDate.month,
          day: prevMonthDays - i,
        });
      }
    }

    const daysInMonth = getDaysInMonth(visibleYear, visibleMonth);

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push({ year: visibleYear, month: visibleMonth, day });
    }

    const nextMonthDate = addMonths(
      { year: visibleYear, month: visibleMonth, day: 1 },
      1
    );

    let nextDay = 1;

    while (dates.length < 42) {
      dates.push({
        year: nextMonthDate.year,
        month: nextMonthDate.month,
        day: nextDay++,
      });
    }

    const cells: CalendarCell[] = dates.map((date) => ({
      date,
      isCurrentMonth: date.month === visibleMonth && date.year === visibleYear,
      isToday: isSameDate(date, today),
      isSelected: selectedDate ? isSameDate(date, selectedDate) : false,
    }));

    const grid: MonthGrid = [];

    for (let i = 0; i < 6; i++) {
      grid.push(cells.slice(i * 7, i * 7 + 7));
    }

    return grid;
  }
}