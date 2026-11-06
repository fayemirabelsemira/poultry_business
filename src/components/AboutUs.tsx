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
    <section id="about" className="bg-white py-9 md:py-28">
      <div className="container mx-auto grid gap-4 px-4 sm:px-5 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <SectionHeading align="left" eyebrow="About us" title="An egg supplier you can reach directly" />
          <Reveal delay={0.1} className="mt-2 space-y-2 text-[0.8rem] leading-snug text-gray-700 md:mt-6 md:space-y-4 md:text-lg">
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
              className="inline-flex items-center gap-2 pt-0.5 text-[0.8rem] font-semibold md:pt-2 md:text-base text-forestGreen underline-offset-4 hover:underline"
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
                className="aspect-[2/1] rounded-xl shadow-lg md:aspect-[4/3] md:rounded-3xl"
              />
            )}
            {second && (
              <ImageReveal
                src={second}
                alt="Close-up of chickens at the farm"
                className="-mt-6 ml-auto aspect-[2/1] w-1/2 rounded-lg md:-mt-12 md:aspect-[4/3] md:w-3/5 md:rounded-2xl border-4 border-white shadow-xl"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
