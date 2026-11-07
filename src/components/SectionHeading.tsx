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
      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
        light ? "text-eggshellGold" : "text-goldDeep"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl md:text-5xl ${
        light ? "text-cream" : "text-forestGreen"
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-base text-pretty md:text-lg ${light ? "text-cream/75" : "text-gray-600"}`}>
        {subtitle}
      </p>
    )}
  </Reveal>
);
