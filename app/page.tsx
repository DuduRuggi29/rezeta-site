import { WhatsappLink } from "@/components/whatsapp-link";
import { Carousel, Faq, HeroVideo, MethodPath, PageEffects, PhotoStack, PlanPicker, StickyCta, Testimonials } from "@/components/rezeta/client";
import { faq, serviceTabs, testimonials } from "@/lib/content";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo-path";
import { site } from "@/lib/site";

const RIBBON = ["Leads qualificados", "Vendas no WhatsApp", "Captação e conversão", "O nosso resultado é você vender mais", "Chega de faturamento sem margem"];

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

const METHOD = [
  { title: "Intenção", text: "Mapeamos quem procura o que você vende, onde quer que esteja, e o que faz essa pessoa comprar." },
  { title: "Anúncio", text: "Google Ads e Meta Ads com a mensagem certa para atrair comprador, não curioso." },
  { title: "Página", text: "Uma landing page rápida que explica a oferta e filtra quem não tem perfil." },
  { title: "WhatsApp", text: "A conversa começa com contexto, roteiro de venda e resposta rápida." },
  { title: "Venda", text: "Follow-up e acompanhamento até o fechamento, com cada venda ligada à campanha de origem." },
  { title: "Margem", text: "Cortamos o que não dá lucro e escalamos o que deixa dinheiro na sua mão." },
];

const PLANS = [
  {
    phase: "Quero começar a vender",
    name: "Captação",
    text: "Para quem precisa de um canal de clientes que não dependa de indicação.",
    items: ["Google Ads e Meta Ads para quem quer comprar", "Google Maps e Perfil da Empresa", "Landing page de alta conversão", "Relatório de custo por cliente"],
  },
  {
    phase: "Quero vender com previsibilidade",
    name: "Captação + Conversão",
    text: "Para quem já recebe contatos, mas vende menos do que poderia.",
    items: ["Tudo do plano Captação", "Roteiro de vendas e follow-up no WhatsApp", "Copy e criativos testados toda semana", "Painel com custo por cliente e margem"],
  },
  {
    phase: "Quero escalar com margem",
    name: "Escala",
    text: "Para quem já vende e quer crescer sem perder lucro no caminho.",
    items: ["Tudo do plano Captação + Conversão", "Plano de crescimento de 12 meses", "Integração com CRM", "Estrategista dedicado à sua conta"],
  },
];

const ROLES = ["Gestor de tráfego", "Copywriter", "Designer", "Analista de dados", "Estrategista", "Especialista em WhatsApp"];

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
        slogan: "Captação e conversão para o seu negócio local vender e lucrar mais",
        url: site.url,
        logo: `${site.url}/favicon.svg`,
        image: `${site.url}/og.png`,
        description: "Agência de marketing e assessoria para negócios locais que querem leads qualificados e vendas rápidas no WhatsApp. Tráfego pago no Google Ads e Meta Ads, Google Maps, landing pages e vendas no WhatsApp.",
        telephone: `+${site.whatsapp}`,
        email: site.email,
        priceRange: "$$",
        address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "BR" },
        areaServed: { "@type": "Country", name: site.areaServed },
        knowsAbout: ["Marketing para negócios locais", "Marketing para restaurantes", "Marketing jurídico", "Marketing médico", "Marketing para clínicas de estética", "Tráfego pago", "Google Ads", "Meta Ads", "Google Perfil da Empresa", "Vendas pelo WhatsApp"],
        sameAs: [site.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de marketing digital",
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
  ["É", false], ["simples:", false], ["captação", false], ["e", false], ["conversão", false], ["para", false], ["o", false], ["seu", false], ["negócio", false],
  ["vender", true], ["e", true], ["lucrar", true], ["mais", true],
];

const CHAT = [
  { me: false, text: "Olá! Vi o anúncio de vocês e quero agendar." },
  { me: true, text: "Claro! Tenho horário amanhã às 10h. Posso confirmar?" },
  { me: false, text: "Pode sim, fechado! 🙌" },
];

