import { CheckCircle2, ClipboardList, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Build your order",
    text: "Pick how many trays of each size you want in the Order Builder.",
  },
  {
    icon: Send,
    title: "Send it to us",
    text: "Tap SMS or WhatsApp and your order message is already filled in.",
  },
  {
    icon: CheckCircle2,
    title: "We confirm",
    text: "We reply to confirm availability, final pricing, and delivery or pickup.",
  },
];

export const HowToOrder = () => (
  <section id="how-to-order" className="bg-cream py-9 md:py-28">
    <div className="container mx-auto px-4 sm:px-5">
      <SectionHeading eyebrow="How to order" title="Three simple steps" />

      <Reveal as="ol" stagger={0.15} className="mt-4 space-y-2 md:mt-16 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className="relative flex items-start gap-2.5 rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5 md:block md:rounded-3xl md:p-6 md:pt-10"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forestGreen font-display text-xs text-cream shadow-sm md:absolute md:-top-5 md:left-6 md:h-10 md:w-10 md:text-lg md:shadow-md">
              {i + 1}
            </span>
            <div className="min-w-0">
              <Icon className="hidden h-7 w-7 text-goldDeep md:block" aria-hidden="true" />
              <h3 className="font-display text-[0.95rem] font-semibold leading-tight text-forestGreen md:mt-4 md:text-xl">{title}</h3>
              <p className="mt-0.5 text-xs leading-snug text-gray-600 md:mt-2 md:text-base md:leading-normal">{text}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);
