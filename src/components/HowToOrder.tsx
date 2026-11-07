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
  <section id="how-to-order" className="bg-cream py-20 md:py-28">
    <div className="container mx-auto px-5">
      <SectionHeading eyebrow="How to order" title="Three simple steps" />

      <Reveal as="ol" stagger={0.15} className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative rounded-3xl bg-white p-6 pt-10 shadow-sm ring-1 ring-black/5">
            <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full bg-forestGreen font-display text-lg text-cream shadow-md">
              {i + 1}
            </span>
            <Icon className="h-7 w-7 text-goldDeep" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-semibold text-forestGreen">{title}</h3>
            <p className="mt-2 text-gray-600">{text}</p>
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);
