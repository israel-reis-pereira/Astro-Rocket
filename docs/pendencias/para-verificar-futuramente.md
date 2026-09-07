# Pendências técnicas e verificações futuras

## Estado atual

Após a instalação das dependências:

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

Portanto, o projeto está funcional em desenvolvimento.

---

# 1. Erro de build com @astrojs/vercel

## Situação

Durante o `build` ocorreu uma falha dentro do adapter da Vercel:

```text
Stack trace:
  at async Module.symlink (node:internal/fs/promises:1002:10)
  at async copyDependenciesToFunction (...)
  at async astro:build:done (...)
  at async AstroBuilder.build (...)
Command failed with exit code 1.