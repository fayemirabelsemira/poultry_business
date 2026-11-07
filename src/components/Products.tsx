import { Plus } from "lucide-react";
import { PRODUCTS, type EggSize } from "../data/products";
import { scrollToHash } from "../lib/smooth";
import { EggImage } from "./EggImage";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

export const Products = () => {
  // Adds a tray in the Order Builder (it listens for this event) and jumps there.
  const addTray = (size: EggSize) => {
    window.dispatchEvent(new CustomEvent<EggSize>("add-tray", { detail: size }));
    scrollToHash("#order");
  };

  return (
    <section id="products" className="bg-cream py-20 md:py-28">
      <div className="container mx-auto px-5">
        <SectionHeading
          eyebrow="Our eggs"
          title="Pick your size"
          subtitle="Prices are per tray and may vary. We confirm the final price when you order."
        />

        <Reveal
          stagger={0.12}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-px-5 px-5 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
        >
          {PRODUCTS.map((p) => (
            <SpotlightCard
              key={p.size}
              className="basis-[82%] shrink-0 snap-center rounded-3xl bg-white shadow-sm ring-1 ring-black/5 sm:basis-[46%] md:basis-auto"
            >
              <div className="relative bg-[#EFE6D2]">
                <EggImage imageKey={p.imageKey} alt={p.alt} className="h-44 w-full" />
                <span className="absolute left-4 top-4 rounded-full bg-forestGreen px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream">
                  {p.size}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-forestGreen">{p.size} Eggs</h3>
                <p className="mt-1 text-sm text-gray-600">{p.blurb}</p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-semibold tabular-nums text-darkText">
                    ₱{p.minPrice}–{p.maxPrice}
                  </span>
                  <span className="text-sm text-gray-500">per tray</span>
                </p>
                <button
                  type="button"
                  onClick={() => addTray(p.size)}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-forestGreen font-medium text-white transition hover:bg-forestGreen/90 active:scale-[0.98]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" /> Add a tray
                </button>
              </div>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
