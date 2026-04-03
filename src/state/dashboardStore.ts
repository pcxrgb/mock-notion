import { create } from "zustand";

export type RecentPage = { id: string; title: string; lastEdited: string };
export type CalendarId = "work" | "personal" | "holidays";
export type CalendarEvent = {
  name: string;
  calendarId: CalendarId;
  startISO: string;
  endISO: string;
};

type DashboardState = {
  recent: RecentPage[];
  events: CalendarEvent[];
  loading: boolean;
  load: () => Promise<void>;
  reset: () => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  recent: [],
  events: [],
  loading: false,
  load: async () => {
    set({ loading: true });
    try {
      const [rRes, eRes] = await Promise.all([
        fetch("/api/notion/recent", { cache: "no-store" }),
        fetch("/api/notion/events", { cache: "no-store" }),
      ]);
      const r = (await rRes.json()) as unknown;
      const e = (await eRes.json()) as unknown;
      const recent = Array.isArray(r) ? (r as RecentPage[]) : [];
      const events = Array.isArray(e) ? (e as CalendarEvent[]) : [];
      set({ recent, events, loading: false });
      return;
    } catch {
      set({ recent: [], events: [], loading: false });
      return;
    }
  },
  reset: () => set({ recent: [], events: [] }),
}));
