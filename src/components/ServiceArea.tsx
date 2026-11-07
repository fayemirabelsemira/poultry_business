import { MapPin } from "lucide-react";
import { BUSINESS } from "../data/business";
import { Reveal } from "./Reveal";

export const ServiceArea = () => (
  <section id="service-area" className="relative overflow-hidden bg-forestGreen py-20 text-cream md:py-28">
    <Reveal className="container relative mx-auto max-w-3xl px-5 text-center">
      <div className="relative mx-auto mb-8 grid h-16 w-16 place-items-center">
        <span className="pulse-ring absolute inset-0 rounded-full bg-eggshellGold/50" aria-hidden="true" />
        <span className="pulse-ring absolute inset-0 rounded-full bg-eggshellGold/50 [animation-delay:1.3s]" aria-hidden="true" />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-eggshellGold text-forestGreen">
          <MapPin className="h-7 w-7" aria-hidden="true" />
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-eggshellGold">Service area</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl md:text-5xl">
        Where we deliver
      </h2>
      <p className="mt-5 text-lg">{BUSINESS.deliveryCoverage}.</p>
      <p className="mt-3 text-cream/75">
        <span className="font-medium text-cream">Landmark:</span> {BUSINESS.landmark}
      </p>
      <p className="mt-6 text-sm text-cream/70">
        Outside the delivery area? You can still arrange pickup at our farm.
      </p>
    </Reveal>
  </section>
);
