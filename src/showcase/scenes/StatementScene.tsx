import { AbsoluteFill, useCurrentFrame } from "remotion";
import { RiseChars, RiseLine } from "../components/Text";
import { person, statement } from "../content";
import { C, DISPLAY, EASE_IN, FONT, MONO, SERIF, tween } from "../theme";

// 4–9s. Who, where, and the About statement — with its two italic emphases.
export const STATEMENT_DURATION = 150;

const SENTENCE_AT = 34;
const WORD_STEP = 1.3;
// After the sentence lands, the emphases take the light and the rest steps back.
const FOCUS_AT = 96;

export const StatementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = tween(frame, [132, STATEMENT_DURATION], [0, 1], EASE_IN);
  const focus = tween(frame, [FOCUS_AT, FOCUS_AT + 20], [0, 1]);

  let w = 0;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: "0 160px",
        color: C.ivory,
        opacity: 1 - exit,
        translate: `0 ${-30 * exit}px`,
        filter: `blur(${6 * exit}px)`,
      }}
    >
      <RiseChars
        text={person.role.toUpperCase()}
        frame={frame}
        start={2}
        step={1}
        duration={20}
        style={{ ...DISPLAY, fontSize: 150 }}
      />

      <RiseLine frame={frame} start={16} style={{ marginTop: 34 }}>
        <span style={{ ...MONO, display: "inline-flex", alignItems: "center", gap: 16, fontSize: 24, color: C.soft }}>
          <i style={{ width: 12, height: 12, background: C.lime, display: "inline-block" }} />
          {person.location.toUpperCase()}
        </span>
      </RiseLine>

      <div
        style={{
          height: 1,
          marginTop: 64,
          marginBottom: 56,
          background: C.lineStrong,
          transformOrigin: "left",
          scale: `${tween(frame, [22, 56], [0, 1])} 1`,
        }}
      />

      <p
        style={{
          margin: 0,
          maxWidth: 1480,
          fontFamily: FONT.display,
          fontWeight: 500,
          fontSize: 64,
          lineHeight: 1.14,
          letterSpacing: "-0.012em",
        }}
      >
        {statement.map((run, r) =>
          run.text.split(" ").map((word, i) => {
            const at = SENTENCE_AT + w++ * WORD_STEP + (run.em ? 6 : 0);
            const range = [at, at + (run.em ? 22 : 16)];
            return (
              <span
                key={`${r}-${i}`}
                style={{
                  display: "inline-block",
                  marginRight: "0.26em",
                  ...(run.em ? { ...SERIF, fontSize: "1.1em", lineHeight: 1 } : null),
                  color: run.em
                    ? C.ivory
                    : `rgba(195, 198, 211, ${tween(frame, [FOCUS_AT, FOCUS_AT + 20], [1, 0.62])})`,
                  opacity: tween(frame, range, [0, 1]),
                  translate: `0 ${tween(frame, range, [run.em ? 0.5 : 0.35, 0])}em`,
                  filter: `blur(${tween(frame, range, [run.em ? 12 : 6, 0])}px)`,
                  textShadow: run.em ? `0 0 ${28 * focus}px rgba(241, 236, 226, ${0.18 * focus})` : undefined,
                }}
              >
                {word}
              </span>
            );
          }),
        )}
      </p>
    </AbsoluteFill>
  );
};
