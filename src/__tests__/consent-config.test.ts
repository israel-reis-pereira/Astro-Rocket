import { describe, expect, it } from 'vitest';
import consentConfig from '../config/consent.config';

describe('cookie consent defaults', () => {
  it('requires explicit consent before optional analytics scripts load', () => {
    expect(consentConfig.mode).toBe('strict');
    expect(consentConfig.categories.necessary.required).toBe(true);
    expect(consentConfig.categories.analytics.defaultEnabled).toBe(false);
    expect(consentConfig.categories.marketing.defaultEnabled).toBe(false);
    expect(consentConfig.categories.preferences.defaultEnabled).toBe(false);
  });
});
