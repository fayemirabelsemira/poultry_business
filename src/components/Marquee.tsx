interface Props {
  items: string[];
}

export const Marquee = ({ items }: Props) => {
  const row = items.map((text, i) => (
    <span key={i} className="flex items-center gap-8 whitespace-nowrap">
      <span>{text}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-eggshellGold" aria-hidden="true" />
    </span>
  ));

  return (
    <div className="overflow-hidden bg-forestGreen py-4 text-cream md:py-5">
      <div className="marquee-track flex w-max font-display text-lg italic md:text-xl">
        <div className="flex gap-8 pr-8">{row}</div>
        <div className="flex gap-8 pr-8" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
};
