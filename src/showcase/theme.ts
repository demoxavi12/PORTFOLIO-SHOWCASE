import { Easing, interpolate } from "remotion";
import { loadVariableFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Typography — the portfolio's three voices (src/styles/base.css):
// Bricolage Grotesque (display), Instrument Serif italic (voice), JetBrains Mono (annotation).
const bricolage = loadBricolage("normal", { subsets: ["latin", "latin-ext"] });
const instrument = loadInstrumentSerif("italic", { weights: ["400"], subsets: ["latin"] });
loadInstrumentSerif("normal", { weights: ["400"], subsets: ["latin"] });
const jetbrains = loadJetBrainsMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const FONT = {
  display: `${bricolage.fontFamily}, "Arial Narrow", system-ui, sans-serif`,
  serif: `${instrument.fontFamily}, "Times New Roman", serif`,
  mono: `${jetbrains.fontFamily}, ui-monospace, monospace`,
};

// `.display` in the portfolio: weight 800, condensed width, tight tracking.
export const DISPLAY: React.CSSProperties = {
  fontFamily: FONT.display,
  fontWeight: 800,
  fontVariationSettings: '"wdth" 78, "opsz" 96',
  letterSpacing: "-0.022em",
  lineHeight: 0.82,
};

// `.serif` — the italic voice used for emphasis.
export const SERIF: React.CSSProperties = {
  fontFamily: FONT.serif,
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.01em",
};

// `.mono` — uppercase annotation labels.
export const MONO: React.CSSProperties = {
  fontFamily: FONT.mono,
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

// Colour tokens from the portfolio's :root.
export const C = {
  night: "#07090f",
  ivory: "#f1ece2",
  ink: "#14120f",
  soft: "#c3c6d3",
  mute: "#8a90a6",
  line: "rgba(214, 224, 255, 0.1)",
  lineStrong: "rgba(214, 224, 255, 0.22)",
  cobalt: "#2B45F5",
  tangerine: "#FF5A1F",
  plum: "#6E1F45",
  lime: "#d4f53c",
};

// The portfolio's easing curves.
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);
export const EASE_BACK = Easing.bezier(0.34, 1.4, 0.64, 1);

/** Clamped interpolate with the house ease-out — the one tween used everywhere. */
export const tween = (
  frame: number,
  input: readonly number[],
  output: readonly number[],
  easing: (t: number) => number = EASE_OUT,
) =>
  interpolate(frame, input as number[], output as number[], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
