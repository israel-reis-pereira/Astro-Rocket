/**
 * Configuração de internacionalização (i18n).
 *
 * Desativada por padrão — quando `enabled: false` ou `locales` possui uma única entrada,
 * o Astro Rocket gera as mesmas rotas de idioma único que sempre gerou e
 * os mecanismos `LanguageSwitcher`/`hreflang` são ignorados, portanto não há
 * custo de execução nem aumento no tamanho do bundle.
 *
 * Ative definindo `enabled: true` e listando pelo menos dois `locales`.
 * O idioma padrão permanece na raiz do site (`/about`); idiomas adicionais
 * ficam sob um prefixo (`/nl/about`).
 *
 * Mantida em seu próprio arquivo (e não em `site.config.ts`) para que o módulo
 * de i18n possa ser importado pelos testes unitários sem carregar
 * `astro:env/server`.
 */

export interface I18nConfig {
  /** Chave principal — deve ser true E `locales.length > 1` para entrar em vigor */
  enabled: boolean;
  /** Código BCP 47 do idioma padrão, disponibilizado na raiz do site */
  defaultLocale: string;
  /** Todos os idiomas disponibilizados pelo site, incluindo o padrão. Use códigos BCP 47 (ex.: 'en', 'nl', 'de', 'fr-BE') */
  locales: string[];
  /** Nomes exibidos pelo LanguageSwitcher, associados ao código de cada idioma */
  localeNames?: Record<string, string>;
  /**
   * Quando true, o Astro lê o cabeçalho `Accept-Language` do visitante na
   * URL raiz e redireciona para um idioma correspondente. Os visitantes
   * podem substituir essa escolha a qualquer momento pelo LanguageSwitcher.
   */
  detectBrowserLocale?: boolean;
}

const i18nConfig: I18nConfig = {
  enabled: true,
  defaultLocale: 'pt-br',
  locales: ['pt-br', 'en'],
  localeNames: {
    en: 'English',
    'pt-br': 'Português (Brasil)',
    nl: 'Nederlands',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
  },
  detectBrowserLocale: false,
};

export default i18nConfig;