import { describe, it, expect } from 'vitest';
import { formatTime, isCooldownOver, timeLeft, DEFAULT_COOLDOWN } from './time';

describe('time utilities', () => {
  it('formats milliseconds into minutes and seconds', () => {
    expect(formatTime(0)).toBe('0m 0s');
    expect(formatTime(61000)).toBe('1m 1s');
  });

  it('determines if cooldown is over', () => {
    const now = new Date('2024-01-01T00:10:00Z');
    const fiveMinutesAgo = new Date(now - DEFAULT_COOLDOWN);
    const fourMinutesAgo = new Date(now - DEFAULT_COOLDOWN + 60_000);
    expect(isCooldownOver(now, fiveMinutesAgo)).toBe(true);
    expect(isCooldownOver(now, fourMinutesAgo)).toBe(false);
    expect(isCooldownOver(now, null)).toBe(true);
  });

  it('calculates time left with non-negative result', () => {
    const now = new Date('2024-01-01T00:10:00Z');
    const fourMinutesAgo = new Date(now - DEFAULT_COOLDOWN + 60_000);
    const sixMinutesAgo = new Date(now - DEFAULT_COOLDOWN - 60_000);
    expect(timeLeft(now, fourMinutesAgo)).toBe(60_000);
    expect(timeLeft(now, sixMinutesAgo)).toBe(0);
    expect(timeLeft(now, null)).toBe(0);
  });
});
