import { AbsoluteFill, useCurrentFrame } from "remotion";
import { RiseLine } from "../components/Text";
import { stackLayers } from "../content";
import { C, DISPLAY, EASE_IN, EASE_IN_OUT, FONT, MONO, SERIF, tween } from "../theme";

// 36–42s. "The stack, read as a request." Three layers assemble top-down —
// Interface, Server, Data — then a request travels down through them.
export const STACK_DURATION = 180;

const LAYER_AT = (i: number) => 22 + i * 20;
const REQUEST = [104, 144];
const ROW_H = 168;
const TOP = 352;
const SPINE_X = 600;

// Deterministic scatter: items gather from below, as on the site.
const scatter = (i: number) => ({ x: (((i * 37) % 13) - 6) * 14, y: ((i * 53) % 9) * 10 + 60, r: (((i * 29) % 7) - 3) * 6 });

export const StackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = tween(frame, [164, STACK_DURATION], [0, 1], EASE_IN);
  // Request position: 0 at the top of Interface, 1 at the bottom of Data.
  const req = tween(frame, REQUEST, [0, 1], EASE_IN_OUT);
  const reqY = TOP + req * ROW_H * 3;

  let n = 0;
  return (
    <AbsoluteFill style={{ color: C.ivory, opacity: 1 - exit, filter: `blur(${6 * exit}px)` }}>
      <div style={{ position: "absolute", left: 150, top: 110 }}>
        <RiseLine frame={frame} start={0}>
          <span style={{ ...MONO, fontSize: 20, color: C.mute }}>Stack</span>
        </RiseLine>
        <RiseLine frame={frame} start={6} duration={26} style={{ marginTop: 22 }}>
          <span style={{ ...DISPLAY, fontSize: 112 }}>The stack,</span>{" "}
          <span style={{ ...SERIF, fontSize: 104, color: "#97a5ff", marginLeft: "0.22em" }}>read as a request.</span>
        </RiseLine>
      </div>

      {stackLayers.map((layer, i) => {
        const at = LAYER_AT(i);
        const lit = tween(frame, [REQUEST[0] + i * 12, REQUEST[0] + i * 12 + 8], [0, 1]) - tween(frame, [REQUEST[0] + i * 12 + 16, REQUEST[0] + i * 12 + 30], [0, 0.6]);
        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              left: 150,
              right: 150,
              top: TOP + i * ROW_H,
              height: ROW_H,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* The layer's rule draws itself in. */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 1,
                background: C.lineStrong,
                transformOrigin: "left",
                scale: `${tween(frame, [at - 6, at + 22], [0, 1], EASE_IN_OUT)} 1`,
              }}
            />
            {i === stackLayers.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 1,
                  background: C.lineStrong,
                  transformOrigin: "left",
                  scale: `${tween(frame, [at + 4, at + 30], [0, 1], EASE_IN_OUT)} 1`,
                }}
              />
            )}

            <div style={{ width: SPINE_X - 150 - 40, opacity: tween(frame, [at, at + 16], [0, 1]), translate: `${tween(frame, [at, at + 20], [-20, 0])}px 0` }}>
              <div style={{ ...MONO, fontSize: 20, color: lit > 0.05 ? C.lime : C.soft }}>
                <span style={{ color: C.mute, marginRight: 14 }}>{String(i + 1).padStart(2, "0")}</span>
                {layer.label}
              </div>
              <div style={{ ...SERIF, fontSize: 34, marginTop: 10, color: "#dcd7cc" }}>{layer.caption}</div>
            </div>

            <div style={{ position: "absolute", left: SPINE_X - 150 + 50, right: 0, display: "flex", flexWrap: "wrap", gap: 14 }}>
              {layer.items.map((item, j) => {
                const s = scatter(n++);
                const range = [at + 8 + j * 3, at + 30 + j * 3];
                return (
                  <span
                    key={item}
                    style={{
                      padding: "10px 22px",
                      borderRadius: 99,
                      border: `1px solid ${lit > 0.05 ? `rgba(212, 245, 60, ${0.25 + 0.5 * lit})` : C.lineStrong}`,
                      background: `rgba(241, 236, 226, ${0.03 + 0.05 * lit})`,
                      fontFamily: FONT.display,
                      fontWeight: 600,
                      fontSize: 29,
                      color: C.ivory,
                      opacity: tween(frame, range, [0, 1]),
                      translate: `${tween(frame, range, [s.x, 0])}px ${tween(frame, range, [s.y, 0])}px`,
                      rotate: `${tween(frame, range, [s.r, 0])}deg`,
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* The spine a request travels down: interface → server → data. */}
      <div
        style={{
          position: "absolute",
          left: SPINE_X,
          top: TOP,
          width: 1,
          height: ROW_H * 3,
          background: C.line,
          transformOrigin: "top",
          scale: `1 ${tween(frame, [30, 90], [0, 1], EASE_IN_OUT)}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: SPINE_X,
          top: TOP,
          width: 2,
          marginLeft: -0.5,
          height: reqY - TOP,
          background: `linear-gradient(transparent, ${C.lime})`,
          opacity: tween(frame, [REQUEST[0], REQUEST[0] + 6], [0, 1]) * (1 - tween(frame, [REQUEST[1] + 4, REQUEST[1] + 18], [0, 1])),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: SPINE_X - 7,
          top: reqY - 7,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: C.lime,
          boxShadow: "0 0 18px 2px rgba(212, 245, 60, 0.45)",
          opacity: tween(frame, [REQUEST[0], REQUEST[0] + 6], [0, 1]) * (1 - tween(frame, [REQUEST[1] + 4, REQUEST[1] + 18], [0, 1])),
        }}
      />
    </AbsoluteFill>
  );
};
