import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NameLockup } from "../components/NameLockup";
import { FragmentChip } from "../schematics/Fragments";
import { C, EASE_IN_OUT, MONO, tween } from "../theme";

// 0–4s. The portfolio's intro (intro/Intro.jsx): interface fragments drift
// past, a lime scan line sweeps the frame, then the name forms.
export const TITLE_DURATION = 120;

// Positions (% of frame) and widths (vw) taken from the intro's FRAGMENTS.
const FRAGMENTS = [
  { label: "POST /api/events", tone: "cobalt", x: 8, y: 14, w: 22, at: 4 },
  { label: "jwt.verify(token)", tone: "lime", x: 70, y: 12, w: 18, at: 14 },
  { label: "stripe.checkout", tone: "plum", x: 12, y: 66, w: 24, at: 22 },
  { label: "redis.get → HIT", tone: "paper", x: 38, y: 80, w: 28, at: 30 },
] as const;

const NAME_AT = 40;

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Camera push as the panel lifts (intro.css .is-leaving).
  const exit = tween(frame, [100, TITLE_DURATION], [0, 1], EASE_IN_OUT);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {FRAGMENTS.map((f, i) => {
        const life = [f.at, f.at + 14, 58 + i * 3, 74 + i * 3];
        return (
          <FragmentChip
            key={f.label}
            label={f.label}
            tone={f.tone}
            width={(f.w / 100) * 1920}
            style={{
              ...MONO,
              fontSize: 17,
              left: `${f.x}%`,
              top: `${f.y}%`,
              opacity: tween(frame, life, [0, 0.95, 0.85, 0]),
              // Drift: up and slightly toward centre, nearer cards travel further.
              translate: `${tween(frame, [f.at, 80], [0, (50 - f.x) * 0.8])}px ${tween(frame, [f.at, 80], [26, -40 - i * 6], (t) => t)}px`,
              scale: tween(frame, [f.at, f.at + 16, 74 + i * 3], [0.85, 1, 1.04]),
              filter: `blur(${tween(frame, [56 + i * 3, 74 + i * 3], [0, 6])}px)`,
            }}
          />
        );
      })}

      {/* Lime scan line sweeping down the frame. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background: C.lime,
          boxShadow: "0 0 24px 2px rgba(212, 245, 60, 0.5)",
          translate: `0 ${tween(frame, [2, 36], [0, 1080], EASE_IN_OUT)}px`,
          opacity: tween(frame, [2, 36], [1, 0], EASE_IN_OUT),
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          scale: 1 + 0.18 * exit,
          translate: `0 ${-40 * exit}px`,
          filter: `blur(${8 * exit}px)`,
          opacity: 1 - exit,
        }}
      >
        <NameLockup frame={frame} start={NAME_AT} size={300} />
      </AbsoluteFill>

      {/* Meta row: SX — Portfolio ——— Berhampur, IN */}
      <div
        style={{
          ...MONO,
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 52,
          display: "flex",
          alignItems: "center",
          gap: 28,
          fontSize: 17,
          color: "#a39b8c",
          opacity: tween(frame, [6, 20], [0, 1]) * (1 - exit),
        }}
      >
        <span>SX — Portfolio</span>
        <span style={{ flex: 1, height: 1, background: "rgba(241, 236, 226, 0.14)", position: "relative" }}>
          <i
            style={{
              position: "absolute",
              inset: 0,
              background: C.lime,
              transformOrigin: "left",
              scale: `${tween(frame, [6, 100], [0, 1], (t) => t)} 1`,
            }}
          />
        </span>
        <span>Berhampur, IN</span>
      </div>
    </AbsoluteFill>
  );
};
