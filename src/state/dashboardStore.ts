import { create } from "zustand";
import { demoEvents } from "../data/demoEvents";

export type RecentPage = { id: string; title: string; lastEdited: string; avatarUrl?: string };
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
      const rRes = await fetch("/api/notion/recent", { cache: "no-store" });
      const r = (await rRes.json()) as unknown;
      const recent = Array.isArray(r) ? (r as RecentPage[]) : [];
      set({ recent, events: demoEvents, loading: false });
      return;
    } catch {
      set({ recent: [], events: demoEvents, loading: false });
      return;
    }
  },
  reset: () => set({ recent: [], events: [] }),
}));
