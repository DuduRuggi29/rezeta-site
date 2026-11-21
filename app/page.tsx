import { AiChatDemo } from "@/components/rezeta/ai-chat";
import { WhatsappLink } from "@/components/whatsapp-link";
import { Carousel, Faq, HeroForm, HeroVideo, MethodPath, PageEffects, PainPicker, PhotoStack, PlanPicker, StickyCta, Testimonials } from "@/components/rezeta/client";
import { faq, serviceTabs, testimonials } from "@/lib/content";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo-path";
import { site } from "@/lib/site";

const RIBBON = ["Mais pedidos de segunda a domingo", "Menos taxa de aplicativo", "Ticket médio maior", "Atendimento com IA", "Seus clientes sem iFood no meio", "Venda para o seu cliente sempre que quiser", "Mais dinheiro no bolso no fim do mês"];

const PHOTOS = [
  { src: "/sobre/equipe-google.jpg", width: 778, height: 926, caption: "Nossa equipe na sede do Google", alt: "Equipe da REZETA com crachás de convidados na sede do Google" },
  { src: "/sobre/gestor-google.jpg", width: 1000, height: 998, caption: "Entre os 20 gestores convidados", alt: "Gestor de tráfego da REZETA ao lado do G colorido do Google" },
  { src: "/sobre/sede-google.jpg", width: 782, height: 834, caption: "Por dentro do escritório do Google", alt: "Recepção do escritório do Google com o logotipo na parede" },
];

const RECOGNITION = [
  { big: "20", text: "gestores de tráfego convidados à sede do Google, e a REZETA estava entre eles" },
  { big: "1:1", text: "gerente de contas do Google acompanhando as campanhas dos nossos clientes" },
  { big: "★", text: "premiações, presentes e convites para eventos do Google" },
];

const PILLARS: React.ReactNode[] = [
  "Tráfego pago com método validado no nosso próprio delivery",
  "Cardápio personalizado que aumenta o ticket médio",
  "Atendimento com IA: todo cliente respondido na hora",
  <>
    Os dados dos clientes ficam com você, <mark className="rounded bg-black px-1.5 text-yellow [box-decoration-break:clone]">sem aplicativo como o iFood no meio</mark>. A vantagem: você vende para esse cliente <u className="decoration-2 underline-offset-2">sempre que quiser</u>
  </>,
];

const PAINS = [
  { title: "Poucos pedidos na semana", question: "Seu delivery vende bem no fim de semana, mas de segunda a quinta fica parado?" },
  { title: "Faturamento imprevisível", question: "Você nunca sabe quantos pedidos vai receber amanhã e fica dependendo da sorte?" },
  { title: "Dependência do iFood", question: "Você vende, mas uma parte do seu lucro fica nas taxas dos aplicativos?" },
  { title: "Concorrente vendendo mais", question: "Tem concorrente com produto inferior ao seu, mas que recebe muito mais pedidos?" },
  { title: "Cliente que não volta", question: "Você conquista um cliente, ele compra uma vez e depois desaparece?" },
  { title: "Delivery desconhecido", question: "Seu restaurante é bom, mas as pessoas do seu próprio bairro nem sabem que ele existe?" },
  { title: "Pouco lucro", question: "Você trabalha o mês inteiro, vende bastante e quase não vê dinheiro sobrando?" },
  { title: "Cozinha parada", question: "Sua cozinha fica parada em alguns horários, mesmo com a equipe disponível?" },
  { title: "Promoção que não funciona", question: "Você dá desconto, sacrifica a margem e mesmo assim os pedidos não aumentam?" },
  { title: "Instagram que não vende", question: "Você posta fotos e vídeos dos seus pratos, mas isso quase nunca vira pedido?" },
];

const METHOD = [
  { title: "Tráfego pago validado", text: "Anúncios no Google e no Meta com o mesmo método que usamos no nosso próprio delivery. Testado com o nosso dinheiro antes de usar o seu." },
  { title: "Cardápio que vende mais", text: "Cardápio personalizado que oferece adicionais, bebidas e sobremesas ao longo do pedido. O ticket médio sobe sem gastar mais com anúncio." },
  { title: "Atendimento com IA", text: "A inteligência artificial responde todo cliente na hora, a qualquer horário. Ninguém espera e nenhum pedido se perde." },
  { title: "Seus clientes, sem iFood no meio", text: "Nome, telefone e histórico de cada cliente ficam com você, sem aplicativo como o iFood no meio. A vantagem: você vende para esse cliente sempre que quiser." },
  { title: "Cliente que compra sempre", text: "É só mandar uma oferta no WhatsApp para ele pedir de novo, principalmente nos dias fracos. No iFood, você não consegue fazer isso." },
  { title: "Dinheiro no bolso", text: "Sem comissão de aplicativo em cada pedido, a margem fica com você no fim do mês." },
];

