/** * Slugs canônicos para páginas estáticas. * * Esta é uma configuração de URL, não um texto de interface traduzido. Páginas * sem uma entrada para um locale mantêm sua page key como slug. 
 * Atualizei o nome da pasta src\pages\projects -> src\pages\projetos
*/

export type PageKey = string;
export type PageSlugMap = Record<PageKey, Record<string, string>>;

export const pageSlugs: PageSlugMap = {
  home: { 'pt-br': '', en: '', },
  services: { 'pt-br': 'servicos', en: 'services', },
  projects: { 'pt-br': 'projetos', en: 'projects', },
  blog: { 'pt-br': 'blog', en: 'blog', },
  about: { 'pt-br': 'sobre', en: 'about', },
  contact: { 'pt-br': 'contato', en: 'contact', },
};
