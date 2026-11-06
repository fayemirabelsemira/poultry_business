import { useRef, type PointerEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

/** Card with a soft glow that follows the mouse (styles live in globals.css). */
export const SpotlightCard = ({ children, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`spotlight relative overflow-hidden ${className}`}>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
