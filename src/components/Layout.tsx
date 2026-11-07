import { useEffect, useState, type ReactNode } from "react";
import { Egg, MessageCircle, Menu, Phone, X } from "lucide-react";
import { BUSINESS } from "../data/business";
import { SMS_NUMBERS, WHATSAPP_URL, formatPH } from "../data/contacts";
import { getLenis } from "../lib/smooth";
import { MobileActionBar } from "./MobileActionBar";

const NAV = [
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#how-to-order", label: "How to order" },
  { href: "#order", label: "Order" },
  { href: "#service-area", label: "Service area" },
  { href: "#contact", label: "Contact" },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-forestGreen"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          solid ? "bg-forestGreen/95 shadow-lg shadow-black/10 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5 text-cream" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-eggshellGold text-forestGreen">
              <Egg className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-[0.8rem] font-semibold tracking-[0.1em] sm:text-base sm:tracking-[0.12em]">
              {BUSINESS.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-cream lg:flex" aria-label="Main">
            {NAV.filter((n) => n.href !== "#order").map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-eggshellGold">
                {n.label}
              </a>
            ))}
            <a
              href="#order"
              className="rounded-full bg-eggshellGold px-5 py-2.5 font-semibold text-darkText transition-colors hover:bg-white"
            >
              Order now
            </a>
          </nav>

          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="menu-in fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forestGreen px-5 pb-10 pt-24 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${80 + i * 55}ms` }}
                className="menu-item border-b border-white/10 py-4 font-display text-3xl text-cream"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="menu-item mt-8 grid gap-3" style={{ animationDelay: "450ms" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-eggshellGold font-semibold text-darkText"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp us
            </a>
            <a
              href={`sms:${SMS_NUMBERS[0]}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 font-medium text-cream"
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> Text {formatPH(SMS_NUMBERS[0])}
            </a>
          </div>
        </div>
      )}

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="bg-forestGreen pb-28 pt-12 text-cream md:pb-12">
        <div className="container mx-auto px-5">
          <p className="font-display text-xl font-semibold tracking-wide">{BUSINESS.name}</p>
          <p className="mt-3 max-w-md text-sm text-cream/75">{BUSINESS.landmark}</p>
          <p className="mt-1 text-sm text-cream/75">Delivery: {BUSINESS.deliveryCoverage}</p>
          <p className="mt-8 text-xs text-cream/50">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
        </div>
      </footer>

      <MobileActionBar />
    </div>
  );
};
