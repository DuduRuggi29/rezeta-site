export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-red text-[15px] font-black tracking-tight text-white">
        2S
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-[17px] font-semibold tracking-tight ${tone === "dark" ? "text-ink" : "text-white"}`}>2Simples</span>
        <span className={`mt-1 max-[400px]:hidden text-[10px] font-medium uppercase tracking-[0.16em] ${tone === "dark" ? "text-ink/50" : "text-white/50"}`}>
          Captação e Conversão
        </span>
      </span>
    </span>
  );
}
