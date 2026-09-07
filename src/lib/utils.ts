import { defaultLocale } from '@/i18n';

/**
 * Formata uma data para exibição. Usa o idioma padrão do site por padrão para
 * que as datas sejam exibidas corretamente em cada idioma (por exemplo,
 * "24 juni 2026" em uma página em holandês, "2026年6月24日" em uma página
 * em chinês); quem souber o idioma ativo deve informá-lo.
 */
export function formatDate(date: Date, locale: string = defaultLocale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Velocidade de leitura para alfabetos latinos, em palavras por minuto. */
const WORDS_PER_MINUTE = 200;

/**
 * Velocidade de leitura para CJK, em caracteres por minuto. Os idiomas CJK
 * (chinês, japonês e coreano) não utilizam espaços para separar as palavras,
 * portanto os caracteres são contabilizados individualmente em vez de serem
 * tratados como "palavras" separadas por espaços.
 */
const CJK_CHARS_PER_MINUTE = 400;

/**
 * Caracteres de sistemas de escrita do leste asiático que não utilizam espaços:
 * Hiragana, Katakana, Ideogramas CJK Unificados (incluindo a Extensão A) e
 * blocos de Compatibilidade, sílabas Hangul e Katakana de meia largura.
 */
const CJK_PATTERN = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힯ｦ-ﾟ]/g;

/**
 * Estima o tempo de leitura em minutos a partir de um conteúdo (normalmente o
 * corpo bruto de uma publicação). Os caracteres CJK são contabilizados
 * individualmente, enquanto os demais sistemas de escrita utilizam palavras
 * separadas por espaços, cada um com sua própria velocidade de leitura —
 * assim, uma publicação em chinês ou japonês não fica reduzida a "1 min",
 * como aconteceria com um simples `split(' ')`. Uma remoção leve de marcação
 * mantém a estimativa focada no texto, em vez de código, HTML/JSX ou linhas
 * de importação do MDX. O resultado é sempre de pelo menos 1 minuto.
 */
export function getReadingTime(content: string): number {
  const text = (content ?? '')
    .replace(/^\s*(?:import|export)\s.*$/gm, ' ') // declarações de import/export do MDX
    .replace(/```[\s\S]*?```/g, ' ') // blocos de código cercados por ```
    .replace(/`[^`]*`/g, ' ') // código inline
    .replace(/<[^>]+>/g, ' ') // tags HTML / JSX
    .replace(/[#>*_~]/g, ' '); // marcadores comuns do Markdown

  const cjkChars = (text.match(CJK_PATTERN) || []).length;
  const words = text
    .replace(CJK_PATTERN, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = words / WORDS_PER_MINUTE + cjkChars / CJK_CHARS_PER_MINUTE;
  return Math.max(1, Math.ceil(minutes));
}

/**
 * Gera um ID exclusivo
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Verifica se uma URL é externa
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Resolve um array simples de URLs de perfis sociais em objetos de link
 * estruturados. Compara cada URL com as plataformas conhecidas para determinar
 * o nome do ícone e o rótulo.
 */
const SOCIAL_PLATFORMS = [
  { key: 'github', match: /github\.com/i, label: 'GitHub', icon: 'github' },
  { key: 'twitter', match: /x\.com|twitter\.com/i, label: 'X / Twitter', icon: 'x-twitter' },
  { key: 'linkedin', match: /linkedin\.com/i, label: 'LinkedIn', icon: 'linkedin' },
  { key: 'instagram', match: /instagram\.com/i, label: 'Instagram', icon: 'instagram' },
  { key: 'facebook', match: /facebook\.com|fb\.com/i, label: 'Facebook', icon: 'facebook' },
  { key: 'whatsapp', match: /whatsapp\.com|wa\.me/i, label: 'WhatsApp', icon: 'whatsapp' },
  { key: 'discord', match: /discord\.com|discordapp\.com/i, label: 'Discord', icon: 'discord' },
  { key: 'youtube', match: /youtube\.com|youtu\.be/i, label: 'YouTube', icon: 'youtube' },
  { key: 'tiktok', match: /tiktok\.com/i, label: 'TikTok', icon: 'tiktok' },
  { key: 'telegram', match: /telegram\.me|t\.me/i, label: 'Telegram', icon: 'telegram' },
  { key: 'threads', match: /threads\.net/i, label: 'Threads', icon: 'threads' },
  { key: 'twitch', match: /twitch\.tv/i, label: 'Twitch', icon: 'twitch' },
  { key: 'reddit', match: /reddit\.com/i, label: 'Reddit', icon: 'reddit' },
  { key: 'medium', match: /medium\.com/i, label: 'Medium', icon: 'medium' },
  { key: 'devto', match: /dev\.to/i, label: 'DEV Community', icon: 'devto' },
  { key: 'stackoverflow', match: /stackoverflow\.com/i, label: 'Stack Overflow', icon: 'stackoverflow' },
  { key: 'bluesky',   match: /bsky\.app|bluesky\.social/i,    label: 'Bluesky',     icon: 'bluesky'   },
] as const;

export interface ResolvedSocialLink {
  key: string;
  href: string;
  label: string;
  icon: string;
}

export function resolveSocialLinks(urls: string[]): ResolvedSocialLink[] {
  return urls.flatMap((href) => {
    const platform = SOCIAL_PLATFORMS.find((p) => p.match.test(href));
    if (!platform) return [];
    return [{ key: platform.key, href, label: platform.label, icon: platform.icon }];
  });
}
