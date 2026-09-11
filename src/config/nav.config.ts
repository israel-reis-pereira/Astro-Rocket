
/**
 * Configuração de navegação
 *
 * Define os menus de navegação do site. O Astro gerencia o roteamento por meio
 * do sistema de arquivos — esta configuração controla apenas quais links
 * aparecem nos menus de navegação.
 *
 * - `navItems`       → navegação principal (cabeçalho)
 * - `footerNavItems` → navegação do rodapé, configurada independentemente
 *                      do cabeçalho para permitir links diferentes no rodapé
 *                      (por exemplo, adicionar um link de Privacidade ou
 *                      remover o link Sobre)
 * - `legalLinks`     → pequenos links de caráter legal (Privacidade, Termos,
 *                      Aviso legal etc.) exibidos na linha inferior do rodapé
 *                      quando suportados pelo layout de rodapé ativo.
 *
 * ## i18n
 *
 * Você escreve cada link uma única vez. Quando o i18n está habilitado, o
 * Header e o Footer fazem a localização automaticamente para o idioma ativo:
 *
 * - **href** recebe o prefixo do idioma via `localizedPath` — `/blog` permanece
 *   `/blog` no idioma padrão e se torna `/<locale>/blog` nos demais idiomas —
 *   mantendo o visitante dentro do idioma atual. Links externos, `mailto:`/`tel:`
 *   e `#anchor` permanecem inalterados.
 * - **label** é traduzido quando o item possui um `labelKey` apontando para uma
 *   string em `src/i18n/<locale>.json` (resolvida com `t()`); sem um `labelKey`,
 *   o `label` literal é utilizado como está.
 *
 * No caso específico de um idioma precisar de um label ou caminho estruturalmente
 * diferente (por exemplo, um slug localizado como `/sobre`), adicione uma
 * substituição em `locales` — consulte `NavItemOverride`. Com o i18n desativado,
 * nada disso é executado e a saída permanece idêntica à de um site de idioma único.
 */
import { localizedPath, t, defaultLocale, type Locale } from '@/i18n';

/** Substituição por idioma para o label e/ou caminho de um item de navegação ou link legal. */
export interface NavItemOverride {
  /** Substitui o label resolvido para este idioma. */
  label?: string;
  /** Substitui o caminho canônico para este idioma (ainda recebe o prefixo do idioma). */
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  order: number;
  external?: boolean;
  /** Chave do dicionário i18n para o label (por exemplo, `'nav.items.blog'`). Usa `label` como fallback. */
  labelKey?: string;
  /** Substituições de label/caminho por idioma, identificadas pelo código do idioma. */
  locales?: Record<string, NavItemOverride>;
}

/**
 * Uma coluna do rodapé declarada na configuração. `titleKey` é buscado nos
 * arquivos de idioma quando presente, permitindo que um site traduzido tenha
 * um título de coluna traduzido; `title` é o fallback para uma coluna sem chave.
 */
export interface FooterLinkGroupConfig {
  titleKey?: string;
  title: string;
  /**
   * `LegalLink` em vez de `NavItem`: os dois possuem os mesmos campos, exceto
   * `order`, que não é necessário em um grupo — a ordem do array é utilizada.
   */
  links: LegalLink[];
}

export interface LegalLink {
  label: string;
  href: string;
  external?: boolean;
  /** Chave do dicionário i18n para o label. Usa `label` como fallback. */
  labelKey?: string;
  /** Substituições de label/caminho por idioma, identificadas pelo código do idioma. */
  locales?: Record<string, NavItemOverride>;
}

/** Item de navegação resolvido para um idioma: label traduzido e href com prefixo do idioma. */
export interface ResolvedNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Início', href: '/', order: 0, labelKey: 'nav.items.home' },
  { label: 'Serviços', href: '/services', order: 1, labelKey: 'nav.items.services' },
  { label: 'Projetos', href: '/projects', order: 2, labelKey: 'nav.items.projects' },
  { label: 'Blog', href: '/blog', order: 3, labelKey: 'nav.items.blog' },
  { label: 'Sobre', href: '/about', order: 4, labelKey: 'nav.items.about' },
  { label: 'Contato', href: '/contact', order: 5, labelKey: 'nav.items.contact' },
];

export const footerNavItems: NavItem[] = [
  { label: 'Início', href: '/', order: 0, labelKey: 'nav.items.home' },
  { label: 'Serviços', href: '/services', order: 1, labelKey: 'nav.items.services' },
  { label: 'Projetos', href: '/projects', order: 2, labelKey: 'nav.items.projects' },
  { label: 'Blog', href: '/blog', order: 3, labelKey: 'nav.items.blog' },
  { label: 'Sobre', href: '/about', order: 4, labelKey: 'nav.items.about' },
  { label: 'Contato', href: '/contact', order: 5, labelKey: 'nav.items.contact' },
  { label: 'GitHub', href: 'https://github.com/israel-reis-pereira', order: 6, external: true },
];

