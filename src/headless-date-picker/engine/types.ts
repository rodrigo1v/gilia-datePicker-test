export interface CalendarDate {
  readonly year: number;
  readonly month: number;
  readonly day: number;
}

export interface CalendarState {
  readonly visibleMonth: number;
  readonly visibleYear: number;
  readonly selectedDate: CalendarDate | null;
}

export interface CalendarMonth {
  readonly year: number;
  readonly month: number;
}

export interface CalendarCell {
  readonly date: CalendarDate;
  readonly isCurrentMonth: boolean;
  readonly isToday: boolean;
  readonly isSelected: boolean;
}

export type MonthGrid = CalendarCell[][];

export interface IDatePickerEngine {
  getInputValue(): string;
  getVisibleMonth(): CalendarMonth;
  nextMonth(): void;
  prevMonth(): void;
  nextYear(): void;
  prevYear(): void;
  selectDate(date: CalendarDate): void;
  getMonthGrid(): MonthGrid;
}