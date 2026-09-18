import { describe, it, expect } from 'vitest';
import {
  t,
  tData,
  localizedPath,
  resolveLocale,
  isValidLocale,
  getLocaleName,
  getLocaleFromPath,
  getSecondaryLocales,
  stripLocaleFromPath,
  swapLocaleInPath,
  localizedPagePath,
  getPageKeyFromPath,
} from '../i18n';

describe('i18n t() helper', () => {
  it('returns a translation for a valid dotted key', () => {
    expect(t('common.readMore', 'en')).toBe('Read more');
  });

  it('returns the Dutch translation when locale is nl', () => {
    expect(t('common.readMore', 'nl')).toBe('Lees meer');
  });

  it('falls back to the default-locale string when the locale has no entry', () => {
    // 'de' has no dictionary loaded yet — should fall back to pt-br.
    expect(t('common.readMore', 'de')).toBe('Leia mais');
  });

  it('returns the key itself when no translation exists in any dictionary', () => {
    expect(t('some.missing.key', 'en')).toBe('some.missing.key');
  });

  it('interpolates {placeholder} variables', () => {
    expect(t('blog.readingTime', 'en', { minutes: 5 })).toBe('5 min read');
    expect(t('blog.readingTime', 'nl', { minutes: 5 })).toBe('5 min leestijd');
  });

  it('leaves unknown placeholders untouched', () => {
    expect(t('blog.readingTime', 'en', {})).toBe('{minutes} min read');
  });
});

describe('i18n tData() helper', () => {
  it('returns a structured (array) value by dotted key', () => {
    // Asserts the shape rather than the copy. The previous version read
    // `pages.about.intro.facts` and checked for the literal "Astro 7"; the
    // about page was later restructured, `intro` stopped existing, and the
    // test failed for a reason that had nothing to do with tData().
    const items = tData<{ icon: string; title: string; description: string }[]>(
      'pages.about.principles.items',
      'en'
    );
    expect(Array.isArray(items)).toBe(true);
    expect(items?.length).toBeGreaterThan(0);
    expect(items?.[0]).toEqual(
      expect.objectContaining({
        icon: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
      })
    );
  });

  it('returns the Dutch structured value when locale is nl', () => {
    const hero = tData<{ badge: string }>('pages.about.hero', 'nl');
    expect(hero?.badge).toBe('Over');
  });

  it('falls back to the default-locale value when the locale has no entry', () => {
    // 'de' has no dictionary loaded yet — should fall back to the English data
    const cards = tData<unknown[]>('pages.about.faq.cards', 'de');
    expect(Array.isArray(cards)).toBe(true);
    expect(cards?.length).toBe(2);
  });

  it('returns undefined when the key is absent in every dictionary', () => {
    expect(tData('pages.does.not.exist', 'en')).toBeUndefined();
  });
});

describe('i18n getSecondaryLocales()', () => {
  it('returns the configured non-default locale', () => {
    expect(getSecondaryLocales()).toEqual(['en']);
  });
});

describe('i18n localizedPath()', () => {
  it('keeps default-locale paths at the site root', () => {
    expect(localizedPath('/about')).toBe('/about');
    expect(localizedPath('/')).toBe('/');
    expect(localizedPath('blog/hello')).toBe('/blog/hello');
  });

  describe('i18n localizedPagePath()', () => {
    it('resolves the localized Services slug for the default locale', () => {
      expect(localizedPagePath('services', 'pt-br')).toBe('/servicos');
    });

    it('resolves the localized Services slug for English', () => {
      expect(localizedPagePath('services', 'en')).toBe('/en/services');
    });

    it('keeps the page key as the slug when no localized override exists', () => {
      expect(localizedPagePath('about', 'pt-br')).toBe('/about');
      expect(localizedPagePath('about', 'en')).toBe('/en/about');
    });
  });

  describe('i18n static page path lookup', () => {
    it('maps localized Services paths back to the page key', () => {
      expect(getPageKeyFromPath('/servicos')).toBe('services');
      expect(getPageKeyFromPath('/en/services')).toBe('services');
    });

    it('does not claim unknown content paths as static pages', () => {
      expect(getPageKeyFromPath('/blog/post')).toBeUndefined();
    });
  });
});

