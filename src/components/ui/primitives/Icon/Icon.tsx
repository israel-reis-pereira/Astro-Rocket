/**
 * Componente de ícone (React)
 * Ícones de UI → Lucide (lucide.dev)
 * Ícones de marcas/redes sociais → Simple Icons (simpleicons.org)
 *
 * Mesma API pública de antes — os componentes informam o nome curto
 * (por exemplo, "arrow-right", "github", "x-twitter").
 * Este wrapper resolve o nome para o conjunto correto do Iconify.
 */
import { Icon as IconifyIcon } from '@iconify/react';
import { cn } from '@/lib/cn';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  class?: string;
  className?: string;
  [key: string]: unknown;
}

const sizes: Record<string, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

/**
 * Mapeia nomes curtos legados → nomes completos do Iconify.
 * Ícones de redes sociais/marcas usam Simple Icons;
 * todos os demais usam Lucide.
 */
const iconMap: Record<string, string> = {
  // Redes sociais e marcas → Simple Icons
  github:           'simple-icons:github',
  'x-twitter':      'simple-icons:x',
  twitter:          'simple-icons:x',
  instagram:        'simple-icons:instagram',
  linkedin:         'simple-icons:linkedin',
  bluesky:          'simple-icons:bluesky',
  facebook:         'simple-icons:facebook',
  whatsapp:         'simple-icons:whatsapp',
  discord:          'simple-icons:discord',
  youtube:          'simple-icons:youtube',
  tiktok:           'simple-icons:tiktok',
  telegram:         'simple-icons:telegram',
  threads:          'simple-icons:threads',
  twitch:           'simple-icons:twitch',
  reddit:           'simple-icons:reddit',
  medium:           'simple-icons:medium',
  devto:            'simple-icons:devdotto',
  stackoverflow:    'simple-icons:stackoverflow',

  // Stack tecnológico → Simple Icons
  'brand-astro':      'simple-icons:astro',
  'brand-tailwind':   'simple-icons:tailwindcss',
  'brand-typescript': 'simple-icons:typescript',
  'brand-react':      'simple-icons:react',
  'brand-github':     'simple-icons:github',
  'brand-vercel':     'simple-icons:vercel',
  'brand-mdx':        'simple-icons:mdx',
  'brand-claude':     'simple-icons:claude',
};

export function Icon({
  name,
  size = 'md',
  strokeWidth = 2,
  class: classProp,
  className,
  ...rest
}: IconProps) {
  const resolvedName = iconMap[name] ?? `lucide:${name}`;
  const isSimpleIcon = resolvedName.startsWith('simple-icons:');

  return (
    <IconifyIcon
      icon={resolvedName}
      className={cn(sizes[size], 'shrink-0', classProp, className)}
      aria-hidden="true"
      strokeWidth={isSimpleIcon ? undefined : strokeWidth}
      {...rest}
    />
  );
}

export default Icon;