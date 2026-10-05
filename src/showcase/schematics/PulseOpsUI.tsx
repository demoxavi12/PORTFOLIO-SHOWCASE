import { C, FONT, MONO, EASE_IN_OUT, tween } from "../theme";

// Recreated from the portfolio's PulseOpsUI (ui/Schematics.jsx + ui.css):
// dark navy dashboard, sidebar, "Events" header with an admin role pill,
// a live bar chart and a scrolling service/event/status stream.

const BARS = [0.42, 0.66, 0.5, 0.82, 0.58, 0.9, 0.7, 0.48, 0.76, 0.62, 0.86, 0.54];

const STREAM: [string, string, string][] = [
  ["auth", "user.login", "200"],
  ["notify", "email.queued", "202"],
  ["events", "event.ingested", "201"],
  ["gateway", "rate.limited", "429"],
  ["cache", "stats.read", "HIT"],
  ["notify", "push.sent", "200"],
];

const statusStyle = (status: string): React.CSSProperties =>
  status === "429"
    ? { background: "rgba(255, 90, 31, 0.16)", color: "#ff9a70" }
    : status === "HIT"
      ? { background: "rgba(212, 245, 60, 0.16)", color: C.lime }
      : { background: "rgba(34, 197, 94, 0.14)", color: "#6ee7a0" };

/** `t` is frames since the window started showing. */
export const PulseOpsUI: React.FC<{ readonly t: number; readonly fps: number }> = ({ t, fps }) => {
  const sec = t / fps;
  // ul translates -50% over 10s, like the site's pulse-stream loop.
  const scroll = ((sec % 10) / 10) * 50;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "9cqw 1fr",
        background: "#0b1020",
        color: "#dbe3f5",
        fontFamily: FONT.display,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3cqw",
          paddingTop: "4cqw",
          borderRight: "1px solid rgba(219, 227, 245, 0.08)",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <i
            key={i}
            style={{
              display: "block",
              width: "3.6cqw",
              aspectRatio: "1",
              borderRadius: "1cqw",
              background: i === 1 ? "#3b82f6" : "rgba(219, 227, 245, 0.14)",
              opacity: tween(t, [i * 3, i * 3 + 12], [0, 1]),
              scale: tween(t, [i * 3, i * 3 + 12], [0.6, 1]),
            }}
          />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateRows: "auto 30% 1fr", gap: "3cqw", padding: "3.6cqw 4cqw", minHeight: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "3.6cqw",
            fontWeight: 700,
            opacity: tween(t, [4, 18], [0, 1]),
          }}
        >
          <b>Events</b>
          <span
            style={{
              ...MONO,
              textTransform: "none",
              fontSize: "2cqw",
              padding: "0.6cqw 1.6cqw",
              borderRadius: 99,
              border: "1px solid rgba(59, 130, 246, 0.6)",
              color: "#93b4ff",
              opacity: tween(t, [14, 26], [0, 1]),
            }}
          >
            role · admin
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "1.2cqw",
            paddingBottom: "1cqw",
            borderBottom: "1px solid rgba(219, 227, 245, 0.1)",
          }}
        >
          {BARS.map((h, i) => {
            // Bars grow in, then breathe between h and h × 0.45 (3.2s each way).
            const grow = tween(t, [8 + i * 2, 30 + i * 2], [0, 1]);
            const phase = EASE_IN_OUT(0.5 - 0.5 * Math.cos((Math.PI * (sec + i * 0.27)) / 3.2));
            const height = h * (1 - 0.55 * phase);
            return (
              <i
                key={i}
                style={{
                  display: "block",
                  flex: 1,
                  height: "100%",
                  borderRadius: "0.6cqw 0.6cqw 0 0",
                  background: "linear-gradient(#3b82f6, rgba(59, 130, 246, 0.25))",
                  transformOrigin: "bottom",
                  scale: `1 ${height * grow}`,
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            overflow: "hidden",
            minHeight: 0,
            maskImage: "linear-gradient(transparent, #000 18%, #000 82%, transparent)",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, translate: `0 -${scroll}%` }}>
            {[...STREAM, ...STREAM].map(([svc, evt, status], i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "22% 1fr auto",
                  alignItems: "center",
                  height: "6.4cqw",
                  fontFamily: FONT.mono,
                  fontSize: "2.3cqw",
                  borderBottom: "1px solid rgba(219, 227, 245, 0.06)",
                  opacity: tween(t, [20 + i * 3, 34 + i * 3], [0, 1]),
                }}
              >
                <span style={{ color: "#7d8bab" }}>{svc}</span>
                <span>{evt}</span>
                <em style={{ fontStyle: "normal", padding: "0.2cqw 1.2cqw", borderRadius: "0.6cqw", ...statusStyle(status) }}>
                  {status}
                </em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
