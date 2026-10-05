import { C, FONT } from "../theme";

// The portfolio's small technical fragments (ui/Schematics.jsx): concepts
// from the real projects — route middleware, a decoded JWT, a 429 from the
// rate limiter, a MongoDB query. Shown inside small browser frames, as in the hero.

const caret = (t: number, fps: number): React.CSSProperties => ({
  display: "inline-block",
  width: "0.55em",
  height: "1.1em",
  marginLeft: 2,
  verticalAlign: "-0.2em",
  background: C.lime,
  opacity: (t / fps) % 1 < 0.5 ? 1 : 0,
});

const K: React.CSSProperties = { color: C.lime };
const S: React.CSSProperties = { color: "#ff9a70" };

export const CodeUI: React.FC<{ readonly t: number; readonly fps: number }> = ({ t, fps }) => (
  <pre
    style={{
      position: "absolute",
      inset: 0,
      margin: 0,
      padding: "5cqw 6cqw",
      background: C.ink,
      color: "#e9e3d6",
      fontFamily: FONT.mono,
      fontSize: "5.2cqw",
      lineHeight: 1.55,
      whiteSpace: "pre",
    }}
  >
    <span style={K}>router</span>.post(<span style={S}>&apos;/events&apos;</span>,{"\n"}
    {"  "}auth(<span style={S}>&apos;admin&apos;</span>),{"\n"}
    {"  "}rateLimit(),{"\n"}
    {"  "}cache.bust(<span style={S}>&apos;stats&apos;</span>),{"\n"}
    {"  "}ingest)
    <span style={caret(t, fps)} />
  </pre>
);

const frag: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "3.5cqw",
  padding: "7cqw 8cqw",
  background: "#0d1222",
  color: "#e6e9f2",
  fontFamily: FONT.mono,
  fontSize: "5.6cqw",
  lineHeight: 1.4,
};
const muted: React.CSSProperties = { margin: 0, color: "#7d88a6", fontSize: "0.82em" };

export const HttpUI: React.FC = () => (
  <div style={frag}>
    <p style={{ margin: 0 }}>
      HTTP/1.1{" "}
      <b style={{ padding: "0.5cqw 2cqw", borderRadius: "1cqw", background: "rgba(255, 90, 31, 0.18)", color: "#ff9a70", fontWeight: 600 }}>
        429
      </b>
    </p>
    <p style={muted}>Too Many Requests</p>
    <p style={muted}>rateLimit() · PulseOps</p>
  </div>
);

export const MongoUI: React.FC = () => (
  <div style={frag}>
    <p style={muted}>mongosh</p>
    <p style={{ margin: 0, fontSize: "0.92em" }}>
      db.events.find(&#123; <span style={K}>type</span>: <span style={S}>&quot;notification&quot;</span> &#125;)
    </p>
    <p style={muted}>MongoDB · Mongoose</p>
  </div>
);

export const TokenUI: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "4cqw",
      padding: "6cqw",
      background: C.lime,
      color: C.ink,
      fontFamily: FONT.mono,
    }}
  >
    <p style={{ margin: 0, fontSize: "5.6cqw", wordBreak: "break-all", lineHeight: 1.35 }}>
      <span style={{ color: C.tangerine }}>eyJhbGciOi</span>.<span style={{ color: C.cobalt }}>eyJyb2xlIjoi</span>.
      <span style={{ color: C.plum }}>SflKxwRJSM</span>
    </p>
    <p style={{ margin: 0, fontSize: "6.6cqw", fontWeight: 600 }}>
      {"{ "}
      <span style={{ color: C.cobalt }}>role</span>: <span style={{ color: C.plum }}>&quot;admin&quot;</span>
      {" }"}
    </p>
  </div>
);

const TONES = {
  cobalt: { background: C.cobalt, color: C.ivory },
  tangerine: { background: C.tangerine, color: C.ink },
  lime: { background: C.lime, color: C.ink },
  plum: { background: C.plum, color: C.ivory },
  paper: { border: "1px solid rgba(241, 236, 226, 0.5)", color: C.ivory },
};

/** The intro's interface fragments: a coloured 16:9 card with a mono label. */
export const FragmentChip: React.FC<{
  readonly label: string;
  readonly tone: keyof typeof TONES;
  readonly width: number;
  readonly style?: React.CSSProperties;
}> = ({ label, tone, width, style }) => (
  <span
    style={{
      position: "absolute",
      display: "flex",
      alignItems: "flex-end",
      width,
      aspectRatio: "16 / 9",
      padding: "14px 18px",
      borderRadius: 8,
      fontFamily: FONT.mono,
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: "0.04em",
      ...TONES[tone],
      ...style,
    }}
  >
    {label}
  </span>
);
