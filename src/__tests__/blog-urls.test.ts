import { describe, it, expect, vi } from 'vitest';

// `lib/blog` imports `astro:content` at the top level for its data helpers.
// The URL helpers under test don't touch the content runtime, so a tiny stub
// is enough to let the module load in a plain Node test environment.
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => []),
}));

import {
  getPostSlug,
  getPostUrl,
  getBlogBaseUrl,
  getBlogPageUrl,
  getTagUrl,
  getSecondaryLocales,
} from '@/lib/blog';

// The configured site uses pt-br at the root and prefixes English routes.
describe('blog URL helpers (pt-br default, English secondary)', () => {
  it('strips the locale prefix from a post id to get its slug', () => {
    expect(getPostSlug('en/hello-world')).toBe('hello-world');
    expect(getPostSlug('pt-br/ola-mundo', 'pt-br')).toBe('ola-mundo');
    // No matching prefix → id returned unchanged.
    expect(getPostSlug('hello-world', 'pt-br')).toBe('hello-world');
  });

  it('builds post URLs for the default and secondary locales', () => {
    expect(getPostUrl('pt-br/ola-mundo', 'pt-br')).toBe('/blog/ola-mundo');
    expect(getPostUrl('en/hello-world', 'en')).toBe('/en/blog/hello-world');
  });

  it('builds the blog index base URL', () => {
    expect(getBlogBaseUrl()).toBe('/blog');
    expect(getBlogBaseUrl('en')).toBe('/en/blog');
  });

  it('maps page 1 to the blog root and pages 2+ to /blog/page/N', () => {
    expect(getBlogPageUrl(1)).toBe('/blog');
    expect(getBlogPageUrl(2)).toBe('/blog/page/2');
    expect(getBlogPageUrl(5)).toBe('/blog/page/5');
  });

  it('builds a tag URL from the slugified tag', () => {
    expect(getTagUrl('astro-rocket')).toBe('/blog/tag/astro-rocket');
    expect(getTagUrl('Web Performance')).toBe('/blog/tag/web-performance');
  });

  it('exposes the configured secondary locale', () => {
    expect(getSecondaryLocales()).toEqual(['en']);
  });
});
