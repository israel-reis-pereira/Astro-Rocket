# Design System: Astro-Rocket

Documentação técnica oficial e autossuficiente da identidade visual, dos design tokens, dos componentes de interface e dos padrões de UI/UX extraídos do projeto **Astro-Rocket** (v2.6.0).

Este manual foi concebido para permitir a reprodução fiel e consistente de toda a linguagem visual em qualquer projeto futuro, independente de framework (Astro, React, Next.js, Vue, Svelte ou HTML/CSS estático).

---

## 1. Visão Geral da Identidade Visual

### 1.1 Filosofia Estética
A identidade visual do Astro-Rocket é fortemente inspirada no design de plataformas como **Vercel**, **Linear**, **Raycast** e **Radix UI**:
- **Minimalista e Precisa:** Estrutura geométrica rígida, tipografia marcante com alto contraste e eliminação de ruídos ornamentais desnecessários.
- **Dark Mode como Protagonista:** O modo escuro ("Studio") é a experiência central da interface, empregando pretos profundos com matiz frio e acentos luminosos. O modo claro utiliza brancos neutros com toques sutis de cinza e a cor da marca como ponto focal cirúrgico.
- **Profundidade Estruturada (Zebra Pattern):** Alternância deliberada de seções entre superfícies base (`bg-background`) e secundárias (`bg-background-secondary`), conferindo ritmo e hierarquia à leitura vertical.
- **Grids e Feixes Arquiteturais:** Efeitos de fundo estruturados (linhas de 56px de grade dissolvendo em gradiente radial) que conferem atmosfera técnica e moderna sem penalidades de performance.
- **Performance e Zero-JS por Padrão:** Toda a apresentação visual é construída sobre CSS nativo e utilitários modernos (Tailwind CSS v4). JavaScript é reservado exclusivamente para interações essenciais e aprimoramento progressivo (como traps de foco e observadores de rolagem).

### 1.2 Princípios Visuais Fundamentais
1. **Contraste Rígido (WCAG AA/AAA):** Toda combinação de texto e fundo cumpre proporções mínimas de 4.5:1 (AA) para texto normal e frequentemente atinge 7:1 a 18:1 (AAA). Variações de cor com menor luminância são automaticamente compensadas por regras de contraste adaptativas.
2. **Espaço de Cor OKLCH:** Uso primário do modelo perceptual `oklch(lightness chroma hue)` para todas as escalas primitivas e paletas semânticas, assegurando uniformidade perceptual de brilho e saturação em todos os tons.
3. **Física de Movimento Coerente:** Curvas de transição compartilhadas baseadas em `cubic-bezier(0.16, 1, 0.3, 1)` (desaceleração suave e limpa, sem rebote excessivo). Respeito estrito à preferência do sistema por redução de movimento (`prefers-reduced-motion`).
4. **Affordance e Retorno Tátil:** Todos os elementos interativos possuem cursor em formato de mão (`cursor: pointer`), feedback de hover imediato (elevação sutil de `-1px` a `-2px` ou escurecimento de 10%) e anel de foco visível de 2px com deslocamento (`outline-offset: 2px`).

---

## 2. Design Tokens

### 2.1 Espaço de Cor e Escalas Primitivas

#### Escala Neutra (OKLCH Gray Scale)
Base neutra sobre a qual as interfaces clara e escura são construídas:

| Token CSS | Valor OKLCH | Uso / Função |
| :--- | :--- | :--- |
| `--gray-0` | `oklch(100% 0 0)` | Branco puro, cartões em light mode |
| `--gray-50` | `oklch(98.3% 0 0)` | Fundo alternativo muito sutil, texto invertido |
| `--gray-100` | `oklch(96.5% 0 0)` | Superfícies secundárias, bordas sutis |
| `--gray-200` | `oklch(91.3% 0 0)` | Bordas padrão em light mode |
| `--gray-300` | `oklch(85.8% 0 0)` | Bordas reforçadas, texto invertido muted |
| `--gray-400` | `oklch(64% 0 0)` | Ícones desabilitados, texto secundário sutil |
| `--gray-500` | `oklch(52% 0 0)` | Texto sutil (`foreground-subtle`) em light mode |
| `--gray-600` | `oklch(38% 0 0)` | Texto atenuado (`foreground-muted`) em light mode |
| `--gray-700` | `oklch(32% 0 0)` | Texto secundário em light mode (12.7:1 AAA) |
| `--gray-800` | `oklch(26.7% 0 0)` | Hover de botões primários em light mode |
| `--gray-900` | `oklch(19.4% 0 0)` | Texto principal em light mode (18.3:1 AAA), superfícies escuras |
| `--gray-950` | `oklch(12.3% 0 0)` | Fundos escuros profundos |

#### Escala de Status e Contraste Adaptativo
O sistema utiliza uma abordagem em camadas para status: uma cor base para preenchimentos/bordas, uma cor suave para fundos de badges e uma variante `-strong` de alto contraste (> 6:1) para textos e ícones aplicados diretamente sobre o fundo da página:

