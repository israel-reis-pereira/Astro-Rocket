/** * Configuração de internacionalização (i18n). * 
 * * Desativada por padrão — quando `enabled: false` ou `locales` possui uma única entrada, 
 * * o Astro Rocket gera as mesmas rotas de idioma único que sempre gerou e 
 * * os mecanismos `LanguageSwitcher`/`hreflang` são ignorados, portanto não há 
 * * custo de execução nem aumento no tamanho do bundle. * 
 * * Ative definindo `enabled: true` e listando pelo menos dois `locales`. 
 * * O idioma padrão permanece na raiz do site (`/about`); idiomas adicionais * ficam sob um prefixo (`/nl/about`). * * Mantida em seu próprio arquivo (e não em `site.config.ts`) para que o módulo * de i18n possa ser importado pelos testes unitários sem carregar * `astro:env/server`. */

export interface I18nConfig {
  /** Master switch — must be true AND `locales.length > 1` to take effect */
  enabled: boolean;
  /** BCP 47 code for the default locale, served at the site root */
  defaultLocale: string;
  /** All locales the site ships, including the default. Use BCP 47 codes (e.g. 'en', 'nl', 'de', 'fr-BE') */
  locales: string[];
  /** Display names for the LanguageSwitcher, keyed by locale code */
  localeNames?: Record<string, string>;
  /**
   * When true, Astro reads the visitor's `Accept-Language` header on
   * the root URL and redirects to a matching locale. Visitors can
   * always override via the LanguageSwitcher.
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
