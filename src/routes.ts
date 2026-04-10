export const routes = {
  root: "/",
  todo: "/todo",
  ai: "/ai",
  doc: "/doc",
  calendar: "/calendar",
} as const;

export type RouteKey = keyof typeof routes;