| Status | Preenchimento Base | Light Mode Background | Dark Mode Background | Light Mode Texto (`-strong`) | Dark Mode Texto (`-strong`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Success** | `oklch(72.3% 0.19 145)` | `oklch(94% 0.05 145)` | `oklch(18% 0.05 145)` | `oklch(48% 0.15 145)` (6.1:1) | `oklch(80% 0.16 145)` (11.1:1) |
| **Warning** | `oklch(79.5% 0.18 85)` | `oklch(96% 0.05 85)` | `oklch(18% 0.05 85)` | `oklch(47% 0.12 85)` (6.9:1) | `oklch(85% 0.15 85)` (12.3:1) |
| **Error** | `oklch(62.8% 0.22 25)` | `oklch(94% 0.05 25)` | `oklch(18% 0.05 25)` | `oklch(50% 0.20 25)` (6.7:1) | `oklch(74% 0.16 25)` (7.9:1) |
| **Info** | `oklch(59.5% 0.19 260)` | `oklch(94% 0.05 260)` | `oklch(18% 0.05 260)` | `oklch(48% 0.17 260)` (6.7:1) | `oklch(78% 0.13 260)` (9.6:1) |

### 2.2 As 12 Paletas de Cor de Tema
O tema ativo é injetado via atributo HTML `html[data-theme="<nome>"]`. Cada paleta define a escala `--brand-50` a `--brand-900` com matiz uniforme em OKLCH:

| ID do Tema | Nome Visual | Matiz Hue | Amostra Brand-500 | Inspiração / Personalidade |
| :--- | :--- | :--- | :--- | :--- |
| `blue` | Blue (Studio) *(Padrão)* | `255` | `oklch(62.1% 0.207 255)` | Linear / Raycast / Indigo elétrico |
| `orange` | Orange | `38` | `oklch(62.5% 0.22 38)` | International Orange aeroespacial |
| `amber` | Amber | `64` | `oklch(68.4% 0.155 64)` | Ouro quente, clássico |
| `lime` | Lime | `136` | `oklch(64.8% 0.194 136)` | Alta energia, contemporâneo |
| `emerald` | Emerald | `151` | `oklch(65.2% 0.174 151)` | Verde equilibrado, confiabilidade |
| `teal` | Teal | `190` | `oklch(67.2% 0.116 190)` | Marinho orgânico, sereno |
| `cyan` | Cyan | `208` | `oklch(67.2% 0.116 208)` | Futurista, elétrico |
| `sky` | Sky | `239` | `oklch(66.5% 0.150 239)` | Azul atmosférico aberto |
| `indigo` | Indigo | `263` | `oklch(58.9% 0.224 263)` | Tecnológico denso |
| `violet` | Violet | `279` | `oklch(59.9% 0.222 279)` | Moderno, refinado |
| `purple` | Purple | `296` | `oklch(59.7% 0.251 296)` | Criativo, expressivo |
| `magenta` | Magenta | `330` | `oklch(58.8% 0.268 330)` | Vívido, assertivo |

> **Regra de Contraste para Botões Primários:**  
> Nos 12 temas, botões primários utilizam `--color-brand-600` em Light Mode para rótulos em texto branco. No entanto, para as quatro cores mais frias (`cyan`, `emerald`, `sky`, `teal`), onde `brand-600` atinge apenas ~4.2:1, o sistema aplica uma regra de override automática chaveando para `--color-brand-700` no estado normal e `--color-brand-800` no hover, mantendo conformidade WCAG AA (≥ 4.5:1).

### 2.3 Mapeamento de Tokens Semânticos (Light vs. Dark)
Valores demonstrados com base no tema padrão `blue` (Studio):

| Token Semântico | Light Mode | Dark Mode (`html.dark`) | Função na UI |
| :--- | :--- | :--- | :--- |
| `--background` | `var(--gray-0)` | `oklch(10% 0.015 255)` | Fundo principal da página |
| `--background-secondary` | `oklch(97.5% 0.010 255)` | `oklch(15.5% 0.012 255)` | Fundo de seções alternadas (Zebra) |
| `--background-tertiary` | `oklch(95% 0.018 255)` | `oklch(20.5% 0.01 255)` | Cartões e blocos embutidos |
| `--foreground` | `var(--gray-900)` | `oklch(91% 0.008 255)` | Texto principal (alta hierarquia) |
| `--foreground-secondary` | `var(--gray-700)` | `oklch(82% 0.012 255)` | Texto de corpo e subtítulos |
| `--foreground-muted` | `var(--gray-600)` | `oklch(68% 0.01 255)` | Rótulos, metadados, dicas |
| `--foreground-subtle` | `var(--gray-500)` | `oklch(62% 0.008 255)` | Linhas decorativas, placeholders |
| `--border` | `var(--gray-200)` | `oklch(20% 0.012 255)` | Linhas divisórias, bordas padrão |
| `--border-strong` | `var(--gray-300)` | `oklch(28% 0.01 255)` | Bordas ativas e caixas de destaque |
| `--card` | `var(--gray-0)` | `oklch(15.5% 0.012 255)` | Superfície de cartões |
| `--card-border` | `var(--gray-200)` | `oklch(23% 0.012 255)` | Borda padrão de cartões |
| `--primary` | `var(--gray-900)` | `oklch(94% 0.008 255)` | Cor de controle primário neutro |
| `--primary-foreground` | `var(--gray-0)` | `oklch(10% 0.015 255)` | Rótulo sobre controle primário |
| `--secondary` | `var(--gray-100)` | `oklch(20.5% 0.01 255)` | Fundo de botões e badges neutros |
| `--secondary-foreground` | `var(--gray-900)` | `oklch(90% 0.01 255)` | Texto sobre botões secundários |
| `--accent` | `var(--brand-500)` | `var(--brand-400)` | Acentos visuais e links interativos |
| `--ring` | `var(--brand-600)` | `var(--brand-400)` | Anel de foco para acessibilidade |
| `--destructive` | `oklch(53% 0.2 25)` | `oklch(65% 0.22 25)` | Ações destrutivas e alertas de erro |

### 2.4 Padrão de Seção Invertida (`.invert-section`)
Permite criar faixas de alto contraste (ex.: rodapés, banners CTA escuros em páginas claras). A classe remapa internamente as variáveis de cor para que todos os componentes filhos continuem legíveis:
```css
.invert-section {
  --color-background: var(--surface-invert);
  --color-foreground: var(--on-invert);
  --color-foreground-secondary: var(--on-invert-secondary);
  --color-foreground-muted: var(--on-invert-muted);
  --color-border: var(--border-invert);
  --color-border-strong: var(--border-invert-strong);
  --color-secondary: var(--surface-invert-secondary);
  --color-secondary-foreground: var(--on-invert);
  --color-primary: var(--on-invert);
  --color-primary-foreground: var(--surface-invert);
}
```

### 2.5 Espaçamentos e Proporções (Base 4px)
Sistema modular fundamentado em múltiplos de 4px (`--space-0` a `--space-96`):

```
Base unit: 4px (0.25rem)
--space-1:  0.25rem (4px)    --space-6:  1.5rem (24px)    --space-20: 5rem (80px)
--space-2:  0.5rem  (8px)    --space-8:  2rem   (32px)    --space-24: 6rem (96px)
--space-3:  0.75rem (12px)   --space-10: 2.5rem (40px)    --space-32: 8rem (128px)
--space-4:  1rem    (16px)   --space-12: 3rem   (48px)    --space-48: 12rem (192px)
--space-5:  1.25rem (20px)   --space-16: 4rem   (64px)    --space-64: 16rem (256px)
```

#### Espaçamento Semântico Fluido com `clamp()`
Garante adaptação orgânica entre telas de dispositivos móveis e desktops ultrawide:
- `--space-section`: `clamp(4rem, 10vw, 6rem)` (64px a 96px)
- `--space-section-gap`: `clamp(2rem, 5vw, 3rem)` (32px a 48px)
- `--space-container-x`: `clamp(1rem, 5vw, 2rem)` (16px a 32px)
- `--space-heading-gap`: `1.5rem` (24px)
- `--space-page-top`: `8rem` (128px — compensação do cabeçalho fixo + respiro)
- `--space-page-top-sm`: `6rem` (96px — topo reduzido)

### 2.6 Bordas, Raios e Sombras

#### Raios de Borda (`Border Radius`)
- `--radius-sm`: `0.25rem` (4px) — Tags pequenas, badges compactas, código inline.
- `--radius-md`: `0.375rem` (6px) — Botões, inputs, tooltips, paginação.
- `--radius-lg`: `0.5rem` (8px) — Diálogos, alertas, containers de formulários.
- `--radius-xl`: `0.625rem` a `0.75rem` (10px a 12px) — Cartões, painéis, blocos de destaque.
- `--radius-full`: `9999px` — Avatares, switches, pills, botão de retorno ao topo.

#### Sistema de Elevação e Sombras
As sombras incorporam o matiz da cor primária ativa para conferir iluminação natural e reflexos realistas:
- `--theme-shadow-sm`: `0 1px 2px oklch(20% 0.01 255 / 0.06)` (Dark: `0 1px 3px oklch(10% 0.02 255 / 0.35)`)
- `--theme-shadow-md`: `0 4px 8px oklch(20% 0.01 255 / 0.08), 0 0 1px oklch(20% 0.01 255 / 0.04)`
- `--theme-shadow-lg`: `0 8px 16px oklch(20% 0.01 255 / 0.1), 0 0 1px oklch(20% 0.01 255 / 0.04)`
- `--theme-shadow-xl`: `0 24px 48px oklch(20% 0.01 255 / 0.14), 0 0 1px oklch(20% 0.01 255 / 0.04)`
- `.media-shadow`:
  - **Light Mode:** `box-shadow: 0 24px 48px -12px rgb(0 0 0 / 0.45), 0 0 24px -4px rgb(0 0 0 / 0.2);`
  - **Dark Mode (Brand Glow):** `box-shadow: 0 0 40px -6px color-mix(in oklab, var(--color-brand-500) 30%, transparent), 0 20px 40px -12px rgb(0 0 0 / 0.6);`

---

## 3. Tipografia

### 3.1 Famílias Tipográficas
O sistema utiliza três famílias tipográficas com carregamento local auto-hospedado (via Fontsource) para imunidade CSP e zero requisições externas:
1. **Display / Títulos:** `Outfit Variable` — geométrica, limpa e técnica.
2. **Sans / Corpo do Texto:** `Manrope Variable` — proporções abertas para alta legibilidade em telas.
3. **Monospace / Código:** `JetBrains Mono Variable` — leitura otimizada de dados técnicos e snippets.

#### Estratégia de Fallback com Métricas Ajustadas (Zero CLS)
Para eliminar Cumulative Layout Shift (CLS) antes do carregamento dos arquivos WOFF2, são definidos fallbacks matematicamente calibrados sobre a fonte do sistema Arial:
```css
@font-face {
  font-family: 'Outfit Fallback';
  src: local('Arial');
  ascent-override: 92.5%;
  descent-override: 24%;
  line-gap-override: 0%;
  size-adjust: 96.8%;
}

@font-face {
  font-family: 'Manrope Fallback';
  src: local('Arial');
  ascent-override: 99%;
  descent-override: 26%;
  line-gap-override: 0%;
  size-adjust: 99.5%;
}
```

### 3.2 Escala Tipográfica Fluida
A escala tipográfica utiliza `clamp()` para interpolação contínua baseada na largura da viewport:

| Token | Fórmula CSS `clamp()` | Tamanho Mínimo | Tamanho Máximo | Aplicação Típica |
| :--- | :--- | :--- | :--- | :--- |
| `--text-xs` | `clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)` | 12px | 13px | Badges, datas, legendas de gráficos |
| `--text-sm` | `clamp(0.875rem, 0.8rem + 0.375vw, 0.9375rem)` | 14px | 15px | Inputs, botões médios, navegação |
| `--text-base` | `clamp(1rem, 0.925rem + 0.375vw, 1.0625rem)` | 16px | 17px | Corpo principal de parágrafos |
| `--text-lg` | `clamp(1.125rem, 1rem + 0.625vw, 1.25rem)` | 18px | 20px | Subtítulos de seções, chamadas |
| `--text-xl` | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)` | 20px | 24px | H4, cards de destaque |
| `--text-2xl` | `clamp(1.5rem, 1.25rem + 1.25vw, 1.875rem)` | 24px | 30px | H3, métricas e estatísticas |
| `--text-3xl` | `clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)` | 30px | 40px | H2 de páginas secundárias |
| `--text-4xl` | `clamp(2.25rem, 1.75rem + 2.5vw, 3.25rem)` | 36px | 52px | H2 de home, títulos de seções |
| `--text-5xl` | `clamp(3rem, 2.25rem + 3.75vw, 4.5rem)` | 48px | 72px | H1 de páginas hero |

### 3.3 Hierarquia e Parâmetros de Título
- **H1, H2:** `font-family: var(--font-display)`, `font-weight: 700`, `line-height: 1.1`, `letter-spacing: -0.02em`.
- **H3:** `font-family: var(--font-display)`, `font-weight: 600`, `line-height: 1.2`, `letter-spacing: -0.02em`.
- **H4, H5, H6:** `font-family: var(--font-display)`, `font-weight: 500`, `line-height: 1.3`.
- **Corpo:** `font-family: var(--font-sans)`, `font-weight: 400`, `line-height: 1.6`.
- **Código:** `font-family: var(--font-mono)`, `font-size: 0.875rem`.

---

## 4. Layout e Responsividade

### 4.1 Estrutura de Containers e Breakpoints
- **Container Máximo Padrão:** `1200px` (`--container-max`).
- **Containers Utilitários Tailwind:**
  - `max-w-4xl`: 896px (artigos e formulários concentrados).
  - `max-w-6xl`: 1152px (largura padrão do header e seções hero).
  - `max-w-7xl`: 1280px (vitrines de cartões e grades densas).
- **Padding Horizontal do Container:**
  - Mobile (< 768px): `1.5rem` (24px).
  - Desktop (≥ 768px): `2rem` (32px).
- **Breakpoints Utilizados:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

### 4.2 Arquitetura de Layout Compartilhada
1. **`BaseLayout`:** Casca estrutural com `<head>`, preloads, script antiflicker de bootstrap de temas, link de pular conteúdo (`#main-content`), observador de scroll-reveal, e botão de retorno ao topo.
2. **`PageLayout`:** Layout padrão de páginas de conteúdo. Inclui Header fixo (`h-16`), offset no `<main>` com `pt-16`, e rodapé em colunas com background configurável.
3. **`BlogLayout` / `ProjectLayout`:** Layouts para artigos e casos de estudo, suportando barra lateral fixa para sumário (TOC) em `xl+` (≥1280px) ou inline abaixo dessa resolução.
4. **`LandingLayout` / `MarketingLayout`:** Layouts imersivos com suporte a cabeçalho flutuante (`floating capsule`) e hero em tela cheia (`min-h-[100svh]`).

