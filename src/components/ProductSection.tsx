import { motion } from "framer-motion";

interface ProductProps {
  index: string;
  image: string; 
  bg: string;    
  ink: string;   
  inkName: string;
  reverse?: boolean;
}

export function ProductSection({
  index,
  image,
  bg,
  ink,
  inkName,
  reverse,
}: ProductProps) {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden grain border-t border-white/10">
      {/* Indicadores de Topo */}
      <div className="absolute top-6 left-5 md:left-10 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
        {index} / 003
      </div>
      <div className="absolute top-6 right-5 md:right-10 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
        SWAGLABEL
      </div>

      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center min-h-screen w-full`}
      >
        {/* MOCKUP REAL - Referenciando a pasta /mockups/ conforme estrutura do projeto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full md:w-1/2 flex items-center justify-center py-12 md:py-0"
        >
          <div className="relative w-[85%] max-w-[500px] aspect-[4/5] flex items-center justify-center">
            <img 
              src={image} 
              alt={`Item do Drop ${index}`}
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            />
          </div>
        </motion.div>

        {/* CONTEÚDO COM ESPECIFICAÇÕES DETALHADAS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full md:w-1/2 px-6 md:px-20 flex flex-col justify-center items-start"
        >
          <div className="font-mono text-[10px] tracking-[0.6em] text-white/40 mb-8 uppercase">
            Especificações Técnicas
          </div>

          {/* SKEW-TAGS COM AS INFOS PREMIUM */}
          <div className="flex flex-wrap gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
            <span className="px-3 py-2 border border-white/20 -skew-x-12 bg-transparent">
              Fio 30.1 Penteado
            </span>
            <span className="px-3 py-2 border border-white/20 -skew-x-12 bg-transparent">
              175g/m²
            </span>
            <span className="px-3 py-2 border border-white/20 -skew-x-12 bg-transparent">
              CORTE BOXY
            </span>
            <span className="px-3 py-2 border border-white/20 -skew-x-12 bg-transparent">
              Gola Reforçada
            </span>
            <span 
              className="px-4 py-2 -skew-x-12 font-bold transition-transform hover:scale-105 duration-300"
              style={{ 
                backgroundColor: ink, 
                /* Lógica de contraste dinâmico para as cores solicitadas */
                color: (ink.toUpperCase() === "#D2D900" || ink.toUpperCase() === "#FFFFFF") ? "#000000" : "#FFFFFF" 
              }}
            >
              ESTAMPA {inkName}
            </span>
          </div>

          {/* TEXTO DE CONCEITO */}
          <p className="mt-8 font-mono text-[11px] text-white/60 tracking-[0.1em] max-w-[400px]">
            Qualidade, conceito e atitude em uma só peça. <br/>
            Caimento estiloso e confortável.
          </p>

          <div className="mt-12 inline-block font-sans font-black text-2xl md:text-4xl border-l-8 border-white pl-6 py-2 uppercase italic -skew-x-6">
            YOU ARE <br /> NOT ALONE
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <div className="opacity-30 font-mono text-[9px] tracking-[0.5em] uppercase">
              DROP LIMITADO · 01.04.2026
            </div>
            <div className="font-mono text-[10px] text-white/60 tracking-[0.3em] uppercase">
              ※ LIBERAÇÃO NOTURNA ※
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}