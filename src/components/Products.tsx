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
    <section id="products" className="bg-cream py-9 md:py-28">
      <div className="container mx-auto px-4 sm:px-5">
        <SectionHeading
          eyebrow="Our eggs"
          title="Pick your size"
          subtitle="Prices are per tray and may vary. We confirm the final price when you order."
        />

        <Reveal
          stagger={0.12}
          className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 md:mt-12 md:gap-6"
        >
          {PRODUCTS.map((p) => (
            <SpotlightCard
              key={p.size}
              className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 md:rounded-3xl"
            >
              <div className="relative bg-[#EFE6D2]">
                <EggImage imageKey={p.imageKey} alt={p.alt} className="h-20 w-full !p-2 sm:h-32 md:h-44 md:!p-5" />
                <span className="absolute left-4 top-4 hidden rounded-full bg-forestGreen px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream md:block">
                  {p.size}
                </span>
              </div>
              <div className="flex flex-col p-2.5 sm:p-4 md:p-6">
                <h3 className="font-display text-base font-semibold text-forestGreen sm:text-xl md:text-2xl">
                  {p.size}
                  <span className="hidden sm:inline"> Eggs</span>
                </h3>
                <p className="mt-1 hidden text-sm text-gray-600 sm:block">{p.blurb}</p>
                <p className="mt-1.5 flex flex-col sm:mt-3 sm:flex-row sm:items-baseline sm:gap-1.5 md:mt-5">
                  <span className="whitespace-nowrap font-display text-[0.95rem] font-semibold tabular-nums text-darkText sm:text-2xl md:text-3xl">
                    ₱{p.minPrice}–{p.maxPrice}
                  </span>
                  <span className="text-[0.65rem] text-gray-500 sm:text-sm">per tray</span>
                </p>
                <button
                  type="button"
                  onClick={() => addTray(p.size)}
                  aria-label={`Add a tray of ${p.size.toLowerCase()} eggs`}
                  className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1 rounded-lg bg-forestGreen text-xs font-medium text-white transition hover:bg-forestGreen/90 active:scale-[0.98] sm:mt-4 sm:h-11 sm:gap-2 sm:rounded-xl sm:text-sm md:mt-6 md:h-12 md:text-base"
                >
                  <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
                  Add<span className="hidden sm:inline"> a tray</span>
                </button>
              </div>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
