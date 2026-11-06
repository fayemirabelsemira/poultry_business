import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Nudges its child toward the cursor on hover. Mouse devices only; no-op on touch. */
export const Magnetic = ({ children, strength = 0.25, className = "" }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
};
