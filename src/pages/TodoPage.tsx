import React from "react";
import { documents } from "../data/recentDocuments";

type TodoItem = { id: number; text: string; done: boolean };

const defaultTodos: TodoItem[] = [
  { id: 1, text: "Review requirements", done: false },
  { id: 2, text: "Outline tasks and owners", done: true },
  { id: 3, text: "Track open questions", done: false },
  { id: 4, text: "Schedule follow-up", done: false },
];

export default function TodoPage() {
  const listItems = React.useMemo(
    () => documents.filter((d) => d.type === "List"),
    [],
  );
  const [currentIdx, setCurrentIdx] = React.useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const p = new URLSearchParams(window.location.search);
    const t = p.get("title");
    if (!t) return null;
    const idx = listItems.findIndex((d) => d.title === t);
    return idx >= 0 ? idx : null;
  });

  const getTodosForTitle = React.useCallback((title: string): TodoItem[] => {
    if (title.toLowerCase().includes("user flow")) {
      return [
        { id: 1, text: "List core screens", done: true },
        { id: 2, text: "Map interactions", done: false },
        { id: 3, text: "Validate edge cases", done: false },
        { id: 4, text: "Share review notes", done: false },
      ];
    }
    return defaultTodos;
  }, []);

  const [todos, setTodos] = React.useState<TodoItem[]>(
    currentIdx != null && listItems[currentIdx]
      ? getTodosForTitle(listItems[currentIdx].title)
      : [],
  );

  React.useEffect(() => {
    if (currentIdx != null && listItems[currentIdx]) {
      setTodos(getTodosForTitle(listItems[currentIdx].title));
    } else {
      setTodos([]);
    }
  }, [currentIdx, listItems, getTodosForTitle]);

  const toggle = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  return (
    <div
      enable-xr
      style={{ "--xr-background-material": "regular" } as React.CSSProperties}
      className="flex h-screen w-screen flex-col gap-6 overflow-hidden border border-white/10 p-12 shadow lg:flex-row"
    >
      <div className="hidden h-full w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex">
        <h2 className="text-lg font-semibold text-white/90">Lists</h2>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="space-y-2">
            {listItems.map((d, i) => {
              const selected = currentIdx === i;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setCurrentIdx(i)}
                    title={d.title}
                    className={`w-full truncate rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                      selected
                        ? "bg-white/10 text-white"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {d.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={`h-full flex-1 overflow-auto rounded-2xl px-10 py-8 lg:hidden ${
          listItems[0] ? "bg-white text-neutral-900" : "bg-white/10 text-neutral-200"
        }`}
      >
        <div className="mx-auto max-w-[900px]">
          {!listItems[0] ? (
            <h1 className="text-2xl font-semibold">Select a list to get started</h1>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{listItems[0].title}</h1>
              <div className="mt-6">
                <ul className="space-y-3">
                  {getTodosForTitle(listItems[0].title).map((t) => (
                    <li key={t.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 accent-cyan-500"
                        onChange={() => {}}
                        checked={t.done}
                        readOnly
                      />
                      <span
                        className={[
                          "break-words text-[17px] font-semibold",
                          t.done ? "text-neutral-700 line-through" : "text-neutral-900",
                        ].join(" ")}
                      >
                        {t.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 text-[14px] text-neutral-600">
                Last updated: Today — Checklist
              </p>
            </>
          )}
        </div>
      </div>

      <div
        className={`hidden h-full flex-1 overflow-auto rounded-2xl px-10 py-8 lg:block ${
          currentIdx != null ? "bg-white text-neutral-900" : "bg-white/10 text-neutral-200"
        }`}
      >
        <div className="mx-auto max-w-[900px]">
          {currentIdx == null || !listItems[currentIdx] ? (
            <h1 className="text-2xl font-semibold">Click a list on the left to get started</h1>
          ) : (
            <>
              <h1 className="text-3xl font-bold">
                {listItems[currentIdx].title}
              </h1>
              <div className="mt-6">
                <ul className="space-y-3">
                  {todos.map((t) => (
                    <li key={t.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 accent-cyan-500"
                        onChange={() => toggle(t.id)}
                        aria-label={`todo-${t.id}`}
                        checked={t.done}
                      />
                      <span
                        className={[
                          "break-words text-[17px] font-semibold",
                          t.done ? "text-neutral-700 line-through" : "text-neutral-900",
                        ].join(" ")}
                      >
                        {t.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 text-[14px] text-neutral-600">
                Last updated: Today — Checklist
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
