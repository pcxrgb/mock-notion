export type CalendarEvent = {
  title: string;
  start: Date;
  end?: Date;
  colorClass: string;
};

const addDays = (base: Date, days: number) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

const withTime = (date: Date, hours: number, minutes: number) => {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

const today = new Date();

const colorClasses = [
  "bg-cyan-400",
  "bg-emerald-400",
  "bg-yellow-400",
  "bg-fuchsia-400",
  "bg-sky-400",
  "bg-purple-400",
  "bg-rose-400",
  "bg-lime-400",
];

export const events: CalendarEvent[] = Array.from({ length: 8 }).map((_, i) => {
  const day = addDays(today, i);
  const startHour = 14 + (i % 3);
  const startMin = (i % 2) * 15;
  const endHour = startHour + 1;
  const endMin = startMin;
  return {
    title: i % 2 === 0 ? "Research" : "Meeting",
    start: withTime(day, startHour, startMin),
    end: withTime(day, endHour, endMin),
    colorClass: colorClasses[i % colorClasses.length],
  };
});
