interface Props {
  text: string;
  className?: string;
  /** Class put on each word so GSAP can target it (animate with yPercent). */
  wordClass?: string;
}

/** Splits text into masked words. Screen readers get the full text from aria-label. */
export const SplitText = ({ text, className = "", wordClass = "split-word" }: Props) => (
  <span className={className} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <span key={i}>
        <span
          aria-hidden="true"
          className="inline-block overflow-hidden px-[0.06em] -mx-[0.06em] pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <span className={`${wordClass} inline-block will-change-transform`}>{word}</span>
        </span>{" "}
      </span>
    ))}
  </span>
);
