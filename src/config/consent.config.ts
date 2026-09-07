
import type { ConsentConfig } from '@/lib/consent.types';

const consentConfig: ConsentConfig = {
  /** Incrementar para exigir um novo consentimento quando as categorias forem alteradas */
  version: 1,

  /** 'consent_mode_v2' = scripts carregam com padrões de negação e enviam sinais sem cookies
   *  'strict' = scripts ficam totalmente bloqueados até que o consentimento seja concedido */
  mode: 'consent_mode_v2',

  /** Chave do localStorage usada para armazenar as preferências */
  storageKey: 'cookie-consent',

  categories: {
    necessary: {
      label: 'Necessários',
      description: 'Cookies essenciais necessários para o funcionamento do site. Eles não podem ser desativados.',
      required: true,
      defaultEnabled: true,
      gcmTypes: ['security_storage'],
    },
    analytics: {
      label: 'Análise',
      description: 'Ajudam a entender como os visitantes interagem com o site por meio da coleta de dados anônimos de uso.',
      required: false,
      defaultEnabled: false,
      gcmTypes: ['analytics_storage'],
    },
    marketing: {
      label: 'Marketing',
      description: 'Utilizados para exibir anúncios relevantes e acompanhar o desempenho de campanhas publicitárias em diferentes sites.',
      required: false,
      defaultEnabled: false,
      gcmTypes: ['ad_storage', 'ad_user_data', 'ad_personalization'],
    },
    preferences: {
      label: 'Preferências',
      description: 'Permitem que o site se lembre das escolhas feitas por você, como idioma ou região.',
      required: false,
      defaultEnabled: false,
      gcmTypes: ['functionality_storage', 'personalization_storage'],
    },
  },

  ui: {
    heading: 'Preferências de cookies',
    description: 'Utilizamos cookies para melhorar sua experiência de navegação, oferecer conteúdo personalizado e analisar nosso tráfego.',
    acceptAll: 'Aceitar todos',
    declineAll: 'Recusar todos',
    customize: 'Personalizar',
    savePreferences: 'Salvar preferências',
    settingsHeading: 'Configurações de privacidade',
    alwaysOnLabel: 'Sempre ativo',
    privacyPolicyLabel: 'Política de privacidade',
    bannerAriaLabel: 'Consentimento de cookies',
    reopenerAriaLabel: 'Abrir configurações de cookies',
  },

  /** Milissegundos antes de o banner aparecer */
  showDelay: 500,
};

export default consentConfig;
