import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CalendarPage() {
  return (
    <div
      enable-xr
      style={
        {
          "--xr-background-material": "regular",
        } as React.CSSProperties
      }
      className="w-screen h-screen p-4 text-white font-bold rounded"
    >
      <style>
        {`
          .fc .fc-button {
            background-color: rgb(15 23 42);
            color: white;
            border-color: rgb(15 23 42);
          }
          .fc .fc-button:hover {
            background-color: rgba(15, 23, 42, 0.85);
          }
          .fc .fc-button:disabled {
            background-color: rgb(15 23 42);
            color: white;
            opacity: 0.6;
          }
        `}
      </style>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        firstDay={1}
      />
    </div>
  );
}
