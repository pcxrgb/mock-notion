import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { events } from "../data/calendarEvents";

export default function CalendarPage() {
  return (
    <div
      enable-xr
      style={
        {
          "--xr-background-material": "regular",
        } as React.CSSProperties
      }
      className="h-screen w-screen border border-white/10 p-4 font-bold text-white shadow"
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        firstDay={1}
        events={events.map((ev) => ({
          title: ev.title,
          start: ev.start,
          end: ev.end,
        }))}
      />
    </div>
  );
}
