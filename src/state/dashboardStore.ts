import { create } from "zustand";

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
      const demoEvents: CalendarEvent[] = [
        {
          name: "Design Review",
          calendarId: "work",
          startISO: "2026-04-06T13:00:00.000Z",
          endISO: "2026-04-06T14:00:00.000Z",
        },
        {
          name: "Gym",
          calendarId: "personal",
          startISO: "2026-04-07T10:00:00.000Z",
          endISO: "2026-04-07T11:00:00.000Z",
        },
        {
          name: "Team Sync",
          calendarId: "work",
          startISO: "2026-04-08T16:00:00.000Z",
          endISO: "2026-04-08T16:30:00.000Z",
        },
        {
          name: "Public Holiday",
          calendarId: "holidays",
          startISO: "2026-04-10T00:00:00.000Z",
          endISO: "2026-04-10T23:59:59.000Z",
        },
      ];
      const rRes = await fetch("/api/notion/recent", { cache: "no-store" });
      const r = (await rRes.json()) as unknown;
      const recent = Array.isArray(r) ? (r as RecentPage[]) : [];
      set({ recent, events: demoEvents, loading: false });
      return;
    } catch {
      const demoEvents: CalendarEvent[] = [
        {
          name: "Design Review",
          calendarId: "work",
          startISO: "2026-04-06T13:00:00.000Z",
          endISO: "2026-04-06T14:00:00.000Z",
        },
        {
          name: "Gym",
          calendarId: "personal",
          startISO: "2026-04-07T10:00:00.000Z",
          endISO: "2026-04-07T11:00:00.000Z",
        },
        {
          name: "Team Sync",
          calendarId: "work",
          startISO: "2026-04-08T16:00:00.000Z",
          endISO: "2026-04-08T16:30:00.000Z",
        },
        {
          name: "Public Holiday",
          calendarId: "holidays",
          startISO: "2026-04-10T00:00:00.000Z",
          endISO: "2026-04-10T23:59:59.000Z",
        },
      ];
      set({ recent: [], events: demoEvents, loading: false });
      return;
    }
  },
  reset: () => set({ recent: [], events: [] }),
}));
