"use client";

import * as React from "react";
import type { GlobeTestimonial } from "@/components/ui/testimonial-globe";
import { openWhatsapp, WhatsappIcon, WhatsappLink } from "@/components/whatsapp-link";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const int = (n: number) => Math.round(n).toLocaleString("pt-BR");

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return reduced;
}

/* ───────── Entradas ao rolar + barra de progresso da página ───────── */
export function PageEffects() {
  const bar = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    let raf = 0;
    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    paint();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-white mix-blend-difference" />;
}

/* ───────── Palavras que trocam sozinhas ───────── */
export function Rotator({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = React.useState(0);
  const reduced = useReducedMotion();
  React.useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 2000);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);
  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {/* Reserva a largura da palavra mais longa para o texto não pular */}
      {words.map((w) => (
        <span key={w} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <span key={i} className="col-start-1 row-start-1 [animation:swap-in_.45s_cubic-bezier(.2,.8,.2,1)]">
        {words[i]}
      </span>
    </span>
  );
}

/* ───────── Formulário do topo: o WhatsApp só abre com tudo preenchido ───────── */
const SEGMENTS = ["Restaurante / alimentação", "Saúde / clínica", "Estética / beleza", "Advocacia / serviços", "Loja / comércio", "Outro negócio"];
const REVENUE = ["Até R$ 30 mil", "R$ 30 mil a R$ 100 mil", "R$ 100 mil a R$ 300 mil", "R$ 300 mil a R$ 1 milhão", "Acima de R$ 1 milhão"];
const field =
  "h-14 w-full rounded-lg bg-field px-4 text-base text-white placeholder:text-white/55 outline-none ring-yellow transition focus:ring-2";

export function HeroForm() {
  const card = React.useRef<HTMLDivElement>(null);
  const [complete, setComplete] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const check = (form: HTMLFormElement) => {
    const d = new FormData(form);
    setComplete(["nome", "empresa", "segmento", "faturamento"].every((k) => String(d.get(k) ?? "").trim().length >= 2));
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    check(form);
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    if (["nome", "empresa", "segmento", "faturamento"].some((k) => get(k).length < 2)) return;
    openWhatsapp(
      [
        "Olá, equipe REZETA! Quero vender e lucrar mais com o meu negócio.",
        "",
        `*Nome:* ${get("nome")}`,
        `*Empresa:* ${get("empresa")}`,
        `*Segmento:* ${get("segmento")}`,
        `*Faturamento mensal:* ${get("faturamento")}`,
      ].join("\n"),
      "form_hero",
    );
    setSent(true);
  }

  return (
    <div
      ref={card}
      className="scroll-mt-6 rounded-2xl bg-black p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,.65)] transition-transform duration-200 ease-out sm:p-5"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !card.current) return;
        const r = card.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.current.style.transform = `perspective(1100px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
      }}
      onPointerLeave={() => {
        if (card.current) card.current.style.transform = "";
      }}
    >
      <p className="mb-4 text-center text-lg font-bold text-white">
        Fale com um especialista <span className="hl">agora</span>
      </p>
      <form id="formulario" onSubmit={onSubmit} onInput={(e) => check(e.currentTarget)} onChange={(e) => check(e.currentTarget)} className="grid gap-3">
        <input aria-label="Seu nome" name="nome" required minLength={2} autoComplete="name" placeholder="Seu nome" className={field} />
        <input aria-label="Nome da empresa" name="empresa" required minLength={2} autoComplete="organization" placeholder="Nome da empresa" className={field} />
        <label className="grid gap-1.5 text-sm text-white">
          Segmento
          <select name="segmento" required defaultValue="" className={field}>
            <option value="" disabled>Selecionar</option>
            {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm text-white">
          Faturamento mensal
          <select name="faturamento" required defaultValue="" className={field}>
            <option value="" disabled>Selecionar</option>
            {REVENUE.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        {/* id "vendedor": conversão do Google Ads. O botão fica desativado até tudo ser preenchido,
            então o clique (e a conversão) só acontece com o formulário completo. */}
        <button
          id="vendedor"
          type="submit"
          disabled={!complete}
          className={`btn-yellow mt-1 h-16 w-full rounded-lg px-3 text-base font-extrabold transition sm:text-lg [&_*]:pointer-events-none ${complete ? "animate-pulse-ring hover:brightness-105" : "cursor-not-allowed opacity-45 shadow-none"}`}
        >
          {complete && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1/4 animate-shine bg-white/60" />}
          <span className="relative">Quero vender e lucrar mais</span>
        </button>
        <p className="m-0 text-center text-xs text-white/60" aria-live="polite">
          {sent
            ? "Abrimos o WhatsApp com seus dados. É só tocar em enviar."
            : complete
              ? "Tudo certo! Toque no botão para falar no WhatsApp."
              : "Preencha todos os campos para liberar o WhatsApp."}
        </p>
      </form>
    </div>
  );
}

/* ───────── Carrossel: desliza sozinho, com setas e indicadores ───────── */
export function Carousel({ count, label, children, autoplay = true }: { count: number; label: string; children: React.ReactNode; autoplay?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [i, setI] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  const reduced = useReducedMotion();

  const step = React.useCallback(() => {
    const el = ref.current;
    const slide = el?.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 16 : 1;
  }, []);
  const go = React.useCallback(
    (n: number) => ref.current?.scrollTo({ left: n * step(), behavior: "smooth" }),
    [step],
  );

  React.useEffect(() => {
    if (!autoplay || hold || reduced) return;
    const id = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return setI((v) => v);
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      go(atEnd ? 0 : i + 1);
    }, 4500);
    return () => window.clearTimeout(id);
  }, [autoplay, hold, reduced, i, go]);

  return (
    <div onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)} onPointerLeave={() => setHold(false)} onTouchStart={() => setHold(true)}>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carrossel"
        aria-label={label}
        tabIndex={0}
        onScroll={() => setI(Math.round((ref.current?.scrollLeft ?? 0) / step()))}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-yellow"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" aria-label="Anterior" onClick={() => go(Math.max(0, i - 1))} className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-yellow hover:text-black">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: count }).map((_, k) => (
            <span key={k} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-7 bg-yellow" : "w-1.5 bg-white/25"}`} />
          ))}
        </div>
        <button type="button" aria-label="Próximo" onClick={() => go(Math.min(count - 1, i + 1))} className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-yellow hover:text-black">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
        </button>
      </div>
    </div>
  );
}

