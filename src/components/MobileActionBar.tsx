import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SMS_NUMBERS, WHATSAPP_URL } from "../data/contacts";

/** Thumb-reach shortcuts that slide in after the hero on phones. */
export const MobileActionBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom)] transition-[transform,visibility] duration-300 md:hidden ${
        show ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="mx-3 mb-3 flex gap-2 rounded-2xl bg-forestGreen/95 p-2 shadow-2xl shadow-black/30 backdrop-blur">
        <a
          href="#order"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-eggshellGold font-semibold text-darkText transition-transform active:scale-[0.98]"
        >
          Order eggs
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white transition-transform active:scale-95"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={`sms:${SMS_NUMBERS[0]}`}
          aria-label="Send an SMS"
          className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white transition-transform active:scale-95"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
