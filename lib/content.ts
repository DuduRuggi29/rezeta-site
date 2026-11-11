import type { GlobeTestimonial } from "@/components/ui/testimonial-globe";

/**
 * ⚠️ DEPOIMENTOS DE EXEMPLO — substitua por depoimentos REAIS (com autorização do cliente)
 * antes de publicar. Depoimentos inventados violam o CDC e as políticas do Google Ads.
 */
export const testimonials: GlobeTestimonial[] = [
  { id: "rest", quote: "As reservas pelo WhatsApp passaram a chegar todos os dias. Hoje sei quanto custa cada mesa que vem do anúncio.", name: "Cliente Exemplo 1", role: "Proprietário", company: "Restaurante", city: "São Paulo, SP", lat: -23.55, lng: -46.63, image: "/avatars/1.svg", rating: 5 },
  { id: "adv", quote: "Paramos de receber curioso. Os contatos que chegam já sabem o que fazemos e querem marcar a consulta.", name: "Cliente Exemplo 2", role: "Sócio", company: "Escritório de Advocacia", city: "Campinas, SP", lat: -22.9, lng: -47.06, image: "/avatars/2.svg", rating: 5 },
  { id: "med", quote: "A agenda da clínica deixou de depender de indicação. O WhatsApp virou o nosso principal canal de agendamento.", name: "Cliente Exemplo 3", role: "Diretora", company: "Clínica Médica", city: "Belo Horizonte, MG", lat: -19.92, lng: -43.94, image: "/avatars/3.svg", rating: 5 },
  { id: "est", quote: "Anúncio certo, página bonita e resposta rápida. As avaliações viraram procedimento fechado.", name: "Cliente Exemplo 4", role: "Proprietária", company: "Clínica de Estética", city: "Curitiba, PR", lat: -25.43, lng: -49.27, image: "/avatars/4.svg", rating: 5 },
  { id: "rest2", quote: "Aparecemos no Google para quem procura hambúrguer artesanal. O delivery e o salão sentiram a diferença.", name: "Cliente Exemplo 5", role: "Sócio", company: "Hamburgueria", city: "Rio de Janeiro, RJ", lat: -22.91, lng: -43.17, image: "/avatars/5.svg", rating: 5 },
  { id: "est2", quote: "Antes eu impulsionava post. Agora tenho campanha, página e roteiro de atendimento, e sei o que dá lucro.", name: "Cliente Exemplo 6", role: "Proprietária", company: "Estúdio de Estética", city: "Goiânia, GO", lat: -16.68, lng: -49.25, image: "/avatars/6.svg", rating: 5 },
];

/** Os quatro tipos de negócio local em que a REZETA é especialista. */
export const niches = [
  {
    id: "restaurantes",
    name: "Restaurantes",
    short: "Restaurantes e delivery",
    goal: "Mesas cheias, reservas e pedidos todos os dias",
    text: "Anúncios para quem procura onde comer, Perfil da Empresa no Google forte, cardápio que dá vontade de pedir e WhatsApp pronto para reserva e delivery.",
    points: ["Anúncios para quem quer pedir", "Google Maps e avaliações", "Reservas e pedidos no WhatsApp", "Promoções para dias fracos"],
  },
  {
    id: "advocacia",
    name: "Advocacia",
    short: "Escritórios de advocacia",
    goal: "Consultas com quem realmente precisa de um advogado",
    text: "Campanhas na pesquisa do Google para quem já busca a sua área, páginas informativas e um primeiro atendimento no WhatsApp que filtra o caso antes da consulta.",
    points: ["Pesquisa por área de atuação", "Comunicação dentro das regras da OAB", "Triagem do caso no WhatsApp", "Agenda de consultas qualificadas"],
  },
  {
    id: "clinica-medica",
    name: "Clínica médica",
    short: "Clínicas e consultórios",
    goal: "Agenda cheia sem depender de indicação",
    text: "Anúncios por especialidade, página clara sobre atendimento e convênios e um fluxo de agendamento pelo WhatsApp que reduz faltas.",
    points: ["Anúncios por especialidade", "Comunicação dentro das regras do CFM", "Agendamento pelo WhatsApp", "Lembretes que reduzem faltas"],
  },
  {
    id: "estetica",
    name: "Clínica de estética",
    short: "Clínicas de estética",
    goal: "Avaliações que viram procedimentos fechados",
    text: "Campanhas no Instagram e no Google para quem busca o seu procedimento, ofertas de avaliação e um roteiro de atendimento que converte.",
    points: ["Instagram e Google Ads", "Oferta de avaliação que atrai", "Roteiro de venda do procedimento", "Retorno e recompra de clientes"],
  },
];

