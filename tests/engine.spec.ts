import { describe, it, expect, beforeEach } from 'vitest';
import { HeadlessDatePickerEngine } from '@/headless-date-picker';

function createEngine(date = { year: 2024, month: 6, day: 15 }) {
  return new HeadlessDatePickerEngine(date);
}

describe('HeadlessDatePickerEngine', () => {
  let engine: HeadlessDatePickerEngine;

  beforeEach(() => {
    engine = createEngine();
  });

  it('initializes with correct visible month', () => {
    const { month, year } = engine.getVisibleMonth();

    expect(month).toBe(6);
    expect(year).toBe(2024);
  });

  it('generates a 6x7 month grid (42 cells)', () => {
    const grid = engine.getMonthGrid();

    expect(grid).toHaveLength(6);
    expect(grid.every(row => row.length === 7)).toBe(true);

    const flat = grid.flat();
    expect(flat).toHaveLength(42);
  });

  it('includes current month days in grid', () => {
    const grid = engine.getMonthGrid().flat();

    const currentMonthCells = grid.filter(
      c => c.isCurrentMonth
    );

    expect(currentMonthCells.length).toBeGreaterThan(27);
  });

  it('formats input value correctly when date selected', () => {
    engine.selectDate({ year: 2024, month: 6, day: 9 });

    expect(engine.getInputValue()).toBe('2024-06-09');
  });

  it('returns empty input when no selection', () => {
    const fresh = new HeadlessDatePickerEngine();

    expect(fresh.getInputValue()).toBe('');
  });

  it('selects date and updates visible month', () => {
    engine.selectDate({ year: 2025, month: 1, day: 10 });

    const { month, year } = engine.getVisibleMonth();

    expect(month).toBe(1);
    expect(year).toBe(2025);
  });

  it('ignores invalid day selection', () => {
    const engine = new HeadlessDatePickerEngine({
      year: 2024,
      month: 6,
      day: 15,
    });

    engine.selectDate({ year: 2024, month: 6, day: 99 });

    expect(engine.getInputValue()).toBe('2024-06-15');
  });

  it('navigates months correctly', () => {
    engine.nextMonth();
    expect(engine.getVisibleMonth().month).toBe(7);

    engine.prevMonth();
    expect(engine.getVisibleMonth().month).toBe(6);
  });

  it('navigates years correctly', () => {
    engine.nextYear();
    expect(engine.getVisibleMonth().year).toBe(2025);

    engine.prevYear();
    expect(engine.getVisibleMonth().year).toBe(2024);
  });
});