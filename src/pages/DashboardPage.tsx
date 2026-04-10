import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import iconRecent from "../assets/icons/icon-recent.svg";
import { FileText, ListTodo, Database as DbIcon } from "lucide-react";
import avatar1 from "../assets/images/avatar-example-1.png";
import avatar2 from "../assets/images/avatar-example-2.png";
import iconUpcoming from "../assets/icons/icon-upcoming.svg";
import { documents, type DocType } from "../data/recentDocuments";
import { events as calendarEvents } from "../data/calendarEvents";

export default function DashboardPage() {
  const [showGreeting, setShowGreeting] = React.useState(false);

  const listContainer = React.useMemo<Variants>(
    () =>
      ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.05,
        },
      },
      }) as Variants,
    []
  );

  const itemVariant = React.useMemo<Variants>(
    () =>
      ({
      hidden: { opacity: 0, y: 10 },
      show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", bounce: 0, duration: 0.5 },
      },
    }) as Variants,
    []
  );
  React.useEffect(() => {
    setShowGreeting(true);
    const tHide = setTimeout(() => setShowGreeting(false), 1500);
    return () => {
      clearTimeout(tHide);
    };
  }, []);
  const formatDateLabel = (date: Date, idx: number) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
    const label = date.toLocaleDateString(undefined, options);
    return idx === 0 ? `${label}` : label;
  };

  const formatTimeRange = (start: Date, end?: Date) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const to12h = (h: number) => {
      const period = h >= 12 ? "PM" : "AM";
      const hh = h % 12 === 0 ? 12 : h % 12;
      return { hh, period };
    };
    const sh = start.getHours();
    const sm = start.getMinutes();
    const eh = (end ?? start).getHours();
    const em = (end ?? start).getMinutes();
    const s = to12h(sh);
    const e = to12h(eh);
    return `${s.hh}:${pad(sm)} ${s.period} - ${e.hh}:${pad(em)} ${e.period}`;
  };

  const formatDocDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const getDocIcon = (type: DocType) => {
    if (type === "Document") return <FileText className="w-8 h-8 text-neutral-200" aria-label="Document" />;
    if (type === "List") return <ListTodo className="w-8 h-8 text-neutral-200" aria-label="List" />;
    return <DbIcon className="w-8 h-8 text-neutral-200" aria-label="Database" />;
  };

  const upcoming = calendarEvents
    .filter(ev => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      return ev.start >= todayStart;
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 8)
    .map((ev, i) => ({
      dateLabel: formatDateLabel(ev.start, i),
      name: ev.title,
      time: formatTimeRange(ev.start, ev.end),
      colorClass: ev.colorClass,
    }));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div 
    enable-xr
    style={{"--xr-background-material": "regular"}}
    className="w-screen h-screen p-12 flex flex-col items-center shadow border border-white/10 overflow-hidden">
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="greeting-overlay">
          <div
            enable-xr
            style={{ "--xr-background-material": "regular" } as React.CSSProperties}
            className={`flex h-full w-full items-center justify-center transition-all duration-700 ${
              showGreeting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <h1 className="text-6xl font-bold text-white">{getGreeting()}</h1>
          </div>
        </div>
      </div>
      <div
        className={`relative mt-6 w-full max-w-[1200px] flex-1 min-h-0 flex flex-col gap-8 transition-all duration-700 ${
          showGreeting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.7, ease: "easeOut" }}>
          <div className="flex items-center gap-2 text-neutral-300">
            <img src={iconRecent} alt=""/>
            <p className="text-[17px]">Recently visited</p>
          </div>

          <div className="mt-4 w-full overflow-x-auto pr-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              className="flex items-stretch gap-3 w-max"
              variants={listContainer}
              initial="hidden"
              animate="show"
            >
              {documents.slice(0, 6).map((d, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur shrink-0 rounded-2xl p-4 flex flex-col hover:cursor-pointer"
                  variants={itemVariant}
                  onClick={() =>
                    window.open(`/doc?title=${encodeURIComponent(d.title)}`, "_blank", "noopener,noreferrer")
                  }
                  title="Open document"
                >
                  <div className="ml-1">{getDocIcon(d.type)}</div>
                  <p className="my-4 ml-1 font-semibold text-neutral-100 leading-5 w-[140px] hover:text-neutral-50">
                    {d.title}
                  </p>
                  <div className="mt-auto flex items-center justify-between pr-1 pl-1">
                    <img src={i % 2 === 0 ? avatar1 : avatar2} alt="" className="w-6 h-6 rounded-full object-cover"/>
                    <p className="text-[17px] font-semibold text-neutral-400 w-[106px] text-right">{formatDocDate(d.lastAccessed)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="flex-1 min-h-0 flex flex-col" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 2.2, ease: "easeOut" }}>
          <div className="flex items-center gap-2 text-neutral-300">
            <img src={iconUpcoming} alt="" className="w-5 h-5" />
            <p className="text-[17px]">Upcoming Events</p>
          </div>

          <div className="mt-4 w-full rounded-2xl bg-white/10 backdrop-blur px-5 pt-6 pb-4 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              className="space-y-5"
              variants={listContainer}
              initial="hidden"
              animate="show"
            >
              {upcoming.map((ev, idx) => (
              <motion.div key={idx} className="flex items-start gap-6" variants={itemVariant}>
                  <p
                    className={`w-[183px] shrink-0 text-[17px] font-semibold ${
                      idx === 0 ? "text-orange-400" : "text-neutral-400"
                    } mt-1`}
                  >
                    {ev.dateLabel}
                  </p>
                  <div className="flex items-start gap-4">
                    <div className={`w-[5px] h-16 rounded ${ev.colorClass}`} />
                    <div className="flex flex-col">
                      <p className="text-[17px] font-semibold text-white/95">{ev.name}</p>
                      <p className="text-[17px] font-semibold text-neutral-400 mt-3">{ev.time}</p>
                    </div>
                  </div>
              </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
