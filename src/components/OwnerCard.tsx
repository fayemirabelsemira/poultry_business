import { Facebook } from "lucide-react";
import type { Owner } from "../data/contacts";
import { ownerImage } from "../lib/assets";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const OwnerCard = ({ name, url, imageKey }: Owner) => {
  const src = ownerImage(imageKey);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center rounded-2xl p-3 text-center transition-colors hover:bg-cream"
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-24 w-24 rounded-full object-cover object-top ring-4 ring-eggshellGold/40 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="grid h-24 w-24 place-items-center rounded-full bg-forestGreen font-display text-2xl font-semibold text-cream ring-4 ring-eggshellGold/40">
          {initials(name)}
        </div>
      )}
      <span className="mt-3 text-sm font-semibold text-forestGreen">{name}</span>
      <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-gray-500 group-hover:text-forestGreen">
        <Facebook className="h-3.5 w-3.5" aria-hidden="true" /> Facebook
      </span>
    </a>
  );
};
