import type { GlobeTestimonial } from "@/components/ui/testimonial-globe";

/** Depoimentos de clientes da REZETA (enviados pelo dono da agência). */
export const testimonials: GlobeTestimonial[] = [
  { id: "delivery", quote: "Saí de 35 pedidos por dia no delivery para mais de 80. Colocaram uma IA para responder, melhor que o meu antigo vendedor. Faturo mais, com mais margem, e reduzi funcionário.", name: "Delivery", company: "Cliente REZETA", city: "", lat: 0, lng: 0, image: "", rating: 5 },
  { id: "provedor", quote: "Meus resultados foram para um ROI de 3,6 e uma ótima recorrência. Recomendo muito vocês!", name: "Provedor de internet", company: "Cliente REZETA", city: "", lat: 0, lng: 0, image: "", rating: 5 },
];

/** Frentes de serviço (carrossel "O que fazemos"). */
export const serviceTabs = [
  { id: "trafego", tab: "Tráfego Pago para Delivery", a: "Tráfego Pago", b: "Validado", bubbles: ["Google Ads", "Meta Ads", "Instagram", "Área de entrega", "Peça agora", "Dias fracos"],
    lead: "O mesmo método que usamos no nosso próprio delivery.",
    text: "Anúncios no Google e no Meta para quem está com fome e pronto para pedir, dentro da sua área de entrega. Nada de teste com o seu dinheiro: o método já foi validado com o nosso." },
  { id: "cardapio", tab: "Cardápio que Vende", a: "Cardápio que", b: "Vende Mais", bubbles: ["Adicionais", "Combos", "Bebidas", "Sobremesas", "Ticket médio", "Pedido no WhatsApp"],
    lead: "Cada pedido sai maior, sem gastar mais com anúncio.",
    text: "Cardápio digital personalizado que oferece adicionais, bebidas e sobremesas ao longo do pedido. O cliente compra mais e o seu ticket médio sobe." },
  { id: "ia", tab: "Atendimento com IA", a: "Atendimento", b: "com IA", bubbles: ["Resposta na hora", "24 horas", "Sem fila", "Pedido anotado", "Fim de semana", "Sem pedido perdido"],
    lead: "Todo cliente atendido de imediato. Nenhum pedido perdido.",
    text: "A inteligência artificial responde no WhatsApp na hora, envia o cardápio, tira dúvidas e anota o pedido, inclusive no pico de sexta à noite. Sua equipe acompanha tudo e assume quando quiser." },
  { id: "dados", tab: "Clientes sem iFood", a: "Seus Clientes,", b: "Sem iFood no Meio", bubbles: ["Base de clientes", "Histórico", "Cupom de volta", "Aniversário", "Dias fracos", "Recompra"],
    lead: "Venda para o mesmo cliente sempre que quiser.",
    text: "No iFood, o cliente compra e você nunca mais fala com ele. Aqui, nome, telefone e histórico de cada cliente ficam com você, sem aplicativo no meio. A vantagem: você vende para ele sempre que quiser, com a oferta certa, e enche a cozinha de segunda a quinta." },
  { id: "margem", tab: "Margem no Bolso", a: "Mais Dinheiro", b: "no Bolso", bubbles: ["Sem comissão", "Custo por pedido", "Ticket médio", "Lucro", "Painel", "Relatório"],
    lead: "Menos taxa, mais lucro no fim do mês.",
    text: "Cada pedido que chega pelo seu canal próprio não paga comissão de aplicativo. Você acompanha custo por pedido, ticket médio e lucro em um painel simples." },
];

export const faq = [
  { q: "Para quem é o marketing da REZETA?", a: "A REZETA é uma agência de marketing especializada em delivery: hamburguerias, pizzarias, restaurantes, marmitarias, japonês, açaí e qualquer negócio que vende comida por entrega e quer mais pedidos, com menos custo e mais dinheiro no bolso no fim do mês." },
  { q: "Eu preciso sair do iFood?", a: "Não. Você pode continuar no iFood. O que fazemos é construir o seu canal próprio de pedidos, para que cada vez mais vendas cheguem sem comissão de aplicativo e com os dados do cliente na sua mão." },
  { q: "Como funciona o método da REZETA?", a: "É simples: tráfego pago com um método validado no nosso próprio delivery, cardápio personalizado que aumenta o ticket médio ao longo do pedido e atendimento com inteligência artificial que responde todo cliente na hora. E os dados dos clientes ficam com você, sem aplicativo como o iFood no meio, para você vender para cada um sempre que quiser." },
  { q: "Como o cardápio personalizado aumenta o ticket médio?", a: "Durante o pedido, o cardápio oferece adicionais, bebidas, combos e sobremesas no momento certo. O cliente compra mais em cada pedido, e você fatura mais sem precisar gastar mais com anúncio." },
  { q: "Como funciona o atendimento com inteligência artificial?", a: "A IA responde no WhatsApp na hora, a qualquer horário: envia o cardápio, tira dúvidas e anota o pedido. Ninguém fica esperando no pico e nenhum pedido se perde. Sua equipe acompanha as conversas e assume quando quiser." },
  { q: "Qual a vantagem de ter os clientes sem depender do iFood?", a: "No iFood, o cliente é do aplicativo: você não tem o contato dele e não consegue vender de novo para ele. No seu canal próprio, nome, telefone e histórico de pedidos ficam com você, sem aplicativo no meio. A grande vantagem é poder vender para esse cliente sempre que quiser, com uma oferta no WhatsApp, principalmente nos dias fracos." },
  { q: "Meu delivery só vende bem no fim de semana. Vocês resolvem isso?", a: "Esse é um dos problemas que mais atacamos. Usamos anúncios e ofertas para a sua base de clientes nos dias e horários de pouco movimento, para a cozinha não ficar parada de segunda a quinta." },
  { q: "Em quanto tempo começo a receber mais pedidos?", a: "As campanhas podem gerar pedidos nos primeiros dias. O período de otimização costuma levar de 30 a 90 dias, quando os dados mostram o que traz pedido com margem e o que só gasta verba." },
  { q: "Quanto custa a assessoria da REZETA?", a: "Depende do tamanho da operação e dos canais. Começamos com uma conversa gratuita pelo WhatsApp e apresentamos uma proposta sob medida. A verba de anúncios é paga diretamente ao Google e ao Meta, separada da gestão." },
];
