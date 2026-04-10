import React from "react";

export default function AiPage() {
  return (
    <div
      enable-xr
      style={{ "--xr-background-material": "regular" } as React.CSSProperties}
      className="flex h-full w-full flex-col items-start overflow-hidden border border-white/10 p-4 shadow sm:p-6 md:p-8 lg:p-12"
    >
      <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        Notion AI
      </h1>

      <div className="relative mt-4 flex min-h-0 w-full max-w-[800px] flex-1 flex-col md:mt-6">
        <p className="text-sm text-neutral-300 sm:text-base md:text-[17px]">
          Ask me anything!
        </p>
        <div className="mt-6 flex min-h-0 w-full flex-1 flex-col rounded-2xl px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:mt-8 md:px-6 md:pt-6 md:pb-4">
          <div className="mt-2 min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-full space-y-3">
              <div className="max-w-[85%] rounded-xl bg-white/10 px-4 py-3 text-white md:max-w-[70%]">
                <p className="text-sm sm:text-base">
                  Hi! I'm here to help. What would you like to work on today?
                </p>
              </div>
            </div>
          </div>
          <div>
            <textarea
              className="w-full resize-none rounded-xl bg-white/10 px-3 py-3 leading-6 text-white/90 placeholder-white/60 ring-1 ring-white/10 outline-none sm:leading-7"
              rows={3}
              placeholder="Ask, search, or make anything..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
