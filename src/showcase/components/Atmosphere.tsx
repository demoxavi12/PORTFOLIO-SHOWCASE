import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";

// The portfolio's "light passing through smoke" (atmosphere.css): a near-black
// base with four very large colour fields. Each section sets a mood and the
// fields cross-fade between them as the film moves on.
type Mood = { base: string; at1: string; at2: string; at3: string; at4: string };

const MOODS: Record<string, Mood> = {
  // The intro panel is near-ink — the room is still dark.
  intro: {
    base: "#07090f",
    at1: "rgba(44, 66, 190, 0.08)",
    at2: "rgba(104, 64, 176, 0.05)",
    at3: "rgba(196, 112, 54, 0.04)",
    at4: "rgba(150, 48, 112, 0)",
  },
  hero: {
    base: "#070910",
    at1: "rgba(44, 66, 190, 0.5)",
    at2: "rgba(104, 64, 176, 0.32)",
    at3: "rgba(196, 112, 54, 0.22)",
    at4: "rgba(150, 48, 112, 0.1)",
  },
  about: {
    base: "#070a14",
    at1: "rgba(32, 62, 168, 0.4)",
    at2: "rgba(150, 46, 96, 0.28)",
    at3: "rgba(226, 156, 96, 0.16)",
    at4: "rgba(90, 60, 170, 0.12)",
  },
  work: {
    base: "#08090d",
    at1: "rgba(43, 69, 245, 0.2)",
    at2: "rgba(58, 64, 88, 0.3)",
    at3: "rgba(206, 104, 44, 0.12)",
    at4: "rgba(104, 64, 176, 0.08)",
  },
  stack: {
    base: "#08090c",
    at1: "rgba(40, 84, 170, 0.28)",
    at2: "rgba(70, 72, 90, 0.3)",
    at3: "rgba(170, 196, 70, 0.07)",
    at4: "rgba(110, 70, 170, 0.1)",
  },
  record: {
    base: "#080a10",
    at1: "rgba(30, 86, 124, 0.3)",
    at2: "rgba(118, 34, 76, 0.34)",
    at3: "rgba(206, 132, 64, 0.16)",
    at4: "rgba(60, 60, 150, 0.12)",
  },
  contact: {
    base: "#06080f",
    at1: "rgba(43, 69, 245, 0.62)",
    at2: "rgba(112, 80, 220, 0.34)",
    at3: "rgba(222, 120, 52, 0.3)",
    at4: "rgba(170, 52, 120, 0.16)",
  },
};

/** Mood keyframes in seconds: each mood is held, then cross-fades into the next. */
const TIMELINE: [number, keyof typeof MOODS][] = [
  [0, "intro"],
  [2.6, "intro"],
  [3.8, "hero"],
  [4.4, "about"],
  [8.6, "about"],
  [9.4, "work"],
  [35.6, "work"],
  [36.4, "stack"],
  [41.6, "stack"],
  [42.4, "record"],
  [46.6, "record"],
  [47.6, "contact"],
];

export const Atmosphere: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const keys = TIMELINE.map(([s]) => s * fps);
  const pick = (k: keyof Mood) => interpolateColors(frame, keys, TIMELINE.map(([, m]) => MOODS[m][k]));

  // The room breathes: two fields drift so slowly it never reads as motion.
  const drift = interpolate(frame, [0, durationInFrames], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(90% 70% at 84% 12%, ${pick("at1")}, transparent 62%),
          radial-gradient(70% 80% at 6% 64%, ${pick("at2")}, transparent 64%),
          ${pick("base")}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-40vmax",
          bottom: "-52vmax",
          width: "110vmax",
          height: "110vmax",
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${pick("at3")}, transparent 72%)`,
          translate: `${-7 * drift}vmax ${-5 * drift}vmax`,
          scale: 1 + 0.08 * drift,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-30vmax",
          top: "-48vmax",
          width: "110vmax",
          height: "110vmax",
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${pick("at4")}, transparent 70%)`,
          translate: `${5 * drift}vmax ${4 * drift}vmax`,
        }}
      />
    </AbsoluteFill>
  );
};

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Grain over everything: softens the gradients so they read as haze. */
export const Grain: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      opacity: 0.06,
      mixBlendMode: "overlay",
      backgroundImage: GRAIN,
    }}
  />
);
