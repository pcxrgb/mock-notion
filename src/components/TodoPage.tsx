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
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
 
  return (
    <div
      enable-xr
      style={{ "--xr-background-material": "regular" } as React.CSSProperties}
      className="w-screen h-screen p-12 flex flex-col items-start shadow border border-white/10 overflow-hidden"
    >
      <h1 className="text-5xl font-bold text-white">TODO</h1>
 
      <div className="relative mt-6 w-full max-w-[800px] flex-1 min-h-0 flex flex-col">
        <p className="text-[17px] text-neutral-300">Today</p>
        <div className="mt-3 w-full rounded-2xl bg-white/10 backdrop-blur px-6 pt-6 pb-4 flex-1 min-h-0 flex flex-col">
 
          <div className="mt-2 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="space-y-3">
              {todos.map((t) => (
                <li key={t.id} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggle(t.id)}
                    className="mt-1 w-5 h-5 accent-cyan-400"
                    aria-label={`todo-${t.id}`}
                  />
                  <span
                    className={[
                      "text-[17px] font-semibold",
                      t.done ? "text-white/80" : "text-white/95",
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