const COMPARE = [
  { label: "Taxa por pedido", app: "Comissão do aplicativo em cada venda", us: "Pedido no seu canal, sem comissão" },
  { label: "Dados do cliente", app: "Ficam com o iFood", us: "Ficam com você, sem iFood no meio" },
  { label: "Vender de novo para o cliente", app: "Você não tem o contato dele", us: "Você vende para ele sempre que quiser" },
  { label: "Concorrência", app: "Seu prato ao lado de dezenas de concorrentes", us: "O cliente vê só o seu cardápio" },
  { label: "Ticket médio", app: "Cardápio padrão do aplicativo", us: "Cardápio que oferece adicionais no pedido" },
];

const PLANS = [
  {
    phase: "Quero mais pedidos durante a semana",
    name: "Pedidos",
    text: "Para quem vende bem no fim de semana, mas quer a cozinha cheia de segunda a quinta.",
    items: ["Tráfego pago com método validado", "Google Maps e Perfil da Empresa", "Cardápio personalizado", "Relatório de custo por pedido"],
  },
  {
    phase: "Quero parar de depender do iFood",
    name: "Delivery Próprio",
    text: "Para quem vende, mas vê parte do lucro ficar nas taxas dos aplicativos.",
    items: ["Tudo do plano Pedidos", "Atendimento com IA no WhatsApp", "Base de clientes com os seus dados", "Campanhas de recompra"],
  },
  {
    phase: "Quero escalar com margem",
    name: "Escala",
    text: "Para quem já vende bem e quer crescer sem perder lucro no caminho.",
    items: ["Tudo do plano Delivery Próprio", "Ofertas para horários de pouco movimento", "Criativos novos toda semana", "Estrategista dedicado ao seu delivery"],
  },
];

const ROLES = ["Gestor de tráfego", "Especialista em cardápio", "Designer", "Especialista em IA", "Analista de dados", "Estrategista de delivery"];

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label="REZETA" className={className} fill="currentColor">
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}

