import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

/** Image that wipes in and settles from a slight zoom as it scrolls into view. */
export const ImageReveal = ({ src, alt, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const img = el.querySelector("img");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut" }
      );
      if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "power3.out" }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
    </div>
  );
};
