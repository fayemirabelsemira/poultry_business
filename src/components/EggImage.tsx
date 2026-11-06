import { eggImage } from "../lib/assets";

interface Props {
  imageKey: string;
  alt: string;
  className?: string;
}

// Shows the photo from src/assets/eggs if present, otherwise a simple egg illustration.
export const EggImage = ({ imageKey, alt, className = "" }: Props) => {
  const src = eggImage(imageKey);
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`object-contain p-5 mix-blend-multiply ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-eggshellGold/30 ${className}`}
    >
      <svg viewBox="0 0 64 64" className="w-20 h-20" aria-hidden="true">
        <path
          d="M32 6c-10 0-18 16-18 28 0 11 8 20 18 20s18-9 18-20C50 22 42 6 32 6z"
          fill="#F5F0E5"
          stroke="#D9B77E"
          strokeWidth="2"
        />
        <ellipse cx="25" cy="26" rx="4" ry="8" fill="#FFFFFF" opacity=".7" />
      </svg>
    </div>
  );
};