export const legalLinks: LegalLink[] = [];

/**
 * Colunas extras para o layout `columns` do rodapé.
 *
 * Deixe vazio para que o rodapé construa suas próprias colunas a partir do
 * site: uma coluna Site baseada em `footerNavItems`, uma coluna Tópicos baseada
 * nas tags de blog mais utilizadas e uma coluna Projetos baseada nos projetos
 * visíveis. Cada uma é removida quando não possui conteúdo, então um site novo
 * começa com uma coluna e vai sendo preenchido conforme cresce.
 *
 * Tudo aqui é *adicionado* a essas colunas, servindo para uma coluna que não
 * pode ser derivada automaticamente — uma coluna de suporte, escritórios ou
 * um segundo produto, por exemplo. Para substituir completamente o conjunto
 * derivado em vez de apenas adicionar colunas, passe `linkGroups` diretamente
 * para `<Footer>`.
 *
 * Todos os links são reais na demonstração. Um rodapé preenchido artificialmente
 * com links para outros lugares é pior do que um rodapé curto, e pior ainda em
 * um tema que outras pessoas utilizam como base: elas herdariam esses links.
 */
export const footerLinkGroups: FooterLinkGroupConfig[] = [
  {
    titleKey: 'footer.groups.questions',
    title: 'Tem dúvidas?',
    links: [
      { label: 'FAQ', href: '/about#faq' },
      { label: 'E-mail', href: 'mailto:israelsilvapereirareis@gmail.com' },
      { label: 'GitHub', href: 'https://github.com/israel-reis-pereira', external: true },
      { label: 'X/Twitter', href: 'https://x.com/israelsilvareis', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/israel-silva-dos-reis-pereira', external: true },
      { label: 'Discord', href: 'https://discord.com/users/926340772897370122', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/israelsilvadosreispereira/', external: true },
    ],
  },
];

/**
 * Hrefs que nunca devem receber o prefixo do idioma: URLs absolutas/relativas
 * ao protocolo, links `mailto:`/`tel:` e âncoras internas `#anchor`.
 */
function isExternalOrAnchorHref(href: string): boolean {
  return (
    /^(https?:)?\/\//.test(href) ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  );
}

/**
 * Resolve um único item para um idioma: aplica qualquer substituição específica
 * do idioma, traduz o label (quando `labelKey` está definido) e adiciona o
 * prefixo do idioma ao caminho (exceto quando é externo ou uma âncora).
 *
 * No idioma padrão com o i18n desativado, retorna o label literal do item e o
 * href sem alterações. Exportado para reutilização em componentes de navegação
 * personalizados e testes unitários.
 */
export function resolveNavItem(item: NavItem | LegalLink, locale: Locale): ResolvedNavItem {
  const override = item.locales?.[locale];
  const label = override?.label ?? (item.labelKey ? t(item.labelKey, locale) : item.label);
  const rawHref = override?.href ?? item.href;
  const href =
    item.external || isExternalOrAnchorHref(rawHref) ? rawHref : localizedPath(rawHref, locale);
  return { label, href, external: item.external };
}

/**
 * Obtém os itens de navegação do cabeçalho ordenados por `order` e localizados
 * para o idioma especificado.
 */
export function getNavItems(locale: Locale = defaultLocale): ResolvedNavItem[] {
  return [...navItems]
    .sort((a, b) => a.order - b.order)
    .map((item) => resolveNavItem(item, locale));
}

/**
 * Obtém os itens de navegação do rodapé ordenados por `order` e localizados
 * para o idioma especificado.
 *
 * Configurado independentemente do cabeçalho — edite `footerNavItems` acima
 * para adicionar ou remover links somente do rodapé.
 */
export function getFooterNavItems(locale: Locale = defaultLocale): ResolvedNavItem[] {
  return [...footerNavItems]
    .sort((a, b) => a.order - b.order)
    .map((item) => resolveNavItem(item, locale));
}

/**
 * Obtém os links legais configurados (Privacidade, Termos etc.), localizados
 * para o idioma especificado. Retornados na ordem em que foram declarados.
 */
export function getLegalLinks(locale: Locale = defaultLocale): ResolvedNavItem[] {
  return legalLinks.map((item) => resolveNavItem(item, locale));
}

/**
 * Destino do link do logotipo do site para o idioma especificado — a página
 * inicial do idioma (`/` no idioma padrão e `/<locale>` nos demais).
 */
export function getLogoHref(locale: Locale = defaultLocale): string {
  return localizedPath('/', locale);
}
