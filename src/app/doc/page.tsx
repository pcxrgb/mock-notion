'use client';
import React from "react";

export default function DocPage() {
  return (
    <div
      data-enable-xr
      style={{ ["--xr-background-material" as any]: "regular" }}
      className="w-screen h-screen p-12 flex gap-6 shadow border border-white/10 overflow-hidden"
    >
      <div className="w-1/5 min-w=[240px] h-full rounded-2xl px-5 py-6 flex flex-col">
        <h2 className="text-lg font-semibold text-white/90">Documents</h2>
        <div className="mt-4 flex-1 min-h-0 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="space-y-2">
            <li className="text-[15px] text-white/90">Product Spec</li>
            <li className="text-[15px] text-white/90">Quarterly Plan</li>
            <li className="text-[15px] text-white/90">Meeting Notes</li>
            <li className="text-[15px] text-white/90">Research Summary</li>
          </ul>
        </div>
      </div>
      <div className="flex-1 h-full rounded-2xl bg-white text-neutral-900 overflow-auto px-10 py-8">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-3xl font-bold">Project Alpha — Working Document</h1>
          <p className="mt-4 text-[16px] leading-7">
            This document captures the current state of work, decisions, and action items related to
            Project Alpha. It is intended to be a living document that reflects ongoing progress and
            aligns the team.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Goals</h2>
          <p className="mt-3 text-[16px] leading-7">
            - Deliver a delightful user experience across core workflows.<br />
            - Ensure performance and reliability under production traffic.<br />
            - Maintain a flexible architecture to support rapid iteration.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Notes</h2>
          <p className="mt-3 text-[16px] leading-7">
            The navigation has been simplified to reduce cognitive load. We are exploring a
            component-driven approach to keep features modular and testable. Upcoming work includes
            refining the document editing experience and improving collaboration tools.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Tasks</h2>
          <p className="mt-3 text-[16px] leading-7">
            1. Finalize document layout and typography.<br />
            2. Add autosave and version history.<br />
            3. Integrate comments and mentions.
          </p>
          <p className="mt-8 text-[14px] text-neutral-600">Last updated: Today — Draft</p>
        </div>
      </div>
    </div>
  );
}
