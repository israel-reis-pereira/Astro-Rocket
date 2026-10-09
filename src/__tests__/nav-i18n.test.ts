import { describe, it, expect, vi } from 'vitest';

// Exercise the nav config against the site's active Portuguese and English locales.
vi.mock('@/config/i18n.config', () => ({
  default: {
    enabled: true,
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    localeNames: { 'pt-br': 'Português (Brasil)', en: 'English' },
    detectBrowserLocale: false,
  },
}));

import { getNavItems, getLogoHref, resolveNavItem, type NavItem } from '@/config/nav.config';

describe('nav config — locale resolution (pt-br default, en secondary)', () => {
  it('keeps default-locale hrefs at the site root', () => {
    const items = getNavItems('pt-br');
    expect(items.find((i) => i.label === 'Blog')?.href).toBe('/blog');
    expect(items.find((i) => i.label === 'Sobre')?.href).toBe('/sobre');
  });

  it('prefixes secondary-locale hrefs with the locale', () => {
    const items = getNavItems('en');
    expect(items.map((i) => i.href)).toEqual([
      '/en',
      '/en/services',
      '/en/projects',
      '/en/blog',
      '/en/about',
      '/en/contact',
    ]);
  });

  it('translates labels via the dictionary (labelKey)', () => {
    const en = getNavItems('en');
    expect(en.find((i) => i.href === '/en/about')?.label).toBe('About');
    expect(en.find((i) => i.href === '/en/services')?.label).toBe('Services');
  });

  it('points the logo at the locale home', () => {
    expect(getLogoHref('pt-br')).toBe('/');
    expect(getLogoHref('en')).toBe('/en');
  });

  it('never locale-prefixes external, mailto/tel, or anchor hrefs', () => {
    expect(
      resolveNavItem(
        { label: 'GitHub', href: 'https://github.com/x', order: 1, external: true },
        'en'
      ).href
    ).toBe('https://github.com/x');
    expect(resolveNavItem({ label: 'Top', href: '#top', order: 1 }, 'en').href).toBe('#top');
    expect(resolveNavItem({ label: 'Mail', href: 'mailto:a@b.com', order: 1 }, 'en').href).toBe(
      'mailto:a@b.com'
    );
  });

  it('applies a per-locale override (label + path), still locale-prefixed', () => {
    const item: NavItem = {
      label: 'Contact',
      href: '/contact',
      order: 1,
      locales: { en: { label: 'Get in touch', href: '/get-in-touch' } },
    };
    expect(resolveNavItem(item, 'en')).toEqual({
      label: 'Get in touch',
      href: '/en/get-in-touch',
      external: undefined,
    });
    // The default locale is unaffected by the English-only override.
    expect(resolveNavItem(item, 'pt-br')).toEqual({
      label: 'Contact',
      href: '/contact',
      external: undefined,
    });
  });

  it('falls back to the literal label when no labelKey is set', () => {
    expect(resolveNavItem({ label: 'Docs', href: '/docs', order: 1 }, 'en').label).toBe('Docs');
  });

  it('resolves a static page key through the shared URL helper', () => {
    expect(
      resolveNavItem(
        { label: 'Services', href: '/services', pageKey: 'services', order: 1 },
        'pt-br'
      ).href
    ).toBe('/servicos');
    expect(
      resolveNavItem({ label: 'Services', href: '/services', pageKey: 'services', order: 1 }, 'en')
        .href
    ).toBe('/en/services');
  });
});
