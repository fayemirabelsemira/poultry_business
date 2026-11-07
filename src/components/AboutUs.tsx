import { ArrowRight } from "lucide-react";
import { BUSINESS } from "../data/business";
import { farmImage } from "../lib/assets";
import { ImageReveal } from "./ImageReveal";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export const AboutUs = () => {
  const main = farmImage("farm-1");
  const second = farmImage("farm-2");

  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="container mx-auto grid gap-12 px-5 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <SectionHeading align="left" eyebrow="About us" title="An egg supplier you can reach directly" />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-gray-700 md:text-lg">
            <p>
              {BUSINESS.name} is an egg supplier based in {BUSINESS.landmark}. We supply Small, Medium,
              and Large eggs by the tray to households and small businesses.
            </p>
            <p>
              Message any of us directly and we will help you pick the right size and arrange delivery or
              pickup.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 pt-2 font-semibold text-forestGreen underline-offset-4 hover:underline"
            >
              Meet the owners <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {(main || second) && (
          <div className="relative">
            {main && (
              <ImageReveal
                src={main}
                alt="Chickens inside the farm house"
                className="aspect-[4/3] rounded-3xl shadow-lg"
              />
            )}
            {second && (
              <ImageReveal
                src={second}
                alt="Close-up of chickens at the farm"
                className="-mt-12 ml-auto aspect-[4/3] w-3/5 rounded-2xl border-4 border-white shadow-xl"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
