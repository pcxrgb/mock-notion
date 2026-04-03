'use client';
import React from "react";
import iconUpcoming from "../assets/icons/icon-upcoming.svg";
import type { CalendarEvent, CalendarId } from "../state/dashboardStore";

type Props = {
  events: CalendarEvent[];
  loading: boolean;
};

const colorByCalendar: Record<CalendarId, string> = {
  work: "bg-cyan-400",
  personal: "bg-pink-300",
  holidays: "bg-amber-300",
};

function timeRange(startISO: string, endISO: string) {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const fmt = (d: Date) => {
    const h = d.getHours();
    const m = d.getMinutes();
    const period = h >= 12 ? "PM" : "AM";
    const hh = h % 12 === 0 ? 12 : h % 12;
    const mm = m.toString().padStart(2, "0");
    return `${hh}:${mm} ${period}`;
  };
  return `${fmt(s)} - ${fmt(e)}`;
}

export default function UpcomingEvents({ events, loading }: Props) {
  return (
    <section className="z-[1] flex-1 min-h-0 flex flex-col">
      <div className="flex items-center gap-2 text-neutral-300">
        <img src={(iconUpcoming as any).src ?? (iconUpcoming as any)} alt="" className="w-5 h-5" />
        <p className="text-[17px]">Upcoming Event</p>
      </div>
      <div className="mt-4 w-full rounded-2xl bg-white/10 backdrop-blur px-5 pt-6 pb-4 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="space-y-5">
          {events.map((ev, idx) => {
            const d = new Date(ev.startISO);
            const label = d.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            });
            const colorClass = colorByCalendar[ev.calendarId];
            return (
              <div key={idx} className="flex items-start gap-6">
                <p
                  className={`w-[183px] shrink-0 text-[17px] font-semibold ${
                    idx === 0 ? "text-orange-400" : "text-neutral-400"
                  } mt-1`}
                >
                  {label}
                </p>
                <div className="flex items-start gap-4">
                  <div className={`w-[5px] h-16 rounded ${colorClass}`} />
                  <div className="flex flex-col">
                    <p className="text-[17px] font-semibold text-white/95">{ev.name}</p>
                    <p className="text-[17px] font-semibold text-neutral-400 mt-3">
                      {timeRange(ev.startISO, ev.endISO)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {loading && events.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-neutral-300">Loading…</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
