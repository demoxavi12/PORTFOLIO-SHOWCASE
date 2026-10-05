import { C, FONT, MONO, tween } from "../theme";

// Recreated from the portfolio's ChatUI (ui/Schematics.jsx + ui.css):
// warm light interface, rooms sidebar (# general, # dev, ◆ private),
// a live "ws" indicator, the message thread, typing dots and the input.

const MESSAGES = [
  { from: "sys", text: "socket connected · #general" },
  { from: "them", text: "is the private room live?" },
  { from: "me", text: "yes — JWT-gated, try it" },
  { from: "them", text: "in. messages are instant" },
] as const;

/** Frame (relative to the window) each message lands. */
export const CHAT_MESSAGE_AT = (i: number) => 26 + i * 18;

const bubble = (from: (typeof MESSAGES)[number]["from"]): React.CSSProperties => {
  if (from === "sys") {
    return { alignSelf: "center", background: "none", fontFamily: FONT.mono, fontSize: "1.9cqw", color: "#9a7a66" };
  }
  if (from === "me") {
    return { alignSelf: "flex-end", background: C.tangerine, color: "#fff", borderBottomRightRadius: "0.6cqw" };
  }
  return { borderBottomLeftRadius: "0.6cqw" };
};

export const ChatUI: React.FC<{ readonly t: number; readonly fps: number }> = ({ t, fps }) => {
  const sec = t / fps;
  // Room selection: the highlight lands on # general.
  const select = tween(t, [10, 22], [0, 1]);
  const ping = (sec % 1.6) / 1.6;
  const typingIn = tween(t, [CHAT_MESSAGE_AT(3) + 14, CHAT_MESSAGE_AT(3) + 22], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "26% 1fr",
        background: "#fffaf5",
        color: C.ink,
        fontFamily: FONT.display,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.6cqw",
          padding: "4cqw 3cqw",
          background: "#fbeee4",
          fontSize: "2.5cqw",
          color: "#7a5a48",
        }}
      >
        <b style={{ ...MONO, fontSize: "1.9cqw", letterSpacing: "0.06em", marginBottom: "1cqw" }}>Rooms</b>
        <span
          style={{
            position: "relative",
            padding: "1cqw 1.6cqw",
            borderRadius: "1cqw",
            color: select > 0.5 ? "#fff" : "#7a5a48",
            isolation: "isolate",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
              borderRadius: "1cqw",
              background: C.tangerine,
              opacity: select,
              scale: `${0.9 + 0.1 * select}`,
            }}
          />
          # general
        </span>
        <span style={{ padding: "1cqw 1.6cqw" }}># dev</span>
        <span style={{ padding: "1cqw 1.6cqw" }}>◆ private</span>
      </div>

      <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "3cqw 4cqw",
            fontSize: "3cqw",
            fontWeight: 700,
            borderBottom: "1px solid rgba(20, 18, 15, 0.08)",
          }}
        >
          <b>
            # general
          </b>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1cqw",
              fontFamily: FONT.mono,
              fontWeight: 400,
              fontSize: "2cqw",
              color: "#16a34a",
              opacity: tween(t, [16, 26], [0, 1]),
            }}
          >
            <span
              style={{
                width: "1.4cqw",
                aspectRatio: "1",
                borderRadius: "50%",
                background: "currentColor",
                boxShadow: `0 0 0 ${1.6 * ping}cqw rgba(22, 163, 74, ${0.5 * (1 - ping)})`,
              }}
            />
            ws
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "1.8cqw",
            padding: "3cqw 4cqw",
            overflow: "hidden",
          }}
        >
          {MESSAGES.map((m, i) => {
            const at = CHAT_MESSAGE_AT(i);
            return (
              <p
                key={i}
                style={{
                  margin: 0,
                  maxWidth: "72%",
                  padding: "1.6cqw 2.6cqw",
                  borderRadius: "2.4cqw",
                  fontSize: "2.6cqw",
                  lineHeight: 1.3,
                  background: "#f1e6dc",
                  ...bubble(m.from),
                  opacity: tween(t, [at, at + 8], [0, 1]),
                  translate: `0 ${tween(t, [at, at + 14], [40, 0])}%`,
                  scale: tween(t, [at, at + 14], [0.96, 1]),
                }}
              >
                {m.text}
              </p>
            );
          })}
          <p
            style={{
              display: "flex",
              gap: "0.8cqw",
              margin: 0,
              padding: "1.6cqw 2.2cqw",
              borderRadius: "2.4cqw",
              background: "#f1e6dc",
              width: "max-content",
              opacity: typingIn,
            }}
          >
            {[0, 1, 2].map((d) => {
              const p = ((sec - d * 0.15) % 1 + 1) % 1;
              const lift = Math.sin(Math.PI * p) * 60;
              return (
                <i
                  key={d}
                  style={{ display: "block", width: "1.2cqw", aspectRatio: "1", borderRadius: "50%", background: "#a58670", translate: `0 -${lift}%` }}
                />
              );
            })}
          </p>
        </div>

        <div
          style={{
            margin: "0 4cqw 3cqw",
            padding: "1.8cqw 2.6cqw",
            borderRadius: 99,
            border: "1px solid rgba(20, 18, 15, 0.12)",
            fontSize: "2.3cqw",
            color: "#a39b8c",
          }}
        >
          Message #general
        </div>
      </div>
    </div>
  );
};