/** Cartão do topo: sem formulário, só o botão que leva direto para o WhatsApp. */
function HeroCard() {
  return (
    <div className="rounded-2xl bg-black p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.65)] sm:p-7">
      <p className="m-0 text-center text-lg font-bold text-white">
        É isso que chega no seu <span className="hl">WhatsApp</span>
      </p>
      <ul className="m-0 mt-5 grid list-none gap-2.5 p-0">
        {CHAT.map((c, i) => (
          <li
            key={i}
            className={`max-w-[85%] animate-[fade-up_.6s_ease-out_both] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${c.me ? "ml-auto rounded-br-sm bg-yellow font-semibold text-black" : "rounded-bl-sm bg-field text-white"}`}
            style={{ animationDelay: `${0.5 + i * 0.6}s` }}
          >
            {c.text}
          </li>
        ))}
      </ul>
      <WhatsappLink placement="hero_card" size="lg" className="mt-6 w-full animate-pulse-ring justify-between pl-5 text-base sm:pl-7 sm:text-lg">
        Falar no WhatsApp agora
      </WhatsappLink>
      <p className="m-0 mt-3 text-center text-xs text-white/60">Atendimento rápido, direto com um especialista.</p>
    </div>
  );
}

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
              <p className="m-0 mt-6 text-sm font-bold">Agência de marketing para negócios locais</p>
              <h1 id="titulo" className="mt-3 text-[2rem] font-normal uppercase leading-[1.14] min-[390px]:text-[2.25rem] sm:text-[2.85rem]">
                {HEADLINE.map(([w, strong], i) => (
                  <span key={i}>
                    <span className={`word ${strong ? "font-black" : ""}`} style={{ animationDelay: `${i * 45}ms` }}>{w}</span>{" "}
                  </span>
                ))}
              </h1>
              <div className="mt-7">
                <HeroVideo src="/video/rezeta.mp4" poster="/video/rezeta-poster.jpg" />
              </div>
              <p className="m-0 mt-5 max-w-xl text-lg font-medium leading-snug">
                Leads qualificados no seu WhatsApp, de forma rápida, para o seu negócio vender agora. Chega de contato caro e desqualificado. <b className="font-extrabold">O nosso resultado é você vender mais.</b>
              </p>
              <ul className="m-0 mt-5 grid list-none gap-2 p-0 font-bold">
                {["Clientes qualificados, prontos para comprar", "Chega de faturamento sem margem"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-black text-yellow">
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <WhatsappLink placement="hero" variant="black" size="lg" icon={false}>Quero vender mais</WhatsappLink>
              </div>
            </div>
            <HeroCard />
          </div>
        </section>

        {/* FAIXAS CRUZADAS */}
        <div aria-hidden="true" className="relative z-10 -mt-20 h-32 sm:-mt-24 sm:h-44">
          <Ribbon className="top-8 rotate-[3deg] bg-black text-white sm:top-12" />
          <Ribbon reverse className="top-8 -rotate-[2deg] bg-white text-black shadow-xl sm:top-12" />
        </div>

        {/* PARA QUEM É */}
        <section id="para-quem" aria-labelledby="nichos" className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-8 sm:pb-28">
          <div data-reveal="zoom" className="mx-auto max-w-4xl rounded-2xl border-2 border-yellow/60 bg-panel px-6 py-12 text-center sm:px-14 sm:py-16">
            <Eyebrow>Para quem é</Eyebrow>
            <h2 id="nichos" className={h2}>
              Para <b className="hl">negócios locais</b> que precisam de <b className="hl">cliente qualificado no WhatsApp</b>, com urgência
            </h2>
            <div className="mt-9 flex justify-center">
              <WhatsappLink placement="para_quem" size="lg" icon={false}>Esse é o meu caso</WhatsappLink>
            </div>
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
                Esse reconhecimento vira vantagem para você: os nossos clientes contam com um <b className="font-bold text-black">gerente de contas do Google</b> acompanhando as campanhas. Colocamos isso a serviço de negócios locais que querem vender mais pelo WhatsApp.
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
            <h2 id="dep" className={h2}>Negócios locais que pararam de pagar caro por contato <b className="hl">contam como foi</b></h2>
          </div>
          <div data-reveal className="mt-10">
            <Testimonials items={testimonials} />
          </div>
        </section>

        {/* MÉTODO */}
        <section id="metodo" aria-labelledby="met" className="mx-auto max-w-5xl px-4 py-20 sm:px-8 sm:py-28">
          <div data-reveal className="text-center">
            <Eyebrow>O método REZETA</Eyebrow>
            <h2 id="met" className={h2}>Da busca no Google até o <b className="hl">lucro no caixa</b>, nada fica solto</h2>
            <p className="m-0 mt-4 text-white/65">Role a página e acompanhe o caminho de cada cliente.</p>
          </div>
          <div className="mt-12">
            <MethodPath steps={METHOD} />
          </div>
        </section>

        {/* O QUE FAZEMOS */}
        <section id="servicos" aria-labelledby="fazemos" className="mx-auto max-w-5xl px-4 pb-20 sm:px-8 sm:pb-28">
          <div data-reveal className="text-center">
            <Eyebrow>O que fazemos</Eyebrow>
            <h2 id="fazemos" className={h2}>Cinco frentes trabalhando juntas para <b className="hl">cada real voltar como venda</b></h2>
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
            <h2 id="pla" className={h2}>Cada fase da empresa <b className="hl">pede um plano diferente</b></h2>
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
              <Eyebrow>Seu time de marketing</Eyebrow>
              <h2 id="time" className={h2}>Um <b className="hl">time completo</b> sem contratar ninguém</h2>
              <p className="m-0 mt-5 text-[17px] leading-relaxed text-white/70">
                Contratar, treinar e gerenciar especialistas custa caro e toma o seu tempo. Com a assessoria de marketing da REZETA, você tem as pessoas certas trabalhando na sua captação e na sua conversão, e continua focado em atender e entregar.
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
            <p className="m-0 mt-3 text-white/60">Tudo sobre a nossa agência de marketing para negócios locais, antes de você chamar no WhatsApp.</p>
          </div>
          <Faq items={faq} />
        </section>

        {/* CHAMADA FINAL */}
        <section aria-labelledby="fim" className="px-4 pb-20 sm:px-8 sm:pb-28">
          <div data-reveal="zoom" className="hero-bg mx-auto max-w-6xl animate-bg-slide rounded-2xl px-6 py-14 text-center text-black sm:py-20">
            <h2 id="fim" className="mx-auto max-w-3xl text-balance text-[1.9rem] font-black uppercase leading-[1.1] sm:text-5xl">Chega de faturamento sem margem</h2>
            <p className="mx-auto mb-0 mt-4 max-w-xl text-lg font-medium">É simples: captação e conversão para o seu negócio local vender e lucrar mais.</p>
            <div className="mt-8 flex justify-center">
              <WhatsappLink placement="cta_final" variant="black" size="lg" icon={false}>Quero vender mais</WhatsappLink>
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
