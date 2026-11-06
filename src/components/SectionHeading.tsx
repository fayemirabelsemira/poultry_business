import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}

export const SectionHeading = ({ eyebrow, title, subtitle, align = "center", light = false }: Props) => (
  <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <p
      className={`text-[0.65rem] font-semibold uppercase tracking-[0.18em] md:text-xs md:tracking-[0.2em] ${
        light ? "text-eggshellGold" : "text-goldDeep"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`mt-2 font-display text-[1.4rem] font-semibold leading-tight text-balance sm:text-4xl md:mt-3 md:text-5xl ${
        light ? "text-cream" : "text-forestGreen"
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-1.5 text-[0.8rem] leading-snug text-pretty md:mt-4 md:text-base md:text-lg ${light ? "text-cream/75" : "text-gray-600"}`}>
        {subtitle}
      </p>
    )}
  </Reveal>
);
