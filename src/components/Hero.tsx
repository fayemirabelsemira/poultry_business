import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowRight, MapPin, Truck } from "lucide-react";
import { BUSINESS } from "../data/business";
import { farmImage } from "../lib/assets";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { Magnetic } from "./Magnetic";
import { SplitText } from "./SplitText";

export const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const bg = farmImage("farm-3"); // poultry house photo

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-bg", { scale: 1.18 }, { scale: 1, duration: 2.4, ease: "power3.out" });
      gsap.from(".split-word", {
        yPercent: 115,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.07,
        delay: 0.15,
      });
      gsap.from(".hero-fade", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.65,
      });
      gsap.to(".hero-parallax", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forestGreen">
      <div className="hero-parallax absolute inset-x-0 -top-[12%] -z-10 h-[124%]">
        {bg && (
          <img
            src={bg}
            alt=""
            decoding="async"
            className="hero-bg h-full w-full object-cover object-[38%_50%]"
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-forestGreen/55 to-forestGreen/95" />

      <div className="container mx-auto px-5 pb-14 pt-28 md:pb-24">
        <p className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-eggshellGold" aria-hidden="true" />
          Egg supplier · Rosario, Batangas
        </p>

        <h1 className="max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
          <SplitText text="Fresh Eggs." />{" "}
          <SplitText text="Straight to Your Table." className="italic text-eggshellGold" />
        </h1>

        <p className="hero-fade mt-5 max-w-xl text-base text-cream/85 md:text-lg">
          Contact us to inquire about Small, Medium, and Large eggs. Order by SMS or WhatsApp in under a
          minute.
        </p>

        <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row">
          <Magnetic className="block w-full sm:w-auto">
            <a
              href="#order"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-eggshellGold px-8 font-semibold text-darkText transition-colors hover:bg-white sm:w-auto"
            >
              Order Eggs Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Magnetic>
          <a
            href="#products"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 px-8 font-medium text-cream backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
          >
            Explore Our Products
          </a>
        </div>

        <ul className="hero-fade mt-10 grid max-w-2xl gap-4 text-sm text-cream/85 sm:grid-cols-2">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-eggshellGold" aria-hidden="true" />
            <span>
              <span className="block text-[0.7rem] uppercase tracking-wider text-cream/60">Landmark</span>
              {BUSINESS.landmark}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-eggshellGold" aria-hidden="true" />
            <span>
              <span className="block text-[0.7rem] uppercase tracking-wider text-cream/60">
                Delivery coverage
              </span>
              {BUSINESS.deliveryCoverage}
            </span>
          </li>
        </ul>
      </div>

      <a
        href="#products"
        aria-label="Scroll to products"
        className="hero-fade absolute bottom-8 right-8 hidden h-11 w-11 place-items-center rounded-full border border-white/30 text-cream md:grid"
      >
        <ArrowDown className="scroll-cue h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
};
