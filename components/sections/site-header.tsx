import { WhatsappLink } from "@/components/whatsapp-link";
import { Logo } from "@/components/sections/logo";

const nav = [
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#para-quem", label: "Pra quem é" },
  { href: "#servicos", label: "O que fazemos" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#topo" aria-label="2Simples — início" className="shrink-0">
          <Logo />
        </a>
        <div className="flex items-center gap-6">
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-5 text-[15px] text-ink/60">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <WhatsappLink placement="header" icon={false}>
            <span className="hidden sm:inline">Falar com Consultor</span>
            <span className="sm:hidden">Consultor</span>
          </WhatsappLink>
        </div>
      </div>
    </header>
  );
}
