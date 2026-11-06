import { useEffect, useState, type ReactNode } from "react";
import { MapPin, MessageCircle, Menu, Phone, Truck, X } from "lucide-react";
import logo from "../assets/logo.png";
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
        <div className="container mx-auto flex h-12 items-center justify-between px-4 sm:px-5 md:h-16">
          <a href="#top" className="flex items-center gap-2 text-cream" onClick={() => setOpen(false)}>
            <img src={logo} alt="" className="h-8 w-8 shrink-0 object-contain md:h-11 md:w-11" />
            <span className="font-display text-[0.7rem] font-semibold tracking-[0.08em] sm:text-base sm:tracking-[0.12em]">
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
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-cream lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="menu-in fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forestGreen px-4 pb-8 pt-16 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${80 + i * 55}ms` }}
                className="menu-item border-b border-white/10 py-3 font-display text-2xl text-cream"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="menu-item mt-5 grid gap-2" style={{ animationDelay: "450ms" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-eggshellGold font-semibold text-darkText"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp us
            </a>
            {SMS_NUMBERS.map((num) => (
              <a
                key={num}
                href={`sms:${num}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/25 font-medium text-cream"
              >
                <Phone className="h-5 w-5" aria-hidden="true" /> Text {formatPH(num)}
              </a>
            ))}
          </div>
        </div>
      )}

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="bg-forestGreen pb-[calc(4.25rem+env(safe-area-inset-bottom))] pt-7 text-cream md:pb-10 md:pt-14">
        <div className="container mx-auto px-4 text-center sm:px-5 md:flex md:items-center md:justify-between md:gap-10 md:text-left">
          <div className="flex flex-col items-center md:flex-row md:gap-5">
            <img src={logo} alt={`${BUSINESS.name} logo`} className="h-16 w-16 object-contain md:h-24 md:w-24" />
            <div className="mt-2 md:mt-0">
              <p className="font-display text-base font-semibold tracking-[0.08em] md:text-xl">{BUSINESS.name}</p>
              <p className="mt-0.5 text-[0.75rem] italic text-eggshellGold md:text-sm">{BUSINESS.tagline}</p>
            </div>
          </div>

          <ul className="mx-auto mt-4 max-w-xs space-y-1.5 text-xs leading-snug text-cream/80 md:mx-0 md:mt-0 md:max-w-sm md:text-sm">
            <li className="flex items-start justify-center gap-2 md:justify-start">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-eggshellGold" aria-hidden="true" />
              <span className="text-left">{BUSINESS.landmark}</span>
            </li>
            <li className="flex items-start justify-center gap-2 md:justify-start">
              <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-eggshellGold" aria-hidden="true" />
              <span className="text-left">Delivery: {BUSINESS.deliveryCoverage}</span>
            </li>
          </ul>
        </div>

        <div className="container mx-auto mt-5 px-4 sm:px-5">
          <p className="border-t border-white/10 pt-3 text-center text-[0.65rem] text-cream/50 md:text-xs">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
        </div>
      </footer>

      <MobileActionBar />
    </div>
  );
};
