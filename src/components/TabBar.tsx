import React from "react";
import { initScene } from "@webspatial/react-sdk";

import ic1 from "../../.figma/image/screenshot_993_3474.png";
import ic2 from "../../.figma/image/screenshot_993_3477.png";
import ic3 from "../../.figma/image/screenshot_993_3483.png";
import ic4 from "../../.figma/image/screenshot_993_3489.png";
import ic5 from "../../.figma/image/screenshot_993_3494.png";

export default function TabBar() {
  const icons = [ic1, ic2, ic3, ic4, ic5];
  const openTodoWindow = () => {
    initScene("todoScene", (defaultConfig) => {
      return {
        ...defaultConfig,
        defaultSize: { width: 900, height: 700 },
      };
    });
    const url = new URL("/todo", window.location.origin).toString();
    window.open(url, "todoScene");
  };
  return (
    <div enable-xr 
    style={{"--xr-back": 50, "--xr-background-material": "regular"}}
    className="inline-flex flex-col items-start rounded-[34px] p-3 w-[68px] gap-3 shadow border border-black/10">
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
          onClick={idx === 1 ? openTodoWindow : undefined}
        >
          <img
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