### 4.3 Padrão Zebra de Fundo
Para conferir ritmo e legibilidade sem a necessidade de divisórias pesadas, seções adjacentes alternam fundos:
- Seção A: `bg-background` (Branco neutro / Preto de fundo).
- Seção B: `bg-background-secondary` (Cinza muito suave / Preto elevado).
- Seção de Fechamento / Rodapé: O rodapé recebe `background="secondary"` se a seção anterior for `bg-background`, e vice-versa.

### 4.4 Sincronização Dinâmica com a Barra do Safari iOS
Para evitar faixas brancas desagradáveis sob a barra de ferramentas flutuante do Safari no iOS quando a seção hero possui gradiente escuro, o layout monitora `[data-bar-color]`:
- O elemento define `data-bar-color="#000"`.
- O script avalia a interseção do `window.visualViewport` e aplica a cor diretamente a `document.body.style.backgroundColor`, mantendo a transição limpa.

---

## 5. Biblioteca de Componentes

O design system conta com **44 componentes**, implementados em Astro (renderização estática zero-JS) e componentes React equivalentes (`.tsx`) para páginas de alta interatividade. Ambos compartilham exatamente as mesmas variantes CVA (`class-variance-authority`).

### 5.1 Componentes de Formulário (`Form`)

#### 1. Button
- **Finalidade:** Disparador primário de ações e links estilizados.
- **Variantes:**
  - `primary`: `btn-primary bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]`
  - `secondary`: `bg-secondary text-secondary-foreground border border-border hover:bg-secondary-hover active:scale-[0.98]`
  - `outline`: `border border-foreground/25 bg-transparent text-foreground hover:bg-secondary active:scale-[0.98]`
  - `brand-outline`: `bg-transparent text-brand-700 border border-brand-500/40 hover:bg-brand-500/10 active:scale-[0.98] dark:text-brand-400`
  - `ghost`: `text-foreground-secondary hover:text-foreground hover:bg-secondary active:scale-[0.98]`
  - `link`: `text-foreground-secondary hover:text-foreground underline-offset-4 hover:underline`
  - `destructive`: `btn-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]`
