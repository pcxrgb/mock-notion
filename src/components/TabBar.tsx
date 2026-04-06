'use client';

import React from "react";
import { initScene } from "@webspatial/react-sdk";
import Image from "next/image";

import ic1 from "../assets/icons/icon-home.png"; // Home
import ic2 from "../assets/icons/icon-document.png"; // Document View
import ic3 from "../assets/icons/icon-ai-chat.png"; // AI Chat
import ic4 from "../assets/icons/icon-todo.png"; // TODO
import ic5 from "../assets/icons/icon-calendar.png"; // Calendar

export default function TabBar() {
  const icons = [ic1, ic2, ic3, ic4, ic5];
  const openWindow = (name: string, path: string) => {
    initScene(name, (defaultConfig) => {
      return { ...defaultConfig, defaultSize: { width: 900, height: 700 } };
    });
    const url = new URL(path, window.location.origin).toString();
    window.open(url, name);
  };
  const handlers = [
    () => openWindow("homeScene", "/"),
    () => openWindow("docScene", "/doc"),
    () => openWindow("aiScene", "/ai"),
    () => openWindow("todoScene", "/todo"),
    () => openWindow("calendarScene", "/calendar"),
  ];
  return (
    <div 
    enable-xr="true"
    style={{"--xr-back": "50", "--xr-background-material": "regular"} as React.CSSProperties}
    className="inline-flex flex-col items-start rounded-[34px] p-3 w-[68px] gap-3 shadow border border-black/10 -z-10">
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
          <Image
            src={src}
            alt=""
            className="w-6 h-6 object-contain"
            width={24}
            height={24}
          />
        </button>
      ))}
    </div>
  );
}
