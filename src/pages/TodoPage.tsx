import React, { useState } from "react";

type TodoItem = { id: number; text: string; done: boolean };

const initialTodos: TodoItem[] = [
  { id: 1, text: "Revise the design plan", done: false },
  { id: 2, text: "Review the interaction effects with David", done: true },
  { id: 3, text: "Wait for David to fix the bugs", done: false },
  { id: 4, text: "Continue the architectural software research", done: false },
];

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

  const toggle = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  return (
    <div
      enable-xr
      style={{ "--xr-background-material": "regular" } as React.CSSProperties}
      className="flex h-screen w-screen flex-col items-start overflow-hidden border border-white/10 p-12 shadow"
    >
      <h1 className="text-5xl font-bold text-white">TODO</h1>
      <div className="relative mt-6 flex min-h-0 w-full max-w-[800px] flex-1 flex-col">
        <p className="text-[17px] text-neutral-300">Today</p>
        <div className="mt-3 flex min-h-0 w-full flex-1 flex-col rounded-2xl bg-white/10 px-6 pt-6 pb-4 backdrop-blur">
          <div className="mt-2 min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="space-y-3">
              {todos.map((t) => (
                <li key={t.id} className="flex items-start gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-cyan-400 sm:mt-1 sm:h-5 sm:w-5"
                    onChange={() => toggle(t.id)}
                    aria-label={`todo-${t.id}`}
                    checked={t.done}
                  />
                  <span
                    className={[
                      "break-words text-base font-semibold sm:text-[17px]",
                      t.done ? "text-white/80 line-through" : "text-white/95",
                    ].join(" ")}
                  >
                    {t.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
