import type { CalendarEvent } from "../state/dashboardStore";

export const demoEvents: CalendarEvent[] = [
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
