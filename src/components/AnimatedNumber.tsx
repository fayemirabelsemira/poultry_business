import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

const fmt = (n: number) => `₱${Math.round(n).toLocaleString("en-PH")}`;

/** Peso amount that counts up or down to its new value. */
export const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      shown.current = value;
      el.textContent = fmt(value);
      return;
    }
    const state = { v: shown.current };
    const tween = gsap.to(state, {
      v: value,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        shown.current = state.v;
        el.textContent = fmt(state.v);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(value)}
    </span>
  );
};
