# Pendências técnicas e verificações futuras

## Estado atual

Após a instalação das dependências e das primeiras validações:

- `pnpm install` concluído com sucesso.
- `pnpm check` concluído com:
  - 0 erros
  - 0 warnings
  - 9 hints
- `pnpm dev` iniciou o Astro normalmente.
- A aplicação respondeu `200` nas principais rotas:
  - `/`
  - `/contact`
  - `/blog`
  - `/projects`
  - `/services`
  - `/about`
- O `manifest.webmanifest` também respondeu normalmente.
- `pnpm build` concluiu a compilação das páginas, mas falhou posteriormente no hook do adapter da Vercel.
- `pnpm verify` confirmou a geração das páginas, mas apontou arquivos de identidade/compartilhamento ausentes.

Portanto, **o projeto está funcional em desenvolvimento**, mas ainda existem pontos de build e geração de assets que precisam ser investigados.

---

# 1. Erro de build com `@astrojs/vercel`

## Situação

Durante o `build`, a compilação da aplicação foi concluída, mas ocorreu uma falha dentro do adapter da Vercel ao tentar criar um symlink de dependência:

```text
[@astrojs/vercel] Bundling function ..\..\..\..\dist\server\entry.mjs
[@astrojs/vercel] An unhandled error occurred while running the "astro:build:done" hook
EPERM: operation not permitted, symlink '.pnpm\clsx\@2.1.1\node_modules\clsx' -> '...\Astro-Rocket\.vercel\output\functions\_render.func\node_modules\clsx'
Command failed with exit code 1