export function Testimonials({ items }: { items: GlobeTestimonial[] }) {
  return (
    <Carousel count={items.length} label="Depoimentos de clientes">
      {items.map((t) => (
        <figure key={t.id} data-slide className="m-0 flex w-full shrink-0 snap-start flex-col rounded-2xl bg-white p-6 text-black sm:w-[26rem] sm:p-8">
          <span className="flex gap-1 text-yellow-deep" role="img" aria-label="Nota 5 de 5">
            {Array.from({ length: 5 }).map((_, k) => (
              <svg key={k} viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden="true"><path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.8l-5.1 2.6 1-5.6-4.1-4 5.7-.8L10 1.8z" /></svg>
            ))}
          </span>
          <blockquote className="m-0 mt-5 flex-1 text-lg font-semibold leading-snug">“{t.quote}”</blockquote>
          <figcaption className="mt-6 border-t border-black/10 pt-4">
            <span className="block font-bold">{t.name}</span>
            <span className="block text-sm text-black/60">{t.company} · {t.city}</span>
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}

/* ───────── Método: o caminho acende conforme a página rola ───────── */
export function MethodPath({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = React.useRef<HTMLOListElement>(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setP(1);
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={ref} className="relative m-0 grid list-none gap-8 p-0 lg:gap-4">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 bg-white/12 lg:left-1/2 lg:-translate-x-1/2" />
      <span aria-hidden="true" className="absolute left-[1.35rem] top-6 w-0.5 bg-yellow shadow-[0_0_18px_var(--yellow)] lg:left-1/2 lg:-translate-x-1/2" style={{ height: `calc((100% - 3rem) * ${p})` }} />
      {steps.map((s, i) => {
        const on = p >= (i + 0.15) / steps.length || (i === 0 && p > 0);
        const last = i === steps.length - 1;
        const right = i % 2 === 1;
        return (
          <li key={s.title} className="relative grid items-center pl-16 lg:grid-cols-2 lg:gap-24 lg:pl-0">
            <span
              className={`absolute left-0 top-1 z-10 grid size-11 place-items-center rounded-full border-2 text-sm font-extrabold transition-all duration-500 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 ${
                on ? "scale-110 border-yellow bg-yellow text-black shadow-[0_0_28px_var(--yellow)]" : "border-white/25 bg-black text-white/60"
              }`}
            >
              {i + 1}
            </span>
            <div
              className={`rounded-2xl border p-5 transition-all duration-500 sm:p-6 ${right ? "lg:col-start-2" : "lg:text-right"} ${
                on ? (last ? "border-yellow bg-yellow text-black" : "border-yellow/60 bg-panel") : "border-white/10 bg-panel/50 opacity-60"
              }`}
            >
              <h3 className={`text-lg font-extrabold uppercase sm:text-xl ${on && !last ? "text-yellow" : ""}`}>{s.title}</h3>
              <p className={`m-0 mt-1.5 text-[15px] leading-relaxed ${on && last ? "text-black/80" : "text-white/70"}`}>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ───────── Seletor de planos ───────── */
export function PlanPicker({ plans }: { plans: { phase: string; name: string; text: string; items: string[] }[] }) {
  const [a, setA] = React.useState(1);
  const cur = plans[a]!;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div role="tablist" aria-label="Fase da empresa" className="grid content-start gap-3">
        {plans.map((p, i) => (
          <button
            key={p.name}
            role="tab"
            id={`plano-${i}`}
            aria-selected={i === a}
            aria-controls="plano-painel"
            onClick={() => setA(i)}
            className={`rounded-xl border-2 p-5 text-left transition-all duration-300 ${i === a ? "translate-x-1 border-yellow bg-yellow text-black" : "border-white/12 bg-panel text-white hover:border-yellow/60"}`}
          >
            <span className={`block text-xs font-bold uppercase tracking-wider ${i === a ? "text-black/70" : "text-yellow"}`}>{p.phase}</span>
            <span className="mt-1 block text-lg font-extrabold">{p.name}</span>
          </button>
        ))}
      </div>
      <div id="plano-painel" role="tabpanel" aria-labelledby={`plano-${a}`} className="rounded-2xl border border-white/12 bg-panel p-6 sm:p-9">
        <div key={a} className="[animation:fade-up_.4s_ease-out]">
          <h3 className="text-2xl font-extrabold text-white">{cur.name}</h3>
          <p className="m-0 mt-2 text-white/70">{cur.text}</p>
          <ul className="m-0 mt-6 grid list-none gap-3 p-0">
            {cur.items.map((it) => (
              <li key={it} className="flex items-start gap-3 text-white">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-yellow text-black">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
                </span>
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WhatsappLink placement={`plano_${a + 1}`} size="lg" icon={false} message={`Olá, equipe REZETA! Tenho interesse no plano ${cur.name}. Podem me explicar?`}>
              Quero esse plano
            </WhatsappLink>
          </div>
        </div>
      </div>
      <div className="sr-only">
        {plans.map((p) => (
          <p key={p.name}>{p.name}: {p.text} {p.items.join(". ")}.</p>
        ))}
      </div>
    </div>
  );
}

/* ───────── Simulador: quanto sobra no fim do mês ───────── */
function Slider({ label, value, min, max, step, format, onChange }: { label: string; value: number; min: number; max: number; step: number; format: (n: number) => string; onChange: (n: number) => void }) {
  const id = React.useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-white/80">{label}</label>
        <output htmlFor={id} className="shrink-0 font-bold tabular-nums text-white">{format(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range mt-3" style={{ "--pct": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties} />
    </div>
  );
}

export function Simulator() {
  const [budget, setBudget] = React.useState(3000);
  const [cpl, setCpl] = React.useState(30);
  const [close, setClose] = React.useState(15);
  const [ticket, setTicket] = React.useState(1500);
  const [margin, setMargin] = React.useState(30);

  const leads = budget / cpl;
  const sales = leads * (close / 100);
  const revenue = sales * ticket;
  const profit = revenue * (margin / 100) - budget;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-6 rounded-2xl bg-black p-6 sm:p-8">
        <Slider label="Investimento mensal em anúncios" value={budget} min={500} max={50000} step={500} format={brl} onChange={setBudget} />
        <Slider label="Custo por lead" value={cpl} min={5} max={200} step={1} format={brl} onChange={setCpl} />
        <Slider label="Leads que viram venda" value={close} min={1} max={60} step={1} format={(n) => `${n}%`} onChange={setClose} />
        <Slider label="Ticket médio" value={ticket} min={50} max={30000} step={50} format={brl} onChange={setTicket} />
        <Slider label="Margem de lucro" value={margin} min={5} max={80} step={1} format={(n) => `${n}%`} onChange={setMargin} />
      </div>
      <div className="flex flex-col rounded-2xl bg-white p-6 text-black sm:p-8" aria-live="polite">
        <div className="grid grid-cols-2 gap-4">
          <div><p className="m-0 text-sm text-black/60">Leads</p><p className="m-0 text-3xl font-extrabold tabular-nums">{int(leads)}</p></div>
          <div><p className="m-0 text-sm text-black/60">Vendas</p><p className="m-0 text-3xl font-extrabold tabular-nums">{int(sales)}</p></div>
        </div>
        <p className="m-0 mt-5 text-sm text-black/60">Faturamento</p>
        <p className="m-0 text-2xl font-bold tabular-nums">{brl(revenue)}</p>
        <div className={`mt-5 rounded-xl p-5 ${profit >= 0 ? "bg-yellow" : "bg-black text-white"}`}>
          <p className="m-0 text-sm font-semibold">{profit >= 0 ? "Sobra na sua mão, depois da mídia" : "Faturamento sem margem: prejuízo de"}</p>
          <p className="m-0 mt-1 break-all text-[2.5rem] font-black leading-none tabular-nums sm:text-5xl">{brl(Math.abs(profit))}</p>
        </div>
        <button
          type="button"
          onClick={() =>
            openWhatsapp(
              ["Olá, equipe REZETA! Fiz a conta no site:", `• Anúncios: ${brl(budget)}/mês`, `• Custo por lead: ${brl(cpl)}`, `• Fechamento: ${close}%`, `• Ticket: ${brl(ticket)}`, `• Margem: ${margin}%`, "", "Quero melhorar esses números."].join("\n"),
              "simulador",
            )
          }
          className="btn-black mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl px-4 font-bold transition hover:-translate-y-0.5"
        >
          <WhatsappIcon className="relative size-5 shrink-0" />
          <span className="relative">Quero melhorar esses números</span>
        </button>
        <p className="m-0 mt-3 text-center text-xs text-black/55">Simulação ilustrativa. O resultado real depende do seu mercado, da oferta e do atendimento.</p>
      </div>
    </div>
  );
}

/* ───────── Perguntas frequentes ───────── */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="grid gap-3">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} data-reveal className={`rounded-lg border bg-panel transition-colors ${on ? "border-yellow/70" : "border-white/12"}`}>
            <h3>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] font-semibold text-white sm:text-base">
                {f.q}
                <svg viewBox="0 0 16 16" aria-hidden="true" className={`size-4 shrink-0 transition-transform duration-300 ${on ? "rotate-180 text-yellow" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" /></svg>
              </button>
            </h3>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="m-0 px-5 pb-5 text-[15px] leading-relaxed text-white/70">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Botão fixo: barra no celular, WhatsApp no desktop ───────── */
export function StickyCta() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => setShow(window.scrollY > 640);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div className={`fixed inset-x-0 bottom-0 z-50 bg-black/90 p-3 backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <WhatsappLink placement="sticky_mobile" size="lg" className="w-full justify-between" tabIndex={show ? 0 : -1}>
          Quero vender mais
        </WhatsappLink>
      </div>
      <WhatsappLink
        placement="floating_desktop"
        variant="ghost"
        icon={false}
        aria-label="Falar no WhatsApp"
        tabIndex={show ? 0 : -1}
        className={`fixed bottom-6 right-6 z-50 hidden size-14 rounded-full bg-whatsapp p-0 text-white hover:text-white md:inline-flex ${show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
      >
        <WhatsappIcon className="size-7" />
      </WhatsappLink>
    </>
  );
}

/* ───────── Pilha de fotos: arraste, clique ou deixe passar sozinha ───────── */
export interface StackPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const TILT = [-3, 4, -6];

export function PhotoStack({ photos }: { photos: StackPhoto[] }) {
  const [order, setOrder] = React.useState(() => photos.map((_, i) => i));
  const [dx, setDx] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const drag = React.useRef<{ x: number; id: number } | null>(null);
  const box = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const next = React.useCallback(() => setOrder((o) => [...o.slice(1), o[0]!]), []);
  const prev = React.useCallback(() => setOrder((o) => [o[o.length - 1]!, ...o.slice(0, -1)]), []);

  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (hold || reduced || !visible) return;
    const id = window.setTimeout(next, 3800);
    return () => window.clearTimeout(id);
  }, [order, hold, reduced, visible, next]);

  const top = photos[order[0]!]!;

  return (
    <div onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)} onPointerLeave={() => setHold(false)}>
      <div ref={box} className="relative mx-auto aspect-[4/5] w-[calc(100%-2.5rem)] max-w-[22rem] select-none sm:w-full sm:max-w-sm" role="group" aria-roledescription="galeria" aria-label="Fotos da REZETA no Google">
        {order.map((photoIndex, pos) => {
          const ph = photos[photoIndex]!;
          const isTop = pos === 0;
          const t = isTop
            ? `translateX(${dx}px) rotate(${dx / 18}deg)`
            : `translate(${pos * 12}px, ${pos * 10}px) rotate(${TILT[pos % TILT.length]}deg) scale(${1 - pos * 0.04})`;
          return (
            <figure
              key={ph.src}
              aria-hidden={!isTop}
              className={`absolute inset-0 m-0 flex flex-col rounded-2xl bg-white p-3 pb-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] ${isTop ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""}`}
              style={{
                zIndex: photos.length - pos,
                transform: t,
                transition: drag.current && isTop ? "none" : "transform .55s cubic-bezier(.2,.8,.2,1)",
              }}
              onPointerDown={(e) => {
                if (!isTop) return;
                drag.current = { x: e.clientX, id: e.pointerId };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                setHold(true);
              }}
              onPointerMove={(e) => {
                if (!isTop || !drag.current || drag.current.id !== e.pointerId) return;
                setDx(e.clientX - drag.current.x);
              }}
              onPointerUp={(e) => {
                if (!isTop || !drag.current) return;
                const moved = e.clientX - drag.current.x;
                drag.current = null;
                setDx(0);
                if (Math.abs(moved) > 70) (moved < 0 ? next : prev)();
                else if (Math.abs(moved) < 5) next();
              }}
              onPointerCancel={() => {
                drag.current = null;
                setDx(0);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ph.src}
                alt={isTop ? ph.alt : ""}
                width={ph.width}
                height={ph.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="min-h-0 w-full flex-1 rounded-xl object-cover"
              />
              <figcaption className="mt-3 text-center text-sm font-bold text-black">{ph.caption}</figcaption>
            </figure>
          );
        })}
        <span aria-hidden="true" className="absolute -right-2 -top-4 z-10 grid size-16 rotate-12 sm:size-20 animate-float place-items-center rounded-full bg-yellow text-center text-[11px] font-black uppercase leading-tight text-black shadow-lg sm:-right-6 sm:-top-3">
          Top
          <br />
          20
        </span>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" aria-label="Foto anterior" onClick={prev} className="grid size-11 place-items-center rounded-full bg-black text-white transition hover:bg-yellow hover:text-black">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
        </button>
        <p className="m-0 min-w-36 text-center text-sm text-black/60" aria-live="polite">
          <span className="sr-only">{top.caption}. </span>
          {order[0]! + 1} de {photos.length} · arraste a foto
        </p>
        <button type="button" aria-label="Próxima foto" onClick={next} className="grid size-11 place-items-center rounded-full bg-black text-white transition hover:bg-yellow hover:text-black">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ───────── Seletor por tipo de negócio local ───────── */
const NICHE_ICONS: Record<string, string> = {
  restaurantes: "M7 3v7a2 2 0 0 0 2 2v9M11 3v7M9 3v4M17 21V3c-2 1-3 4-3 7h3",
  advocacia: "M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7Zm14 0-3 7a3 3 0 0 0 6 0l-3-7Z",
  "clinica-medica": "M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z",
  estetica: "M12 3l1.8 4.9L19 9.7l-4.9 1.8L12 16.4l-1.8-4.9L5 9.7l5.2-1.8L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
};

export function NichePicker({ niches }: { niches: { id: string; name: string; short: string; goal: string; text: string; points: string[] }[] }) {
  const [a, setA] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const cur = niches[a]!;
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % niches.length : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + niches.length) % niches.length : -1;
    if (n < 0) return;
    e.preventDefault();
    setA(n);
    tabs.current[n]?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label="Tipo de negócio" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {niches.map((n, i) => {
          const on = i === a;
          return (
            <button
              key={n.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`nicho-${n.id}`}
              aria-selected={on}
              aria-controls="nicho-painel"
              tabIndex={on ? 0 : -1}
              onClick={() => setA(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex flex-col items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 sm:p-5 ${on ? "-translate-y-1 border-yellow bg-yellow text-black shadow-[0_18px_40px_-18px_var(--yellow)]" : "border-white/12 bg-panel text-white hover:-translate-y-0.5 hover:border-yellow/60"}`}
            >
              <span className={`grid size-11 place-items-center rounded-xl transition-colors ${on ? "bg-black text-yellow" : "bg-white/10 text-yellow"}`}>
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={NICHE_ICONS[n.id]} /></svg>
              </span>
              <span className="text-[15px] font-extrabold leading-tight sm:text-lg">{n.name}</span>
            </button>
          );
        })}
      </div>
      <div id="nicho-painel" role="tabpanel" aria-labelledby={`nicho-${cur.id}`} className="mt-5 rounded-2xl border border-white/12 bg-panel p-6 sm:p-9">
        <div key={a} className="grid grid-cols-[minmax(0,1fr)] gap-8 [animation:fade-up_.4s_ease-out] lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="m-0 text-sm font-extrabold uppercase tracking-wider text-yellow">{cur.short}</p>
            <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">{cur.goal}</h3>
            <p className="m-0 mt-4 leading-relaxed text-white/70">{cur.text}</p>
            <div className="mt-7">
              <WhatsappLink placement={`nicho_${cur.id}`} size="lg" icon={false} message={`Olá, equipe REZETA! Tenho um negócio de ${cur.name.toLowerCase()} e quero vender mais.`} className="h-14 pl-5 text-base sm:h-16 sm:pl-7 sm:text-lg">
                Quero mais clientes
              </WhatsappLink>
            </div>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {cur.points.map((pt, i) => (
              <li key={pt} className="flex items-center gap-3 rounded-xl bg-black px-4 py-3.5 font-semibold text-white [animation:fade-up_.45s_both]" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-yellow text-black">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sr-only">
        {niches.map((n) => (
          <div key={n.id}>
            <h3>Marketing para {n.name.toLowerCase()}: {n.goal}</h3>
            <p>{n.text} {n.points.join(". ")}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Vídeo do topo: autoplay em loop, com pausar e ligar o som ───────── */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let userMuted = false;
    const onVol = () => setMuted(v.muted);
    v.addEventListener("volumechange", onVol);

    // 1) tenta tocar COM som; 2) se o navegador bloquear, toca mudo e
    //    liga o som no primeiro toque/clique do visitante em qualquer lugar da página
    const unlock = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-sound-toggle]")) userMuted = true;
      if (!userMuted) {
        v.muted = false;
        v.play().catch(() => {});
      }
      remove();
    };
    const evs = ["pointerdown", "keydown", "touchstart"] as const;
    const remove = () => evs.forEach((t) => window.removeEventListener(t, unlock, true));

    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => setPlaying(false));
        evs.forEach((t) => window.addEventListener(t, unlock, { capture: true, passive: true }));
      });
    return () => {
      remove();
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  const btn = "grid size-11 place-items-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-yellow hover:text-black focus-visible:outline-2 focus-visible:outline-yellow";

  return (
    <div className="relative mx-auto w-full max-w-[17rem] overflow-hidden rounded-2xl border-4 border-black bg-black shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] sm:max-w-[19rem] lg:mx-0">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        loop
        playsInline
        preload="auto"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block aspect-[9/16] w-full cursor-pointer object-cover"
        aria-label="Vídeo de apresentação da REZETA"
      />
      {!playing && (
        <button type="button" onClick={toggle} aria-label="Reproduzir vídeo" className="absolute inset-0 grid place-items-center bg-black/30">
          <span className="grid size-16 place-items-center rounded-full bg-yellow text-black shadow-xl">
            <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          </span>
        </button>
      )}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between">
        <button type="button" onClick={toggle} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"} className={btn}>
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          )}
        </button>
        <button type="button" data-sound-toggle onClick={toggleSound} aria-label={muted ? "Ativar som" : "Desativar som"} className={muted ? "flex h-11 items-center gap-2 rounded-full bg-yellow px-4 text-sm font-bold text-black shadow-lg transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-white" : btn}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" />
            {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
          </svg>
          {muted && <span>Ativar som</span>}
        </button>
      </div>
    </div>
  );
}
