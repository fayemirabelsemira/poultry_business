import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, animates the direct children one after another instead of the wrapper. */
  stagger?: number;
  as?: ElementType;
}

/** Fades and lifts content into view when it scrolls into the viewport. */
export const Reveal = ({ children, className, delay = 0, y = 28, stagger, as: Tag = "div" }: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