- **Tamanhos:**
  - `sm`: `h-8 px-3 text-xs` (ícone: 16px)
  - `md`: `h-10 px-4 text-sm` (ícone: 20px)
  - `lg`: `h-12 px-5 text-base` (ícone: 20px)
- **Props Chave:** `variant`, `size`, `loading` (spinner automático), `fullWidth`, `icon` (aspecto quadrado 1:1), `href` (polimorfismo automático para tag `<a>`).

#### 2. Input
- **Finalidade:** Campo de entrada de texto de linha única.
- **Variantes de Tamanho:** `sm` (`h-8 text-sm`), `md` (`h-10 text-sm`), `lg` (`h-12 text-base`).
- **Recursos:** Borda com acento sutil `border-brand-500/30`, suporte a `leadingIcon` e `trailingIcon` com recuos automáticos calculados (`inputSizeConfig`), anel de foco `focus-visible:ring-ring`.

#### 3. Textarea
- **Finalidade:** Campo de texto multilinhas redimensionável verticalmente (`resize-y`).
- **Altura Mínima:** `min-h-[80px]`.
- **Tamanhos:** `sm` (px-3 py-2), `md` (px-4 py-3), `lg` (px-4 py-3 text-base).

#### 4. Select
- **Finalidade:** Seleção dropdown nativa estilizada (`appearance-none`).
- **Variantes de Tamanho:** `sm` (h-8), `md` (h-10), `lg` (h-12). Ícone de chevron acoplado no canto direito.

