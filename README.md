# 2Simples — Landing page (Captação e Conversão)

Next.js 15 + TypeScript + Tailwind v4, estrutura shadcn (`components/ui`). Exportação estática (`out/`).

## Rodar
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/ — suba o conteúdo dela em qualquer hospedagem
```

## Antes de publicar (obrigatório)
1. `lib/site.ts`: número do WhatsApp, domínio, e-mail, cidade, Instagram, GTM / Google Ads / Pixel.
2. `lib/content.ts`: troque os **depoimentos de exemplo** por depoimentos reais e autorizados
   (e as fotos em `public/avatars/`). Depoimento inventado viola o CDC e as políticas do Google Ads.
3. Google Ads: crie a conversão "Clique no WhatsApp" disparada pelo evento `whatsapp_click`
   do dataLayer (via GTM) — cada CTA envia `cta_placement` para saber qual botão converte mais.

## Como o lead chega no WhatsApp
Todos os CTAs são links reais `wa.me`. UTM / gclid da visita são salvos e anexados ao fim da
mensagem (`[origem: google-ads | campanha | kw:palavra]`), para você saber de qual campanha veio cada conversa.

## Por que `components/ui`
É o caminho padrão do shadcn (`components.json` → `aliases.ui`). Componentes adicionados com
`npx shadcn add ...` caem ali, e o globo de depoimentos segue a mesma convenção.