/** Frentes de serviço (carrossel "O que fazemos"). */
export const serviceTabs = [
  { id: "trafego", tab: "Tráfego Pago", a: "Tráfego", b: "Pago", bubbles: ["Google Ads", "Meta Ads", "Instagram", "YouTube", "Pesquisa", "Maps"],
    lead: "Anúncio para quem está pronto para comprar.",
    text: "Campanhas no Google e no Meta segmentadas pela intenção de compra. A internet leva o seu negócio a muito mais gente do que a indicação, e o seu anúncio aparece para quem pode virar cliente de verdade, não para curioso." },
  { id: "maps", tab: "Google Maps", a: "Google Maps e", b: "Perfil da Empresa", bubbles: ["Perfil da Empresa", "Avaliações", "Fotos", "Horários", "Rotas", "Ligações"],
    lead: "Seja encontrado por quem já procura o que você vende.",
    text: "Otimizamos o seu Perfil da Empresa no Google com fotos, categorias, horários e uma rotina para conquistar avaliações, para você aparecer melhor no Maps e na busca do Google." },
  { id: "lp", tab: "Páginas & Copy", a: "Páginas que", b: "Vendem", bubbles: ["Copy", "Oferta", "Mobile", "SEO", "Velocidade", "Prova social"],
    lead: "A página certa filtra o curioso e convence o cliente.",
    text: "Landing pages rápidas e persuasivas, feitas para o celular, com a oferta clara e o botão do WhatsApp sempre à mão." },
  { id: "whatsapp", tab: "Vendas no WhatsApp", a: "Vendas no", b: "WhatsApp", bubbles: ["Roteiro", "Agendamento", "Follow-up", "CRM", "Resposta rápida", "Lembretes"],
    lead: "É no WhatsApp que o contato vira cliente. Ou vira prejuízo.",
    text: "Mensagem de entrada, roteiro de atendimento, agendamento, lembretes e follow-up para a sua equipe responder rápido e fechar mais." },
  { id: "dados", tab: "Dados & Margem", a: "Dados e", b: "Margem", bubbles: ["GA4", "Tag Manager", "Pixel", "Conversões", "Painel", "Custo por cliente"],
    lead: "Você sabe quanto custa cada cliente e quanto sobra.",
    text: "Rastreamos do anúncio até a conversa no WhatsApp. Você acompanha custo por cliente, ticket e retorno em um painel simples." },
];

export const faq = [
  { q: "Para quais negócios a REZETA trabalha?", a: "Somos uma agência de marketing e assessoria para negócios locais que querem vender pelo WhatsApp de forma rápida. Se o seu negócio vende pelo WhatsApp ou presencialmente, provavelmente podemos ajudar." },
  { q: "Qual é o resultado que a REZETA entrega?", a: "O nosso resultado é você vender mais. Não medimos sucesso por curtidas ou volume de contatos, e sim por clientes atendidos, custo por cliente e margem. Unimos anúncios no Google e no Meta, Google Maps, página e atendimento no WhatsApp em um só sistema de captação e conversão." },
  { q: "Como funciona o marketing para negócios locais?", a: "Os anúncios aparecem para pessoas que já procuram o que você oferece, muito além de quem passa na frente do seu negócio: esse é o poder da internet. Junto disso, fortalecemos o seu Perfil da Empresa no Google e levamos esse cliente direto para o seu WhatsApp." },
  { q: "Vocês fazem anúncios para advogados e médicos dentro das regras?", a: "Sim. A publicidade de advogados segue as regras da OAB e a de médicos segue as do CFM. Criamos campanhas e textos informativos, sem promessa de resultado, respeitando essas normas." },
  { q: "Por que eu recebo contatos caros e desqualificados hoje?", a: "Normalmente porque a campanha alcança gente sem intenção de compra, e a página não filtra curiosos. Corrigimos a segmentação, a oferta e a página para que o contato chegue pronto para agendar ou comprar." },
  { q: "Em quanto tempo eu começo a vender mais?", a: "As campanhas podem gerar contatos nos primeiros dias. O período de otimização costuma levar de 30 a 90 dias, quando os dados mostram o que traz cliente com margem e o que só gasta verba." },
  { q: "Quanto custa a assessoria de marketing da REZETA?", a: "Depende dos canais e do tamanho da operação. Começamos com uma conversa gratuita pelo WhatsApp e apresentamos uma proposta sob medida. A verba de anúncios é paga diretamente ao Google e ao Meta, separada da gestão." },
  { q: "A REZETA atende negócios de qualquer cidade?", a: "Sim. O atendimento é online, e as campanhas levam o seu negócio a clientes muito além da vizinhança, onde quer que eles estejam." },
];
