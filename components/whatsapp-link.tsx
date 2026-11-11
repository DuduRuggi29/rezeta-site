"use client";

import * as React from "react";
import { site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"] as const;
const STORE = "2s_attr";

/** Guarda a origem do clique (UTM / gclid) na primeira visita para atribuir o lead no WhatsApp. */
export function readAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  let saved: Record<string, string> = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(STORE) || "{}");
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const key of ATTR_KEYS) {
    const v = params.get(key);
    if (v) fresh[key] = v.slice(0, 120);
  }
  const merged = Object.keys(fresh).length ? fresh : saved;
  try {
    sessionStorage.setItem(STORE, JSON.stringify(merged));
  } catch {}
  return merged;
}

/** Código curto que vai no fim da mensagem: permite saber no WhatsApp de qual campanha/palavra veio o lead. */
function attributionTag(attr: Record<string, string>) {
  const parts: string[] = [];
  if (attr.gclid || attr.gbraid || attr.wbraid) parts.push("google-ads");
  else if (attr.fbclid) parts.push("meta-ads");
  else if (attr.utm_source) parts.push(attr.utm_source);
  if (attr.utm_campaign) parts.push(attr.utm_campaign);
  if (attr.utm_term) parts.push(`kw:${attr.utm_term}`);
  return parts.length ? `\n\n[origem: ${parts.join(" | ")}]` : "";
}

export function trackWhatsapp(placement: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "whatsapp_click", cta_placement: placement });
  if (site.googleAdsId && site.googleAdsWhatsappLabel && window.gtag) {
    window.gtag("event", "conversion", { send_to: `${site.googleAdsId}/${site.googleAdsWhatsappLabel}` });
  }
  window.fbq?.("track", "Contact", { content_name: placement });
}

export function openWhatsapp(message: string, placement: string) {
  const href = whatsappHref(message + attributionTag(readAttribution()));
  trackWhatsapp(placement);
  const w = window.open(href, "_blank", "noopener");
  if (!w) window.location.href = href;
}

export const FORM_ID = "formulario";

/** Rola até o formulário e coloca o cursor no primeiro campo vazio. */
export function goToForm() {
  const form = document.getElementById(FORM_ID);
  if (!form) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  const empty = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select")].find((f) => !f.value.trim());
  window.setTimeout(() => empty?.focus({ preventScroll: true }), reduced ? 0 : 650);
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

interface WhatsappLinkProps extends Omit<React.ComponentProps<"a">, "href"> {
  placement: string;
  message?: string;
  variant?: "primary" | "black" | "outline" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
}

/** CTA da página: rola até o formulário (o WhatsApp só abre depois que ele é preenchido). */
export function WhatsappLink({
  placement,
  message: _message,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  children,
  ...rest
}: WhatsappLinkProps) {
  return (
    <a
      {...rest}
      href={`#${FORM_ID}`}
      data-cta={placement}
      onClick={(e) => {
        e.preventDefault();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "cta_click", cta_placement: placement });
        goToForm();
        rest.onClick?.(e);
      }}
      className={cn(
        "[&_*]:pointer-events-none group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xl font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        size === "lg" ? "h-16 pl-7 pr-2.5 text-lg" : "h-11 pl-5 pr-1.5 text-[15px]",
        variant === "primary" && "btn-yellow hover:-translate-y-0.5",
        variant === "black" && "btn-black hover:-translate-y-0.5",
        variant === "outline" && "border border-white/15 bg-white/5 px-5 text-white hover:bg-white/10",
        variant === "ghost" && "px-4 text-foreground hover:text-red",
        className,
      )}
    >
      {icon && variant !== "primary" && variant !== "black" && <WhatsappIcon className="relative size-5 shrink-0" />}
      <span className="relative">{children}</span>
      {(variant === "primary" || variant === "black") && (
        <span
          aria-hidden="true"
          className={cn(
            "relative grid shrink-0 place-items-center rounded-lg bg-current/15 transition-transform duration-200 group-hover:translate-x-0.5",
            size === "lg" ? "size-11" : "size-8",
          )}
        >
          {icon ? (
            <WhatsappIcon className={size === "lg" ? "size-5" : "size-4"} />
          ) : (
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          )}
        </span>
      )}
    </a>
  );
}
