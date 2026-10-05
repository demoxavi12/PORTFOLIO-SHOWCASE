import { FONT, SERIF, tween } from "../theme";

// Recreated from the portfolio's ShopUI (ui/Schematics.jsx + ui.css):
// editorial white storefront, boxed ELEVÉ serif wordmark, a rolling bag count,
// "Latest Arrivals", four coded product tiles, "Add to bag", and a checkout
// sheet with "Pay with Stripe". No third-party product imagery.

const PLUM = "#6E1F45";

/** Frames (relative to the window) for the shopping beats. */
export const SHOP = { add1: 50, add2: 66, sheet: 82 };

export const ShopUI: React.FC<{ readonly t: number }> = ({ t }) => {
  const press = (at: number) => tween(t, [at - 4, at], [0, 1]) - tween(t, [at + 2, at + 10], [0, 1]);
  const pressed = Math.max(press(SHOP.add1), press(SHOP.add2));
  const count = tween(t, [SHOP.add1 + 2, SHOP.add1 + 10], [0, 1]) + tween(t, [SHOP.add2 + 2, SHOP.add2 + 10], [0, 1]);
  const sheet = tween(t, [SHOP.sheet, SHOP.sheet + 18], [105, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        gap: "2.6cqw",
        padding: "3.4cqw 4.4cqw",
        background: "#fff",
        color: "#2a2428",
        fontFamily: FONT.display,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "2.2cqw",
          color: "#6f6468",
          opacity: tween(t, [0, 12], [0, 1]),
        }}
      >
        <b
          style={{
            fontFamily: FONT.serif,
            fontSize: "3.6cqw",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "#2a2428",
            border: "1px solid currentColor",
            padding: "0.2cqw 1.6cqw",
          }}
        >
          ELEVÉ
        </b>
        <span>collections · about</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "1cqw" }}>
          bag
          <em
            style={{
              display: "inline-block",
              height: "3cqw",
              width: "3cqw",
              borderRadius: "50%",
              background: PLUM,
              color: "#fff",
              fontStyle: "normal",
              fontFamily: FONT.mono,
              fontSize: "1.9cqw",
              lineHeight: "3cqw",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <span style={{ display: "block", translate: `0 ${-3 * count}cqw` }}>
              0<br />1<br />2
            </span>
          </em>
        </span>
      </div>

      <div style={{ ...SERIF, fontStyle: "normal", fontSize: "6cqw", lineHeight: 1, opacity: tween(t, [6, 20], [0, 1]) }}>
        Latest Arrivals
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2cqw", flex: 1, minHeight: 0 }}>
        {[0, 1, 2, 3].map((i) => {
          const at = 12 + i * 5;
          const selected = i === 1 ? tween(t, [40, 50], [0, 1]) : 0;
          return (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "1cqw",
                opacity: tween(t, [at, at + 14], [0, 1]),
                translate: `0 ${tween(t, [at, at + 18], [8, 0]) - selected * 1.2}cqw`,
              }}
            >
              <i
                style={{
                  display: "block",
                  flex: 1,
                  borderRadius: "0.6cqw",
                  background: `radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.5) 0 18%, transparent 19%),
                    linear-gradient(160deg, hsl(${330 + i * 12} 30% 78%), hsl(${340 + i * 10} 28% 58%))`,
                  boxShadow: `0 ${2 * selected}cqw ${4 * selected}cqw -1cqw rgba(42, 36, 40, ${0.35 * selected})`,
                }}
              />
              <i style={{ display: "block", height: "1.2cqw", width: "80%", borderRadius: 99, background: "#e8e1e4" }} />
              <i style={{ display: "block", height: "1.2cqw", width: "45%", borderRadius: 99, background: "#d6cbd0" }} />
              {i === 1 && (
                <span
                  style={{
                    position: "absolute",
                    left: "8%",
                    right: "8%",
                    bottom: "30%",
                    padding: "1cqw",
                    borderRadius: 99,
                    background: pressed > 0.01 ? PLUM : "#2a2428",
                    color: "#fff",
                    fontSize: "1.8cqw",
                    textAlign: "center",
                    opacity: tween(t, [42, 50], [0, 1]),
                    scale: 1 - 0.1 * pressed,
                  }}
                >
                  Add to bag
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: "18%",
          right: "18%",
          bottom: 0,
          display: "grid",
          gap: "1.6cqw",
          padding: "3cqw 3.6cqw 3.6cqw",
          borderRadius: "2cqw 2cqw 0 0",
          background: "#1f1a1d",
          color: "#fff",
          fontSize: "2.2cqw",
          boxShadow: "0 -2cqw 5cqw rgba(0, 0, 0, 0.2)",
          translate: `0 ${sheet}%`,
        }}
      >
        <span style={{ fontFamily: FONT.mono, fontSize: "1.8cqw", textTransform: "uppercase", letterSpacing: "0.08em", color: "#b9adb3" }}>
          Checkout
        </span>
        <i
          style={{
            display: "block",
            height: "4.6cqw",
            borderRadius: "1cqw",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background:
              "repeating-linear-gradient(90deg, transparent 0 2cqw, rgba(255, 255, 255, 0.35) 2cqw 2.6cqw) 2cqw 50% / 60% 0.8cqw no-repeat",
          }}
        />
        <b style={{ padding: "1.4cqw", borderRadius: "1cqw", background: "#635bff", textAlign: "center", fontWeight: 600 }}>
          Pay with Stripe
        </b>
      </div>
    </div>
  );
};
