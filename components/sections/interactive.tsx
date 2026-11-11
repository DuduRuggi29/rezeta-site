"use client";

import * as React from "react";
import { openWhatsapp, WhatsappIcon } from "@/components/whatsapp-link";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const int = (n: number) => Math.round(n).toLocaleString("pt-BR");

/* ───────── Hook: dispara uma vez quando o elemento entra na tela ───────── */
function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = React.useRef<T | null>(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return reduced;
}

/* ───────── Revelação suave das seções ao rolar ───────── */
export function RevealObserver() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.shown = "";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/* ───────── Número que conta ao aparecer ───────── */
export function CountUp({ to, prefix = "", suffix = "", duration = 1400 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const [value, setValue] = React.useState(to);
  React.useEffect(() => {
    if (!seen || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {int(value)}
      {suffix}
    </span>
  );
}

/* ───────── Checklist de diagnóstico ───────── */
export function PainCheck({ items }: { items: string[] }) {
  const [checked, setChecked] = React.useState<boolean[]>(() => items.map(() => false));
  const count = checked.filter(Boolean).length;
  const pct = Math.round((count / items.length) * 100);
  const level =
    count === 0
      ? { label: "Marque o que acontece na sua empresa", tone: "text-muted-foreground", bar: "bg-white/20" }
      : count <= 2
        ? { label: "Atenção: há vazamentos de verba no seu funil", tone: "text-gold-light", bar: "bg-gold" }
        : count <= 4
          ? { label: "Alerta: boa parte do investimento não vira venda", tone: "text-[#f2a65a]", bar: "bg-[#f2a65a]" }
          : { label: "Crítico: seu marketing precisa de estrutura urgente", tone: "text-[#ff7a6b]", bar: "bg-[#ff7a6b]" };

  return (
    <div className="card-premium p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Teste rápido · 10 segundos</p>
      <fieldset className="mt-5">
        <legend className="sr-only">Marque as situações que acontecem na sua empresa</legend>
        <ul className="grid gap-2.5">
          {items.map((item, i) => (
            <li key={item}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-[15px] transition-all ${
                  checked[i] ? "border-gold/50 bg-gold/[0.07] text-white" : "border-white/[0.08] bg-white/[0.02] text-white/80 hover:border-white/20"
                }`}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked[i]}
                  onChange={() => setChecked((c) => c.map((v, k) => (k === i ? !v : v)))}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-all peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                    checked[i] ? "border-gold bg-gold text-background" : "border-white/25"
                  }`}
                >
                  {checked[i] && (
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                  )}
                </span>
                {item}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="mt-6" aria-live="polite">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-semibold ${level.tone}`}>{level.label}</span>
          <span className="tabular-nums text-muted-foreground">
            {count}/{items.length}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div className={`h-full rounded-full transition-all duration-500 ${level.bar}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
      {count > 0 && (
        <button
          type="button"
          onClick={() => {
            const marked = items.filter((_, i) => checked[i]).map((t) => `• ${t}`);
            openWhatsapp(
              ["Olá, equipe 2Simples! Fiz o teste no site e me identifiquei com:", ...marked, "", "Quero um diagnóstico gratuito."].join("\n"),
              "checklist_dores",
            );
          }}
          className="btn-gold mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-semibold transition hover:-translate-y-0.5"
        >
          <WhatsappIcon className="size-5" />
          Resolver isso com um especialista
        </button>
      )}
    </div>
  );
}

/* ───────── Entregas em abas (stepper) ───────── */
interface Deliverable {
  step: string;
  week: string;
  title: string;
  lead: string;
  points: string[];
}

export function DeliverablesStepper({ items }: { items: Deliverable[] }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active]!;

  // Avança sozinho enquanto o visitante só observa.
  React.useEffect(() => {
    if (!seen || paused || reduced) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % items.length), 6000);
    return () => window.clearTimeout(id);
  }, [seen, paused, reduced, active, items.length]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else return;
    e.preventDefault();
    setActive(next);
    setPaused(true);
    tabs.current[next]?.focus();
  };

  return (
    <div ref={ref} className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_1fr]" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div role="tablist" aria-orientation="vertical" aria-label="Entregas semana a semana" className="grid gap-2">
        {items.map((d, i) => {
          const on = i === active;
          return (
            <button
              key={d.step}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${d.step}`}
              aria-selected={on}
              aria-controls="painel-entrega"
              tabIndex={on ? 0 : -1}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative flex items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-gold ${
                on ? "border-gold/50 bg-london/40" : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-full font-serif text-lg italic transition-colors ${
                  on ? "bg-gold text-background" : "text-gold ring-1 ring-gold/40"
                }`}
              >
                {d.step}
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">{d.week}</span>
                <span className={`block truncate font-semibold ${on ? "text-white" : "text-white/80"}`}>{d.title}</span>
              </span>
              {on && !paused && !reduced && seen && (
                <span aria-hidden="true" key={active} className="absolute bottom-0 left-0 h-0.5 bg-gold [animation:progress_6s_linear_forwards]" />
              )}
            </button>
          );
        })}
      </div>

      <div id="painel-entrega" role="tabpanel" aria-labelledby={`tab-${current.step}`} className="card-premium relative overflow-hidden p-7 sm:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-10 font-serif text-[11rem] italic leading-none text-white/[0.04]">
          {current.step}
        </span>
        <div key={active} className="relative animate-[fadeUp_.45s_ease-out]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-light">{current.week}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{current.title}</h3>
          <p className="mt-3 text-lg text-white/75">{current.lead}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {current.points.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-xl bg-white/[0.03] px-4 py-3 text-[15px] text-white/85 ring-1 ring-white/[0.06]">
                <span className="mt-1 size-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-gradient-to-r from-london-light to-gold transition-all duration-500" style={{ width: `${((active + 1) / items.length) * 100}%` }} />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {active + 1} de {items.length}
            </span>
          </div>
        </div>
      </div>
      {/* Conteúdo completo para buscadores e leitores de tela */}
      <div className="sr-only">
        {items.map((d) => (
          <div key={d.step}>
            <h3>
              {d.week}: {d.title}
            </h3>
            <p>{d.lead}</p>
            <ul>
              {d.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Calculadora de resultados ───────── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
  hint?: string;
}) {
  const id = React.useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-white/80">
          {label}
        </label>
        <output htmlFor={id} className="font-semibold tabular-nums text-white">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function RoiCalculator() {
  const [budget, setBudget] = React.useState(3000);
  const [cpl, setCpl] = React.useState(30);
  const [close, setClose] = React.useState(15);
  const [ticket, setTicket] = React.useState(1500);

  const leads = budget / cpl;
  const sales = leads * (close / 100);
  const revenue = sales * ticket;
  const roas = revenue / budget;

  const send = () =>
    openWhatsapp(
      [
        "Olá, equipe 2Simples! Fiz a simulação no site:",
        `• Investimento em anúncios: ${brl(budget)}/mês`,
        `• Custo por lead: ${brl(cpl)}`,
        `• Taxa de fechamento: ${close}%`,
        `• Ticket médio: ${brl(ticket)}`,
        `→ Estimativa: ${int(leads)} leads, ${int(sales)} vendas e ${brl(revenue)}/mês`,
        "",
        "Quero entender se esse cenário é possível para a minha empresa.",
      ].join("\n"),
      "calculadora",
    );

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr]">
      <div className="card-premium grid content-start gap-7 p-7 sm:p-9">
        <Slider label="Investimento mensal em anúncios" value={budget} min={500} max={50000} step={500} format={brl} onChange={setBudget} />
        <Slider
          label="Custo por lead (CPL)"
          value={cpl}
          min={5}
          max={200}
          step={1}
          format={brl}
          onChange={setCpl}
          hint="Varia por segmento e região. No diagnóstico estimamos o seu."
        />
        <Slider label="Taxa de fechamento no WhatsApp" value={close} min={1} max={60} step={1} format={(n) => `${n}%`} onChange={setClose} />
        <Slider label="Ticket médio por venda" value={ticket} min={50} max={30000} step={50} format={brl} onChange={setTicket} />
      </div>

      <div className="relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-london via-[#163a5c] to-[#0e1a28] p-7 ring-1 ring-gold/40 sm:p-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold/15 blur-[90px]" />
        <p className="relative text-sm font-semibold uppercase tracking-[0.16em] text-gold-light">Seu potencial estimado por mês</p>
        <div className="relative mt-6 grid grid-cols-2 gap-4" aria-live="polite">
          <div className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
            <p className="text-xs text-white/60">Leads</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-white">{int(leads)}</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
            <p className="text-xs text-white/60">Vendas</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-white">{int(sales)}</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-black/25 p-5 ring-1 ring-gold/30">
            <p className="text-xs text-white/60">Faturamento gerado pelos anúncios</p>
            <p className="hl mt-1 block text-5xl leading-tight tabular-nums sm:text-6xl">{brl(revenue)}</p>
            <p className="mt-2 text-sm text-white/70">
              Retorno de <strong className="text-white">{roas.toFixed(1).replace(".", ",")}x</strong> sobre o investimento em mídia
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={send}
          className="btn-gold relative mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition hover:-translate-y-0.5"
        >
          <WhatsappIcon className="size-5" />
          Quero esse resultado — falar no WhatsApp
        </button>
        <p className="relative mt-3 text-center text-xs text-white/50">
          Simulação ilustrativa. Resultados reais dependem do mercado, da oferta e do atendimento.
        </p>
      </div>
    </div>
  );
}

/* ───────── Lista de valor animada ───────── */
export function ValueStack({ items }: { items: { item: string; value: number }[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const reduced = useReducedMotion();
  const [shown, setShown] = React.useState(items.length);
  React.useEffect(() => {
    if (!seen || reduced) return;
    setShown(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= items.length) window.clearInterval(id);
    }, 160);
    return () => window.clearInterval(id);
  }, [seen, reduced, items.length]);

  const total = items.slice(0, shown).reduce((s, x) => s + x.value, 0);
  const done = shown >= items.length;

  return (
    <div ref={ref} className="card-premium overflow-hidden">
      <ul className="divide-y divide-white/[0.06]">
        {items.map((x, i) => (
          <li
            key={x.item}
            className={`flex items-center justify-between gap-4 px-6 py-3.5 transition-all duration-300 sm:px-8 ${
              i < shown ? "opacity-100" : "translate-x-2 opacity-25"
            }`}
          >
            <span className="flex items-center gap-3 text-[15px] text-white/85">
              <span className={`grid size-5 shrink-0 place-items-center rounded-full transition-colors ${i < shown ? "bg-gold text-background" : "bg-white/10"}`}>
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
              </span>
              {x.item}
            </span>
            <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{brl(x.value)}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/30 bg-gold/[0.06] px-6 py-5 sm:px-8">
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Valor se contratado separadamente</span>
        <span className={`text-2xl font-semibold tabular-nums transition-all ${done ? "text-white/45 line-through decoration-gold decoration-2" : "text-white"}`}>
          {brl(total)}
        </span>
      </div>
    </div>
  );
}