describe('i18n locale helpers', () => {
  it('resolves an unknown locale to the default', () => {
    expect(resolveLocale('xx')).toBe('pt-br');
    expect(resolveLocale(undefined)).toBe('pt-br');
  });

  it('validates a configured locale', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('xx')).toBe(false);
    expect(isValidLocale(undefined)).toBe(false);
  });

  it('returns the display name when configured, otherwise the code', () => {
    expect(getLocaleName('en')).toBe('English');
    // 'nl' is in localeNames even though it's not in the active locales list
    expect(getLocaleName('nl')).toBe('Nederlands');
    expect(getLocaleName('xx')).toBe('xx');
  });
});

describe('i18n getLocaleFromPath()', () => {
  it('returns the default locale for the root path', () => {
    expect(getLocaleFromPath('/')).toBe('pt-br');
  });

  it('returns the default locale when no recognized prefix is present', () => {
    expect(getLocaleFromPath('/about')).toBe('pt-br');
    expect(getLocaleFromPath('/blog/hello-world')).toBe('pt-br');
  });

  it('returns the default locale when the first segment is not a configured locale', () => {
    // 'nl' and 'zh-cn' are not configured locales.
    expect(getLocaleFromPath('/nl/about')).toBe('pt-br');
    expect(getLocaleFromPath('/zh-cn/blog')).toBe('pt-br');
  });

  it('normalizes paths without a leading slash', () => {
    expect(getLocaleFromPath('about')).toBe('pt-br');
  });
});

describe('i18n stripLocaleFromPath()', () => {
  it('leaves a path unchanged when the first segment is not a configured locale', () => {
    expect(stripLocaleFromPath('/about')).toBe('/about');
    expect(stripLocaleFromPath('/nl/about')).toBe('/nl/about');
  });

  it('returns "/" for the root path', () => {
    expect(stripLocaleFromPath('/')).toBe('/');
  });
});

describe('i18n swapLocaleInPath()', () => {
  it('prefixes a path when targeting the secondary locale', () => {
    expect(swapLocaleInPath('/about', 'en')).toBe('/en/about');
  });

  it('returns the path without a prefix when targeting the default locale', () => {
    expect(swapLocaleInPath('/en/about', 'pt-br')).toBe('/about');
  });

  it('swaps localized static page slugs in both directions', () => {
    expect(swapLocaleInPath('/servicos', 'en')).toBe('/en/services');
    expect(swapLocaleInPath('/en/services', 'pt-br')).toBe('/servicos');
  });

  it('keeps the existing same-slug behavior for static pages without overrides', () => {
    expect(swapLocaleInPath('/about', 'en')).toBe('/en/about');
    expect(swapLocaleInPath('/en/about', 'pt-br')).toBe('/about');
  });
});

describe('i18n meta titles never embed the site name', () => {
  // SEO.astro renders the document <title> as `${title} — ${siteConfig.name}`,
  // so any meta-title dictionary value that already contains the site name
  // would render it twice (e.g. "Blog — Astro Rocket — Astro Rocket"). Every
  // key below feeds that `title` prop and must therefore stay brand-free.
  //
  // The shipped brand is checked as a literal on purpose: importing
  // site.config.ts here would pull in `astro:env/server` (see i18n.config.ts),
  // and this guards the theme's own default dictionaries against a regression.
  const SITE_NAME = 'Astro Rocket';
  const METATITLE_KEYS = [
    'blog.metaTitle',
    'blog.pageMetaTitle',
    'blog.tagMetaTitle',
    'projects.metaTitle',
    'projects.pageMetaTitle',
    'projects.tagMetaTitle',
    'errors.metaTitle',
    'pages.home.meta.title',
    'pages.about.meta.title',
    'pages.services.meta.title',
    'pages.contact.meta.title',
  ];

  const cases = ['en', 'nl'].flatMap((locale) =>
    METATITLE_KEYS.map((key) => [locale, key] as [string, string])
  );

  it.each(cases)('%s "%s" does not include the site name', (locale, key) => {
    expect(t(key, locale)).not.toContain(SITE_NAME);
  });
});