function Ribbon({ reverse = false, className }: { reverse?: boolean; className: string }) {
  const items = [...RIBBON, ...RIBBON, ...RIBBON, ...RIBBON];
  return (
    <div className={`absolute left-[-5vw] w-[110vw] overflow-hidden py-3 sm:py-4 ${className}`}>
      <ul className={`m-0 flex w-max list-none gap-8 p-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <li key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-extrabold uppercase tracking-wide sm:text-lg">
            {t}
            <span className="size-2 rounded-full bg-current" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="m-0 text-sm font-extrabold uppercase tracking-wider text-yellow">{children}</p>;
}

const h2 = "mt-4 text-balance text-[1.7rem] font-normal uppercase leading-[1.14] text-white sm:text-[2.6rem]";
const b = "font-extrabold";

function JsonLd() {
  const id = (k: string) => `${site.url}/#${k}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": id("empresa"),
        name: site.name,
        slogan: "Marketing para delivery: mais pedidos, menos custo e mais dinheiro no bolso",
        url: site.url,
        logo: `${site.url}/favicon.svg`,
        image: `${site.url}/og.png`,
        description: "Agência de marketing especializada em delivery: tráfego pago com método validado, cardápio personalizado que aumenta o ticket médio, atendimento com inteligência artificial e base de clientes própria, sem depender das taxas dos aplicativos.",
        telephone: `+${site.whatsapp}`,
        email: site.email,
        priceRange: "$$",
        address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "BR" },
        areaServed: { "@type": "Country", name: site.areaServed },
        knowsAbout: ["Marketing para delivery", "Delivery próprio", "Marketing para restaurantes", "Marketing para hamburgueria", "Marketing para pizzaria", "Cardápio digital", "Atendimento com inteligência artificial", "Tráfego pago", "Google Ads", "Meta Ads", "Vendas pelo WhatsApp"],
        sameAs: [site.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Marketing para delivery",
          itemListElement: serviceTabs.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.tab, description: s.text, provider: { "@id": id("empresa") } } })),
        },
      },
      { "@type": "WebSite", "@id": id("site"), url: site.url, name: site.name, inLanguage: "pt-BR", publisher: { "@id": id("empresa") } },
      { "@type": "FAQPage", "@id": id("faq"), mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const HEADLINE: [string, boolean][] = [
  ["O", false], ["método", false], ["é", false], ["simples:", false], ["seu", false], ["delivery", false], ["fatura", false], ["mais,", false], ["com", false], ["menos", false], ["custo", false], ["e", false],
  ["mais", true], ["dinheiro", true], ["no", true], ["bolso", true], ["no", true], ["fim", true], ["do", true], ["mês", true],
];

export default function Home() {
  return (
    <>
      <JsonLd />
      <PageEffects />

      <main id="topo" className="overflow-x-clip">
        {/* TOPO */}
        <section aria-labelledby="titulo" className="hero-bg relative animate-bg-slide text-black">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 pb-32 pt-10 sm:px-8 sm:pb-40 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pt-20">
            <div>
              <Logo className="h-7 w-auto sm:h-9" />
              <p className="m-0 mt-6 text-sm font-bold">Marketing especializado em delivery</p>
              <h1 id="titulo" className="mt-3 text-[1.75rem] font-normal uppercase leading-[1.14] min-[390px]:text-[1.95rem] sm:text-[2.6rem]">
                {HEADLINE.map(([w, strong], i) => (
                  <span key={i}>
                    <span className={`word ${strong ? "font-black" : ""}`} style={{ animationDelay: `${i * 45}ms` }}>{w}</span>{" "}
                  </span>
                ))}
              </h1>
              <div className="mt-7">
                <HeroVideo src="/video/rezeta.mp4" poster="/video/rezeta-poster.jpg" />
              </div>
              <p className="m-0 mt-6 max-w-xl text-lg font-medium leading-snug">
                Não queremos impressionar você com marketing bonito. <b className="font-extrabold">Queremos pedidos chegando no seu delivery todos os dias.</b>
              </p>
              <ul className="m-0 mt-5 grid list-none gap-2.5 p-0 font-bold">
                {PILLARS.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-black text-yellow">
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
                    </span>
                    <span className="min-w-0">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <WhatsappLink placement="hero" variant="black" size="lg" icon={false}>Quero mais pedidos</WhatsappLink>
              </div>
            </div>
            <HeroForm />
          </div>
        </section>

        {/* FAIXAS CRUZADAS */}
        <div aria-hidden="true" className="relative z-10 -mt-20 h-32 sm:-mt-24 sm:h-44">
          <Ribbon className="top-8 rotate-[3deg] bg-black text-white sm:top-12" />
          <Ribbon reverse className="top-8 -rotate-[2deg] bg-white text-black shadow-xl sm:top-12" />
        </div>

        {/* DORES */}
        <section id="para-quem" aria-labelledby="dores" className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-8 sm:pb-28">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Para donos de delivery</Eyebrow>
            <h2 id="dores" className={h2}>
              Alguma dessas frases <b className="hl">parece com o seu delivery?</b>
            </h2>
          </div>
          <div data-reveal className="mt-10">
            <PainPicker pains={PAINS} />
          </div>
        </section>

        {/* QUEM SOMOS — reconhecimento do Google */}
        <section id="quem-somos" aria-labelledby="quem" className="overflow-hidden bg-white py-20 text-black sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div data-reveal="left">
              <p className="m-0 text-sm font-extrabold uppercase tracking-wider">Quem somos</p>
              <h2 id="quem" className="mt-4 text-balance text-[1.7rem] font-normal uppercase leading-[1.14] sm:text-[2.6rem]">
                Uma das agências <b className="font-black">reconhecidas pelo Google</b>
              </h2>
              <p className="m-0 mt-5 text-[17px] leading-relaxed text-black/75">
                Quando o Google selecionou <b className="font-bold text-black">apenas 20 gestores de tráfego</b> para uma visita à sua sede, a REZETA estava entre eles. Fomos recebidos por gerentes do Google, ganhamos premiações e presentes, e seguimos sendo convidados para eventos.
              </p>
              <p className="m-0 mt-4 text-[17px] leading-relaxed text-black/75">
                Esse reconhecimento vira vantagem para você: os nossos clientes contam com um <b className="font-bold text-black">gerente de contas do Google</b> acompanhando as campanhas. E não é só teoria: o método que aplicamos no seu delivery é validado todos os dias no <b className="font-bold text-black">nosso próprio delivery</b>.
              </p>
              <ul className="m-0 mt-8 grid list-none gap-3 p-0">
                {RECOGNITION.map((r, i) => (
                  <li key={r.big} data-reveal className="flex items-center gap-4 rounded-xl border-2 border-black/10 p-3 pr-4 transition hover:border-yellow hover:bg-yellow/15" style={{ transitionDelay: `${i * 90}ms` }}>
                    <span className="grid h-14 min-w-14 place-items-center rounded-lg bg-black px-2 text-xl font-black text-yellow">{r.big}</span>
                    <span className="text-[15px] font-semibold leading-snug">{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="zoom">
              <PhotoStack photos={PHOTOS} />
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" aria-labelledby="dep" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
          <div data-reveal className="text-center">
            <Eyebrow>Depoimentos</Eyebrow>
            <h2 id="dep" className={h2}>Quem parou de depender da sorte <b className="hl">conta como foi</b></h2>
          </div>
          <div data-reveal className="mt-10">
            <Testimonials items={testimonials} />
          </div>
        </section>

        {/* MÉTODO */}
        <section id="metodo" aria-labelledby="met" className="mx-auto max-w-5xl px-4 py-20 sm:px-8 sm:py-28">
          <div data-reveal className="text-center">
            <Eyebrow>O método é simples</Eyebrow>
            <h2 id="met" className={h2}>Faturar mais, com menos custo e <b className="hl">mais dinheiro no bolso</b> no fim do mês</h2>
            <p className="m-0 mt-4 text-white/65">Role a página e veja o caminho de cada pedido.</p>
          </div>
          <div className="mt-12">
            <MethodPath steps={METHOD} />
          </div>
        </section>

        {/* DEMONSTRAÇÃO: IA NO WHATSAPP */}
        <section id="ia" aria-labelledby="ia-titulo" className="border-y border-white/10 bg-[radial-gradient(ellipse_at_top,rgb(255_209_5/.10),transparent_60%)] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Teste agora</Eyebrow>
              <h2 id="ia-titulo" className={h2}>
                Converse com a <b className="hl">IA que atende o seu delivery</b>
              </h2>
              <p className="m-0 mt-4 text-white/65">Faça um pedido como se fosse o seu cliente e veja como ele é atendido na hora.</p>
            </div>
            <div data-reveal className="mt-12">
              <AiChatDemo />
            </div>
          </div>
        </section>

        {/* IFOOD x CANAL PRÓPRIO */}
        <section id="ifood" aria-labelledby="comp" className="mx-auto max-w-5xl px-4 pb-20 sm:px-8 sm:pb-28">
          <div data-reveal className="text-center">
            <Eyebrow>Depender do aplicativo custa caro</Eyebrow>
            <h2 id="comp" className={h2}>No iFood o cliente é do aplicativo. <b className="hl">Com a REZETA, ele é seu</b></h2>
            <p className="mx-auto m-0 mt-4 max-w-2xl text-white/65">Você não precisa sair do iFood. Precisa parar de depender dele.</p>
          </div>
          <div data-reveal className="mt-10 overflow-hidden rounded-2xl border border-white/12">
            <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] bg-panel text-sm font-extrabold uppercase tracking-wider sm:grid">
              <span className="p-4" />
              <span className="p-4 text-white/60">Só no aplicativo</span>
              <span className="bg-yellow p-4 text-black">Delivery próprio com a REZETA</span>
            </div>
            <ul className="m-0 list-none p-0">
              {COMPARE.map((c) => (
                <li key={c.label} className="grid border-t border-white/10 first:border-t-0 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:first:border-t">
                  <span className="bg-panel px-4 pb-1 pt-4 text-sm font-extrabold uppercase tracking-wider text-yellow sm:bg-transparent sm:p-4 sm:text-[15px] sm:normal-case sm:tracking-normal sm:text-white">{c.label}</span>
                  <span className="flex items-start gap-2.5 bg-panel px-4 py-2 text-white/60 sm:bg-transparent sm:p-4">
                    <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black">✕</span>
                    <span><span className="sr-only">Só no aplicativo: </span>{c.app}</span>
                  </span>
                  <span className="flex items-start gap-2.5 bg-yellow px-4 pb-4 pt-2 font-bold text-black sm:p-4">
                    <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-black text-xs font-black text-yellow">✓</span>
                    <span><span className="sr-only">Com a REZETA: </span>{c.us}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* O QUE FAZEMOS */}
        <section id="servicos" aria-labelledby="fazemos" className="mx-auto max-w-5xl px-4 pb-20 sm:px-8 sm:pb-28">
          <div data-reveal className="text-center">
            <Eyebrow>O que fazemos</Eyebrow>
            <h2 id="fazemos" className={h2}>Cinco frentes para o seu delivery <b className="hl">vender mais e pagar menos taxa</b></h2>
          </div>
          <div data-reveal className="mt-10">
            <Carousel count={serviceTabs.length} label="Serviços da REZETA">
              {serviceTabs.map((s) => (
                <article key={s.id} data-slide className="grid w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-white/12 bg-panel md:grid-cols-[1.25fr_1fr]">
                  <div className="p-6 sm:p-10">
                    <h3 className="text-2xl font-extrabold uppercase leading-tight text-white sm:text-[2rem]">
                      {s.a} <span className="block text-yellow">{s.b}</span>
                    </h3>
                    <p className="m-0 mt-4 text-lg font-semibold leading-snug text-white">{s.lead}</p>
                    <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/65">{s.text}</p>
                  </div>
                  <ul aria-hidden="true" className="m-0 flex list-none flex-wrap content-center justify-center gap-2.5 bg-yellow p-6 sm:p-8">
                    {s.bubbles.map((c, i) => (
                      <li key={c} className="animate-float rounded-full bg-black px-4 py-2 text-sm font-bold text-white" style={{ animationDelay: `${i * 0.35}s` }}>{c}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </Carousel>
          </div>
        </section>

        {/* PLANOS */}
        <section id="planos" aria-labelledby="pla" className="mx-auto max-w-5xl px-4 pb-20 sm:px-8 sm:pb-28">
          <div data-reveal>
            <Eyebrow>Planos sob medida</Eyebrow>
            <h2 id="pla" className={h2}>Cada fase do seu delivery <b className="hl">pede um plano diferente</b></h2>
            <p className="m-0 mt-4 max-w-2xl text-white/65">Toque na frase que mais parece com o seu momento.</p>
          </div>
          <div data-reveal className="mt-10">
            <PlanPicker plans={PLANS} />
          </div>
        </section>

        {/* TIME */}
        <section aria-labelledby="time" className="border-y border-white/10 bg-panel py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-2">
            <div data-reveal="left">
              <Eyebrow>Seu time de marketing para delivery</Eyebrow>
              <h2 id="time" className={h2}>Um <b className="hl">time completo</b> sem contratar ninguém</h2>
              <p className="m-0 mt-5 text-[17px] leading-relaxed text-white/70">
                Contratar, treinar e gerenciar especialistas custa caro e toma o seu tempo. Com a REZETA, você tem as pessoas certas trabalhando nos seus pedidos, e continua focado no que faz de melhor: a cozinha.
              </p>
              <div className="mt-8">
                <WhatsappLink placement="time" size="lg" icon={false}>Quero esse time</WhatsappLink>
              </div>
            </div>
            <ul data-reveal="right" className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
              {ROLES.map((r, i) => (
                <li key={r} className="animate-float rounded-xl border border-yellow/50 bg-black px-5 py-4 text-center font-bold text-white" style={{ animationDelay: `${i * 0.5}s` }}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* PERGUNTAS */}
        <section id="faq" aria-labelledby="per" className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.6fr]">
          <div data-reveal="left" className="lg:sticky lg:top-10">
            <h2 id="per" className="text-[1.9rem] font-extrabold uppercase leading-tight text-white sm:text-4xl">Perguntas frequentes</h2>
            <p className="m-0 mt-3 text-white/60">Tudo sobre o marketing para delivery da REZETA, antes de você chamar no WhatsApp.</p>
          </div>
          <Faq items={faq} />
        </section>

        {/* CHAMADA FINAL */}
        <section aria-labelledby="fim" className="px-4 pb-20 sm:px-8 sm:pb-28">
          <div data-reveal="zoom" className="hero-bg mx-auto max-w-6xl animate-bg-slide rounded-2xl px-6 py-14 text-center text-black sm:py-20">
            <h2 id="fim" className="mx-auto max-w-3xl text-balance text-[1.9rem] font-black uppercase leading-[1.1] sm:text-5xl">Chega de depender do iFood e da sorte</h2>
            <p className="mx-auto mb-0 mt-4 max-w-xl text-lg font-medium">O método é simples: mais pedidos, menos custo e mais dinheiro no bolso no fim do mês.</p>
            <div className="mt-8 flex justify-center">
              <WhatsappLink placement="cta_final" variant="black" size="lg" icon={false}>Quero mais pedidos</WhatsappLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 pb-28 pt-10 sm:px-8 md:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <Logo className="h-6 w-auto text-yellow" />
          <a href={site.instagram} target="_blank" rel="noopener" className="text-sm font-semibold text-white transition hover:text-yellow">Instagram</a>
          <p className="m-0 text-sm text-white/50">{new Date().getFullYear()} © {site.name}. Atendimento em todo o Brasil. <a href={`mailto:${site.email}`} className="text-white/80 hover:text-yellow">{site.email}</a></p>
        </div>
      </footer>

      <StickyCta />
    </>
  );
}
