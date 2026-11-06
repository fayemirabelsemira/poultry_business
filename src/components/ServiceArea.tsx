import { MapPin } from "lucide-react";
import { BUSINESS } from "../data/business";
import { Reveal } from "./Reveal";

export const ServiceArea = () => (
  <section id="service-area" className="relative overflow-hidden bg-forestGreen py-9 text-cream md:py-28">
    <Reveal className="container relative mx-auto max-w-3xl px-4 text-center sm:px-5">
      <div className="relative mx-auto mb-3 grid h-10 w-10 place-items-center md:mb-8 md:h-16 md:w-16">
        <span className="pulse-ring absolute inset-0 rounded-full bg-eggshellGold/50" aria-hidden="true" />
        <span className="pulse-ring absolute inset-0 rounded-full bg-eggshellGold/50 [animation-delay:1.3s]" aria-hidden="true" />
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-eggshellGold text-forestGreen md:h-16 md:w-16">
          <MapPin className="h-4 w-4 md:h-7 md:w-7" aria-hidden="true" />
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-eggshellGold">Service area</p>
      <h2 className="mt-2 font-display text-[1.4rem] font-semibold leading-tight text-balance sm:text-4xl md:mt-3 md:text-5xl">
        Where we deliver
      </h2>
      <p className="mt-2 text-sm md:mt-5 md:text-lg">{BUSINESS.deliveryCoverage}.</p>
      <p className="mt-2 text-sm text-cream/75 md:mt-3 md:text-base">
        <span className="font-medium text-cream">Landmark:</span> {BUSINESS.landmark}
      </p>
      <p className="mt-3 text-[0.7rem] text-cream/70 md:mt-6 md:text-sm">
        Outside the delivery area? You can still arrange pickup at our farm.
      </p>
    </Reveal>
  </section>
);
