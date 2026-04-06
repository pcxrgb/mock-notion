'use client';

import React, { useEffect } from "react";
import Image from "next/image";
import TabBar from "../components/TabBar";
import { useDashboardStore } from "../state/dashboardStore";
import iconRecent from "../assets/icons/icon-recent.svg";
import avatar from "../assets/images/avatar-default.png";
import iconUpcoming from "../assets/icons/icon-upcoming.svg";
import type { RecentPage, CalendarEvent, CalendarId } from "../state/dashboardStore";

type RecentListProps = {
  recent: RecentPage[];
  loading: boolean;
};

function RecentList({ recent, loading }: RecentListProps) {
  return (
    <section>
      <div className="flex items-center gap-2 text-neutral-300">
        <Image src={iconRecent as any} alt="" width={20} height={20} className="inline-block" />
        <p className="text-[17px]">Recently visited</p>
      </div>
      <div className="mt-4 w-full overflow-x-auto pr-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-3 w-max">
          {recent.map((d) => (
            <div
              key={d.id}
              className="shrink-0 rounded-2xl bg-white/10 backdrop-blur p-4 w-[168px] h-[205px] flex flex-col"
            >
              <div className="w-[46px] h-[46px] rounded-xl bg-white/20" />
              <p className="mt-4 ml-1 text-[17px] font-semibold text-white/95 leading-5 w-[140px]">
                {d.title || "Untitled"}
              </p>
              <div className="mt-auto flex items-center justify-between pr-1 pl-1">
                <img
                  src={(d as any).avatarUrl ?? ((avatar as any).src ?? (avatar as any))}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p className="text-[17px] font-semibold text-neutral-400 w-[106px] text-right">
                  {new Date(d.lastEdited).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {loading && recent.length === 0 && (
            <div className="shrink-0 rounded-2xl bg-white/10 backdrop-blur p-4 w-[168px] h-[205px] flex items-center justify-center">
              <p className="text-neutral-300">Loading…</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type UpcomingEventsProps = {
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

function UpcomingEvents({ events, loading }: UpcomingEventsProps) {
  return (
    <section className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-center gap-2 text-neutral-300">
        <img src={(iconUpcoming as any).src ?? (iconUpcoming as any)} alt="" className="w-5 h-5" />
        <p className="text-[17px]">Upcoming Events</p>
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
                  className={`w-[183px] shrink-0 text-[17px] font-semibold ${idx === 0 ? "text-orange-400" : "text-neutral-400"
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

export default function HomePage() {
  const { recent, events, loading, load } = useDashboardStore();
  useEffect(() => {
    load();
  }, [load]);
  return (
    <div className="h-screen w-screen relative overflow-hidden ">
      <div className="absolute inset-0 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div className="rounded-8xl w-screen h-screen p-12 flex flex-col items-center shadow border border-white/10 overflow-hidden">
            <h1 className="text-5xl font-bold text-white">Dashboard</h1>
            <div className="relative mt-6 w-full max-w-[1200px] flex-1 min-h-0 flex flex-col gap-8">
              <RecentList recent={recent} loading={loading} />
              <UpcomingEvents events={events} loading={loading} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-1/2 left-10 -translate-y-1/2">
        <div className="tabbar-overlay">
          <TabBar />
        </div>
      </div>
    </div>
  );
}
