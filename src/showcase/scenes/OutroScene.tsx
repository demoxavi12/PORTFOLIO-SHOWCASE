import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NameLockup } from "../components/NameLockup";
import { RiseLine } from "../components/Text";
import { person, socials } from "../content";
import { C, DISPLAY, EASE_BACK, EASE_IN, FONT, MONO, SERIF, tween } from "../theme";

// 47–52s. Back to the SX monogram, the open door, the contact details —
// and the name, last.
export const OUTRO_DURATION = 150;

const CONTACT_OUT = 82;
const NAME_AT = 98;

/** The SX monogram from the portfolio's favicon: ink square, ivory SX, lime corner. */
const Monogram: React.FC<{ readonly frame: number; readonly size: number }> = ({ frame, size }) => (
  <div style={{ position: "relative", width: size, height: size, background: C.ink, boxShadow: "0 0 0 1px rgba(241, 236, 226, 0.12)" }}>
    <span
      style={{
        ...DISPLAY,
        position: "absolute",
        left: size * 0.125,
        top: size * 0.2,
        fontSize: size * 0.47,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        color: C.ivory,
      }}
    >
      SX
    </span>
    <i
      style={{
        position: "absolute",
        left: size * 0.625,
        top: size * 0.625,
        width: size * 0.25,
        height: size * 0.25,
        background: C.lime,
        scale: tween(frame, [10, 22], [0, 1], EASE_BACK),
      }}
    />
  </div>
);

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const out = tween(frame, [CONTACT_OUT, CONTACT_OUT + 14], [0, 1], EASE_IN);

  return (
    <AbsoluteFill style={{ color: C.ivory }}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: 1 - out,
          translate: `0 ${-30 * out}px`,
          filter: `blur(${8 * out}px)`,
        }}
      >
        <div
          style={{
            marginBottom: 56,
            opacity: tween(frame, [0, 12], [0, 1]),
            scale: tween(frame, [0, 20], [0.85, 1]),
          }}
        >
          <Monogram frame={frame} size={132} />
        </div>

        <RiseLine frame={frame} start={12}>
          <span style={{ ...MONO, fontSize: 24, color: C.lime }}>{person.status[0]}</span>
        </RiseLine>
        <RiseLine frame={frame} start={16} duration={24} style={{ marginTop: 22 }}>
          <span style={{ ...DISPLAY, fontSize: 104 }}>SDE INTERNSHIPS &</span>
        </RiseLine>
        <RiseLine frame={frame} start={21} duration={24}>
          <span style={{ ...DISPLAY, fontSize: 104 }}>JUNIOR DEVELOPER ROLES</span>
        </RiseLine>

        <RiseLine frame={frame} start={34} style={{ marginTop: 52 }}>
          <span style={{ ...SERIF, fontSize: 60 }}>{person.email}</span>
        </RiseLine>

        <div style={{ display: "flex", gap: 56, marginTop: 40 }}>
          {socials.map((s, i) => (
            <RiseLine key={s.label} frame={frame} start={42 + i * 4}>
              <span style={{ fontFamily: FONT.mono, fontSize: 22, color: C.soft }}>
                <span style={{ ...MONO, fontSize: 18, color: C.mute }}>{s.label}</span>
                <span style={{ color: C.mute }}> · </span>
                {s.handle}
              </span>
            </RiseLine>
          ))}
        </div>
      </AbsoluteFill>

      {/* The last word is the name. */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <NameLockup frame={frame} start={NAME_AT} size={250} pace={0.75} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
