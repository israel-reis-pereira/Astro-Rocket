import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from 'astro:env/server';
import i18nConfig, { type I18nConfig } from './i18n.config';
import { SITE_URL_FALLBACK } from './site-url';
import { SITE_NAME, THEME_COLOR } from './branding';

export { i18nConfig };
export type { I18nConfig };

export interface SiteConfig {
  name: string;
  description: string;
  /** Linha de identidade abaixo do logo no rodapé centralizado */
  tagline?: string;
  /** Linha com informações resumidas abaixo do tagline do rodapé (licença, localização, disponibilidade) */
  footerNote?: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  /**
   * Opções do cabeçalho. Defina `showSocialLinks: true` para exibir um ícone
   * no canto superior direito para cada entrada em `socialLinks` (GitHub, X etc. —
   * o ícone é identificado automaticamente pela URL). Desativado por padrão;
   * uma propriedade explícita `<Header showSocialLinks>` ainda pode substituir
   * essa configuração em cada uso.
   */
  header?: {
    showSocialLinks?: boolean;
  };
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
  /** Caminho para a foto do autor (relativo à raiz do site, por exemplo, '/avatar.jpg'). Usado no schema Person. */
  authorImage?: string;
  /**
   * Defina como false se as imagens das publicações do blog já corresponderem
   * à cor do seu tema e você não quiser que a sobreposição da cor da marca
   * seja aplicada sobre elas.
   */
  blogImageOverlay?: boolean;
  /**
   * Efeitos visuais decorativos globais (puramente adicionais — o site funciona
   * completamente sem eles).
   */
  effects?: {
    /**
     * Rastro do cursor no desktop (ponto do ponteiro + anel com atraso + partículas
     * de cometa). `true` por padrão; defina como `false` para desativá-lo em todo
     * o site como preferência de conforto visual / acessibilidade. O rastro já é
     * automaticamente ignorado com `prefers-reduced-motion` e em ponteiros
     * grosseiros/de toque, independentemente desta configuração.
     */
    cursorTrail?: boolean;
  };
  /**
   * Recursos dos artigos — módulos opcionais para publicações do blog.
   * Cada recurso fica DESATIVADO por padrão para que o tema continue tão leve
   * quanto é atualmente para os usuários que não os ativarem.
   */
  articleFeatures?: {
    /** Sumário exibido nas publicações do blog (gerado automaticamente a partir dos títulos) */
    toc?: {
      /** Chave principal — defina como true para ativar em todo o site */
      enabled: boolean;
      /**
       * Onde exibir o sumário.
       * - 'inline'  → cartão no topo de cada publicação (padrão; preserva
       *               toda a largura de leitura no desktop)
       * - 'sidebar' → barra lateral fixa em telas `xl+` (≥1280px),
       *               oculta em telas menores
       * - 'auto'    → barra lateral em telas `xl+`, cartão inline abaixo de
       *               `xl`, para que leitores de celular e tablet ainda tenham
       *               acesso à navegação
       */
      layout?: 'inline' | 'sidebar' | 'auto';
      /**
       * Em qual lado o sumário da barra lateral será exibido (aplica-se apenas
       * quando `layout` é 'sidebar' ou 'auto'). O padrão é 'right'.
       */
      sidebarPosition?: 'left' | 'right';
      /** Número mínimo de títulos antes que o sumário seja exibido (evita sumários em publicações curtas) */
      minHeadings?: number;
      /** Nível máximo de título a incluir (2 = somente H2, 3 = H2+H3 etc.) */
      maxDepth?: 2 | 3 | 4;
    };
    /** Comentários no final das publicações do blog (compatível com Giscus, Cusdis ou Artalk) */
    comments?: {
      /** Chave principal — defina como true para ativar em todo o site */
      enabled: boolean;
      /** Provedor de comentários — 'giscus' (GitHub Discussions) ou 'cusdis'. */
      provider?: 'giscus' | 'cusdis' | 'artalk';
      /** Configuração do Giscus. Obtenha os valores em [https://giscus.app](https://giscus.app) */
      giscus?: {
        repo: `${string}/${string}`;
        repoId: string;
        category: string;
        categoryId: string;
        mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
        strict?: boolean;
        reactionsEnabled?: boolean;
        emitMetadata?: boolean;
        inputPosition?: 'top' | 'bottom';
        /**
         * Tema do Giscus. Deixe vazio (o padrão) para seguir o próprio modo
         * claro/escuro do site — resolvido no cliente e mantido sincronizado
         * enquanto o visitante alterna. Defina um nome de tema específico do
         * Giscus (por exemplo, 'dark_dimmed', 'preferred_color_scheme') para
         * substituir esse comportamento.
         */
        theme?: string;
        /**
         * Idioma do Giscus. Deixe vazio (o padrão) para seguir o idioma atual
         * do site. Defina um código de idioma específico do Giscus (por exemplo,
         * 'en', 'nl') para substituir esse comportamento.
         */
        lang?: string;
      };
      /** Configuração do Cusdis. Obtenha o App ID no painel do Cusdis. */
      cusdis?: {
        /** App ID do Cusdis (obtido no "Embed Code" do painel do Cusdis). */
        appId: string;
        /**
         * Host da instância do Cusdis. O padrão é o serviço hospedado
         * '[https://cusdis.com](https://cusdis.com)'; defina sua própria URL
         * quando estiver usando hospedagem própria.
         */
        host?: string;
        /**
         * Tema. Deixe vazio (o padrão) para seguir o modo claro/escuro do próprio
         * site — resolvido no cliente e renderizado novamente quando o visitante
         * alterna (o Cusdis não possui uma API de tema em tempo real, portanto
         * a conversa é recarregada brevemente ao alternar). Use 'auto' para seguir
         * a preferência do sistema operacional ou 'light' / 'dark' para um tema fixo.
         */
        theme?: '' | 'light' | 'dark' | 'auto';
        /**
         * Idioma. Deixe vazio (o padrão) para seguir o idioma atual do site.
         * Defina um código de idioma do Cusdis para substituir esse comportamento.
         * A disponibilidade depende dos pacotes de idiomas do Cusdis; um código
         * desconhecido retorna ao inglês.
         */
        lang?: string;
      };
      /** Configuração do Artalk. Requer seu próprio servidor Artalk. */
      artalk?: {
        /**
         * Endereço do servidor Artalk, por exemplo:
         * '[https://comments.example.com](https://comments.example.com)'
         */
        server: string;
        /**
         * Nome do site utilizado pelo Artalk para isolamento entre múltiplos sites.
         * Deve corresponder ao site criado na configuração do painel/servidor Artalk.
         */
        site: string;
        /**
         * URL opcional do JavaScript do cliente. O padrão é `${server}/dist/Artalk.js`.
         * Útil quando o cliente é servido por uma CDN ou por um caminho de recurso personalizado.
         */
        jsUrl?: string;
        /**
         * URL opcional do CSS do cliente. O padrão é `${server}/dist/Artalk.css`.
         * Útil quando o cliente é servido por uma CDN ou por um caminho de recurso personalizado.
         */
        cssUrl?: string;
        /**
         * Modo escuro. Deixe vazio (o padrão) para seguir o próprio modo claro/escuro
         * do site e mantê-lo sincronizado em tempo real. Defina 'auto' para seguir
         * a preferência do sistema operacional ou use true / false para um modo fixo.
         */
        darkMode?: boolean | 'auto';
        /**
         * Idioma. Deixe vazio (o padrão) para seguir o idioma atual do site.
         * Defina um código de idioma específico do Artalk, como 'zh-CN' ou 'en',
         * para substituir esse comportamento.
         */
        locale?: string;
      };
    };
  };
  /**
   * Inscrição na newsletter, exibida na seção "acompanhe" do índice do blog
   * e no final de cada publicação.
   *
   * Desativada por padrão, intencionalmente: o formulário envia dados para
   * `/api/newsletter`, que precisa de `RESEND_API_KEY` e `RESEND_AUDIENCE_ID`.
   * Sem essas configurações, o endpoint responde "Newsletter service is not configured",
   * portanto um site que exibisse o formulário antes que seu proprietário tivesse
   * uma lista de e-mails estaria apenas acumulando falhas. Configure suas chaves
   * e depois ative esta opção.
   */
  newsletter?: {
    /** Chave principal — defina como true para exibir a inscrição em todo o site */
    enabled: boolean;
  };
  /**
   * Configuração da listagem do blog. As quantidades que anteriormente estavam
   * definidas diretamente em `lib/blog.ts` e nos arquivos de rota ficam aqui
   * para que possam ser ajustadas em um único lugar. (As chaves existentes
   * `blogImageOverlay` / `articleFeatures` permanecem onde estão por
   * compatibilidade retroativa e podem ser reorganizadas em uma versão principal.)
   */
  blog?: {
    /** Publicações regulares (não destacadas) exibidas por página do índice do blog. Padrão: 12. */
    postsPerPage?: number;
    /** Quantidade das tags mais utilizadas exibidas na nuvem de tags do blog. Padrão: 10. */
    tagCloudLimit?: number;
  };
  /** Configuração da listagem de projetos. */
  projects?: {
    /** Projetos exibidos por página na listagem de projetos. Padrão: 12. */
    perPage?: number;
    /** Quantidade das tags mais utilizadas exibidas na nuvem de tags dos projetos. Padrão: 10. */
    tagCloudLimit?: number;
  };
  /**
   * Internacionalização (i18n) — consulte `src/config/i18n.config.ts`.
   * Mantida em um arquivo separado para que o módulo de i18n possa ser
   * importado pelos testes unitários sem carregar `astro:env/server`.
   */
  i18n?: I18nConfig;
  /**
   * Configuração da identidade visual
   * Arquivos de logo: substitua os SVGs em src/assets/branding/
   * Favicon: substitua em public/favicon.svg
   */
  branding: {
    /** Texto alternativo do logo para acessibilidade */
    logo: {
      alt: string;
      /**
       * Caminho opcional para uma imagem de logo personalizada em public/
       * (por exemplo, '/logo.svg'). Quando definido, substitui o selo de
       * monograma gerado por letras no cabeçalho, rodapé e em qualquer lugar
       * onde `<Logo>` seja renderizado — sem necessidade de alterações no layout.
       * Deixe indefinido para manter o monograma. Avatares de autoria
       * (que passam uma letra explicitamente) não são afetados.
       */
      image?: string;
      /** Caminho para a imagem do logo usada nos dados estruturados (por exemplo, '/logo.png'). Adicione um PNG a public/ e defina este valor. */
      imageUrl?: string;
    };
    /** Caminho do favicon (localizado em public/) */
    favicon: {
      svg: string;
    };
    /** Cores do tema para o manifest e a interface do navegador */
    colors: {
      /** Cor da barra do navegador (hexadecimal) */
      themeColor: string;
      /** Cor de fundo da tela inicial do PWA (hexadecimal) */
      backgroundColor: string;
    };
  };
}

