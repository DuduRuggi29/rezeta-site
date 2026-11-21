"use client";

/**
 * Demonstração do atendimento com IA de um delivery, no formato do WhatsApp.
 * Roda 100% no navegador (o site é estático): um "cérebro" de atendimento que entende
 * o que o cliente escreve, anota o pedido, oferece combo e sobremesa (sobe o ticket),
 * pede endereço e pagamento e fecha o pedido. O delivery é fictício.
 */

import * as React from "react";
import { WhatsappLink } from "@/components/whatsapp-link";

type Line = { name: string; price: number; qty: number; upsell?: boolean };
type Stage = "idle" | "combo" | "dessert" | "more" | "address" | "payment" | "done";
type State = { stage: Stage; cart: Line[]; last?: Line };
type Msg = { id: number; me: boolean; text: string; time: string };

const STORE = "Burger da Casa";
const FEE = 5;
const COMBO = 12;
const BROWNIE = 9;

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();

const BURGERS = [
  { name: "Bacon Duplo", price: 36.9, re: /\b(bacon|duplo)\b/, emoji: "🥓" },
  { name: "Chicken Crispy", price: 32.9, re: /\b(frango|chicken|crispy)\b/, emoji: "🍗" },
  { name: "Veggie da Casa", price: 31.9, re: /\b(veggie|vegetarian[oa]|vegan[oa]?)\b/, emoji: "🥬" },
  { name: "Smash Burger", price: 29.9, re: /\b(smash|classico|tradicional|x ?-?(burgu?e?r|tudo|salada|egg)|hamburgu?e?r|burgu?e?r|lanches?|sanduiche)\b/, emoji: "🍔" },
];

const MENU = [
  "Aqui vai o nosso cardápio 😋",
  "",
  ...BURGERS.slice().reverse().map((b) => `${b.emoji} ${b.name}: ${brl(b.price)}`),
  `🍟 Batata frita: ${brl(14)}`,
  `🥤 Refri lata: ${brl(7)}`,
  `🍫 Brownie com calda: ${brl(BROWNIE)}`,
  "",
  "O que vai ser hoje?",
].join("\n");

const YES = /\b(sim|quero|pode|claro|bora|manda|ok|okay|beleza|blz|aceito|isso|com certeza|uhum|top|fechado|bota|coloca|vai sim|s)\b/;
const NO = /\b(nao|n|nem|dispenso|so isso|so o lanche|sem|agora nao|deixa)\b/;
const CLOSE = /\b(fechar|finalizar|so isso|e isso|pode fechar|acabou|mais nada|nada mais|so)\b/;

function qtyOf(t: string) {
  const m = t.match(/\b(\d{1,2})\s*x?\s/);
  if (m) return Math.max(1, Math.min(+m[1], 10));
  if (/\b(dois|duas)\b/.test(t)) return 2;
  if (/\btres\b/.test(t)) return 3;
  return 1;
}

const total = (cart: Line[]) => cart.reduce((a, l) => a + l.price * l.qty, 0);
const askAddress = "Perfeito! Me passa o endereço de entrega, por favor (rua, número e bairro) 📍";

