"use client";

import * as React from "react";
import type { GlobeTestimonial } from "@/components/ui/testimonial-globe";
import { WhatsappIcon } from "@/components/whatsapp-link";

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return reduced;
}

/* ─────────── Feed ilustrativo de leads chegando no WhatsApp (card do hero) ─────────── */
const FEED = [
  { seg: "Estética", src: "Google Ads", msg: "Quero fechar o pacote" },
  { seg: "Advocacia", src: "Pesquisa", msg: "Preciso contratar hoje" },
  { seg: "Energia solar", src: "Instagram", msg: "Quero instalar na minha casa" },
  { seg: "Imobiliária", src: "Meta Ads", msg: "Quero visitar o imóvel" },
  { seg: "Odontologia", src: "Google Ads", msg: "Quero agendar o implante" },
  { seg: "Idiomas", src: "Facebook", msg: "Quero fazer a matrícula" },
];

export function LeadFeed() {
  const reduced = useReducedMotion();
  const [tick, setTick] = React.useState(3);
  React.useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, [reduced]);
  const visible = [0, 1, 2].map((k) => ({ n: tick - k, ...FEED[(tick - k) % FEED.length]! }));
  const leads = 37 + tick;

  return (
    <div aria-hidden="true" className="relative">
      <div className="mb-4 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/75">Clientes no seu WhatsApp hoje</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-5xl font-semibold tabular-nums tracking-tight">{leads}</p>
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white">
            <span className="size-2 animate-pulse rounded-full bg-green-light" /> ao vivo
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2.5">
        {visible.map((l, i) => (
          <li
            key={l.n}
            className="flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-3 text-ink shadow-lg shadow-black/20"
            style={{ animation: i === 0 && !reduced ? "popIn .5s cubic-bezier(.2,.8,.2,1)" : undefined, opacity: 1 - i * 0.18 }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-whatsapp text-white">
              <WhatsappIcon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{l.seg}</span>
                <span className="shrink-0 rounded-full bg-red/10 px-2 py-0.5 text-[10px] font-semibold text-red">{l.src}</span>
              </span>
              <span className="block text-xs leading-snug text-ink/60">“{l.msg}”</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────── Carrossel horizontal com setas, arraste e teclado ─────────── */
export function Carousel({
  children,
  label,
  className = "",
  tone = "dark",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [edge, setEdge] = React.useState({ start: true, end: false });
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);
  React.useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 12), behavior: "smooth" });
  };

  const btn =
    tone === "light"
      ? "bg-ink/10 text-ink hover:bg-ink/20 disabled:opacity-30"
      : "bg-white/10 text-white hover:bg-white/20 disabled:opacity-30";

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carrossel"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scroll(1);
          if (e.key === "ArrowLeft") scroll(-1);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: ref.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !ref.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          ref.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth outline-none focus-visible:ring-2 focus-visible:ring-red sm:[mask-image:linear-gradient(to_right,#000_85%,transparent)]"
      >
        {children}
        <div aria-hidden="true" className="hidden w-8 shrink-0 sm:block" />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <button type="button" aria-label="Anterior" disabled={edge.start} onClick={() => scroll(-1)} className={`grid size-11 place-items-center rounded-full transition ${btn}`}>
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 3.5 5.5 8l4.5 4.5" />
          </svg>
        </button>
        <button type="button" aria-label="Próximo" disabled={edge.end} onClick={() => scroll(1)} className={`grid size-11 place-items-center rounded-full transition ${btn}`}>
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </button>
        <span className={`ml-2 text-sm sm:hidden ${tone === "light" ? "text-ink/55" : "text-white/55"}`}>Deslize para ver mais</span>
      </div>
    </div>
  );
}

/* ─────────── Carrossel de depoimentos ─────────── */
function Stars() {
  return (
    <span className="flex gap-1" role="img" aria-label="Nota 5 de 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-5 text-chart-4" fill="currentColor" aria-hidden="true">
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.8l-5.1 2.6 1-5.6-4.1-4 5.7-.8L10 1.8z" />
        </svg>
      ))}
    </span>
  );
}