const siteConfig: SiteConfig = {
  // Lido de ./branding para que o gerador de favicon em tempo de build,
  // que não pode importar este arquivo, use os mesmos valores. Altere-os lá.
  name: SITE_NAME,
  description:
    'Site pessoal de Israel Reis, desenvolvedor em formação e estudante de Sistemas de Informação, com projetos, estudos e experiências em desenvolvimento de software.',
  tagline: 'Desenvolvimento de software, projetos e aprendizado contínuo',
  footerNote: 'Desenvolvedor em formação · Barretos, São Paulo, Brasil',
  url: SITE_URL || SITE_URL_FALLBACK,
  // Gerado em tempo de build a partir de `name`, `tagline` e da cor da marca abaixo.
  // Aponte para um arquivo em `public/` para usar o seu próprio — ele precisa
  // ser rasterizado (PNG ou JPEG): as plataformas sociais não renderizam imagens
  // de compartilhamento em SVG.
  ogImage: '/og/default.png',
  author: 'Israel Silva dos Reis Pereira',
  email: 'SEU_EMAIL_AQUI',
  address: {
    street: '',
    city: 'Barretos',
    state: 'São Paulo',
    zip: '',
    country: 'Brasil',
  },
  socialLinks: [
    'https://github.com/israel-reis-pereira',
    'https://x.com/israelsilvareis',
    'https://www.linkedin.com/in/israel-silva-dos-reis-pereira',
    'https://discord.com/users/926340772897370122',
  ],
  header: {
    // Altere para `true` para exibir os ícones de redes sociais (incluindo GitHub) no cabeçalho.
    showSocialLinks: false,
  },
  twitter: {
    site: 'https://x.com/israelsilvareis',
    creator: '@israelsilvareis',
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    bing: BING_SITE_VERIFICATION,
  },
  authorImage: '/avatar.svg',
  blogImageOverlay: true,
  effects: {
    cursorTrail: true,
  },
  articleFeatures: {
    toc: {
      enabled: true,
      layout: 'auto',
      sidebarPosition: 'right',
      minHeadings: 3,
      maxDepth: 3,
    },
    comments: {
      enabled: false,
      provider: 'giscus',
      giscus: {
        repo: 'owner/repo',
        repoId: '',
        category: 'General',
        categoryId: '',
        mapping: 'pathname',
        strict: false,
        reactionsEnabled: true,
        emitMetadata: false,
        inputPosition: 'bottom',
        // Vazio → seguir o modo claro/escuro do site e o idioma atual.
        theme: '',
        lang: '',
      },
      // Usado quando o provedor é 'cusdis'. Obtenha o App ID no painel do Cusdis
      // (Embed Code); `host` usa o serviço hospedado como padrão.
      cusdis: {
        appId: '',
        host: 'https://cusdis.com',
        // Vazio → seguir o modo claro/escuro do site e o idioma atual.
        theme: '',
        lang: '',
      },
      // Usado quando o provedor é 'artalk'. Aponte `server` para seu próprio
      // serviço Artalk — use um endereço https:// em produção (uma URL http://
      // simples é bloqueada como conteúdo misto em um site https e fica aberta a
      // adulterações). Os comentários só são renderizados quando `server` e `site`
      // estiverem definidos.
      artalk: {
        server: '',
        // O nome "site" do Artalk configurado no painel do Artalk
        // (usado para isolamento entre múltiplos sites).
        site: '',
        // Opcional: substitua as URLs dos recursos do cliente quando necessário.
        // jsUrl: 'https://cdn.example.com/artalk/Artalk.js',
        // cssUrl: 'https://cdn.example.com/artalk/Artalk.css',
        // Deixe indefinido → seguir o modo claro/escuro e o idioma do site.
        // darkMode: 'auto',
        // locale: 'en',
      },
    },
  },
  newsletter: {
    // Ativado por padrão: o formulário verifica se possui as chaves e informa isso
    // apenas no ambiente de desenvolvimento. Defina RESEND_API_KEY e
    // RESEND_AUDIENCE_ID para fazê-lo funcionar.
    enabled: true,
  },
  blog: {
    postsPerPage: 12,
    tagCloudLimit: 10,
  },
  projects: {
    perPage: 12,
    tagCloudLimit: 10,
  },
  i18n: i18nConfig,
  branding: {
    logo: {
      alt: 'Israel Reis',
      // image: '/logo.svg', // Opcional: defina um arquivo em public/ para usar uma imagem de logo personalizada em vez do monograma de letras.
      imageUrl: '/favicon.svg',
    },
    favicon: {
      svg: '/favicon.svg',
    },
    colors: {
      themeColor: THEME_COLOR,
      backgroundColor: '#ffffff',
    },
  },
};

export default siteConfig;
