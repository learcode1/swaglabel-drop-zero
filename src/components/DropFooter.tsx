import { motion } from "framer-motion";

export function DropFooter() {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden border-t border-white/10 grain">
      {/* Marquee com Logo */}
      <div className="overflow-hidden border-b border-white/10 py-4">
        <motion.div
          className="flex gap-12 whitespace-nowrap font-street text-3xl md:text-5xl items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              YOU ARE NOT ALONE
              {/* Logo da Marca - Substitua o src pelo caminho real do seu arquivo de logo */}
              <img 
                src="/mockups/logo.png"
                alt="SWAGLABEL LOGO" 
                className="h-8 md:h-12 w-auto object-contain brightness-0 invert" 
              />
              <p></p>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-6 md:px-12 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="font-marker text-[10px] tracking-[0.4em] text-white/40 mb-6">
          ※ DROP INFO ※
        </div>

        <h3
          className="font-street leading-[0.85] -rotate-1"
          style={{ fontSize: "clamp(2.8rem, 11vw, 9rem)" }}
        >
          PRÉ-VENDA
        </h3>
        <h3
          className="font-glitch mt-2"
          style={{ fontSize: "clamp(2rem, 9vw, 7rem)" }}
        >
          01 · 04 · 2026
        </h3>

        <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 border border-white/30 skew-tag font-marker text-xs md:text-sm tracking-[0.3em]">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          NIGHT RELEASE
        </div>

        <p className="mt-10 max-w-md font-marker text-sm text-white/60">
          Quem sente, encontra.
        </p>

        <a 
          href="https://swaglabel2.lojavirtualnuvem.com.br/produtos/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 group relative font-street text-xl md:text-2xl px-10 py-4 border-2 border-white text-white -rotate-1 hover:rotate-0 transition-transform duration-300 block"
        >
          <span className="relative z-10 group-hover:text-black transition-colors">
            ADQUIRIR AGORA
          </span>
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </a>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-marker text-[10px] tracking-[0.3em] text-white/40">
        <div>© SWAGLABEL · MMXXVI</div>
        <div>NOT FOR EVERYONE</div>
        <div>RJ · BR</div>
      </div>
    </footer>
  );
}