import React from "react";
import { initScene } from "@webspatial/react-sdk";

import ic2 from "../assets/icons/icon-document.png"; // Document View
import ic3 from "../assets/icons/icon-ai-chat.png"; // AI Chat
import ic4 from "../assets/icons/icon-todo.png"; // TODO
import ic5 from "../assets/icons/icon-calendar.png"; // Calendar
import { routes } from "../routes";

export default function TabBar() {
  const icons = [ic2, ic3, ic4, ic5];
  const openWindow = (name: string, path: string) => {
    initScene(name, (defaultConfig) => {
      return { ...defaultConfig };
    });
    const url = new URL(path, window.location.origin).toString();
    window.open(url, name);
  };
  const handlers = [
    () => openWindow("docScene", routes.doc),
    () => openWindow("aiScene", routes.ai),
    () => openWindow("todoScene", routes.todo),
    () => openWindow("calendarScene", routes.calendar),
  ];
  return (
    <div
      enable-xr
      style={
        {
          "--xr-back": "50",
          "--xr-background-material": "regular",
        } as React.CSSProperties
      }
      className="inline-flex w-[68px] flex-col items-start gap-3 rounded-[34px] border border-black/10 p-3 shadow"
    >
      {icons.map((src, idx) => (
        <button
          key={idx}
          className={[
            "flex items-center self-stretch rounded-full p-2",
            idx === 0
              ? "bg-white/10 ring-1 ring-white/20"
              : "hover:bg-white/10",
          ].join(" ")}
          aria-label={`tab-${idx + 1}`}
          onClick={handlers[idx]}
        >
          <img
            src={src}
            alt=""
            className="h-6 w-6 object-contain"
            width={24}
            height={24}
          />
        </button>
      ))}
    </div>
  );
}
