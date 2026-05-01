import { createFileRoute } from "@tanstack/react-router";
import { HeroCanvas } from "../components/HeroCanvas";
import { ProductSection } from "@/components/ProductSection";
import { DropFooter } from "@/components/DropFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SWAGLABEL — YOU ARE NOT ALONE" },
      {
        name: "description",
        content:
          "Drop YOU ARE NOT ALONE — pré-venda 01/04/2026, night release. Streetwear underground por SWAGLABEL.",
      },
      { property: "og:title", content: "SWAGLABEL — YOU ARE NOT ALONE" },
      {
        property: "og:description",
        content: "Night release 01/04/2026.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-black text-white">
      {/* Seção Visual de Abertura */}
      <HeroCanvas />

      {/* Camisa 01: Branco (Pure Black Ink) */}
      <ProductSection
        index="01"
        image="/mockups/branco.png" 
        bg="#FFFFFF" 
        ink="#000000" 
        inkName="PURE BLACK"
      />

      {/* Camisa 02: Amarelo (Electric Yellow) */}
      <ProductSection
        index="02"
        image="/mockups/amarelo.png" 
        bg="#000000" 
        ink="#D2D900" 
        inkName="ELECTRIC YELLOW"
        reverse={true}
      />

      {/* Camisa 03: Azul (Deep Blue) */}
      <ProductSection
        index="03"
        image="/mockups/azul.png" 
        bg="#000000" 
        ink="#021F5E" 
        inkName="DEEP BLUE"
      />

      {/* Rodapé com link Nuvemshop e Marquee */}
      <DropFooter />
    </main>
  );
}