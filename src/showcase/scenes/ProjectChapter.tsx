import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { RiseChars } from "../components/Text";
import type { Project } from "../content";
import { C, DISPLAY, EASE_IN, EASE_IN_OUT, FONT, MONO, SERIF, tween } from "../theme";

// One project = one chapter, choreographed like the portfolio's scroll chapters
// (work/Chapter.jsx + work.css), but on a fixed 9-second clock:
//   A  0–60    the chapter title: index, name, subtitle
//   B  45–160  the colour floods open from the window; the live interface plays,
//              technical fragments surface around it
//   C  160–245 the window steps aside and the case study writes itself in
//   D  245–270 everything settles out; the flood closes
export const CHAPTER_DURATION = 270;

const T = {
  titleIn: 0,
  titleOut: 50,
  windowIn: 46,
  openStart: 50,
  openEnd: 104,
  shiftStart: 158,
  shiftEnd: 196,
  infoStart: 176,
  exitStart: 246,
};

/** Frame the schematic's own clock starts (t = 0). */
export const UI_START = T.openStart;

const WINDOW_W = 1020;

export type ChapterFragment = {
  /** Chapter frame the fragment surfaces. */
  readonly at: number;
  readonly x: number;
  readonly y: number;
  /** Parallax depth: > 0 sits nearer (moves more), < 0 further (dimmer). */
  readonly depth: number;
  readonly render: (t: number) => React.ReactNode;
};

type Props = {
  readonly project: Project;
  readonly total: number;
  readonly renderUI: (t: number, fps: number) => React.ReactNode;
  readonly fragments: readonly ChapterFragment[];
};

