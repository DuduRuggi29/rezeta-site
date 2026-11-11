"use client";

import * as React from "react";
import { WhatsappIcon, WhatsappLink } from "@/components/whatsapp-link";

/** Barra fixa no mobile (onde vem a maior parte do tráfego do Google Ads) e botão flutuante no desktop. */
export function FloatingCta() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <WhatsappLink placement="sticky_mobile" size="lg" className="w-full justify-between" tabIndex={show ? 0 : -1}>
          Falar com Consultor
        </WhatsappLink>
      </div>
      <WhatsappLink
        placement="floating_desktop"
        icon={false}
        aria-label="Falar no WhatsApp"
        className={`fixed bottom-6 right-6 z-50 hidden size-14 bg-whatsapp p-0 text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,.6)] transition-all md:inline-flex ${
          show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
        }`}
        variant="ghost"
        tabIndex={show ? 0 : -1}
      >
        <WhatsappIcon className="size-7" />
      </WhatsappLink>
    </>
  );
}