function respond(prev: State, raw: string): { state: State; out: string[] } {
  const t = norm(raw);
  const s: State = { ...prev, cart: prev.cart.map((l) => ({ ...l })) };
  const add = (l: Line) => {
    const same = s.cart.find((c) => c.name === l.name);
    if (same) same.qty += l.qty;
    else s.cart.push(l);
  };

  // Perguntou se é robô: é honesta.
  if (/\b(robo|bot|ia|inteligencia artificial|humano|pessoa de verdade|e gente|atendente)\b/.test(t)) {
    return { state: s, out: ["Sou a assistente virtual do Burger da Casa 🤖 Respondo na hora, 24 horas por dia.", "Essa é a IA de atendimento que a REZETA coloca no seu delivery! Se preferir, chamo alguém da equipe, mas posso fechar seu pedido agora mesmo 😉"] };
  }
  if (/\b(outro pedido|novo pedido|pedir de novo|recomecar)\b/.test(t)) {
    return { state: { stage: "idle", cart: [] }, out: ["Bora! 😄", MENU] };
  }

  // Etapas do pedido
  if (s.stage === "address") {
    if (t.length >= 6 && !/\b(cardapio|menu)\b/.test(t)) {
      s.stage = "payment";
      return { state: s, out: [`Anotado! 📍 ${raw.trim()}`, `A entrega fica ${brl(FEE)} e chega em 35 a 45 min 🛵 Vai pagar no Pix, cartão ou dinheiro?`] };
    }
    return { state: s, out: ["Só preciso do endereço completo: rua, número e bairro 📍"] };
  }
  if (s.stage === "payment") {
    const pay = /pix/.test(t) ? "Pix" : /(cartao|credito|debito|maquininha)/.test(t) ? "cartão na entrega" : /(dinheiro|especie)/.test(t) ? "dinheiro" : "";
    if (!pay) return { state: s, out: ["Aceitamos Pix, cartão ou dinheiro. Qual você prefere? 😊"] };
    s.stage = "done";
    const lines = s.cart.map((l) => `${l.qty}x ${l.name}: ${brl(l.price * l.qty)}`);
    return {
      state: s,
      out: [
        ["Seu pedido 🧾", "", ...lines, `Entrega: ${brl(FEE)}`, "", `Total: ${brl(total(s.cart) + FEE)} (${pay})`].join("\n"),
        "Pedido confirmado ✅ Já foi pra cozinha e chega em 35 a 45 min. Obrigada pela preferência! 💛",
      ],
    };
  }

  const burger = BURGERS.find((b) => b.re.test(t));

  if (s.stage === "combo" && !burger && s.last) {
    if (NO.test(t)) {
      s.stage = "dessert";
      return { state: s, out: [`Sem problemas! E uma sobremesa pra fechar? Brownie com calda por ${brl(BROWNIE)} 🍫`] };
    }
    if (YES.test(t) || /combo/.test(t)) {
      add({ name: "Combo batata + refri", price: COMBO, qty: s.last.qty, upsell: true });
      s.stage = "dessert";
      return { state: s, out: [`Fechado, virou combo! 🍟🥤`, `E pra fechar com chave de ouro: brownie com calda de chocolate por ${brl(BROWNIE)}. Vai um? 🍫`] };
    }
  }
  if (s.stage === "dessert" && !burger) {
    if (NO.test(t)) {
      s.stage = "address";
      return { state: s, out: ["Tranquilo!", askAddress] };
    }
    if (YES.test(t) || /brownie|sobremesa/.test(t)) {
      add({ name: "Brownie com calda", price: BROWNIE, qty: 1, upsell: true });
      s.stage = "more";
      return { state: s, out: ["Adicionado! 😍 Mais alguma coisa ou posso fechar o pedido?"] };
    }
  }
  if (s.stage === "more" && !burger && (NO.test(t) || CLOSE.test(t))) {
    s.stage = "address";
    return { state: s, out: [askAddress] };
  }

  // Pedido de lanche
  if (burger) {
    if (s.stage === "done") s.cart = [];
    const line: Line = { name: burger.name, price: burger.price, qty: qtyOf(t + " ") };
    add(line);
    s.last = line;
    s.stage = "combo";
    return { state: s, out: [`Boa escolha! ${burger.emoji} Anotei ${line.qty}x ${burger.name}.`, `Quer transformar em combo com batata e refri por mais ${brl(COMBO)}${line.qty > 1 ? " cada" : ""}? Quase todo mundo pede assim 😋`] };
  }
  if (/\b(coca|refri|refrigerante|guarana|bebida|suco)\b/.test(t)) {
    if (s.stage === "done") s.cart = [];
    add({ name: "Refri lata", price: 7, qty: qtyOf(t + " ") });
    s.stage = "more";
    return { state: s, out: ["Bebida anotada! 🥤 Mais alguma coisa ou posso fechar?"] };
  }
  if (/\b(batata|fritas)\b/.test(t)) {
    if (s.stage === "done") s.cart = [];
    add({ name: "Batata frita", price: 14, qty: qtyOf(t + " ") });
    s.stage = "more";
    return { state: s, out: ["Batata anotada! 🍟 Mais alguma coisa ou posso fechar?"] };
  }
  if (/\b(brownie|sobremesa|doce)\b/.test(t)) {
    if (s.stage === "done") s.cart = [];
    add({ name: "Brownie com calda", price: BROWNIE, qty: qtyOf(t + " ") });
    s.stage = "more";
    return { state: s, out: ["Brownie anotado! 🍫 Mais alguma coisa ou posso fechar?"] };
  }
  if (/\b(pizza|sushi|acai|marmita|pastel|esfiha|temaki|salgado)s?\b/.test(t)) {
    return { state: s, out: ["Aqui no Burger da Casa a especialidade é hambúrguer artesanal 🍔", "Quer que eu mande o cardápio? Tenho certeza que algum vai te conquistar 😋"] };
  }
  if (/\b(cardapio|menu|opcoes|o que tem|o que voces tem|tem o que|sabores|quero pedir|fazer um pedido|fazer pedido|pedir|fome|indica|sugestao|recomenda)\b/.test(t)) {
    return { state: s, out: [MENU] };
  }
  if (s.cart.length && s.stage !== "done" && CLOSE.test(t)) {
    s.stage = "address";
    return { state: s, out: [askAddress] };
  }

  // Dúvidas comuns
  if (/\b(horario|aberto|abre|fecha|funciona|ate que horas)\b/.test(t)) return { state: s, out: ["Estamos abertos hoje até as 23h30! 🕦 Quer ver o cardápio?"] };
  if (/\b(taxa|frete|entrega|entregam|bairro)\b/.test(t)) return { state: s, out: [`A entrega é ${brl(FEE)} até 5 km, e grátis em pedidos acima de R$ 80 🛵`] };
  if (/\b(demora|tempo|quanto tempo|minutos|chega)\b/.test(t)) return { state: s, out: ["Hoje está chegando em 35 a 45 minutos 🛵"] };
  if (/\b(promo|promocao|desconto|cupom|oferta)\b/.test(t)) return { state: s, out: ["De terça a quinta o combo duplo sai com 15% off! 🔥 E quem pede por aqui recebe as ofertas da semana em primeira mão."] };
  if (/\bifood\b/.test(t)) return { state: s, out: ["Pedindo por aqui você paga mais barato que no iFood 😉 e ainda recebe as nossas ofertas exclusivas no WhatsApp."] };
  if (/\b(pix|cartao|pagamento|pagar)\b/.test(t)) return { state: s, out: ["Aceitamos Pix, cartão e dinheiro 😊"] };
  if (/\b(obrigad[oa]|valeu|vlw|agradeco)\b/.test(t)) return { state: s, out: [s.stage === "done" ? "Imagina! Bom apetite e até a próxima 💛" : "Imagina! 😊 Qualquer coisa é só chamar."] };
  if (/\b(oi|ola|opa|eai|e ai|bom dia|boa tarde|boa noite|salve|hey)\b/.test(t)) {
    return { state: s, out: [`Oi! 👋 Aqui é a Bia, do ${STORE}. Tudo bem?`, "Quer ver o cardápio ou já sabe o que vai pedir? 😋"] };
  }

  if (s.cart.length && s.stage !== "done") return { state: s, out: ["Entendi! Quer adicionar mais alguma coisa ou posso fechar o pedido? 😊"] };
  return { state: s, out: ["Posso te mandar o cardápio? 😊 É só dizer o que está com vontade de comer hoje."] };
}

