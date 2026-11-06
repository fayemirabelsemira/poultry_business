import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SMS_NUMBERS, WHATSAPP_URL } from "../data/contacts";

/** Thumb-reach shortcuts that slide in after the hero on phones. */
export const MobileActionBar = () => {
  const [show, setShow] = useState(false);
  const [inOrder, setInOrder] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The order form and the contact section have their own send buttons, so tuck the bar away there.
  const [inFooter, setInFooter] = useState(false);
  useEffect(() => {
    const targets: [Element | null, (v: boolean) => void][] = [
      [document.getElementById("order"), setInOrder],
      [document.getElementById("contact"), setInFooter],
    ];
    const observers = targets.flatMap(([el, set]) => {
      if (!el) return [];
      const io = new IntersectionObserver(([entry]) => set(entry.isIntersecting), { threshold: 0.05 });
      io.observe(el);
      return [io];
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const visible = show && !inOrder && !inFooter;

  return (
    <div
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
      className={`fixed inset-x-0 bottom-0 z-30 transition-[transform,visibility] duration-300 md:hidden ${
        visible ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="mx-3 flex gap-1.5 rounded-xl bg-forestGreen/95 p-1.5 shadow-xl shadow-black/25 backdrop-blur">
        <a
          href="#order"
          className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-eggshellGold text-sm font-semibold text-darkText transition-transform active:scale-[0.98]"
        >
          Order eggs
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white transition-transform active:scale-95"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={`sms:${SMS_NUMBERS[0]}`}
          aria-label="Send an SMS"
          className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white transition-transform active:scale-95"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
