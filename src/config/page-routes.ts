/**
 * Canonical slugs for static pages.
 *
 * This is URL configuration, not translated interface copy. Pages without an
 * entry for a locale keep their page key as the slug.
 */
export type PageKey = string;
export type PageSlugMap = Record<PageKey, Record<string, string>>;

export const pageSlugs: PageSlugMap = {
  services: {
    'pt-br': 'servicos',
    en: 'services',
  },
};
