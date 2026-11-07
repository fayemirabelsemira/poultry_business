import { MessageCircle, Phone } from "lucide-react";
import { OWNERS, SMS_NUMBERS, WHATSAPP_NUMBER, WHATSAPP_URL, formatPH } from "../data/contacts";
import { OwnerCard } from "./OwnerCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

const row =
  "flex h-14 items-center gap-3 rounded-2xl bg-cream px-4 font-medium text-forestGreen transition-colors hover:bg-eggshellGold/30";

export const Contact = () => (
  <section id="contact" className="bg-cream py-20 md:py-28">
    <div className="container mx-auto px-5">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to us directly"
        subtitle="Tap a number to text us, or message us on WhatsApp."
      />

      <Reveal stagger={0.15} className="mt-12 grid gap-6 md:grid-cols-2">
        <SpotlightCard className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h3 className="font-display text-xl font-semibold text-forestGreen">Message us</h3>
          <div className="mt-4 space-y-3">
            {SMS_NUMBERS.map((num) => (
              <a key={num} href={`sms:${num}`} className={row}>
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{formatPH(num)}</span>
                <span className="ml-auto text-xs font-normal text-gray-500">SMS</span>
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={row}>
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">{formatPH(WHATSAPP_NUMBER)}</span>
              <span className="ml-auto text-xs font-normal text-gray-500">WhatsApp</span>
            </a>
          </div>
        </SpotlightCard>

        <SpotlightCard className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h3 className="font-display text-xl font-semibold text-forestGreen">Owners on Facebook</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {OWNERS.map((o) => (
              <OwnerCard key={o.name} {...o} />
            ))}
          </div>
        </SpotlightCard>
      </Reveal>
    </div>
  </section>
);