export const ProjectChapter: React.FC<Props> = ({ project, total, renderUI, fragments }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = project.accent;

  const p = frame / CHAPTER_DURATION;
  const open = tween(frame, [T.openStart, T.openEnd], [0, 1], EASE_IN_OUT) - tween(frame, [T.exitStart + 4, CHAPTER_DURATION], [0, 1], EASE_IN_OUT);
  const shift = tween(frame, [T.shiftStart, T.shiftEnd], [0, 1], EASE_IN_OUT);
  const info = (k: number) => tween(frame, [T.infoStart + k * 7, T.infoStart + k * 7 + 24], [0, 1]);
  const exit = tween(frame, [T.exitStart, T.exitStart + 16], [0, 1], EASE_IN);
  const titleOut = tween(frame, [T.titleOut, T.titleOut + 16], [0, 1], EASE_IN);
  // Slow camera push while the interface is on stage.
  const push = tween(frame, [T.openEnd - 20, T.shiftStart], [0, 1], (t) => t);

  // The colour as light in a dark room, not a flat fill (work.css --flood).
  const flood = `radial-gradient(110% 90% at 78% 28%, ${accent}b8, transparent 62%),
    radial-gradient(80% 70% at 8% 92%, ${accent}57, transparent 70%),
    radial-gradient(60% 60% at 40% 50%, rgba(255, 255, 255, 0.03), transparent 70%),
    #0a0c14`;

  const ghostX = 34 - p * 125; // vw — the name slides across the whole chapter
  const ghost: React.CSSProperties = {
    ...DISPLAY,
    position: "absolute",
    top: "50%",
    left: 0,
    fontSize: 576,
    lineHeight: 0.8,
    whiteSpace: "nowrap",
    color: "transparent",
    translate: `${(ghostX / 100) * 1920}px -50%`,
  };

  const windowScale = 0.6 + open * 0.4 - shift * 0.2 + push * 0.03 * (1 - shift);

  return (
    <AbsoluteFill style={{ overflow: "hidden", color: C.ivory }}>
      {/* Ghost name outside the flood: a faint outline drifting across. */}
      <span style={{ ...ghost, WebkitTextStroke: "1.2px rgba(241, 236, 226, 0.22)", opacity: 1 - exit }}>{project.ghost}</span>

      {/* The flood: opens from the window's rectangle to fill the frame. */}
      <AbsoluteFill
        style={{
          background: flood,
          boxShadow: "inset 0 0 0 1px rgba(214, 224, 255, 0.08)",
          clipPath: `inset(${(1 - open) * 23}% ${(1 - open) * 31}% round ${(1 - open) * 18}px)`,
          opacity: tween(frame, [T.windowIn - 6, T.openStart + 6], [0, 1]) * (1 - tween(frame, [T.exitStart + 10, CHAPTER_DURATION], [0, 1])),
        }}
      >
        {/* Inside the flood the ghost catches the light. */}
        <span style={{ ...ghost, WebkitTextStroke: `1.2px ${C.ivory}`, opacity: 0.5 - info(0) * 0.4 }}>{project.ghost}</span>
      </AbsoluteFill>

      {/* A — chapter title */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          opacity: 1 - titleOut,
          scale: 1 - 0.06 * titleOut,
          translate: `0 ${-30 * titleOut}px`,
          filter: `blur(${10 * titleOut}px)`,
        }}
      >
        <span style={{ ...MONO, fontSize: 24, color: C.soft, opacity: tween(frame, [2, 14], [0, 1]) }}>
          <span style={{ color: accent === C.plum ? "#c98aa9" : accent }}>{project.index}</span> / {String(total).padStart(2, "0")}
        </span>
        <RiseChars text={project.name} frame={frame} start={4} step={1.4} style={{ ...DISPLAY, fontSize: 230 }} />
        <span
          style={{
            ...SERIF,
            fontSize: 64,
            color: "#dcd7cc",
            opacity: tween(frame, [18, 36], [0, 1]),
            translate: `0 ${tween(frame, [18, 38], [20, 0])}px`,
          }}
        >
          {project.title}
        </span>
      </AbsoluteFill>

      {/* B — the live interface */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 1 - exit, filter: `blur(${8 * exit}px)` }}>
        <div
          style={{
            translate: `${shift * 0.19 * 1920}px ${tween(frame, [T.windowIn, T.openEnd], [160, 0])}px`,
            scale: windowScale,
            opacity: tween(frame, [T.windowIn, T.windowIn + 14], [0, 1]),
          }}
        >
          <BrowserFrame url={project.url} accent={accent} width={WINDOW_W}>
            {renderUI(frame - UI_START, fps)}
          </BrowserFrame>
        </div>
      </AbsoluteFill>

      {/* Technical fragments around the window, with gentle parallax. */}
      {fragments.map((f, i) => {
        const life = tween(frame, [f.at, f.at + 16], [0, 1]) * (1 - tween(frame, [T.shiftStart - 6, T.shiftStart + 12], [0, 1], EASE_IN));
        const drift = tween(frame, [f.at, T.shiftStart + 12], [0, 1], (t) => t);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: f.x,
              top: f.y,
              opacity: life * (f.depth < 0 ? 0.8 : 1),
              translate: `${-shift * 120 * (1 + f.depth)}px ${(1 - life) * 40 - drift * 36 * (1 + f.depth)}px`,
              scale: 0.92 + 0.08 * life,
              filter: f.depth < 0 ? "blur(1.2px)" : undefined,
              rotate: `${(i % 2 ? 1 : -1) * (1.5 + Math.abs(f.depth) * 2)}deg`,
            }}
          >
            {f.render(frame - f.at)}
          </div>
        );
      })}

      {/* C — the case study writes itself in on the left. */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 112,
          width: 720,
          translate: "0 -50%",
          display: "grid",
          gap: 26,
          opacity: 1 - exit,
          textShadow: "0 1px 18px rgba(4, 5, 10, 0.55), 0 0 2px rgba(4, 5, 10, 0.35)",
        }}
      >
        {/* Shade pool so a bright colour field never sits directly behind words. */}
        <div
          style={{
            position: "absolute",
            inset: "-18% -22% -18% -30%",
            zIndex: -1,
            background: "radial-gradient(closest-side, rgba(6, 7, 12, 0.5), rgba(6, 7, 12, 0.22) 60%, transparent)",
            opacity: info(0),
          }}
        />
        <p
          style={{
            ...MONO,
            margin: 0,
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 14,
            borderBottom: "1px solid rgba(241, 236, 226, 0.16)",
            fontSize: 17,
            color: "#bcb8af",
            opacity: info(0),
            translate: `0 ${(1 - info(0)) * 34}px`,
          }}
        >
          <span>
            Project {project.index} / {String(total).padStart(2, "0")}
          </span>
          <span>{project.kind}</span>
        </p>

        <h3 style={{ margin: 0, fontWeight: "inherit", opacity: info(1), translate: `0 ${(1 - info(1)) * 34}px` }}>
          <span style={{ ...DISPLAY, display: "block", fontSize: 118, color: "#f6f2ea" }}>{project.name}</span>
          <span style={{ ...SERIF, display: "block", marginTop: "0.3em", fontSize: 40, lineHeight: 1.05, color: "#dcd7cc" }}>
            {project.title}
          </span>
        </h3>

        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {project.notes.map((note, i) => {
            const v = info(2 + i * 0.6);
            return (
              <li
                key={note}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  alignItems: "baseline",
                  padding: "13px 0",
                  borderTop: "1px solid rgba(241, 236, 226, 0.16)",
                  borderBottom: i === project.notes.length - 1 ? "1px solid rgba(241, 236, 226, 0.16)" : undefined,
                  fontFamily: FONT.display,
                  fontSize: 25,
                  lineHeight: 1.3,
                  color: "#d6d1c8",
                  opacity: v,
                  translate: `0 ${(1 - v) * 24}px`,
                }}
              >
                <span style={{ ...MONO, fontSize: 14, color: "#bcb8af" }}>{String(i + 1).padStart(2, "0")}</span>
                {note}
              </li>
            );
          })}
        </ol>

        <p
          style={{
            margin: 0,
            fontFamily: FONT.mono,
            fontSize: 19,
            lineHeight: 1.7,
            letterSpacing: "0.02em",
            color: "#c6c2b9",
          }}
        >
          {project.stack.map((tech, i) => {
            const v = tween(frame, [T.infoStart + 30 + i * 2.5, T.infoStart + 44 + i * 2.5], [0, 1]);
            return (
              <span key={tech} style={{ opacity: v, filter: `blur(${(1 - v) * 4}px)` }}>
                {i > 0 && <span style={{ color: `color-mix(in srgb, ${accent} 55%, #ffffff)` }}>{" / "}</span>}
                {tech}
              </span>
            );
          })}
        </p>
      </div>

      {/* Chapter progress along the bottom edge. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 3,
          background: C.ivory,
          transformOrigin: "left",
          scale: `${p} 1`,
          opacity: open * 0.85,
        }}
      />
    </AbsoluteFill>
  );
};
