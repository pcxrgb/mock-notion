'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function CalendarPage() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const monthName = monthStart.toLocaleString(undefined, { month: "long" });
  const yearNum = monthStart.getFullYear();

  const monthDays = useMemo(() => {
    const days: Array<{ day: number; date: Date }> = [];
    for (let d = 1; d <= monthEnd.getDate(); d++) {
      days.push({ day: d, date: new Date(now.getFullYear(), now.getMonth(), d) });
    }
    return days;
  }, [now, monthEnd]);

  const firstWeekday = monthStart.getDay();
  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendars = [
    { id: "work", name: "Work", color: "bg-sky-300" },
    { id: "personal", name: "Personal", color: "bg-pink-300" },
    { id: "holidays", name: "US Holidays", color: "bg-amber-300" },
  ];
  const [active, setActive] = useState<Record<string, boolean>>({
    work: true,
    personal: true,
    holidays: true,
  });

  const startHour = 8;
  const endHour = 19;
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridHeight, setGridHeight] = useState(0);
  useEffect(() => {
    if (!gridRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setGridHeight(rect.height);
    });
    ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, []);
  const hourHeight = Math.max(32, gridHeight ? gridHeight / (endHour - startHour) : 42);
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const weekDays = useMemo(() => {
    const base = new Date(now);
    const day = base.getDay();
    const mondayOffset = ((day + 6) % 7) * -1;
    const monday = new Date(base);
    monday.setDate(base.getDate() + mondayOffset);
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [now]);

  type DemoEvent = {
    title: string;
    who: string;
    calendarId: string;
    dayIndex: number;
    start: string;
    end: string;
  };

  const demoEvents: DemoEvent[] = [
    { title: "Research", who: "Team sync", calendarId: "work", dayIndex: 0, start: "10:00", end: "12:00" },
    { title: "Design with Peter", who: "UX review", calendarId: "work", dayIndex: 1, start: "13:00", end: "14:30" },
    { title: "Interview", who: "Candidate", calendarId: "work", dayIndex: 2, start: "14:00", end: "15:00" },
    { title: "Workout", who: "Gym", calendarId: "personal", dayIndex: 4, start: "11:00", end: "12:00" },
    { title: "Groceries", who: "List", calendarId: "personal", dayIndex: 4, start: "15:00", end: "16:00" },
    { title: "Memorial Day", who: "Holiday", calendarId: "holidays", dayIndex: 3, start: "09:00", end: "10:00" },
  ];

  const parseHM = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return { h, m };
  };
  const getPos = (start: string, end: string) => {
    const { h: sh, m: sm } = parseHM(start);
    const { h: eh, m: em } = parseHM(end);
    const top = (sh - startHour) * hourHeight + (sm / 60) * hourHeight;
    const height = (eh - sh) * hourHeight + ((em - sm) / 60) * hourHeight;
    return { top, height };
  };

  return (
    <div
      enable-xr="true"
      style={{ ["--xr-background-material" as any]: "regular" }}
      className="w-screen h-screen p-12 flex gap-6 shadow border border-white/10"
    >
      <div className="w-1/5 min-w-[240px] h-full rounded-2xl px-5 py-6 flex flex-col">
        <h2 className="text-lg font-semibold text-white/90">
          {monthName} {yearNum}
        </h2>
        <div className="mt-4 rounded-xl bg-white/10 backdrop-blur p-3">
          <div className="grid grid-cols-7 gap-1 text-xs text-white/80">
            {weekdayLabels.map((w) => (
              <div key={w} className="text-center opacity-80">
                {w}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: firstWeekday }, (_, i) => (
              <div key={`pad-${i}`} className="h-7 rounded-md" />
            ))}
            {monthDays.map(({ day, date }) => {
              const isToday =
                date.getDate() === now.getDate() &&
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear();
              return (
                <div
                  key={day}
                  className={[
                    "h-7 rounded-md flex items-center justify-center text-sm",
                    isToday ? "bg-white/20 text-white font-semibold" : "bg-white/5 text-white/90",
                  ].join(" ")}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white/80">Calendars</h3>
          <ul className="mt-3 space-y-2">
            {calendars.map((c) => (
              <li key={c.id} className="flex items-center gap-2">
                <input
                  id={`cal-${c.id}`}
                  type="checkbox"
                  checked={!!active[c.id]}
                  onChange={() => setActive((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                  className="appearance-none w-4 h-4 rounded border border-white/50 checked:bg-white/80"
                />
                <span className={["inline-block w-2 h-2 rounded", c.color].join(" ")} />
                <label htmlFor={`cal-${c.id}`} className="text-[15px] text-white/90">
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" />
      </div>
      <div className="flex-1 h-full rounded-2xl bg-white text-neutral-900 overflow-auto px-6 py-6">
        <div className="max-w-[1100px] mx-auto h-full flex flex-col">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] items-end">
            <div />
            {weekDays.map((d, i) => (
              <div key={i} className="text-center text-sm font-semibold text-neutral-700">
                {d.toLocaleString(undefined, { weekday: "short" })}{" "}
                <span className="text-neutral-500">{d.getDate()}</span>
              </div>
            ))}
          </div>
          <div ref={gridRef} className="mt-2 grid grid-cols-[80px_repeat(5,1fr)] flex-1 min-h-0 relative">
            <div className="relative">
              {hours.map((h) => (
                <div
                  key={h}
                  className="absolute left-0 right-0 text-[11px] text-neutral-500"
                  style={{ top: `${(h - startHour) * hourHeight - 6}px` }}
                >
                  {String(h).padStart(2, "0")}:00
                </div>
              ))}
            </div>
            {weekDays.map((_, dayIdx) => (
              <div key={dayIdx} className="relative border-l border-neutral-200">
                {hours.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-t border-neutral-100"
                    style={{ top: `${(h - startHour) * hourHeight}px` }}
                  />
                ))}
                {demoEvents
                  .filter((e) => e.dayIndex === dayIdx && active[e.calendarId])
                  .map((e, idx) => {
                    const { top, height } = getPos(e.start, e.end);
                    const color = calendars.find((c) => c.id === e.calendarId)?.color ?? "bg-neutral-200";
                    return (
                      <div
                        key={idx}
                        className={[
                          "absolute left-1 right-1 rounded-md p-2 text-[12px] shadow-sm border",
                          color,
                          "border-white",
                        ].join(" ")}
                        style={{ top, height }}
                      >
                        <div className="font-semibold">{e.title}</div>
                        <div className="text-[11px] opacity-80">{e.who}</div>
                        <div className="text-[11px] opacity-80">
                          {e.start}–{e.end}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
