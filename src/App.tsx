import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Products } from "./components/Products";
import { AboutUs } from "./components/AboutUs";
import { HowToOrder } from "./components/HowToOrder";
import { OrderBuilder } from "./components/OrderBuilder";
import { ServiceArea } from "./components/ServiceArea";
import { Contact } from "./components/Contact";
import { BUSINESS } from "./data/business";
import { ScrollTrigger } from "./lib/motion";
import { initSmoothScroll, scrollToHash } from "./lib/smooth";

const MARQUEE_ITEMS = [
  "Small eggs",
  "Medium eggs",
  "Large eggs",
  "Order by SMS or WhatsApp",
  BUSINESS.deliveryCoverage,
];

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();

    // Route in-page #links through Lenis (or native smooth scrolling as a fallback).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      if (hash !== "#top" && !document.querySelector(hash)) return;
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    // Recalculate trigger positions once fonts and images have settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      cleanup();
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <Products />
      <AboutUs />
      <HowToOrder />
      <OrderBuilder />
      <ServiceArea />
      <Contact />
    </Layout>
  );
}
