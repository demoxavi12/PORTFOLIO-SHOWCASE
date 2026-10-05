import { AbsoluteFill, useCurrentFrame } from "remotion";
import { RiseLine } from "../components/Text";
import { C, DISPLAY, EASE_IN, EASE_IN_OUT, FONT, MONO, SERIF, tween } from "../theme";

// 42–47s. The record, concise: degree, practice, hackathon.
export const RECORD_DURATION = 150;

const COL_AT = (i: number) => 8 + i * 14;

export const RecordScene: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = tween(frame, [134, RECORD_DURATION], [0, 1], EASE_IN);
  // 200+ counts up to the real figure and stops there.
  const solved = Math.round(tween(frame, [COL_AT(1) + 4, COL_AT(1) + 40], [0, 200], EASE_IN_OUT));

  const column = (i: number, label: string, body: React.ReactNode) => {
    const at = COL_AT(i);
    return (
      <div style={{ position: "relative", paddingTop: 30 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 1,
            background: C.lineStrong,
            transformOrigin: "left",
            scale: `${tween(frame, [at - 4, at + 22], [0, 1], EASE_IN_OUT)} 1`,
          }}
        />
        <RiseLine frame={frame} start={at}>
          <span style={{ ...MONO, fontSize: 19, color: C.mute }}>{label}</span>
        </RiseLine>
        <div style={{ marginTop: 34 }}>{body}</div>
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: "0 150px",
        color: C.ivory,
        opacity: 1 - exit,
        translate: `0 ${-24 * exit}px`,
        filter: `blur(${6 * exit}px)`,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr 1.1fr", gap: 72, alignItems: "start" }}>
        {column(
          0,
          "2023 — 27",
          <>
            <RiseLine frame={frame} start={COL_AT(0) + 6} duration={24}>
              <span style={{ ...DISPLAY, fontSize: 124 }}>B.Tech CSE</span>
            </RiseLine>
            <RiseLine frame={frame} start={COL_AT(0) + 14} style={{ marginTop: 26 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 22, color: C.soft }}>NIST University · 2023–27</span>
            </RiseLine>
            <RiseLine frame={frame} start={COL_AT(0) + 20} style={{ marginTop: 18 }}>
              <span style={{ ...SERIF, fontSize: 52 }}>
                CGPA <span style={{ color: C.lime }}>8.38</span>
              </span>
            </RiseLine>
          </>,
        )}
        {column(
          1,
          "Practice",
          <>
            <RiseLine frame={frame} start={COL_AT(1) + 4} duration={24}>
              <span style={{ ...DISPLAY, fontSize: 124, fontVariantNumeric: "tabular-nums" }}>{solved}+</span>
            </RiseLine>
            <RiseLine frame={frame} start={COL_AT(1) + 12} style={{ marginTop: 26 }}>
              <span style={{ ...SERIF, fontSize: 52 }}>DSA problems</span>
            </RiseLine>
            <RiseLine frame={frame} start={COL_AT(1) + 18} style={{ marginTop: 18 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 22, color: C.soft }}>LeetCode & GeeksforGeeks</span>
            </RiseLine>
          </>,
        )}
        {column(
          2,
          "2025",
          <>
            <RiseLine frame={frame} start={COL_AT(2) + 4} duration={24}>
              <span style={{ ...DISPLAY, fontSize: 76, lineHeight: 0.9, display: "block" }}>
                Smart India
                <br />
                Hackathon 2025
              </span>
            </RiseLine>
            <RiseLine frame={frame} start={COL_AT(2) + 14} style={{ marginTop: 26 }}>
              <span style={{ ...SERIF, fontSize: 52 }}>
                FarmAssist
              </span>
            </RiseLine>
          </>,
        )}
      </div>
    </AbsoluteFill>
  );
};
