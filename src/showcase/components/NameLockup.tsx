import { person } from "../content";
import { C, DISPLAY, EASE_BACK, SERIF, tween } from "../theme";
import { RiseChars } from "./Text";

type Props = {
  readonly frame: number;
  /** Frame SWARAJ starts rising; Xavier and the SUNA stamp follow. */
  readonly start: number;
  /** Font size of SWARAJ in px; everything else scales from it. */
  readonly size: number;
  /** < 1 tightens the gaps between the three parts. */
  readonly pace?: number;
};

/**
 * The hero name (hero.css): SWARAJ in condensed display, Xavier swinging out
 * to the right in the italic serif, SUNA stamped at its shoulder on tangerine,
 * tilted -4deg.
 */
export const NameLockup: React.FC<Props> = ({ frame, start, size, pace = 1 }) => {
  const stamp = start + 30 * pace;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", color: C.ivory }}>
      <RiseChars text={person.first} frame={frame} start={start} step={1.6} style={{ ...DISPLAY, fontSize: size }} />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: size * 0.08,
          marginTop: -size * 0.03,
        }}
      >
        <RiseChars
          text={person.middle}
          frame={frame}
          start={start + 14 * pace}
          step={1.6}
          style={{ ...SERIF, fontSize: size * 0.93, lineHeight: 0.86 }}
        />
        <span
          style={{
            ...DISPLAY,
            marginTop: size * 0.11,
            padding: "0.12em 0.14em 0.02em",
            fontSize: size * 0.26,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            background: C.tangerine,
            color: C.ink,
            rotate: "-4deg",
            opacity: tween(frame, [stamp, stamp + 6], [0, 1]),
            scale: tween(frame, [stamp, stamp + 16], [0.6, 1], EASE_BACK),
            clipPath: `inset(0 ${tween(frame, [stamp, stamp + 12], [100, 0])}% 0 0)`,
          }}
        >
          {person.last}
        </span>
      </div>
    </div>
  );
};