const CHIPS: Record<Stage, string[]> = {
  idle: ["Oi, boa noite!", "Me manda o cardápio", "Quero um smash burger"],
  combo: ["Quero o combo", "Não, só o lanche"],
  dessert: ["Pode mandar!", "Não, obrigado"],
  more: ["Só isso", "Quero uma coca também"],
  address: ["Rua das Flores, 120 - Centro"],
  payment: ["Pix", "Cartão"],
  done: ["Obrigado!", "Quero fazer outro pedido"],
};

const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export function AiChatDemo() {
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const [typing, setTyping] = React.useState(false);
  const [text, setText] = React.useState("");
  const [state, setState] = React.useState<State>({ stage: "idle", cart: [] });
  const stateRef = React.useRef(state);
  const box = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<number[]>([]);
  const nextId = React.useRef(1);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  React.useEffect(() => {
    // rola só a conversa (nunca a página)
    const el = box.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(raw: string) {
    const value = raw.trim().slice(0, 200);
    if (!value || typing) return;
    setText("");
    setMsgs((m) => [...m, { id: nextId.current++, me: true, text: value, time: now() }]);
    const { state: next, out } = respond(stateRef.current, value);
    stateRef.current = next;

    let delay = 450;
    setTyping(true);
    out.forEach((reply, i) => {
      delay += Math.min(2200, 650 + reply.length * 14);
      timers.current.push(
        window.setTimeout(() => {
          setMsgs((m) => [...m, { id: nextId.current++, me: false, text: reply, time: now() }]);
          if (i === out.length - 1) {
            setTyping(false);
            setState(next);
          }
        }, delay),
      );
      delay += 250;
    });
  }

  const base = state.cart.filter((l) => !l.upsell).reduce((a, l) => a + l.price * l.qty, 0);
  const extra = state.cart.filter((l) => l.upsell).reduce((a, l) => a + l.price * l.qty, 0);
  const chips = typing ? [] : CHIPS[state.stage];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[1fr_minmax(0,25rem)] lg:gap-16">
      {/* Texto + valor do pedido */}
      <div className="lg:sticky lg:top-10">
        <ul className="m-0 grid list-none gap-3 p-0 text-[16px] text-white/80">
          {["Responde na hora, 24 horas por dia, até no pico de sexta à noite", "Anota o pedido sem erro e não deixa ninguém esperando", "Oferece combo e sobremesa no momento certo: o ticket sobe sozinho"].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-yellow text-black">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
              </span>
              <span className="min-w-0">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-white/12 bg-panel p-5 sm:p-6" aria-live="polite">
          <p className="m-0 text-sm font-extrabold uppercase tracking-wider text-yellow">Valor do pedido agora</p>
          <p className="m-0 mt-2 text-4xl font-black tabular-nums text-white">{brl(base + extra)}</p>
          <p className="m-0 mt-2 min-h-6 text-[15px] text-white/70">
            {extra > 0 ? (
              <>
                <b className="text-yellow">+{brl(extra)}</b> vieram das sugestões da IA ({Math.round((extra / Math.max(base, 1)) * 100)}% a mais no ticket)
              </>
            ) : base > 0 && state.stage === "done" ? (
              "Pedido fechado em segundos, sem ninguém esperando na fila."
            ) : base > 0 ? (
              "Agora veja a IA oferecer combo e sobremesa…"
            ) : (
              "Faça um pedido na conversa e veja o valor subir."
            )}
          </p>
        </div>

        <div className={`mt-6 transition duration-500 ${state.stage === "done" ? "opacity-100" : "opacity-70"}`}>
          <WhatsappLink placement="ia_demo" size="lg" icon={false} className={`pl-5 text-base sm:pl-7 sm:text-lg ${state.stage === "done" ? "animate-pulse-ring" : ""}`}>
            Quero essa IA no meu delivery
          </WhatsappLink>
        </div>
      </div>

      {/* Celular com o WhatsApp */}
      <div className="mx-auto w-full max-w-[25rem] overflow-hidden rounded-[2rem] border-[6px] border-[#1c1c1c] bg-[#0b141a] shadow-[0_40px_80px_-30px_rgba(255,209,5,.25)] max-lg:order-first">
        <div className="flex items-center gap-3 bg-[#202c33] px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-yellow text-lg" aria-hidden="true">🍔</span>
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate font-bold text-white">{STORE}</p>
            <p className={`m-0 text-xs ${typing ? "text-[#25d366]" : "text-white/60"}`}>{typing ? "digitando…" : "online"}</p>
          </div>
          <span className="rounded-full bg-yellow px-2.5 py-1 text-[11px] font-extrabold uppercase text-black">IA</span>
        </div>

        <div
          ref={box}
          role="log"
          aria-label="Conversa de demonstração com a IA de atendimento"
          className="no-scrollbar h-[26rem] space-y-2 overflow-y-auto overscroll-contain px-3 py-4 sm:h-[28rem]"
          style={{ backgroundImage: "radial-gradient(rgb(255 255 255 / .035) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        >
          <p className="mx-auto mb-3 mt-0 w-fit max-w-[90%] rounded-lg bg-[#182229] px-3 py-1.5 text-center text-xs leading-snug text-[#ffd279]">
            Demonstração com um delivery fictício. Escreva como se fosse um cliente com fome 🍔
          </p>
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.me ? "justify-end" : "justify-start"} animate-[fade-up_.25s_ease-out_both]`}>
              <div className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 pb-1.5 pt-2 text-[15px] leading-snug text-white shadow ${m.me ? "rounded-tr-none bg-[#005c4b]" : "rounded-tl-none bg-[#202c33]"}`}>
                {m.text}
                <span className="float-right ml-3 mt-1.5 flex items-center gap-1 text-[11px] leading-none text-white/55">
                  {m.time}
                  {m.me && (
                    <svg viewBox="0 0 18 12" className="h-2.5 w-4 text-[#53bdeb]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-label="lida"><path d="m1 6.5 3 3 6-7M7.5 9.5l1 0 6-7" /></svg>
                  )}
                </span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-lg rounded-tl-none bg-[#202c33] px-4 py-3" aria-label="digitando">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex min-h-12 flex-wrap gap-2 bg-[#0b141a] px-3 pb-2">
          {chips.map((c) => (
            <button key={c} type="button" onClick={() => send(c)} className="rounded-full border border-[#25d366]/50 px-3 py-1.5 text-[13px] font-semibold text-[#25d366] transition hover:bg-[#25d366] hover:text-black">
              {c}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-2 bg-[#202c33] p-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            enterKeyHint="send"
            aria-label="Escreva uma mensagem"
            placeholder="Mensagem"
            className="h-11 min-w-0 flex-1 rounded-full bg-[#2a3942] px-4 text-base text-white outline-none placeholder:text-white/45 focus:ring-2 focus:ring-[#25d366]/60"
          />
          <button type="submit" aria-label="Enviar mensagem" disabled={!text.trim() || typing} className="grid size-11 shrink-0 place-items-center rounded-full bg-[#00a884] text-white transition disabled:opacity-50">
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.3 10l12.6 2-12.6 2z" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}
