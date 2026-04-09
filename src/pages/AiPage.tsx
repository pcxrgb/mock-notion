import React from "react";

export default function AiPage() {
  return (
    <div
      enable-xr
      style={{ "--xr-background-material": "regular" } as React.CSSProperties}
      className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-start shadow border border-white/10 overflow-hidden"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Notion AI</h1>

      <div className="relative mt-4 md:mt-6 w-full max-w-[800px] flex-1 min-h-0 flex flex-col">
        <p className="text-sm sm:text-base md:text-[17px] text-neutral-300">Ask me anything!</p>
        <div className="mt-6 md:mt-8 w-full rounded-2xl px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4 md:pb-4 flex-1 min-h-0 flex flex-col">
          <div className="mt-2 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-full space-y-3">
              <div className="max-w-[85%] md:max-w-[70%] rounded-xl bg-white/10 px-4 py-3 text-white">
                <p className="text-sm sm:text-base">Hi! I'm here to help. What would you like to work on today?</p>
              </div>
            </div>
          </div>
          <div>
            <textarea
              className="w-full resize-none rounded-xl px-3 py-3 bg-white/10 ring-1 ring-white/10 text-white/90 placeholder-white/60 outline-none leading-6 sm:leading-7"
              rows={3}
              placeholder="Ask, search, or make anything..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
