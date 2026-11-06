import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import { OWNERS, SMS_NUMBERS, WHATSAPP_NUMBER, WHATSAPP_URL, formatPH } from "../data/contacts";
import { OwnerCard } from "./OwnerCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

const card = "rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5 md:rounded-3xl md:p-6";
const cardTitle = "font-display text-base font-semibold text-forestGreen md:text-xl";

interface RowProps {
  href: string;
  number: string;
  label: string;
  primary?: boolean;
  external?: boolean;
}

/** One tappable contact line: icon chip, number, channel label, chevron. */
const ContactRow = ({ href, number, label, primary = false, external = false }: RowProps) => {
  const Icon = primary ? MessageCircle : Phone;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex min-h-[3.25rem] items-center gap-3 px-3 py-2 transition-colors active:bg-eggshellGold/25 md:hover:bg-eggshellGold/20"
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
          primary ? "bg-eggshellGold text-darkText" : "bg-forestGreen text-cream"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[0.95rem] font-semibold tabular-nums text-forestGreen md:text-base">{number}</span>
        <span className="block text-[0.7rem] text-gray-500 md:text-xs">{label}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
};

export const Contact = () => (
  <section id="contact" className="bg-cream py-9 md:py-28">
    <div className="container mx-auto px-4 sm:px-5">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to us directly"
        subtitle="Tap a number to text, or message us on WhatsApp."
      />

      <Reveal stagger={0.15} className="mt-4 grid gap-2.5 md:mt-12 md:grid-cols-2 md:gap-6">
        <SpotlightCard className={card}>
          <h3 className={cardTitle}>Message us</h3>
          <div className="mt-2.5 divide-y divide-black/5 overflow-hidden rounded-xl bg-cream md:mt-4 md:rounded-2xl">
            <ContactRow href={WHATSAPP_URL} number={formatPH(WHATSAPP_NUMBER)} label="WhatsApp · fastest reply" primary external />
            {SMS_NUMBERS.map((num) => (
              <ContactRow key={num} href={`sms:${num}`} number={formatPH(num)} label="Text message (SMS)" />
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className={card}>
          <h3 className={cardTitle}>Owners on Facebook</h3>
          <p className="mt-0.5 text-[0.8rem] text-gray-600 md:text-sm">You can also contact us at:</p>
          <div className="mt-3 grid grid-cols-4 gap-1 md:mt-4 md:grid-cols-2 md:gap-2">
            {OWNERS.map((o) => (
              <OwnerCard key={o.name} {...o} />
            ))}
          </div>
        </SpotlightCard>
      </Reveal>
    </div>
  </section>
);