#### 5. Checkbox
- **Finalidade:** Seleção booleana individual ou múltipla.
- **Estrutura:** Caixa de 18x18px com raio de 5px (`rounded-[5px]`), borda de 2px.
- **Estados:** `peer-checked:bg-foreground peer-checked:border-foreground`, foco visível com anel e offset. Ícone de check branco centralizado.

#### 6. Radio
- **Finalidade:** Escolha exclusiva em lista.
- **Variantes:**
  - `default`: Círculo de 18x18px com ponto central interno.
  - `card`: Caixa interativa completa (`rounded-xl border-2 p-4`) com rádio integrado, reagindo com `has-[:checked]:border-foreground has-[:checked]:bg-secondary/50`.

#### 7. Switch
- **Finalidade:** Alternador liga/desliga de impacto imediato.
- **Tamanhos:**
  - `sm`: Trilho 20x36px (`h-5 w-9`), alavanca 16x16px (`translate-x-4`).
  - `md`: Trilho 24x44px (`h-6 w-11`), alavanca 20x20px (`translate-x-5`).
  - `lg`: Trilho 28x52px (`h-7 w-[3.25rem]`), alavanca 24x24px (`translate-x-6`).
- **Cores:** Ativo: `bg-foreground`; Inativo: `bg-border-strong`. Alavanca sempre `bg-background shadow-sm`.

---

### 5.2 Componentes de Exibição de Dados (`Data Display`)

#### 8. Card
- **Finalidade:** Superfície modular para agrupamento de conteúdo.
- **Variantes:**
  - `default`: `bg-card border border-brand-500/40 shadow-md hover:border-brand-500/80`
  - `solid`: `bg-secondary border border-transparent`
  - `outline`: `bg-transparent border-2 border-brand-500/40 shadow-md`
  - `ghost`: `bg-transparent border border-transparent`
  - `elevated`: `bg-card border border-brand-500/40 shadow-lg hover:border-brand-500/80`
- **Comportamento Hover:** Quando `hover={true}`, aplica `hover:-translate-y-0.5 hover:shadow-md`. Em cards `elevated`, escala a sombra diretamente para `hover:shadow-xl`.

#### 9. Badge
- **Finalidade:** Indicadores curtos de status, tags ou contadores.
- **Variantes:** `default` (neutro), `success`, `warning`, `error`, `info`, `brand`.
- **Formas:** `pill={false}` (`rounded-md`), `pill={true}` (`rounded-full shadow-sm`).
- **Tamanhos:** `sm` (10px, px-2 py-0.5), `md` (12px-14px, px-2.5 py-1).

