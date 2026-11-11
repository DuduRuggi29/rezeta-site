/**
 * ⚙️  CONFIGURAÇÃO CENTRAL DA LANDING PAGE — edite aqui antes de publicar.
 * Tudo que for marcado com TODO precisa ser trocado pelos dados reais da REZETA.
 */
export const site = {
  name: "REZETA",
  tagline: "Captação e Conversão",
  legalName: "REZETA Captação e Conversão", // TODO: razão social, se quiser exibir
  url: "https://www.rezeta.com.br", // TODO: domínio final (sem barra no fim)
  locale: "pt_BR",

  // WhatsApp: DDI + DDD + número, só dígitos. Ex.: 5511987654321
  whatsapp: "5521988175519",
  whatsappDisplay: "(21) 98817-5519",
  whatsappMessage:
    "Olá, equipe REZETA! Vim pelo site. Tenho um negócio local e quero vender mais.",

  email: "contato@rezeta.com.br", // TODO
  city: "São Paulo", // TODO: cidade-sede (ajuda no SEO local)
  region: "SP",
  areaServed: "Brasil",
  instagram: "https://www.instagram.com/rezeta", // TODO

  /**
   * Garantia exibida na página (dias). TODO: só mantenha se a REZETA realmente oferece
   * devolução — garantia anunciada vira obrigação legal (CDC). Use 0 para esconder a seção.
   */
  guaranteeDays: 30,

  // Rastreamento — deixe vazio para desativar.
  gtmId: "", // TODO: ex. "GTM-XXXXXXX" (recomendado: dispare a conversão do Google Ads pelo GTM)
  googleAdsId: "", // ex. "AW-123456789" (só se NÃO usar GTM)
  googleAdsWhatsappLabel: "", // label da conversão "Clique no WhatsApp"
  metaPixelId: "", // ex. "123456789012345"
} as const;

export function whatsappHref(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
