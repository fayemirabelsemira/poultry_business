import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

const HEADER_OFFSET = 56;

/** Starts Lenis smooth scrolling and syncs it with GSAP ScrollTrigger. Returns a cleanup function. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {};

  const instance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true, // touch devices keep native momentum scrolling
  });
  lenis = instance;

  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}

/** Smoothly scrolls to a #hash target (uses Lenis when active, native scrolling otherwise). */
export function scrollToHash(hash: string) {
  const isTop = hash === "#top";
  const el = isTop ? null : document.querySelector<HTMLElement>(hash);
  if (!isTop && !el) return;

  if (lenis) {
    lenis.scrollTo(isTop ? 0 : (el as HTMLElement), {
      offset: isTop ? 0 : -HEADER_OFFSET,
      force: true,
    });
    return;
  }

  const top = isTop ? 0 : (el as HTMLElement).getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