#### 10. Avatar & 11. AvatarGroup
- **Avatar:** Formato circular (`rounded-full ring-2 ring-background`). Tamanhos: `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (64px).
- **AvatarGroup:** Sobreposição horizontal negativa (`-space-x-2`), com avatar de excedente numérico (`+N`).

#### 12. ProofTile
- **Finalidade:** Cartão de métrica ou prova social técnica em landing pages.
- **Estilo:** `bg-background-tertiary rounded-xl border border-brand-500/40 shadow-lg hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/80`.
- **Tamanhos:** `sm` (compacto, p-5) e `md` (p-6 com espaço para ícone, título e descrição).

#### 13. Table
- **Finalidade:** Tabela responsiva de dados estruturados.
- **Estilo:** Borda arredondada externa `rounded-lg border border-border`, cabeçalho sutil `bg-secondary/50`, linhas com transição suave e realce opcional de hover (`hover:bg-secondary/30`) e zebra (`striped`).

#### 14. Pagination
- **Finalidade:** Navegação numérica de páginas.
- **Itens:** Botões com raio `rounded-md`, estado ativo com preenchimento forte `bg-foreground text-background`, botões desabilitados com opacidade de 50%.

#### 15. Progress
- **Finalidade:** Barra indicadora de conclusão de tarefas ou status.
- **Tamanhos:** `sm` (6px), `md` (10px), `lg` (16px).
- **Variantes de Cor:** `default` (foreground), `brand` (brand-500), `success`, `warning`, `error`.
- **Suporte Indeterminado:** Animação contínua deslizante (`animate-indeterminate`).

#### 16. Skeleton
- **Finalidade:** Placeholder de carregamento de conteúdo.
- **Variantes:** `default` (retângulo arredondado), `circular` (redondo para avatares), `text` (altura fixa de 16px).
- **Animação:** Pulsação suave via `animate-pulse`.

#### 17. GoogleMap
- **Finalidade:** Embed de mapa responsivo com conformidade de consentimento LGPD/GDPR.
- **3 Estados:** Sem API Key (instrução), com chave pendente de consentimento (placeholder com botão "Carregar Mapa"), e consentido (iframe interativo).

---

### 5.3 Componentes de Feedback (`Feedback`)

#### 18. Alert
- **Finalidade:** Notificação contextual em bloco dentro do fluxo da página.
- **Variantes:** `info`, `success`, `warning`, `error`.
- **Estrutura:** Caixa `rounded-lg border p-4 bg-background` com indicador lateral de cor sólida e ícones correspondentes coloridos na variante `-strong`.

#### 19. Toast
- **Finalidade:** Notificação flutuante temporária.
- **Posição:** Canto inferior/superior da tela, entrada via `animate-toast-in` (`translate-x` com amortecimento suave).
- **Variantes:** `default`, `success`, `error`, `warning`, `info`.

#### 20. Tooltip
- **Finalidade:** Dica textual acionada por foco ou hover.
- **Estilo:** Balão escuro de alto contraste (`bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900`), raio de 6px, tipografia 12px com sombra profunda.
- **Posições Suportadas:** `top`, `bottom`, `left`, `right`. Delay configurável (padrão: 200ms).

---

### 5.4 Componentes de Sobreposição (`Overlay`)

#### 21. Dialog (Modal)
- **Finalidade:** Janela de diálogo com bloqueio de contexto.
- **Acessibilidade:** Backdrop desfocado `backdrop-blur-sm bg-foreground/50`, captura de foco (focus trap), fechamento por tecla Escape e clique externo, `role="dialog"`, `aria-modal="true"`.
- **Tamanhos:** `sm` (384px), `md` (512px), `lg` (672px), `xl` (896px).

#### 22. Dropdown
- **Finalidade:** Menu suspenso de ações acionado por botão.
- **Estilo:** Painel flutuante `z-[100] min-w-[180px] p-1.5 rounded-xl bg-background border border-border shadow-xl`.
- **Interação:** Animação `scale(0.96) -> scale(1)` com opacidade suave. Suporte a ícones mapeados, itens desabilitados e divisores (`role="separator"`).

#### 23. Tabs & 24. VerticalTabs
- **Tabs (Horizontal):** Linha de botões com indicador inferior de 2px `border-b-2 border-foreground`.
- **VerticalTabs:** Layout em duas colunas para desktop (abas à esquerda, painel à direita). Em telas móveis (`< lg`), converte-se automaticamente em um menu dropdown personalizado ou gaveta inferior (bottom sheet), garantindo ergonomia no toque.

#### 25. Accordion
- **Finalidade:** Lista recolhível de itens para perguntas frequentes ou configurações.
- **Variantes:** `default` (apenas borda inferior divisória) e `card` (cada item como cartão independente `rounded-lg border mb-2`).
- **Animação:** Chevron rotaciona 180° com transição suave de 200ms.

#### 26. ConsentBanner
- **Finalidade:** Banner de consentimento de cookies com integração Google Consent Mode v2.
- **Recursos:** Modos barra inferior (`bottom`) ou superior (`top`), modal de personalização granular por categorias (essencial, análise, marketing) com switches integrados.

---

### 5.5 Componentes Estruturais (`Layout`)

#### 27. Header
- **Finalidade:** Cabeçalho de navegação primário do site.
- **Posições:** `fixed` (fixo no topo), `sticky`, `static`.
- **Formas:**
  - `bar`: Barra contínua de largura total.
  - `floating`: Cápsula flutuante (`rounded-2xl mx-auto max-w-6xl mt-4 bg-background/90 backdrop-blur-xl border border-border/50`).
- **Recursos Avançados:** Barra de progresso de rolagem integrada (topo ou rodapé do cabeçalho), auto-hide ao rolar para baixo e reaparição ao rolar para cima, gaveta de menu mobile acessível por teclado, seletores de tema e idioma.

#### 28. Footer
- **Finalidade:** Rodapé informativo e de navegação secundária.
- **Layouts:** `simple` (linha única), `columns` (2 a 4 colunas de grupos de links), `minimal` (somente copyright), `stacked` (vertical), `centered` (centralizado com tagline e links).
- **Variantes de Fundo:** `default`, `secondary`, `invert`.

#### 29. Separator
- **Finalidade:** Linha divisória fina. Orientações: `horizontal` (`h-px w-full`) ou `vertical` (`h-full w-px`).

---

### 5.6 Componentes de Conteúdo e Primitivas

#### 30. Icon
- **Finalidade:** Wrapper unificado de renderização de ícones SVG.
- **Bibliotecas Embutidas:**
  - Ícones de interface: **Lucide Icons** (`lucide:*`).
  - Marcas, ferramentas e redes sociais: **Simple Icons** (`simple-icons:*`).
- **Tamanhos Padronizados:**
  - `xs`: 12x12px (`w-3 h-3`)
  - `sm`: 16x16px (`w-4 h-4`)
  - `md`: 20x20px (`w-5 h-5`)
  - `lg`: 24x24px (`w-6 h-6`)
  - `xl`: 32x32px (`w-8 h-8`)
- **Espessura de Linha Padrão:** `stroke-width: 2`.

#### 31. CodeBlock
- **Finalidade:** Apresentação de blocos de código com destaque visual.
- **Visual:** Estilo janela com três pontos decorativos (Mac dots), rótulo de nome de arquivo, numeração opcional de linhas e botão de cópia com feedback instantâneo de sucesso ("Copied").

---

### 5.7 Componentes de Marketing e Hero

#### 32. Hero
- **Finalidade:** Seção principal de topo de página.
- **Layouts:** `centered` (conteúdo centralizado em coluna única) e `split` (duas colunas no desktop).
- **Slots Suportados:** `badge`, `title`, `description`, `actions`, `aside`, `bottom`.
- **Efeitos Acopláveis:** `HeroGrid` (grade light mode), `HeroBeam` (feixe dark mode), `showGlow` (bolhas radiais difusas), `fullHeight` (`min-h-[100svh]`).

#### 33. CTA (Call to Action)
- **Finalidade:** Seção de conversão e fechamento.
- **Estilo:** Suporte a variante `.invert-section`, com brilho elíptico radial de fundo (`radial-gradient` a 10% da cor da marca) e slots para logo, título de até 48px, texto de apoio e botões de ação.

#### 34. Logo
- **Finalidade:** Marca visual da aplicação.
- **Comportamento Inteligente:** Renderiza por padrão um monograma estilizado (quadrado preenchido com a cor primária e a primeira letra do site em caixa alta). Se uma imagem for configurada (`branding.logo.image`), substitui automaticamente o monograma preservando as dimensões.

#### 35. NpmCopyButton
- **Finalidade:** Botão interativo para comando de terminal.
- **Visual:** Estilo cápsula escura com ícone de terminal à esquerda, texto do comando monospaçado e ícone de prancheta de cópia à direita.

#### 36. SocialProof
- **Finalidade:** Indicador de confiança através de avatares sobrepostos e texto ("+500 desenvolvedores confiam").

#### 37. TerminalDemo
- **Finalidade:** Simulação realista interativa de digitação em terminal Unix com janela cromada e cores de realce sintático.

---

### 5.8 Padrões Compostos (`Patterns`)

#### 38. FormField
- **Finalidade:** Encapsulamento de campo de formulário com rótulo (`label`), indicação de obrigatoriedade (`*`), mensagem de erro sob `role="alert"` e texto de ajuda (`hint`).

#### 39. SearchInput
- **Finalidade:** Campo de busca rápida com ícone de lupa embutido na esquerda e tipo nativo `type="search"`.

#### 40. PasswordInput
- **Finalidade:** Campo de senha com alternador de visibilidade (ícones de olho aberto / olho riscado) e rótulos acessíveis.

#### 41. StatCard
- **Finalidade:** Card para exibição de métricas numéricas com indicador de tendência (`up` em verde, `down` em vermelho, `neutral` em cinza).

#### 42. EmptyState
- **Finalidade:** Apresentação visual limpa para ausência de dados, com ícone de caixa/inbox de 48px, título semântico, descrição curta e botão de ação secundária.

#### 43. NewsletterForm & 44. ContactForm
- **NewsletterForm:** Formulário de e-mail compacto que se adapta em coluna única no mobile e linha única a partir de `sm`.
- **ContactForm:** Formulário estruturado com campos em grid (nome e e-mail lado a lado, assunto e mensagem de texto).

---

## 6. Estados e Interações

### 6.1 Estados Interativos Universais
- **Hover:**
  - Botões e links: Transição de cor em 150ms (`var(--transition-fast)`).
  - Cards interativos: Elevação de `-2px` no eixo Y e aumento para `--shadow-lg` ou `--shadow-xl`.
  - Ícones direcionais: Setas dentro de classes `.group` transladam `0.25rem` (`translateX(0.25rem)`).
- **Focus-Visible:**
  - Todo elemento focável utiliza contorno consistente: `outline: 2px solid var(--color-ring); outline-offset: 2px;`.
- **Active (Toque / Clique):**
  - Efeito tátil de contração elástica: `active:scale-[0.98]`.
- **Disabled:**
  - Cursor bloqueado e opacidade atenuada: `disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none`.

### 6.2 Sistema de Revelação e Animações de Scroll
A biblioteca implementa um motor de revelação gradual via `IntersectionObserver` que adiciona a classe `.is-visible`:

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(96px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
```

