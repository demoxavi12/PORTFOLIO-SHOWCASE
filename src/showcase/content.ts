// Everything the video says, copied from the portfolio's single source of truth:
// Desktop/MY PORTFOLIO/portfolio/src/data/content.js (backed by the résumé PDF).
// Do not add facts here that are not in that file.

export const person = {
  first: "SWARAJ",
  middle: "Xavier",
  last: "SUNA",
  role: "Full-stack developer",
  location: "Berhampur, Odisha",
  email: "swarajxaviersuna@gmail.com",
  status: ["Open to", "SDE internships & junior developer roles"],
};

export const socials = [
  { label: "GitHub", handle: "demoxavi12" },
  { label: "LinkedIn", handle: "in/swaraj-6009a8332" },
  { label: "LeetCode", handle: "swaraj_xavier_suna" },
];

// about.statement — plain runs and the two italic emphases.
export const statement: { text: string; em?: boolean }[] = [
  { text: "I'm a computer science student who builds full-stack web apps —" },
  { text: "the APIs, auth and caching underneath,", em: true },
  { text: "and the interface you actually" },
  { text: "touch.", em: true },
];

export type Project = {
  id: "pulseops" | "chat" | "eleve";
  index: string;
  name: string;
  title: string;
  kind: string;
  ghost: string;
  accent: string;
  url: string;
  notes: string[];
  stack: string[];
};

export const projects: Record<Project["id"], Project> = {
  pulseops: {
    id: "pulseops",
    index: "01",
    name: "PulseOps",
    title: "Notification & Analytics Dashboard",
    kind: "Mini SaaS system",
    ghost: "PULSEOPS",
    accent: "#2B45F5",
    url: "mini-saas-system.vercel.app",
    notes: [
      "Aggregates events and notifications from 3+ backend services",
      "Role-based access control and protected admin routes with JWT",
      "Redis caching and rate limiting on the request path",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "JWT Auth", "REST APIs"],
  },
  chat: {
    id: "chat",
    index: "02",
    name: "Real-Time Chat",
    title: "Real-Time Chat Application",
    kind: "Messaging platform",
    ghost: "REALTIME",
    accent: "#FF5A1F",
    url: "real-time-chat-application.vercel.app",
    notes: [
      "Concurrent multi-user messaging over WebSockets with Socket.IO",
      "JWT-based authentication for every connection",
      "Public and private chat rooms",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT Auth", "REST APIs", "MVC"],
  },
  eleve: {
    id: "eleve",
    index: "03",
    name: "Elevé",
    title: "E-Commerce Platform",
    kind: "Full-stack storefront",
    ghost: "ELEVÉ",
    accent: "#6E1F45",
    url: "e-commerce-platform.vercel.app",
    notes: [
      "Auth, product catalogue management and cart",
      "Stripe API integration for payments",
      "Role-based admin controls and JWT-secured API workflows",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Stripe API", "REST APIs", "Postman"],
  },
};

export const stackLayers = [
  { id: "interface", label: "Interface", caption: "what the user touches", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"] },
  {
    id: "server",
    label: "Server",
    caption: "where requests are decided",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "MVC", "Socket.IO", "Stripe API"],
  },
  { id: "data", label: "Data", caption: "what is kept & how fast", items: ["MongoDB", "Mongoose", "Redis", "SQL", "DBMS"] },
];
