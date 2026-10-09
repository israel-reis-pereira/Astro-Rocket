import { describe, it, expect } from 'vitest';
import { formatDate } from '../lib/utils';
import { defaultLocale } from '../i18n';

// Date is constructed in local time (not parsed from a UTC string) so the
// formatted day is stable regardless of the runner's timezone.
const date = new Date(2026, 5, 24); // 24 June 2026

describe('formatDate()', () => {
  it('formats in long English for the default locale', () => {
    expect(formatDate(date, 'en')).toBe('June 24, 2026');
  });

  it('formats day-first, lowercase month in Dutch', () => {
    expect(formatDate(date, 'nl')).toBe('24 juni 2026');
  });

  it('formats with year/month/day markers in Chinese (zh-CN)', () => {
    expect(formatDate(date, 'zh-CN')).toBe('2026年6月24日');
  });

  it('falls back to the site default locale when none is passed', () => {
    expect(formatDate(date)).toBe(formatDate(date, defaultLocale));
  });
});
