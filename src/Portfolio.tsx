import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FONT =
  "Inter, 'Segoe UI', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Expo-out for entrances, expo-in for exits
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

const NAME = "SWARAJ XAVIER";
const TECHS = ["React", "Node.js", "MongoDB", "Java", "Redis"];
const MOTTO = ["BUILD.", "LEARN.", "SHIP."];

export const Portfolio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0c",
        backgroundImage:
          "radial-gradient(ellipse at 50% 45%, #16171c 0%, #0a0a0c 65%)",
        fontFamily: FONT,
        color: "#f5f5f7",
      }}
    >
      {/* Intro: name, role and tech stack (0s – 7.6s) */}
      <Interactive.Div
        name="Intro group"
        durationInFrames={Math.round(7.6 * fps)}
        premountFor={fps}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // Exit at 7s
          opacity: interpolate(frame, [7 * fps, 7.6 * fps], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_IN,
          }),
          filter: `blur(${interpolate(frame, [7 * fps, 7.6 * fps], [0, 12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_IN,
          })}px)`,
          // Lift slightly when the tech stack comes in at 4s, then drift up on exit
          translate: interpolate(
            frame,
            [4 * fps, 5 * fps, 7 * fps, 7.6 * fps],
            ["0px 75px", "0px 0px", "0px 0px", "0px -40px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            },
          ),
        }}
      >
        {/* 0–2s: name, letter by letter */}
        <Interactive.Div
          name="Name"
          premountFor={fps}
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: "0.06em",
            lineHeight: 1,
            // Letters settle from wide to tight tracking
            gap: interpolate(frame, [0, 2 * fps], [18, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
          }}
        >
          {NAME.split("").map((char, i) => {
            const start = i * 3;
            const end = start + 0.8 * fps;
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  opacity: interpolate(frame, [start, end], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: EASE_OUT,
                  }),
                  translate: interpolate(
                    frame,
                    [start, end],
                    ["0px 60px", "0px 0px"],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: EASE_OUT,
                    },
                  ),
                  filter: `blur(${interpolate(frame, [start, end], [10, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: EASE_OUT,
                  })}px)`,
                }}
              >
                {char}
              </span>
            );
          })}
        </Interactive.Div>

        {/* 2s: divider line draws out from the center */}
        <Interactive.Div
          name="Divider"
          premountFor={fps}
          style={{
            marginTop: 48,
            height: 2,
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            width: interpolate(frame, [2 * fps, 3 * fps], [0, 520], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
          }}
        />

        {/* 2–4s: role */}
        <Interactive.Div
          name="Role"
          premountFor={fps}
          style={{
            marginTop: 40,
            fontSize: 38,
            fontWeight: 500,
            color: "#9a9ca5",
            letterSpacing: interpolate(
              frame,
              [2.3 * fps, 3.6 * fps],
              ["0.7em", "0.45em"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            ),
            // Compensate trailing letter-spacing so the text stays optically centered
            paddingLeft: "0.45em",
            opacity: interpolate(frame, [2.3 * fps, 3.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            translate: interpolate(
              frame,
              [2.3 * fps, 3.3 * fps],
              ["0px 24px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            ),
          }}
        >
          FULL STACK DEVELOPER
        </Interactive.Div>

        {/* 4–7s: tech stack, one after another */}
        <Interactive.Div
          name="Tech stack"
          premountFor={fps}
          style={{
            marginTop: 90,
            display: "flex",
            alignItems: "center",
            fontSize: 42,
            fontWeight: 500,
            color: "#e6e6ea",
            height: 60,
          }}
        >
          {TECHS.map((tech, i) => {
            const start = 4.2 * fps + i * 0.4 * fps;
            const end = start + 0.7 * fps;
            return (
              <span
                key={tech}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {i > 0 ? (
                  <span
                    style={{
                      margin: "0 34px",
                      color: "#4b4d55",
                      opacity: interpolate(frame, [start - 4, end - 4], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: EASE_OUT,
                      }),
                    }}
                  >
                    ·
                  </span>
                ) : null}
                <span
                  style={{
                    display: "inline-block",
                    opacity: interpolate(frame, [start, end], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: EASE_OUT,
                    }),
                    translate: interpolate(
                      frame,
                      [start, end],
                      ["0px 30px", "0px 0px"],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: EASE_OUT,
                      },
                    ),
                    filter: `blur(${interpolate(frame, [start, end], [6, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: EASE_OUT,
                    })}px)`,
                  }}
                >
                  {tech}
                </span>
              </span>
            );
          })}
        </Interactive.Div>
      </Interactive.Div>

      {/* 7–10s: motto */}
      <Interactive.Div
        name="Motto"
        from={Math.round(7.3 * fps)}
        premountFor={fps}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          fontSize: 130,
          fontWeight: 700,
          letterSpacing: "0.04em",
          // Slow push-in for the hold
          scale: interpolate(frame, [7.3 * fps, 10 * fps], [0.96, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.33, 1, 0.68, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {MOTTO.map((word, i) => {
          const start = 7.3 * fps + i * 0.35 * fps;
          const end = start + 0.9 * fps;
          return (
            <span
              key={word}
              style={{
                display: "inline-block",
                color: i === MOTTO.length - 1 ? "#ffffff" : "#c9cad0",
                opacity: interpolate(frame, [start, end], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                }),
                translate: interpolate(
                  frame,
                  [start, end],
                  ["0px 50px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: EASE_OUT,
                  },
                ),
                filter: `blur(${interpolate(frame, [start, end], [12, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                })}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
