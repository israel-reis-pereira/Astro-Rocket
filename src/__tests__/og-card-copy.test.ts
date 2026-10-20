import { describe, expect, it } from 'vitest';
import { DEFAULT_OG_PATH, resolveOgCardCopy } from '@/lib/og/svg';

const site = {
  name: 'Israel Reis Pereira',
  tagline: 'Desenvolvimento de software, projetos e aprendizado contínuo',
};

describe('resolveOgCardCopy', () => {
  it('draws the default card from the site name and tagline, not the 404 page', () => {
    expect(
      resolveOgCardCopy(
        DEFAULT_OG_PATH,
        { title: 'Página não encontrada', subtitle: 'This page does not exist' },
        site
      )
    ).toEqual({
      title: site.name,
      subtitle: site.tagline,
    });
  });

  it('keeps article and project cards on the page title', () => {
    expect(
      resolveOgCardCopy(
        '/og/projects/devmoda.png',
        { title: 'DEVmoda', subtitle: 'A front-end study project' },
        site
      )
    ).toEqual({
      title: 'DEVmoda',
      subtitle: 'A front-end study project',
    });
  });
});
