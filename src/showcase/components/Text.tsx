import { tween } from "../theme";

type RiseProps = {
  readonly text: string;
  readonly frame: number;
  /** Frame the first character starts rising. */
  readonly start: number;
  /** Frames between characters. */
  readonly step?: number;
  /** Frames each character takes to settle. */
  readonly duration?: number;
  readonly style?: React.CSSProperties;
};

/**
 * Split characters rise from a clipped line — the portfolio's `.chars` reveal
 * (translateY 115% · scaleY 1.7 · blur 10px → rest).
 */
export const RiseChars: React.FC<RiseProps> = ({ text, frame, start, step = 1.5, duration = 18, style }) => (
  <span style={{ display: "inline-flex", whiteSpace: "pre", ...style }}>
    {text.split("").map((char, i) => {
      const a = start + i * step;
      const range = [a, a + duration];
      return (
        // The clip box is padded so descenders and the scaleY overshoot aren't cut.
        <span key={i} style={{ display: "inline-block", overflow: "hidden", padding: "0.06em 0 0.08em", margin: "-0.06em 0 -0.08em" }}>
          <span
            style={{
              display: "inline-block",
              transformOrigin: "50% 100%",
              opacity: tween(frame, range, [0, 1]),
              translate: `0 ${tween(frame, range, [115, 0])}%`,
              scale: `1 ${tween(frame, range, [1.7, 1])}`,
              filter: `blur(${tween(frame, range, [10, 0])}px)`,
            }}
          >
            {char}
          </span>
        </span>
      );
    })}
  </span>
);

type LineProps = {
  readonly frame: number;
  readonly start: number;
  readonly duration?: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
};

/** A whole line rising out of a mask. */
export const RiseLine: React.FC<LineProps> = ({ frame, start, duration = 22, children, style }) => {
  const range = [start, start + duration];
  return (
    <span style={{ display: "block", overflow: "hidden", padding: "0.08em 0", margin: "-0.08em 0", ...style }}>
      <span
        style={{
          display: "block",
          translate: `0 ${tween(frame, range, [105, 0])}%`,
          opacity: tween(frame, range, [0, 1]),
        }}
      >
        {children}
      </span>
    </span>
  );
};

/** Soft fade-up used for supporting copy. */
export const fadeUp = (frame: number, start: number, distance = 24, duration = 20): React.CSSProperties => ({
  opacity: tween(frame, [start, start + duration], [0, 1]),
  translate: `0 ${tween(frame, [start, start + duration], [distance, 0])}px`,
  filter: `blur(${tween(frame, [start, start + duration], [6, 0])}px)`,
});
