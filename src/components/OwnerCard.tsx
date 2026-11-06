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
  const [first, ...rest] = name.split(" ");
  const avatar = "h-14 w-14 rounded-full ring-2 ring-eggshellGold/50 sm:h-20 sm:w-20 md:h-24 md:w-24 md:ring-4";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on Facebook`}
      className="group flex flex-col items-center rounded-2xl p-1 text-center transition-colors active:bg-cream md:p-3 md:hover:bg-cream"
    >
      <span className="relative">
        {src ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            decoding="async"
            className={`${avatar} object-cover object-top transition-transform duration-300 group-hover:scale-105`}
          />
        ) : (
          <span className={`${avatar} grid place-items-center bg-forestGreen font-display text-lg font-semibold text-cream md:text-2xl`}>
            {initials(name)}
          </span>
        )}
        <span
          className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-forestGreen text-cream ring-2 ring-white md:h-6 md:w-6"
          aria-hidden="true"
        >
          <Facebook className="h-2.5 w-2.5 md:h-3 md:w-3" />
        </span>
      </span>
      <span className="mt-1.5 block text-[0.72rem] font-semibold leading-tight text-forestGreen sm:text-sm md:mt-3">
        {first}
        <span className="block font-normal text-gray-500">{rest.join(" ")}</span>
      </span>
    </a>
  );
};
