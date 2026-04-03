'use client';
import React from "react";

export default function AiPage() {
  return (
    <div
      enable-xr="true"
      style={{ ["--xr-background-material" as any]: "regular" }}
      className="w-screen h-screen p-12 flex flex-col items-start shadow border border-white/10 overflow-hidden"
    >
      <h1 className="text-5xl font-bold text-white">Notion AI</h1>
      <div className="relative mt-6 w-full max-w-[800px] flex-1 min-h-0 flex flex-col">
        <p className="text-[17px] text-neutral-300">
          Here are a few things I can do, or ask me anything!
        </p>
        <div className="mt-8 w-full rounded-2xl bg-white/10 backdrop-blur px-6 pt-6 pb-4 flex-1 min-h-0 flex flex-col">
          <div className="mt-2 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-full h-full rounded-xl flex items-top">
              <span className="text-white/70">Ask, search, or make anything...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