export function TestimonialCarousel({ items }: { items: GlobeTestimonial[] }) {
  return (
    <Carousel label="Depoimentos de clientes" tone="light">
      {items.map((t, i) => {
        const featured = i === 0;
        return (
          <figure
            key={t.id}
            data-slide
            className={`m-0 flex w-full shrink-0 snap-start flex-col rounded-3xl p-6 sm:w-[30rem] sm:p-10 ${
              featured ? "bg-gradient-to-br from-red to-[#ff4d3d] text-white" : "bg-white text-ink shadow-[0_10px_40px_-20px_rgba(0,0,0,.25)]"
            }`}
          >
            <Stars />
            <p className={`mt-5 text-sm font-bold uppercase tracking-wide ${featured ? "text-white" : "text-red"}`}>{t.company}</p>
            <div className={`my-5 h-px ${featured ? "bg-white/25" : "bg-ink/10"}`} />
            <blockquote className="m-0 flex-1 text-lg font-semibold leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.image} alt="" className="size-10 rounded-full object-cover" loading="lazy" />
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className={`block text-sm ${featured ? "text-white/75" : "text-ink/55"}`}>
                  {t.role} · {t.city}
                </span>
              </span>
            </figcaption>
          </figure>
        );
      })}
    </Carousel>
  );
}

/* ─────────── Abas de serviços ─────────── */
interface ServiceTab {
  id: string;
  tab: string;
  a: string;
  b: string;
  bubbles: string[];
  lead: string;
  text: string;
}

const BUBBLE_POS = [
  "left-[52%] top-[6%] size-24 sm:size-28",
  "left-[76%] top-[14%] size-32 sm:size-36",
  "left-[48%] top-[44%] size-32 sm:size-40",
  "left-[72%] top-[62%] size-24 sm:size-28",
  "left-[88%] top-[50%] size-16",
  "left-[60%] top-[80%] size-16",
];

export function ServiceTabs({ items, cta }: { items: ServiceTab[]; cta: React.ReactNode }) {
  const [active, setActive] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const cur = items[active]!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + items.length) % items.length;
    else return;
    e.preventDefault();
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Serviços" className="flex flex-wrap gap-2">
        {items.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`svc-${t.id}`}
              aria-selected={on}
              aria-controls="svc-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm transition sm:px-5 sm:py-2.5 sm:text-[15px] ${
                on ? "border-2 border-red bg-red/10 font-semibold text-white" : "border-2 border-transparent bg-white/[0.06] text-white/60 hover:text-white"
              }`}
            >
              {on && <span className="size-1.5 rounded-full bg-red" aria-hidden="true" />}
              {t.tab}
            </button>
          );
        })}
      </div>

      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-${cur.id}`} className="mt-8">
        <div key={cur.id} className="relative overflow-hidden rounded-3xl bg-white p-7 sm:h-[22rem] sm:p-0" style={{ animation: "fadeUp .45s ease-out" }}>
          <p className="m-0 text-[2.3rem] font-medium leading-[1.05] tracking-tight text-ink sm:absolute sm:left-16 sm:top-1/2 sm:-translate-y-1/2 sm:text-6xl">
            {cur.a}
            <br />
            <span className="text-red">{cur.b}</span>
          </p>
          <ul aria-hidden="true" className="mt-6 flex flex-wrap gap-2 sm:hidden">
            {cur.bubbles.map((b) => (
              <li key={b} className="rounded-full bg-light px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-black/5">{b}</li>
            ))}
          </ul>
          {cur.bubbles.map((b, i) => (
            <span
              key={b}
              aria-hidden="true"
              className={`absolute hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-center text-xs font-semibold text-ink shadow-[0_12px_30px_-10px_rgba(0,0,0,.35)] ring-1 ring-black/5 transition-transform duration-500 hover:scale-110 sm:grid ${BUBBLE_POS[i]}`}
              style={{ animation: `popIn .5s ${i * 70}ms both cubic-bezier(.2,.8,.2,1)` }}
            >
              <span className={i % 3 === 1 ? "text-red" : ""}>{b}</span>
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
          <h3 className="m-0 text-2xl font-normal leading-snug text-white">{cur.lead}</h3>
          <p className="m-0 text-[15px] leading-relaxed text-white/75">{cur.text}</p>
        </div>
        <div className="mt-8">{cta}</div>
      </div>

      {/* Conteúdo das outras abas, para buscadores e leitores de tela */}
      <div className="sr-only">
        {items.map((t) => (
          <div key={t.id}>
            <h3>
              {t.a} {t.b}: {t.lead}
            </h3>
            <p>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