- **Variações Direcionais:** `[data-reveal="down"]` (`translateY(-96px)`), `[data-reveal="left"]` (`translateX(96px)`), `[data-reveal="scale"]` (`scale(0.88)`).
- **Em Telas Móveis (< 1024px):** Eixos horizontais colapsam para `translateY(96px)` para evitar conflitos visuais no scroll vertical.
- **Stagger de Filhos:** Em grades de cartões, `[data-reveal-children]` aplica delays calculados em cascata de 100ms por filho (`--reveal-stagger: 100ms`).
- **Otimização de LCP (Largest Contentful Paint):** No título da seção Hero, a animação atua exclusivamente no `transform` (`hero-rise`), mantendo `opacity: 1` desde o primeiro frame para pontuação máxima no Google Lighthouse.

### 6.3 Respeito à Preferência de Movimento Reduzido
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal], [data-reveal-children] > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## 7. Padrões de UI/UX

### 7.1 Sistema de Alternância de Tema em 3 Estados
A interface implementa o padrão industrial de preferência de tema:
1. `system`: O tema segue em tempo real o modo do sistema operacional (`prefers-color-scheme`).
2. `light`: Força o tema claro.
3. `dark`: Força o tema escuro.

O estado é salvo em `localStorage.getItem('theme')`. Um script síncrono no `<head>` avalia o valor antes da renderização do `<body>`, garantindo **zero Flash of Unstyled Theme (FOUC)**.

### 7.2 Seletor Dinâmico de Paletas de Cor
Além do modo claro/escuro, a aplicação oferece a escolha entre as 12 paletas cromáticas. A escolha é salva em `sessionStorage.getItem('color-theme')` e reflete imediatamente no atributo `html[data-theme="<cor>"]`.

### 7.3 Botão "Voltar ao Topo" com Progresso de Leitura SVG
Posicionado no canto inferior direito (`fixed bottom-6 right-6 z-50`):
- Surge suavemente após a rolagem ultrapassar `400px`.
- Possui anel circular SVG (`r=21`, circunferência `131.95`) cujo `stroke-dashoffset` diminui conforme a porcentagem de leitura da página.
- Leitura do scroll realizada de forma desacoplada via `requestAnimationFrame` sem bloqueio da thread principal.

### 7.4 Efeitos Visuais Arquiteturais
- **`HeroGrid` (Light Mode):** Linhas de grade neutras de 56px (`color-mix(var(--color-foreground) 7%, transparent)`) com máscara radial suave de topo e foco luminoso na cor da marca no centro.
- **`HeroBeam` (Dark Mode):** Linhas de grade matizadas de 56px com feixe cônico superior que simula iluminação emanando da base do cabeçalho fixo.
- **`StackMarquee`:** Letreiro infinito de rolagem horizontal dupla com desaceleração ao passar o cursor (`pauseOnHover`) e parada total sob `prefers-reduced-motion`.

---

## 8. Acessibilidade (A11y)

### 8.1 Padrões de Conformidade WCAG
- **Contraste de Texto:** Todo texto sobre fundo atende ou supera WCAG AA (4.5:1). Textos informativos de status utilizam tokens `-strong` com contrastes acima de 6:1.
- **Área Mínima de Toque:** Todos os controles interativos possuem altura mínima de 36px a 48px (`h-9` a `h-12`) e padding adequado para operação em telas de toque.
- **Affordance com Cursor Pointer:** Todos os elementos acionáveis recebem cursor apropriado:
  ```css
  button:not(:disabled), [role='button']:not([aria-disabled='true']), summary {
    cursor: pointer;
  }
  ```

