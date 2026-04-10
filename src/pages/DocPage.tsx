import React from "react";
import { documents } from "../data/recentDocuments";

export default function DocPage() {
  const [currentIdx, setCurrentIdx] = React.useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const p = new URLSearchParams(window.location.search);
    const t = p.get("title");
    const docList = documents.filter((d) => d.type === "Document");
    if (!t) return null;
    const idx = docList.findIndex((d) => d.title === t);
    return idx >= 0 ? idx : null;
  });
  const docList = documents.filter((d) => d.type === "Document");

  return (
    <div
      enable-xr
      style={{ "--xr-background-material": "regular" } as React.CSSProperties}
      className="flex h-screen w-screen flex-col gap-6 overflow-hidden border border-white/10 p-12 shadow lg:flex-row"
    >
      <div className="hidden h-full w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex">
        <h2 className="text-lg font-semibold text-white/90">Documents</h2>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="space-y-2">
            {docList.map((d, i) => {
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
        className={`h-full flex-1 overflow-auto rounded-2xl px-10 py-8 lg:hidden ${docList[0] ? "bg-white text-neutral-900" : "bg-white/10 text-neutral-200"}`}
      >
        <div className="mx-auto max-w-[900px]">
          {!docList[0] ? (
            <h1 className="text-2xl font-semibold">Select a document to get started</h1>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{docList[0].title}</h1>
              <p className="mt-4 text-[16px] leading-7">
                This document captures the current state of work, decisions, and
                action items. It is intended to be a living document that
                reflects ongoing progress and aligns the team.
              </p>
              <h2 className="mt-8 text-2xl font-semibold">Goals</h2>
              <p className="mt-3 text-[16px] leading-7">
                - Deliver a delightful user experience across core workflows.
                <br />
                - Ensure performance and reliability under production traffic.
                <br />- Maintain a flexible architecture to support rapid
                iteration.
              </p>
              <h2 className="mt-8 text-2xl font-semibold">Notes</h2>
              <p className="mt-3 text-[16px] leading-7">
                The navigation has been simplified to reduce cognitive load. We
                are exploring a component-driven approach to keep features
                modular and testable. Upcoming work includes refining the
                document editing experience and improving collaboration tools.
              </p>
              <h2 className="mt-8 text-2xl font-semibold">Tasks</h2>
              <p className="mt-3 text-[16px] leading-7">
                1. Finalize document layout and typography.
                <br />
                2. Add autosave and version history.
                <br />
                3. Integrate comments and mentions.
              </p>
              <p className="mt-8 text-[14px] text-neutral-600">
                Last updated: Today — Draft
              </p>
            </>
          )}
        </div>
      </div>

      <div
        className={`hidden h-full flex-1 overflow-auto rounded-2xl px-10 py-8 lg:block ${currentIdx != null ? "bg-white text-neutral-900" : "bg-white/10 text-neutral-200"}`}
      >
        <div className="mx-auto max-w-[900px]">
          {currentIdx == null || !docList[currentIdx] ? (
            <h1 className="text-2xl font-semibold">Click a document on the left to get started</h1>
          ) : (
            <>
              <h1 className="text-3xl font-bold">
                {docList[currentIdx].title}
              </h1>
              <p className="mt-4 text-[16px] leading-7">
                This document captures the current state of work, decisions, and
                action items. It is intended to be a living document that
                reflects ongoing progress and aligns the team.
              </p>
              <h2 className="mt-8 text-2xl font-semibold">Goals</h2>
              <p className="mt-3 text-[16px] leading-7">
                - Deliver a delightful user experience across core workflows.
                <br />
                - Ensure performance and reliability under production traffic.
                <br />- Maintain a flexible architecture to support rapid
                iteration.
              </p>
              <h2 className="mt-8 text-2xl font-semibold">Notes</h2>
              <p className="mt-3 text-[16px] leading-7">
                The navigation has been simplified to reduce cognitive load. We
                are exploring a component-driven approach to keep features
                modular and testable. Upcoming work includes refining the
                document editing experience and improving collaboration tools.
              </p>
              <h2 className="mt-8 text-2xl font-semibold">Tasks</h2>
              <p className="mt-3 text-[16px] leading-7">
                1. Finalize document layout and typography.
                <br />
                2. Add autosave and version history.
                <br />
                3. Integrate comments and mentions.
              </p>
              <p className="mt-8 text-[14px] text-neutral-600">
                Last updated: Today — Draft
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
