/**
 * Valores da marca necessários antes que `astro:env` esteja disponível.
 *
 * O `astro.config.mjs` gera os arquivos PNG/ICO do favicon em um hook de build
 * e precisa da inicial da marca e da cor do tema para fazer isso — porém ele
 * não pode importar `site.config.ts`, pois esse arquivo lê
 * `astro:env/server` e, por isso, não pode ser carregado durante a configuração.
 *
 * É a mesma restrição existente em `site-url.ts`: manter os valores em um
 * módulo simples que possa ser importado pelos dois lados, evitando que
 * as configurações fiquem diferentes.
 *
 * Altere os valores aqui. O `site.config.ts` lê os valores deste arquivo.
 */
export const SITE_NAME = 'Astro Rocket';

/** Cor da barra do navegador e preenchimento atrás da letra do favicon. */
export const THEME_COLOR = '#0083fe';