### 8.2 Navegação por Teclado e Foco
- **Link de Salto Direto (Skip to Content):**
  Localizado no topo do documento HTML, invisível até receber foco via tecla Tab:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
    Pular para o conteúdo principal
  </a>
  ```
- **Compensação de Scroll em Âncoras:** `html { scroll-padding-top: 5rem; }` garante que links internos (como sumários e notas de rodapé) não fiquem escondidos sob o cabeçalho fixo.
- **Fechamento por Teclado:** Diálogos, menus dropdown e gavetas de navegação móvel possuem listener dedicado para fechamento imediato ao pressionar a tecla `Escape`.

---

## 9. Diretrizes de Reutilização em Novos Projetos

### 9.1 Regras Essenciais (Inegociáveis)
1. **Preservar a Semântica de Tokens:** Não utilize códigos hexadecimais brutos nos componentes. Declare ou consuma variáveis CSS (`var(--background)`, `var(--primary)`, etc.).
2. **Manter as Escalas em OKLCH:** Se criar novos temas de cores, utilize o modelo OKLCH para garantir que a luminosidade calculada coincida com a percepção humana.
3. **Respeitar o Focus Ring:** Não remova ou desative `focus-visible`. O anel de 2px com offset é requisito de acessibilidade fundamental.
4. **Respeitar Preferências de Movimento:** Qualquer animação CSS ou transição dinâmica deve obrigatoriamente possuir bloco de desligamento em `@media (prefers-reduced-motion: reduce)`.

### 9.2 Características Opcionais
- O efeito de rastro do cursor (`CursorTrail`) e a faixa de ruído visual (`LetterGlitch`) são decorativos e podem ser desativados sem qualquer prejuízo à experiência de navegação.
- O seletor de 12 temas pode ser simplificado para uma paleta única fixa nos projetos que possuam identidade visual institucional exclusiva.

### 9.3 Guia Rápido de Reprodução dos Tokens em CSS Puro
Para adotar este design system em qualquer projeto, inclua a seguinte base mínima no seu arquivo global de estilos:

```css
:root {
  /* Escala Neutra */
  --gray-0: oklch(100% 0 0);
  --gray-100: oklch(96.5% 0 0);
  --gray-200: oklch(91.3% 0 0);
  --gray-300: oklch(85.8% 0 0);
  --gray-600: oklch(38% 0 0);
  --gray-700: oklch(32% 0 0);
  --gray-900: oklch(19.4% 0 0);

  /* Tema Studio (Indigo / Blue) */
  --brand-400: oklch(67.7% 0.175 255);
  --brand-500: oklch(62.1% 0.207 255);
  --brand-600: oklch(53.2% 0.19 255);
  --brand-700: oklch(45.5% 0.16 255);

  /* Mapeamento Semântico Light */
  --background: var(--gray-0);
  --background-secondary: oklch(97.5% 0.010 255);
  --foreground: var(--gray-900);
  --foreground-secondary: var(--gray-700);
  --foreground-muted: var(--gray-600);
  --border: var(--gray-200);
  --card: var(--gray-0);
  --ring: var(--brand-600);

  /* Raios de Borda */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Tipografia */
  --font-sans: 'Manrope', system-ui, sans-serif;
  --font-display: 'Outfit', var(--font-sans);
  --font-mono: 'JetBrains Mono', monospace;
}

html.dark {
  --background: oklch(10% 0.015 255);
  --background-secondary: oklch(15.5% 0.012 255);
  --foreground: oklch(91% 0.008 255);
  --foreground-secondary: oklch(82% 0.012 255);
  --foreground-muted: oklch(68% 0.01 255);
  --border: oklch(20% 0.012 255);
  --card: oklch(15.5% 0.012 255);
  --ring: var(--brand-400);
}
```

### 9.4 Exemplo de Implementação dos Componentes Centrais

#### Botão Primário (HTML + Classes Utilitárias)
```html
<button class="inline-flex items-center justify-center gap-2 rounded-md font-medium h-10 px-4 text-sm bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  <span>Confirmar Ação</span>
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</button>
```

#### Card com Elevação e Hover
```html
<div class="rounded-xl bg-card border border-brand-500/40 p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-500">
  <h3 class="font-display text-lg font-semibold text-foreground mb-2">Título do Cartão</h3>
  <p class="text-sm text-foreground-secondary leading-relaxed">
    Conteúdo descritivo formatado com o padrão visual sofisticado do design system.
  </p>
</div>
```

---

## 10. Referências aos Arquivos de Origem

Para conferência de implementação, propriedades e variantes completas no repositório Astro-Rocket:

| Recurso | Caminho Relativo |
| :--- | :--- |
| **Estilos Globais e Variantes CSS** | `src/styles/global.css` |
| **Tokens de Cores Primitivas e Status** | `src/styles/tokens/primitives.css` |
| **Tokens de Tipografia Fluida** | `src/styles/tokens/typography.css` |
| **Tokens de Espaçamento Base** | `src/styles/tokens/spacing.css` |
| **Catálogo Central dos 12 Temas** | `src/styles/tokens/colors.css` |
| **Definições Individuais de Temas** | `src/styles/themes/*.css` (`blue.css`, `orange.css`, etc.) |
| **Lista de Cores e Interface do Seletor**| `src/lib/themes.ts` |
| **Catálogo JSON de Componentes** | `component-registry.json` |
| **Layout Base e Scripts de Scroll/A11y** | `src/layouts/BaseLayout.astro` |
| **Layout de Páginas Padrão** | `src/layouts/PageLayout.astro` |
| **Variantes do Botão** | `src/components/ui/form/Button/button.variants.ts` |
| **Componente de Botão (Astro)** | `src/components/ui/form/Button/Button.astro` |
| **Componente de Botão (React)** | `src/components/ui/form/Button/Button.tsx` |
| **Variantes de Cartão** | `src/components/ui/data-display/Card/card.variants.ts` |
| **Variantes de Badges** | `src/components/ui/data-display/Badge/badge.variants.ts` |
| **Variantes de Inputs** | `src/components/ui/form/Input/input.variants.ts` |
| **Componente de Ícone Unificado** | `src/components/ui/primitives/Icon/Icon.astro` |
| **Componente de Seção Hero** | `src/components/hero/Hero.astro` |
| **Efeitos Visuais de Fundo** | `src/components/effects/HeroGrid.astro`, `HeroBeam.astro` |
| **Vitrine Completa dos 44 Componentes**| `src/pages/components.astro` |
