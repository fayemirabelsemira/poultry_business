import { useEffect, useState, type ReactNode } from "react";
import { Check, ClipboardCopy, MessageCircle, Minus, Phone, Plus } from "lucide-react";
import { PRODUCTS, type EggSize } from "../data/products";
import { SMS_NUMBERS, WHATSAPP_DIGITS, formatPH } from "../data/contacts";
import { BUSINESS } from "../data/business";
import { AnimatedNumber } from "./AnimatedNumber";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Qty = Record<EggSize, number>;

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

const inputCls =
  "mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-forestGreen focus:ring-2 focus:ring-eggshellGold";

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block text-sm font-medium text-gray-700">
    {label}
    {children}
  </label>
);

export const OrderBuilder = () => {
  const [qty, setQty] = useState<Qty>({ Small: 0, Medium: 0, Large: 0 });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pref, setPref] = useState<"Delivery" | "Pickup">("Delivery");
  const [instructions, setInstructions] = useState("");
  const [copied, setCopied] = useState(false);

  // "Add a tray" buttons in the Products section fire this event.
  useEffect(() => {
    const onAdd = (e: Event) => {
      const size = (e as CustomEvent<EggSize>).detail;
      setQty((prev) => ({ ...prev, [size]: prev[size] + 1 }));
    };
    window.addEventListener("add-tray", onAdd);
    return () => window.removeEventListener("add-tray", onAdd);
  }, []);

  const change = (size: EggSize, delta: number) =>
    setQty((prev) => ({ ...prev, [size]: Math.max(prev[size] + delta, 0) }));

  const totalTrays = PRODUCTS.reduce((sum, p) => sum + qty[p.size], 0);
  const min = PRODUCTS.reduce((sum, p) => sum + qty[p.size] * p.minPrice, 0);
  const max = PRODUCTS.reduce((sum, p) => sum + qty[p.size] * p.maxPrice, 0);
  const disabled = totalTrays === 0;

  const message = `Hello! I would like to place an order from ${BUSINESS.name}.

Small Eggs: ${qty.Small} tray(s)
Medium Eggs: ${qty.Medium} tray(s)
Large Eggs: ${qty.Large} tray(s)

Estimated Price: ${peso(min)}–${peso(max)}

Name: ${name || "-"}
Phone: ${phone || "-"}
Address: ${address || "-"}
Order Preference: ${pref}
Additional Instructions: ${instructions || "-"}

Please confirm availability, final pricing, and delivery arrangements. Thank you!`;

  const encoded = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${WHATSAPP_DIGITS}?text=${encoded}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your order message:", message);
    }
  };

  const btn =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 font-medium transition active:scale-[0.98]";
  const off = "pointer-events-none opacity-50";

  return (
    <section id="order" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-5">
        <SectionHeading
          eyebrow="Order builder"
          title="Build your order"
          subtitle="Choose your trays, then send it to us by SMS or WhatsApp. We'll confirm the final price."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-8">
          <div className="space-y-6">
            <Reveal className="rounded-3xl bg-cream p-5 sm:p-6">
              <h3 className="font-display text-xl font-semibold text-forestGreen">1. Choose trays</h3>
              <ul className="mt-2 divide-y divide-black/10">
                {PRODUCTS.map((p) => (
                  <li key={p.size} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-display text-lg font-semibold text-darkText">{p.size}</p>
                      <p className="text-sm tabular-nums text-gray-500">
                        {peso(p.minPrice)}–{peso(p.maxPrice)} per tray
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => change(p.size, -1)}
                        disabled={qty[p.size] === 0}
                        aria-label={`Remove one ${p.size} tray`}
                        className="grid h-11 w-11 place-items-center rounded-full bg-forestGreen text-white transition active:scale-90 disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="w-9 text-center text-lg font-semibold tabular-nums" aria-live="polite">
                        {qty[p.size]}
                      </span>
                      <button
                        type="button"
                        onClick={() => change(p.size, 1)}
                        aria-label={`Add one ${p.size} tray`}
                        className="grid h-11 w-11 place-items-center rounded-full bg-forestGreen text-white transition active:scale-90"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-3xl bg-cream p-5 sm:p-6">
              <h3 className="font-display text-xl font-semibold text-forestGreen">2. Your details</h3>
              <div className="mt-4 space-y-4">
                <Field label="Name">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    name="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Order preference</legend>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {(["Delivery", "Pickup"] as const).map((o) => (
                      <label key={o} className="relative">
                        <input
                          type="radio"
                          name="pref"
                          value={o}
                          checked={pref === o}
                          onChange={() => setPref(o)}
                          className="peer sr-only"
                        />
                        <span className="flex h-12 cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white font-medium transition peer-checked:border-forestGreen peer-checked:bg-forestGreen peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-eggshellGold">
                          {o}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">Delivery: {BUSINESS.deliveryCoverage}.</p>
                </fieldset>

                <Field label={pref === "Delivery" ? "Delivery address" : "Address (optional for pickup)"}>
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Additional instructions">
                  <textarea
                    name="instructions"
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>
            </Reveal>
          </div>

          <Reveal as="aside" className="rounded-3xl bg-forestGreen p-5 text-cream sm:p-6 lg:sticky lg:top-24">
            <h3 className="font-display text-xl font-semibold">3. Send your order</h3>

            <ul className="mt-4 space-y-1.5 text-sm text-cream/85">
              {PRODUCTS.map((p) => (
                <li key={p.size} className="flex justify-between">
                  <span>{p.size} eggs</span>
                  <span className="tabular-nums">{qty[p.size]} tray(s)</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-white/15 pt-5">
              <p className="text-xs uppercase tracking-wider text-cream/60">Estimated price</p>
              <p className="mt-1 font-display text-3xl font-semibold">
                <AnimatedNumber value={min} />
                <span className="px-1">–</span>
                <AnimatedNumber value={max} />
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
                className={`${btn} bg-eggshellGold font-semibold text-darkText hover:bg-white ${disabled ? off : ""}`}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Send via WhatsApp
              </a>
              {SMS_NUMBERS.map((num) => (
                <a
                  key={num}
                  href={`sms:${num}?body=${encoded}`}
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : undefined}
                  className={`${btn} border border-white/30 text-cream hover:bg-white/10 ${disabled ? off : ""}`}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> Text {formatPH(num)}
                </a>
              ))}
              <button
                type="button"
                onClick={copy}
                disabled={disabled}
                className={`${btn} text-cream/90 underline-offset-4 hover:underline disabled:opacity-50`}
              >
                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <ClipboardCopy className="h-4 w-4" aria-hidden="true" />}
                {copied ? "Copied!" : "Copy message"}
              </button>
            </div>

            {disabled && (
              <p className="mt-3 text-center text-xs text-cream/70">
                Add at least one tray to enable sending.
              </p>
            )}

            <details className="mt-5 rounded-xl bg-black/20 p-3 text-xs text-cream/80">
              <summary className="cursor-pointer select-none font-medium">Preview message</summary>
              <pre className="mt-3 whitespace-pre-wrap font-sans leading-relaxed">{message}</pre>
            </details>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
