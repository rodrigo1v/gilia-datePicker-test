import { describe, it, expect } from 'vitest';
import {
  getDaysInMonth, addMonths, addYears, isSameDate
} from '@/headless-date-picker/engine/dateHelpers';

describe('dateHelpers', () => {
  it('calculates days in month correctly', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it('detects same date correctly', () => {
    expect(
      isSameDate(
        { year: 2024, month: 6, day: 1 },
        { year: 2024, month: 6, day: 1 }
      )
    ).toBe(true);
  });

  it('adds months correctly across year boundary', () => {
    const result = addMonths({ year: 2024, month: 12, day: 1 }, 1);

    expect(result).toEqual({
      year: 2025,
      month: 1,
      day: 1,
    });
  });

  it('subtracts months correctly across year boundary', () => {
    const result = addMonths({ year: 2024, month: 1, day: 1 }, -1);

    expect(result).toEqual({
      year: 2023,
      month: 12,
      day: 1,
    });
  });

  it('adds years correctly', () => {
    const result = addYears({ year: 2024, month: 6, day: 10 }, 2);

    expect(result.year).toBe(2026);
  });
});