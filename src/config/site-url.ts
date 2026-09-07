/**
 * URL utilizada quando a variável de ambiente `SITE_URL` não está definida.
 *
 * Dois locais precisam conhecer o endereço do próprio site e ambos devem
 * estar de acordo: o `astro.config.mjs` define `site`, que gera todas as
 * tags canonical, `og:url`, `og:image`, o link do RSS e as entradas do sitemap —
 * enquanto o `site.config.ts` define `url`, que é utilizado pelo JSON-LD,
 * pelos cards de compartilhamento e pelo rodapé. O `astro.config.mjs` é
 * executado antes que o `astro:env` exista, portanto não pode importar
 * `site.config.ts`; sem uma constante compartilhada, os dois podem ficar
 * diferentes, fazendo com que o site disponibilize URLs canonical de um
 * domínio enquanto informa aos mecanismos de busca que está hospedado em
 * outro.
 *
 * Defina `SITE_URL` no ambiente do seu provedor de hospedagem e este valor
 * nunca será utilizado. Ele permanece como um placeholder de propósito:
 * um site publicado sem `SITE_URL` deve deixar evidente que não está
 * configurado, em vez de silenciosamente declarar o domínio de outra pessoa.
 */
export const SITE_URL_FALLBACK = 'https://example.com';
