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
    const recent: RecentPage[] = Array.from({ length: 6 }).map((_, i) => ({
      id: `demo-${i + 1}`,
      title: i % 2 === 0 ? "Project Notes" : "Research Log",
      lastEdited: new Date(Date.now() - i * 8.64e7).toISOString(),
    }));
    const now = new Date();
    const events: CalendarEvent[] = Array.from({ length: 8 }).map((_, i) => {
      const day = new Date(now);
      day.setDate(now.getDate() + i);
      const startHour = 14 + (i % 3);
      const endHour = startHour + 1;
      const start = new Date(day);
      start.setHours(startHour, (i % 2) * 15, 0, 0);
      const end = new Date(day);
      end.setHours(endHour, (i % 2) * 15, 0, 0);
      const calendarId: CalendarId = i % 3 === 0 ? "work" : i % 3 === 1 ? "personal" : "holidays";
      return {
        name: i % 2 === 0 ? "Research" : "Meeting",
        calendarId,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
      };
    });
    set({ recent, events, loading: false });
  },
  reset: () => set({ recent: [], events: [] }),
}));
