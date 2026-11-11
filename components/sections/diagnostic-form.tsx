"use client";

import * as React from "react";
import { openWhatsapp, WhatsappIcon } from "@/components/whatsapp-link";

const segments = [
  "Saúde / Clínica",
  "Advocacia",
  "Imobiliária / Construção",
  "Energia solar",
  "Educação / Cursos",
  "Serviços B2B",
  "Varejo / Loja",
  "Estética / Beleza",
  "Outro",
];

const budgets = ["Ainda não invisto", "Até R$ 2 mil/mês", "R$ 2 mil a R$ 5 mil/mês", "R$ 5 mil a R$ 15 mil/mês", "Acima de R$ 15 mil/mês"];

const goals = ["Gerar mais leads no WhatsApp", "Vender mais online", "Atrair clientes locais", "Reduzir custo por lead", "Estruturar o marketing do zero"];

const field =
  "h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-[15px] text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25";

export function DiagnosticForm() {
  const [sent, setSent] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const message = [
      "Olá, equipe 2Simples! Quero meu diagnóstico gratuito.",
      "",
      `*Nome:* ${get("nome")}`,
      `*Empresa:* ${get("empresa")}`,
      `*Segmento:* ${get("segmento")}`,
      `*Investimento atual em anúncios:* ${get("investimento")}`,
      `*Objetivo:* ${get("objetivo")}`,
    ].join("\n");
    openWhatsapp(message, "form_diagnostico");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" aria-describedby="form-nota">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Seu nome</span>
          <input name="nome" required autoComplete="name" placeholder="Como podemos te chamar?" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Empresa</span>
          <input name="empresa" required autoComplete="organization" placeholder="Nome da empresa" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="text-muted-foreground">Segmento</span>
        <select name="segmento" required defaultValue="" className={field}>
          <option value="" disabled>
            Selecione
          </option>
          {segments.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Investimento em anúncios</span>
          <select name="investimento" required defaultValue="" className={field}>
            <option value="" disabled>
              Selecione
            </option>
            {budgets.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Principal objetivo</span>
          <select name="objetivo" required defaultValue="" className={field}>
            <option value="" disabled>
              Selecione
            </option>
            {goals.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex h-14 items-center justify-center gap-2 btn-gold rounded-full px-7 text-base font-semibold transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <WhatsappIcon className="size-5" />
        Receber diagnóstico grátis
      </button>
      <p id="form-nota" className="text-center text-xs text-muted-foreground" aria-live="polite">
        {sent
          ? "Abrimos o WhatsApp com suas respostas — é só tocar em enviar."
          : "Ao enviar, você será direcionado ao nosso WhatsApp. Sem spam e sem compromisso."}
      </p>
    </form>
  );
}
