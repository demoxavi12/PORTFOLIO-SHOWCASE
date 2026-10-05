import { BrowserFrame } from "../components/BrowserFrame";
import { projects } from "../content";
import { ChatUI } from "../schematics/ChatUI";
import { CodeUI, FragmentChip, HttpUI, MongoUI, TokenUI } from "../schematics/Fragments";
import { PulseOpsUI } from "../schematics/PulseOpsUI";
import { SHOP, ShopUI } from "../schematics/ShopUI";
import { MONO } from "../theme";
import { ProjectChapter, UI_START } from "./ProjectChapter";

const TOTAL = 3;

/** A hero-style fragment: a small browser frame with its own url + tag. */
const mini = (url: string, tag: string, width: number, body: React.ReactNode) => (
  <BrowserFrame url={url} tag={tag} accent="#000000" width={width}>
    {body}
  </BrowserFrame>
);

const chip = (label: string, tone: "cobalt" | "tangerine" | "plum", width: number) => (
  <FragmentChip label={label} tone={tone} width={width} style={{ ...MONO, position: "relative", fontSize: 17 }} />
);

// 9–18s — PulseOps, cobalt. Route middleware, the MongoDB event query and the
// rate limiter's 429 surface around the dashboard: the request path made visible.
export const PulseOpsChapter: React.FC = () => (
  <ProjectChapter
    project={projects.pulseops}
    total={TOTAL}
    renderUI={(t, fps) => <PulseOpsUI t={t} fps={fps} />}
    fragments={[
      { at: 100, x: 70, y: 150, depth: 0.6, render: (t) => mini("routes/events.js", "src", 360, <CodeUI t={t} fps={30} />) },
      { at: 112, x: 1500, y: 130, depth: -0.4, render: () => mini("mongosh · events", "db", 360, <MongoUI />) },
      { at: 124, x: 1510, y: 690, depth: 0.9, render: () => mini("gateway · response", "http", 300, <HttpUI />) },
    ]}
  />
);

// 18–27s — Real-Time Chat, tangerine. The socket and the decoded JWT that
// gates every connection.
export const ChatChapter: React.FC = () => (
  <ProjectChapter
    project={projects.chat}
    total={TOTAL}
    renderUI={(t, fps) => <ChatUI t={t} fps={fps} />}
    fragments={[
      { at: 84, x: 1500, y: 170, depth: 0.3, render: () => chip("socket.io · #general", "tangerine", 340) },
      { at: 104, x: 64, y: 650, depth: 0.7, render: () => mini("auth · decoded", "jwt", 330, <TokenUI />) },
    ]}
  />
);

// 27–36s — Elevé, plum. Products load from the API; checkout hands off to Stripe.
export const EleveChapter: React.FC = () => (
  <ProjectChapter
    project={projects.eleve}
    total={TOTAL}
    renderUI={(t) => <ShopUI t={t} />}
    fragments={[
      { at: 70, x: 90, y: 180, depth: 0.5, render: () => chip("GET /products 200", "cobalt", 320) },
      { at: UI_START + SHOP.sheet, x: 1510, y: 700, depth: 0.8, render: () => chip("stripe.checkout", "plum", 320) },
    ]}
  />
);
