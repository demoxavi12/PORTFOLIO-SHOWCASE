import { C, FONT } from "../theme";

type Props = {
  readonly url: string;
  readonly tag?: string;
  readonly accent: string;
  readonly width: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
};

/**
 * The portfolio's minimal browser window (ui/Frame.jsx + ui.css). Inner sizes
 * use cqw, so the schematics scale with the frame exactly like on the site.
 */
export const BrowserFrame: React.FC<Props> = ({ url, tag = "live", accent, width, children, style }) => (
  <div
    style={{
      containerType: "inline-size",
      display: "flex",
      flexDirection: "column",
      width,
      background: "#fbf9f4",
      borderRadius: 10,
      overflow: "hidden",
      isolation: "isolate",
      boxShadow: `0 0 0 1px rgba(214, 224, 255, 0.1), 0 50px 100px -30px rgba(0, 0, 0, 0.7), 0 40px 200px -40px ${accent}b3`,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2.4cqw",
        padding: "0 3cqw",
        height: "6.4cqw",
        borderBottom: "1px solid rgba(20, 18, 15, 0.08)",
        fontFamily: FONT.mono,
        fontSize: "2.3cqw",
        color: "#6b6457",
        background: "#f6f3ec",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: "2cqw", aspectRatio: "1", border: "1.5px solid currentColor", borderRadius: 2, flex: "none" }} />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{url}</span>
      <span
        style={{
          padding: "0.3cqw 1.4cqw",
          borderRadius: 99,
          background: C.ink,
          color: C.lime,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: "1.8cqw",
        }}
      >
        {tag}
      </span>
    </div>
    <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>{children}</div>
  </div>
);
